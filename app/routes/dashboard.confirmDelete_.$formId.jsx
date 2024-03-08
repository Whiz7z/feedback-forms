import { Form, Link, useLoaderData } from "@remix-run/react";

import styles from "../styles/confirmModal.css";

export async function loader({ params }) {
  return params.formId;
}

export default function Confirm() {
  const formId = useLoaderData();
  return (
    <div className="confirm-container">
      <div className="confirm">
        <h1>Are you sure?</h1>
        <Form method="post" action="/dashboard">
          <input type="hidden" name="formId" value={formId} />
          <div className="actions">
            <button type="submit">Delete</button>
            <Link to="/dashboard">Cancel</Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
