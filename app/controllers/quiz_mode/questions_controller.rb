# frozen_string_literal: true

class QuizMode::QuestionsController < ApplicationController
  def index
    @questions = Question.all
  end

  def show
    respond_to do |format|
      format.html
      format.json do
        @question = Question.find(params[:id])
      end
    end
  end
end
