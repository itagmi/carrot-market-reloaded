"use client";

import FormButton from "@/components/button";
import Input from "@/components/input";
import SocialLogin from "@/components/social-login";
import { useFormState } from "react-dom";
import { Login } from "./actions";
import { PASSWORD_MIN_LENGTH } from "@/lib/constants";

export default function LogIn() {
  const [state, dispatch] = useFormState(Login, null);
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in width email and password</h2>
      </div>
      <form action={dispatch} className="flex flex-col gap-3">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          required
          error={state?.fieldErrors.email}
        />
        <Input
          name="password"
          type="password"
          placeholder="password"
          minLength={PASSWORD_MIN_LENGTH}
          required
          error={state?.fieldErrors.password}
        />
        <FormButton text="Log in" />
      </form>
      <SocialLogin />
    </section>
  );
}
