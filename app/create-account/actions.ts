"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";
import { updateSession } from "@/lib/session";

const checkUsername = (username: string) => {
  return !username.includes("tomato");
};

const checkPassword = ({
  password,
  confirm_password,
}: {
  password: string;
  confirm_password: string;
}) => {
  return password === confirm_password;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be string!",
        required_error: "Where is my username?",
      })
      .toLowerCase()
      .trim(), // 공백 제거
    // .transform((username) => `🎈${username}`)
    email: z.string().email().toLowerCase(),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
  })
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        username,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This username is already taken",
        path: ["username"],
        fatal: true,
      });
      return z.NEVER; // zod를 중단한다 그리고 치명적이라고 fatal: true 를 옵션에 add한다. 그 뒤에 다른 refine 이 있어도 실행 하지 않는다.
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: "This email is already taken",
        path: ["email"],
        fatal: true,
      });
      return z.NEVER; // zod를 중단한다 그리고 치명적이라고 fatal: true 를 옵션에 add한다. 그 뒤에 다른 refine 이 있어도 실행 하지 않는다.
    }
  })
  .refine(checkPassword, {
    message: "Both passwords should be the same!",
    path: ["confirm_password"],
  });

// check if username is taken and check if the email is already used - server validation
export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm_password: formData.get("confirm_password"),
  };
  const result = await formSchema.safeParseAsync(data); // checkUniqueUsername, checkUniqueEmail 이 async 함수 이기 때문에 safeParseAsync 를 사용한다.

  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    // validation 에 통과 한 후
    // 만약 두 조건이 false 하다면 (unique 하다면) hash password
    const hashedPassword = await bcrypt.hash(result.data.password, 12); // 2번째 인자 - 해싱 알고리즘을 12번 실행
    // save the user to db
    const user = await db.user.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        password: hashedPassword,
      },
      select: {
        id: true, // 필요없는 데이터를 안받기 위해 기본적으로 create 나 findUnique를 하게 되면 모든 user의 정보를 준다. 하지만 selet 를 쓰면 id만 select 할 수 있다.
      },
    });
    // log the user in
    updateSession(user.id);
  }
}
