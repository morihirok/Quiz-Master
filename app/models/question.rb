# frozen_string_literal: true

class Question < ApplicationRecord
  validates :content, presence: true
  validates :answer, presence: true

  def correct?(answer_to_confirm)
    return true if same_with_answer?(answer_to_confirm)
    number = convert_words_to_numbers(answer_to_confirm)
    return same_with_answer?(number) if number.present?
    false
  end

  def self.random
    find(pluck(:id).sample)
  end

  private

  def same_with_answer?(answer_to_confirm)
    answer == answer_to_confirm
  end

  def convert_words_to_numbers(answer_to_confirm)
    # NumberInWords.in_numbers returns 0 when it receives a value that can not be converted
    return '0' if answer_to_confirm == 'zero'
    number = NumbersInWords.in_numbers(answer_to_confirm)
    # if this number here is 0, answer is unconvertible value
    return nil if number.zero?
    number.to_s
  end
end
