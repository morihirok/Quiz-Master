// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

const AnswerApp = () => (
  <div className="p-5">
    <h4 className="mb-4">Question :</h4>
    <h2 className="mb-4">How Many vowels are there in the English alphabet?</h2>
    <form>
      <div className="form-group">
        <label htmlFor="answerInput">Answer</label>
        <input id="answerInput" type="text" className="form-control w-75" />
        <button className="btn btn-primary mt-3" type="button">
          Apply!
        </button>
        <p className="mt-4">Show Answer</p>
      </div>
    </form>
  </div>
);

ReactDOM.render(<AnswerApp />, document.getElementById("AnswerApp"));
