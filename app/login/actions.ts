"use server";

import {
  PASSWORD_MIN_LENGTH,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const checkEmailExists = async (email: string) => {
  // find a user with the email
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  return Boolean(user);
};

const formSchema = z.object({
  email: z
    .string()
    .email()
    .toLowerCase()
    .refine(checkEmailExists, "An account with this email does not exists"),
  password: z.string({ required_error: "Password is required" }),
  // .min(PASSWORD_MIN_LENGTH)
  // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export const Login = async (prevState: any, formData: FormData) => {
  // await new Promise((resolve) => setTimeout(resolve, 5000));
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    const user = await db.user.findUnique({
      where: {
        email: result.data.email,
      },
      select: {
        id: true,
        password: true,
      },
    });
    // if the use is found, check password hash
    const ok = await bcrypt.compare(
      result.data.password, // 사용자가 보낸 pw
      user!.password ?? "xxx" // db의 해시값 pw 비교 하면 true or false
    ); // user email 이 확실히 존재 하고 있다는것을 알고 있다.- 느낌표 password 가 없다면 빈문자와 비교한다. - for now
    // log the user in or no
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          // pretending zod
          email: [],
          password: ["Wroing password"],
        },
      };
    }
    // redirect '/profile'
  }
};
