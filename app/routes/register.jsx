import signinStyles from "../styles/signin.css";
import LoginForm from "../components/LoginForm";
import { db } from "../utils/db.server";

import bcrypt from "bcryptjs";
import { createUserSession } from "../utils/session.server";

export default function Register() {
  return <LoginForm type="register" />;
}

export async function action({ request }) {
  const formData = await request.formData();
  const userData = Object.fromEntries(formData);
  let userExists = await db.user.findFirst({
    where: {
      username: userData.username,
    },
  });
  if (userExists) {
    console.log(userExists);
    return {
      message: "User already exists",
    };
  }
  const userCreated = await db.user.create({
    data: {
      username: userData.username,
      passwordHash: await bcrypt.hash(userData.password, 10),
    },
  });

  return createUserSession(userCreated.id, "/");
}

export function links() {
  return [{ rel: "stylesheet", href: signinStyles }];
}
