import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

interface Route {
  [key: string]: boolean;
}

const publicOnlyUrls: Route = {
  // object 로 한 이유는 array 보다 검색 할 때는 object 가 빠르기 때문. array 라면 모든 item의 array 를 거쳐갈 것이다.
  "/": true,
  "/login": true,
  "/sms": true,
  "/create-account": true,
};

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  const exists = publicOnlyUrls[request.nextUrl.pathname];

  if (!session.id) {
    //logout
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    } else {
      //login
      if (exists) {
        return NextResponse.redirect(new URL("/home", request.url));
      }
    }
  }
}

export const config = {
  // 어느곳에서 middleware 가 실행 되야 하는지 정의.
  matcher: ["/", "/profile", "/create-account", "/user/:path*"], ///user/:path* -> /user/profile 처럼 user 그리고 패스 뒤에 붙은 모든 url 을 포함 시킴,
  //정규식도 적을수 있다.
  // matcher: [ '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',]
  // 해당 header들이 없을 때 middleware를 실행
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
