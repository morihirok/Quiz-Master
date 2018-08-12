import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import QuizResult from "components/QuizResult";

configure({ adapter: new Adapter() });

describe("QuizResult", () => {
  describe("When given null", () => {
    it("display nothing", () => {
      const quizResult = shallow(<QuizResult result={null} />);
      expect(quizResult.html()).toBe("<div></div>");
    });
  });

  describe("When given true", () => {
    it("display nothing", () => {
      const quizResult = shallow(<QuizResult result />);
      expect(quizResult.text()).toBe("Correct!Next Question");
    });
  });

  describe("When given false", () => {
    it("display nothing", () => {
      const quizResult = shallow(<QuizResult result={false} />);
      expect(quizResult.text()).toBe("Wrong!");
    });
  });
});
