import { redirect } from "next/navigation";

// url /github/start URL 로 GET request 보낸다.
export async function GET() {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    // redirect_url 은 Authorization callback URL 에 기입 했기 때문에 pass
    // scope : github 에게 우리가 사용자로부터 원하는 데이터가 무엇인지 알린다. repo - 사용자의 모든 정보를 요구. facebook - permission , google - maybe only email
    scope: "read:user, user:email",
    // allow_sight - github 에 sign-up 을 허용 시킬지 말지 default 는 true
    allow_signup: "true",
  };

  const formattedParams = new URLSearchParams(params).toString();
  const finalUrl = `${baseUrl}?${formattedParams}`;
  return redirect(finalUrl); // github 에 redirect 된다.
}
