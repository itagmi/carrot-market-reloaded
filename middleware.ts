import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

export default async function middleware(request: NextRequest) {
  // middleware 의 함수 이름에 의해 middleware 효과가 난다.
  console.log("mini!");
  const pathname = request.nextUrl.pathname;
  if (pathname === "/") {
    const response = NextResponse.next(); //user에 주기를 원하는 response 를 가져온다.
    response.cookies.set("middleware-cookie", "hello~~~~~~bit");
    return response;
  }
  if (pathname === "/profile") {
    // Response fetch API 인터페이스 - 요청에 대한 응답
    return Response.redirect(new URL("/", request.url)); // URL - javascript cunstructor
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
