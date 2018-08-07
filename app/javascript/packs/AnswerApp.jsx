import React from "react";
import ReactDOM from "react-dom";

import QuizResult from "./components/QuizResult";
import ShowAnswerButton from "./components/ShowAnswerButton";

class AnswerApp extends React.Component {
  constructor() {
    super();

    this.state = {
      question: {
        id: null,
        content: null
      },
      answer: "",
      result: null,
      buttonDisable: false,
      answerShowed: false,
      correctAnswer: null,
      quizDone: false
    };
    this.handleOnChangeAnswer = this.handleOnChangeAnswer.bind(this);
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this);
    this.handleOnClickShowAnswer = this.handleOnClickShowAnswer.bind(this);
  }

  async componentDidMount() {
    const resp = await window.fetch(`${window.location.href}.json`);
    const respJson = await resp.json();
    this.setState({
      question: {
        id: respJson.id,
        content: respJson.content
      }
    });
  }

  handleOnChangeAnswer({ target }) {
    this.setState({ answer: target.value });
  }

  async handleOnClickSubmit() {
    this.setState({ buttonDisable: true });

    const { answer, question } = this.state;
    const resp = await window.fetch(
      `${window.location.origin}/quiz_mode/questions/${
        question.id
      }?answer=${answer}`
    );
    const { result } = await resp.json();

    if (!result) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ quizDone: true });
    }

    this.setState({ result });
  }

  async handleOnClickShowAnswer() {
    this.setState({ answerShowed: true });
    this.setState({ buttonDisable: true });

    const { question } = this.state;
    const resp = await window.fetch(
      `${window.location.origin}/quiz_mode/questions/${question.id}/answer`
    );
    const { answer } = await resp.json();
    this.setState({ correctAnswer: answer });
  }

  render() {
    const {
      question,
      answer,
      result,
      buttonDisable,
      answerShowed,
      correctAnswer,
      quizDone
    } = this.state;

    return (
      <div className="p-5">
        <h4 className="mb-4">Question :</h4>
        <h2 className="mb-4">{question.content}</h2>
        <form>
          <div className="form-group">
            <label htmlFor="answerInput">Answer</label>
            <input
              onChange={this.handleOnChangeAnswer}
              value={answer}
              id="answerInput"
              type="text"
              className="form-control w-75"
            />
            <QuizResult result={result} />
            <button
              onClick={this.handleOnClickSubmit}
              className="btn btn-primary mt-3"
              type="button"
              disabled={buttonDisable}
            >
              Submit!
            </button>
            <ShowAnswerButton
              answerShowed={answerShowed}
              correctAnswer={correctAnswer}
              handleOnClickShowAnswer={this.handleOnClickShowAnswer}
              quizDone={quizDone}
            />
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<AnswerApp />, document.getElementById("AnswerApp"));
