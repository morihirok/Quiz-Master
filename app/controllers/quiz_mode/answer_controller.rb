# frozen_string_literal: true

class QuizMode::AnswerController < ApplicationController
  def index
    question = Question.find(params[:question_id])
    render json: { answer: question.answer }
  end
end
