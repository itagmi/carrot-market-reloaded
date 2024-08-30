import { NextRequest } from "next/server";
import getSession from "./lib/session";

export default async function middleware(request: NextRequest) {
  const session = await getSession();
  console.log(session);
  if (request.nextUrl.pathname === "/profile") {
    // Response fetch API 인터페이스 - 요청에 대한 응답
    // return Response.redirect("/"); // 절대 경로를 넣어야함
    return Response.redirect(new URL("/", request.url)); // URL - javascript cunstructor
  }
}
