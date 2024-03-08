import signinStyles from "../styles/signin.css";
import LoginForm from "../components/LoginForm";

import { useLoaderData } from "@remix-run/react";

import { createUserSession, login } from "../utils/session.server";

export default function Signin() {
  const users = useLoaderData();

  console.log(users);
  return <LoginForm type="signin" />;
}

export async function action({ request }) {
  const formData = await request.formData();

  const userData = Object.fromEntries(formData);

  let user = await login(userData.username, userData.password);

  if (!user) {
    console.log("incorect");
    return null;
  }

  return createUserSession(user.id, "/");
}

export function links() {
  return [{ rel: "stylesheet", href: signinStyles }];
}
