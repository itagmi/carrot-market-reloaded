"use client";
import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";

export default function Login() {
  const onClick = async () => {
    const response = await fetch("/www/users", {
      method: "POST",
      body: JSON.stringify({
        username: "nico",
        paasword: "1234",
      }),
    });
    console.log(await response.json());
  };
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in width email and password</h2>
      </div>
      <form action="" className="flex flex-col gap-3">
        <FormInput type="email" placeholder="Email" required error={[]} />
        <FormInput type="password" placeholder="password" required error={[]} />
      </form>
      <span onClick={onClick}>
        <FormButton loading={false} text="Create account" />
      </span>
      <SocialLogin />
    </section>
  );
}
