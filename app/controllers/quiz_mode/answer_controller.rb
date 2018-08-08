# frozen_string_literal: true

module QuizMode
  class AnswerController < ApplicationController
    def index
      question = Question.find(params[:question_id])
      render json: { answer: question.answer }
    end
  end
end
