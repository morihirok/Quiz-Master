import React from "react";

const ShowAnswerButton = props => {
  const { answerShowed, correctAnswer, handleOnClickShowAnswer } = props;

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

export default ShowAnswerButton;
