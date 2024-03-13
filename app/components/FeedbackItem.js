import PropTypes from "prop-types";

import angry from "../images/angry.png";
import sad from "../images/sad.png";
import happy from "../images/happy.png";
import like from "../images/like.png";
import heart from "../images/heart.png";

const FeedbackItem = ({ id, text, emojiCode }) => {
  let emoji;

  // case conditiion
  switch (emojiCode) {
    case "angry":
      emoji = angry;
      break;
    case "sad":
      emoji = sad;
      break;
    case "happy":
      emoji = happy;
      break;
    case "like":
      emoji = like;
      break;
    case "heart":
      emoji = heart;
      break;
    default:
      emoji = angry;
  }
  return (
    <div key={id} className="item">
      <div className="feedback">{text}</div>
      <div className="emoji-rating">{<img src={emoji} alt={emojiCode} />}</div>
    </div>
  );
};

FeedbackItem.propTypes = {
  id: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  emojiCode: PropTypes.string.isRequired,
};

export default FeedbackItem;
