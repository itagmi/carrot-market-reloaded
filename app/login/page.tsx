import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLogin from "@/components/social-login";
import { useFormStatus } from "react-dom";

export default function Login() {
  const handleForm = async (formData: FormData) => {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 5000));
    console.log("hey logged in!");
  };

  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Log in width email and password</h2>
      </div>
      <form action={handleForm} className="flex flex-col gap-3">
        <FormInput
          name="email"
          type="email"
          placeholder="Email"
          required
          error={[]}
        />
        <FormInput
          name="password"
          type="password"
          placeholder="password"
          required
          error={[]}
        />
        <FormButton text="Create account" />
      </form>
      <SocialLogin />
    </section>
  );
}
