// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";

class AnswerApp extends React.Component {
  constructor() {
    super();

    this.state = {
      question: {
        id: null,
        content: null
      },
      answer: ""
    };
    this.handleOnChangeAnswer = this.handleOnChangeAnswer.bind(this);
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

  render() {
    const { question, answer } = this.state;

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
            <button className="btn btn-primary mt-3" type="button">
              Apply!
            </button>
            <p className="mt-4">Show Answer</p>
          </div>
        </form>
      </div>
    );
  }
}

ReactDOM.render(<AnswerApp />, document.getElementById("AnswerApp"));
