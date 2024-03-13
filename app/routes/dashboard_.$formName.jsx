import FeedbackItem from "../components/FeedbackItem";
import { useLoaderData } from "@remix-run/react";
import { getAllFeedbacks } from "../utils/actions.server";

import styles from "../styles/feedbackList.css";

export async function loader({ request, params }) {
  const formName = params.formName;

  return await getAllFeedbacks(formName, request);
}

export default function Feedbacks() {
  const feedbacks = useLoaderData();

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "220px" }}>
        No feedbacks yet
      </div>
    );
  }

  return (
    <div className="feedback-list-container">
      <div className="titles">
        <div className="feedback-title">Feedback</div>
        <div className="emoji-title">Emoji</div>
      </div>
      <div className="list">
        {feedbacks &&
          feedbacks.map((feedback) => (
            <FeedbackItem
              id={feedback.id}
              key={feedback.id}
              text={feedback.text}
              emojiCode={feedback.emojiCode}
            />
          ))}
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
