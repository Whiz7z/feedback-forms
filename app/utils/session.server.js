import { createCookieSessionStorage, redirect } from "@remix-run/node";
import { db } from "./db.server";
import bcrypt from "bcryptjs";

export async function login(username, password) {
  let existingUser = await db.user.findFirst({
    where: {
      username: username,
    },
  });

  if (!existingUser) return null;

  const passwordsMatch = await bcrypt.compare(
    password,
    existingUser.passwordHash
  );

  if (!passwordsMatch) return null;
  console.log(existingUser);
  return existingUser;
}

let secret = "secret";

let storage = createCookieSessionStorage({
  cookie: {
    secure: true,
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
    name: "userSession",
    secret: [secret],
  },
});

export async function logout(request) {
  let session = await getUserSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await storage.destroySession(session),
    },
  });
}

// export async function deleteUserSession(request) {
//   let session = await getUserSession(request);

//   return redirect("/", {
//     headers: {
//       "Set-Cookie": await storage.destroySession(session),
//     },
//   });
// }

function getUserSession(request) {
  return storage.getSession(request.headers.get("Cookie"));
}

export async function createUserSession(userId, redirectTo) {
  let session = await storage.getSession();

  session.set("userId", userId);

  return redirect(redirectTo, {
    headers: { "Set-Cookie": await storage.commitSession(session) },
  });
}

export async function getUserId(request) {
  let session = await getUserSession(request);
  let userId = session.get("userId");
  if (!userId) return null;
  return userId;
}

export async function getUser(request) {
  let userId = await getUserId(request);
  if (!userId) return null;
  let user = await db.user.findUnique({ where: { id: userId } });
  return user;
}

export async function requireUserId(request, redirectTo) {
  let userId = await getUserId(request);
  if (!userId) {
    throw redirect(redirectTo);
  }
  return userId;
}

export { storage };
