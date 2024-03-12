import { Link, Outlet, redirect, useLoaderData } from "@remix-run/react";
import {
  deleteFeedbackForm,
  getAllFeedbackForms,
} from "../utils/actions.server";

import styles from "../styles/dashboard.css";

export async function loader({ request }) {
  return await getAllFeedbackForms(request);
}

export default function Dashboard() {
  const forms = useLoaderData();

  if (!forms || forms.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "220px" }}>
        <p style={{ marginBottom: "20px" }}>No forms yet</p>
        <Link
          to="/"
          style={{ color: "blue", textDecoration: "none", marginTop: "20px" }}
        >
          Create new
        </Link>
      </div>
    );
  }
  return (
    <div className="feedback-form-list-container">
      <div className="titles">
        <div className="group-titles">
          <div className="form-name-title">Form name</div>
          <div className="feedbacks-quantity-title">Feedbacks</div>
          <div className="date-title">Created at</div>
        </div>
        <div className="action-titles">
          <div className="delete-title">Delete</div>
          <div className="qrcode-title">QRCode</div>
        </div>
      </div>
      <div className="list">
        {forms &&
          forms.map((form) => (
            <div key={form.id} className="item">
              <Link
                to={`/dashboard/${form.name}`}
                key={form.id}
                className="link"
              >
                <div className="form-name">{form.name}</div>
                <div className="feedbacks-quantity">
                  {form.feedbacks.length}
                </div>
                <div className="date">
                  {new Date(form.createdAt).toLocaleDateString()}
                </div>
              </Link>
              <div className="actions">
                <Link
                  to={"/dashboard/confirmDelete/" + form.id}
                  className="delete"
                >
                  Delete
                </Link>

                <Link to={"/qrCode/" + form.id} className="qr">
                  QRCode
                </Link>
              </div>
            </div>
          ))}
      </div>
      <Outlet />
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  console.log("biba", data.formId);
  await deleteFeedbackForm(data.formId, request);
  return redirect("/dashboard");
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
