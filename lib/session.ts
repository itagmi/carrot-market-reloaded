import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number;
}

// 브라우저에서 보내는 쿠키를 받는다.
export default async function getSession() {
  // console.log(cookies());
  return getIronSession<SessionContent>(cookies(), {
    // 사용자에게 쿠키를 받는
    // 첫번 째 인자는 current cookie , 두번째는 초기설정(cookie 가 없다면 )
    cookieName: "delicious-carrot",
    password: process.env.COOKIE_PASSWORD!, // 쿠키를 암호화 하기 위해 사용된다. 느낌표는 타입스크립트에게 env 에 무조건 존재한다는 것을 알려준기 위해.
  });
}

export const updateSession = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
  return redirect("/profile");
};
