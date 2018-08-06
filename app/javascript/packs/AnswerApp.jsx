import React from "react";
import ReactDOM from "react-dom";

import QuizResult from "./components/QuizResult";

class AnswerApp extends React.Component {
  constructor() {
    super();

    this.state = {
      question: {
        id: null,
        content: null
      },
      answer: "",
      result: null
    };
    this.handleOnChangeAnswer = this.handleOnChangeAnswer.bind(this);
    this.handleOnClickSubmit = this.handleOnClickSubmit.bind(this);
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
    const { answer, question } = this.state;
    const resp = await window.fetch(
      `${window.location.origin}/quiz_mode/questions/${
        question.id
      }?answer=${answer}`
    );
    const { result } = await resp.json();
    this.setState({ result });
  }

  render() {
    const { question, answer, result } = this.state;

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
            >
              Submit!
            </button>

            <p className="mt-4">Show Answer</p>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<AnswerApp />, document.getElementById("AnswerApp"));
