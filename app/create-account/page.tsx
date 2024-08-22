import FormButton from "@/components/form-btn";
import FormInput from "@/components/form-input";
import SocialLoginButton from "@/components/social-login";

export default function CreateAccount() {
  return (
    <section className="flex flex-col gap-10 py-8 px-6">
      <div className="flex flex-col gap-2 *:font-medium">
        <h1 className="text-2xl">안녕하세요!</h1>
        <h2 className="text-xl">Fill in the form below to joing !</h2>
      </div>
      <form action="" className="flex flex-col gap-3">
        <FormInput type="text" placeholder="Username" required error={[]} />
        <FormInput type="email" placeholder="Email" required error={[]} />
        <FormInput type="password" placeholder="password" required error={[]} />
        <FormInput
          type="password"
          placeholder="Confirm password"
          required
          error={[]}
        />
        <FormButton loading={false} text="Create account" />
      </form>
      <SocialLoginButton />
    </section>
  );
}
