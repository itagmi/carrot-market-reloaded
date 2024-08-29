"use server";
import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

const checkUniqueUsername = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });
  return !Boolean(user);
};

const checkUniqueEmail = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return Boolean(user) === false;
};

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: "Username must be string!",
        required_error: "Where is my username?",
      })
      .toLowerCase()
      .trim() // 공백 제거
      // .transform((username) => `🎈${username}`)
      .refine((username) => checkUsername(username), "No tomato allowed!")
      .refine(checkUniqueUsername, "This user name already taken"),
    email: z
      .string()
      .email()
      .toLowerCase()
      // .refine((email) => checkUniqueEmail(email), "This email alreay exist"),
      .refine(checkUniqueEmail, "This email alreay exist"),
    password: z.string().min(PASSWORD_MIN_LENGTH),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z.string().min(PASSWORD_MIN_LENGTH),
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
    // console.log(result.error.flatten());
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
    const cookie = await getIronSession(cookies(), {
      // 사용자에게 쿠키를 받는
      // 첫번 째 인자는 current cookie , 두번째는 초기설정(cookie 가 없다면 )
      cookieName: "delicious-carrot",
      password: process.env.COOKIE_PASSWORD!, // 쿠키를 암호화 하기 위해 사용된다. 느낌표는 타입스크립트에게 env 에 무조건 존재한다는 것을 알려준기 위해.
    });
    //@ts-ignore
    cookie.id = user.id; // session id 에 prisma 에서 받은 id 를 넣는다.
    await cookie.save(); /// 그리고 session 에 저장한다. 그럼 iron session이 이 데이터를 암호화 한다. 우리가 정한 암호를 이용해서. 사용자가 쿠키의 정보를 수정 할수 없게 말이다. 브라우저 쿠키에는 암호화된 쿠키가 보이고 서버에는 복호화된 아이디가 보인다.
    console.log(cookies());
    console.log(cookie);
    // redirect '/home
    redirect("/profile");
  }
}
