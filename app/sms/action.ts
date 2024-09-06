"use server";

import crypto from "crypto";
import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import db from "@/lib/db";

const phoneSchema = z
  .string()
  .trim()
  .refine(
    (phone) => validator.isMobilePhone(phone, "ko-KR"),
    "Wrong phone format"
  );

const tokenSchema = z.coerce.number().min(100000).max(999999);

interface ActionState {
  token: boolean;
}

async function getToken() {
  const token = crypto.randomInt(100000, 999999).toString();
  //db에 중복 token 이 생기지 않게
  const exists = await db.sMSToken.findUnique({
    // exists 값이 true 라면 또 다른 user가 이미 인증을 진행하고 있다는..
    where: {
      token,
    },
    select: {
      id: true,
    },
  });
  if (exists) {
    return getToken();
  } else {
    return token;
  }
}

export async function smsLogin(prevState: ActionState, formData: FormData) {
  //   console.log(typeof formData.get("token")); // formData 안의 token type
  //   console.log(typeof tokenSchema.parse(formData.get("token"))); // tokenSchema를 사용해  token을 parse 한 결과의 type
  const phone = formData.get("phone");
  const token = formData.get("token");
  if (!prevState.token) {
    // 만약 prevState 가 false 라면 데이터를 처음 불러온다는 뜻.
    const result = phoneSchema.safeParse(phone);
    // console.log(result.error?.flatten());
    if (!result.success) {
      return {
        token: false,
        error: result.error.flatten(),
      };
    } else {
      // delete previous token
      await db.sMSToken.deleteMany({
        where: {
          user: { phone: result.data },
        },
      });
      // create token
      const token = await getToken();
      await db.sMSToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              where: {
                phone: result.data, // 이미 존재 한다면 같은 phone data 에 토큰을 넣어준다.
              },
              create: {
                // phone 이 존재 하지 않는다면 새 user를 만든다.
                username: crypto.randomBytes(10).toString("hex"),
                phone: result.data,
              },
            },
          },
        },
      });
      // send the token use twilio
      return {
        token: true,
      };
    }
  } else {
    const result = tokenSchema.safeParse(token);
    if (!result.success) {
      return {
        token: true,
        // retrun the errors
        error: result.error.flatten(),
      };
    } else {
      redirect("/");
    }
  }
}
