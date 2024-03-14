import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useRouteError,
} from "@remix-run/react";

import { useFetcher } from "@remix-run/react";

import { getUserId } from "~/utils/session.server";

import styles from "~/styles/formCreation.css";
import { createFeedbackForm } from "~/utils/actions.server";
import { useEffect, useRef, useState } from "react";

export const meta = () => {
  return [
    { title: "Feedbacks" },
    { name: "description", content: "Create feedbacks" },
  ];
};

export async function loader({ request }) {
  const userId = await getUserId(request);

  if (userId) {
    return userId;
  }
  return null;
}

export function ErrorBoundary() {
  const error = useRouteError();
  const fetcher = useFetcher();

  const [nameValue, setNameValue] = useState("");
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    if (nameValue.length > 3) {
      setShowError(false);
    } else {
      setShowError(true);
    }
  }, [nameValue]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <fetcher.Form method="post" action="" className="newFeedbackForm">
        <label htmlFor="name">Name of the new feedback form</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Name of feedback form"
          value={nameValue}
          onChange={(e) => {
            setNameValue(e.target.value);
          }}
        />
        {showError && (
          <p style={{ color: "red", fontSize: 12 }}>{error.message}</p>
        )}

        <button type="submit">
          {fetcher.state === "submitting" ? "..." : "Create"}
        </button>
      </fetcher.Form>
    </div>
  );
}

export default function Index() {
  const userId = useLoaderData();
  const fetcher = useFetcher();

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {userId ? (
        <fetcher.Form method="post" action="" className="newFeedbackForm">
          <label htmlFor="name">Name of the new feedback form</label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Name of feedback form"
          />

          <button type="submit">
            {fetcher.state === "submitting" ? "..." : "Create"}
          </button>
        </fetcher.Form>
      ) : (
        <div
          style={{
            textAlign: "center",
            marginTop: "300px",
            color: "black",
            fontSize: "20px",
          }}
        >
          <p style={{ marginBottom: "40px" }}>
            You must be logged in to create a new feedback form
          </p>
          <Link to="/signin" style={{ textAlign: "center", color: "black" }}>
            Sign in
          </Link>
        </div>
      )}
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const name = formData.get("name");
  console.log("name", name);
  if (!name || name.length <= 3) {
    throw new Error("Name must be at least 4 characters long", {
      status: 400,
    });
  }

  const form = await createFeedbackForm(name, request);
  return redirect(`/qrCode/${form.id}`);
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
