import angry from "../images/angry.png";
import sad from "../images/sad.png";
import happy from "../images/happy.png";
import like from "../images/like.png";
import heart from "../images/heart.png";

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
            <div key={feedback.id} className="item">
              <div className="feedback">{feedback.text}</div>
              <div className="emoji-rating">
                {feedback.emojiCode === "angry" && (
                  <img src={angry} alt="angry" />
                )}
                {feedback.emojiCode === "sad" && <img src={sad} alt="sad" />}
                {feedback.emojiCode === "happy" && (
                  <img src={happy} alt="happy" />
                )}
                {feedback.emojiCode === "like" && <img src={like} alt="like" />}
                {feedback.emojiCode === "heart" && (
                  <img src={heart} alt="heart" />
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export function links() {
  return [{ rel: "stylesheet", href: styles }];
}
