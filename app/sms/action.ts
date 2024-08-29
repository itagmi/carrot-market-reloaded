"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";

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
