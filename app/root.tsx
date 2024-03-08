import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  json,
  useLoaderData,
} from "@remix-run/react";

import headerStyles from "./styles/header.css";
import { getUserId } from "./utils/session.server";

interface LoaderData {
  userId: string | null;
  ENV: {
    BASE_URL: string;
  };
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: headerStyles }];
};

export async function loader({ request }: { request: Request }) {
  const userId = await getUserId(request);
  return json({
    ENV: {
      BASE_URL: process.env.BASE_URL,
    },
    userId: userId,
  });
}

export default function App() {
  const { userId, ENV } = useLoaderData<LoaderData>();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <Link to="/" className="logo">
            Logo
          </Link>
          <nav>
            <ul>
              {userId && (
                <>
                  <li>
                    <Link to="/dashboard">Dashboard</Link>
                  </li>
                  <li>
                    <Link to="/signout">Sign out</Link>
                  </li>
                </>
              )}
              {!userId && (
                <li>
                  <Link to="/signin">Sign in</Link>
                </li>
              )}
            </ul>
          </nav>
        </header>
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
