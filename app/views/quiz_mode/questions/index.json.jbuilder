# frozen_string_literal: true

json.array! @questions, partial: 'quiz_mode/questions/question', as: :question
