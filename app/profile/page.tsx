import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      // console.log("here");
      return user;
    }
  }
  // if session.id doesn't found  -> session 이 있지만 user를 찾지 못하거나 session이 없는 경우
  notFound();
}
export default async function Profile() {
  const user = await getUser();
  const logOut = async () => {
    "use server"; // inline server action
    const session = await getSession();
    session.destroy();
    redirect("/");
  };
  return (
    <div>
      <h1>Welcome! {user?.username}</h1>
      <form action={logOut}>
        <button>Logout</button>
      </form>
    </div>
  );
}
