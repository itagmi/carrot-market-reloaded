interface Email {
  email: string;
  primary: boolean;
  verified: boolean;
  visibility: string;
}

// get access token
export const getAccessToken = async (code: string) => {
  const accessTokenParams = new URLSearchParams({
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRET!,
    code,
  }).toString();

  const accessTokenURL = `https://github.com/login/oauth/access_token?${accessTokenParams}`;

  const { error, access_token } = await (
    await fetch(accessTokenURL, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();

  //   console.log(error, access_token);

  return { error, access_token };
};

// get user profile
export const getUserProfile = async (token: string) => {
  const { id, avatar_url, login } = await (
    await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${token}`,
        cache: "no-cache", // next 우리가 실행 하는 fetch request들을 캐싱 한다. 이프로세스를 진행하는 user 마다 달라야하기 때문에 cache를 저장하지않는다.
      },
    })
  ).json();

  return { id, avatar_url, login };
};

// get user email
export const getUserEmail = async (token: string) => {
  const test = await (
    await fetch("https://api.github.com/user/emails", {
      headers: {
        Authorization: `Bearer ${token}`,
        cache: "no-cache", // next 우리가 실행 하는 fetch request들을 캐싱 한다. 이프로세스를 진행하는 user 마다 달라야하기 때문에 cache를 저장하지않는다.
      },
    })
  ).json();

  const result = test.find(
    (email: Email) =>
      email.primary === true &&
      email.verified === true &&
      email.visibility === "public"
  );

  return result.email;
};
