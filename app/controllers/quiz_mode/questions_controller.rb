# frozen_string_literal: true

module QuizMode
  class QuestionsController < ApplicationController
    def index
      @questions = Question.all
    end

    def show
      return render json: { result: quiz_result } if quiz_result_mode?

      respond_to do |format|
        format.html
        format.json { set_question }
      end
    end

    private

    def set_question
      @question = params[:id] == 'random' ? Question.random : Question.find(params[:id])
    end

    def quiz_result
      Question.find(params[:id]).correct?(params[:answer])
    end

    def quiz_result_mode?
      params[:answer].present? && params[:id] != 'random'
    end
  end
end
