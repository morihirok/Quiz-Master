import React from "react";
import PropTypes from "prop-types";

const ShowAnswerButton = props => {
  const {
    answerShowed,
    quizDone,
    correctAnswer,
    handleOnClickShowAnswer
  } = props;

  if (answerShowed) {
    return (
      <div className="alert alert-dark w-75 mt-4" role="alert">
        Answer : {correctAnswer}
        <a
          className="alert-link float-right"
          href={`${window.location.origin}/quiz_mode/questions/random`}
        >
          Next Question
        </a>
      </div>
    );
  }

  if (quizDone) {
    return <div />;
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        className="btn btn-sm btn-outline-dark"
        onClick={handleOnClickShowAnswer}
      >
        Give Up... Show Answer
      </button>
    </div>
  );
};

ShowAnswerButton.propTypes = {
  answerShowed: PropTypes.bool.isRequired,
  quizDone: PropTypes.bool.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  handleOnClickShowAnswer: PropTypes.func.isRequired
};

export default ShowAnswerButton;
