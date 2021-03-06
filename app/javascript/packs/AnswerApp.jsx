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
      buttonDisable: true,
      answerShowed: false,
      correctAnswer: "",
      quizDone: false
    };
    this.handleOnChangeAnswer = this.handleOnChangeAnswer.bind(this);
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this);
    this.handleOnClickShowAnswer = this.handleOnClickShowAnswer.bind(this);
  }

  async componentDidMount() {
    // Set random question
    const resp = await window.fetch(
      `${window.location.origin}/${window.location.pathname}.json`
    );

    if (resp.status !== 200) {
      return;
    }

    const respJson = await resp.json();
    this.setState({
      question: {
        id: respJson.id,
        content: respJson.content
          .split("\n")
          .map(line => <p key={line}>{line}</p>)
      }
    });
  }

  handleOnChangeAnswer({ target }) {
    const { quizDone } = this.state;
    // When input length is 0 or clicked show answer button, input button is disable
    if (target.value.length > 0 && !quizDone) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
    this.setState({ answer: target.value });
  }

  async handleOnClickSubmit() {
    // Protect double click
    this.setState({ buttonDisable: true });

    const { answer, question } = this.state;
    const resp = await window.fetch(
      `${window.location.origin}/quiz_mode/questions/${
        question.id
      }?answer=${answer}`
    );
    const { result } = await resp.json();

    if (!result) {
      // If answer is wrong, user can retry
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
            <div>Answer</div>
            <input
              onChange={this.handleOnChangeAnswer}
              value={answer}
              id="answerInput"
              type="text"
              className="form-control w-75 mt-2"
              disabled={answerShowed}
            />

            <button
              onClick={this.handleOnClickSubmit}
              className="btn btn-primary mt-3"
              type="button"
              disabled={buttonDisable}
            >
              Submit!
            </button>
            <QuizResult result={result} />
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
