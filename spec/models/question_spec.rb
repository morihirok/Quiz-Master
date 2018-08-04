# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Question, type: :model do
  it 'is valid with a content and answer' do
    expect(FactoryBot.build(:question)).to be_valid
  end

  it 'is invalid without content' do
    question = FactoryBot.build(:question, content: nil)
    question.valid?
    expect(question.errors[:content]).to include("can't be blank")
  end

  it 'is invalid without answer' do
    question = FactoryBot.build(:question, answer: nil)
    question.valid?
    expect(question.errors[:answer]).to include("can't be blank")
  end
end
