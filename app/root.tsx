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
import { motion, useAnimation } from "framer-motion";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

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

const logoAnimation = {
  hidden: {
    opacity: 0,

    transitionEnd: {
      display: "none",
    },
    transition: {
      staggerChildren: 0.5,
    },
  },
  visible: {
    opacity: 1,

    transition: {
      staggerChildren: 0.2,
    },
    transitionEnd: {
      display: "inline-block",
    },
  },
};

export default function App() {
  const [animate, setAnimate] = useState(false);
  const controls = useAnimation();
  function handleMouseEnterControls() {
    controls.start("visible");
  }

  function handleMouseLeaveControls() {
    controls.start("hidden");
  }
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
            <motion.span
              initial="hidden"
              animate={animate ? "visible" : "hidden"}
              transition={{ staggerChildren: 0.15 }}
              aria-hidden
              onMouseEnter={() => setAnimate(true)}
              onMouseLeave={() => setAnimate(false)}
            >
              F
              {/* <motion.span
                variants={logoAnimation}
                animate={controls}
                transition={{ duration: 0.5 }}
                initial="hidden"
              >
                eedback
              </motion.span> */}
              {"eedback".split("").map((letter) => (
                <motion.span key={uuidv4()} variants={logoAnimation}>
                  {letter}
                </motion.span>
              ))}
              F
              {"orms".split("").map((letter) => (
                <motion.span key={uuidv4()} variants={logoAnimation}>
                  {letter}
                </motion.span>
              ))}
            </motion.span>
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
