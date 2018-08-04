# frozen_string_literal: true

class QuizMode::QuestionsController < ApplicationController
  def index
    @questions = Question.all
  end

  def show
    respond_to do |format|
      format.html
      format.json { set_question }
    end
  end

  private

  def set_question
    @question = params[:id] == 'random' ? Question.random : Question.find(params[:id])
  end
end
