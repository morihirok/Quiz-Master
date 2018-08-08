import React from "react";
import PropTypes from "prop-types";

const QuizResult = ({ result }) => {
  if (result === null) return <div />;

  if (result) {
    return (
      <div className="alert alert-success w-75 mt-4" role="alert">
        Correct!
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
    <div className="alert alert-danger w-75 mt-4" role="alert">
      Wrong!
    </div>
  );
};

QuizResult.propTypes = {
  result: PropTypes.oneOfType([PropTypes.bool])
};
QuizResult.defaultProps = { result: null };

export default QuizResult;
