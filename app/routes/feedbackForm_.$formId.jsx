import angry from "../images/angry.png";
import sad from "../images/sad.png";
import happy from "../images/happy.png";
import like from "../images/like.png";
import heart from "../images/heart.png";

import styles from "../styles/feedbackForm.css";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import { addFeedback } from "../utils/actions.server";
import { useFetcher } from "@remix-run/react";

export async function loader({ params }) {
  const formId = params.formId;
  return formId;
}

export default function FeedbackForm() {
  const [isSentState, setIsSentState] = useState(useActionData());
  const fetcher = useFetcher();
  const form = useRef();

  useEffect(() => {
    if (fetcher.state === "idle") {
      form.current.reset();
    }
  }, [fetcher]);

  return (
    <fetcher.Form method="POST" ref={form} className="newFeedback">
      <label htmlFor="feedback">Your feedback</label>
      <textarea
        name="feedback"
        id="feedback"
        placeholder="Your feedback"
        onClick={() => setIsSentState(false)}
      />
      <div className="emoji-container">
        <div className="angry emoji-item">
          <input type="radio" name="emoji" id="angry" value="angry" hidden />
          <label htmlFor="angry">
            <img src={angry} alt="angry" />
          </label>
        </div>
        <div className="sad emoji-item">
          <input type="radio" name="emoji" id="sad" value="sad" hidden />
          <label htmlFor="sad">
            <img src={sad} alt="sad" />
          </label>
        </div>
        <div className="happy emoji-item">
          <input
            type="radio"
            name="emoji"
            id="happy"
            value="happy"
            hidden
            defaultChecked
          />
          <label htmlFor="happy">
            <img src={happy} alt="happy" />
          </label>
        </div>
        <div className="like emoji-item">
          <input type="radio" name="emoji" id="like" value="like" hidden />
          <label htmlFor="like">
            <img src={like} alt="like" />
          </label>
        </div>
        <div className="heart emoji-item">
          <input type="radio" name="emoji" id="heart" value="heart" hidden />
          <label htmlFor="heart">
            <img src={heart} alt="heart" />
          </label>
        </div>
      </div>
      <button type="submit">Send</button>
      {isSentState && <p className="sent">Feedback sent</p>}
    </fetcher.Form>
  );
}

export async function action({ request, params }) {
  const formData = await request.formData();
  const feedback = formData.get("feedback");
  const emoji = formData.get("emoji");
  const formId = params.formId;
  console.log(feedback, emoji, formId, "new feeedback");

  if (!feedback || !emoji) return null;

  await addFeedback(formId, feedback, emoji);
  return true;
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
