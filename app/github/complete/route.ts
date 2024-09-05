import db from "@/lib/db";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { updateSession } from "@/lib/session";
import {
  getAccessToken,
  getUserEmail,
  getUserProfile,
} from "@/lib/auth/github";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");

  if (!code) {
    return notFound();
  }

  const { error, access_token } = await getAccessToken(code);

  if (error) {
    return new Response(null, {
      status: 400,
    });
  }

  const { id, avatar_url, login } = await getUserProfile(access_token);

  const userEmail = await getUserEmail(access_token);

  const user = await db.user.findUnique({
    where: {
      github_id: id + "",
    },
    select: {
      id: true,
    },
  });

  if (user) {
    await updateSession(user.id);
  }

  const now = Date.now().toString();
  // if user doesnt exist - 문제점 : 깃허브에 있는 username 과 기존의 username 이 중복 될 수 있다.
  const newUser = await db.user.create({
    data: {
      username: login + "_github_" + now,
      github_id: id + "", //github id 는 int 이기 때문에 string 으로 바꿔준다.
      avatar: avatar_url,
      email: userEmail,
    },
    select: {
      id: true,
    },
  });

  await updateSession(newUser.id);
}
