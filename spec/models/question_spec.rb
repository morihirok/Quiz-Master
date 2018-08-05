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

  describe '.random' do
    it 'returns random question' do
      contents1 = Array.new(10) { Question.random.content }
      contents2 = Array.new(10) { Question.random.content }
      expect(contents1).not_to match(contents2)
    end
  end

  describe '#correct?' do
    context 'when set the answer to 5 and answer is 5' do
      it 'returns true' do
        question = FactoryBot.build(:question)
        answer = '5'
        expect(question.correct?(answer)).to be(true)
      end
    end

    context 'when set the answer to 4 and answer is 5' do
      it 'returns false' do
        question = FactoryBot.build(:question)
        answer = '4'
        expect(question.correct?(answer)).to be(false)
      end
    end

    context 'when set the answer to five and answer is 5' do
      it 'returns true' do
        question = FactoryBot.build(:question)
        answer = 'five'
        expect(question.correct?(answer)).to be(true)
      end
    end

    context 'when set the answer to 0 and answer is 0' do
      it 'returns true' do
        question = FactoryBot.build(:question, answer: '0')
        answer = '0'
        expect(question.correct?(answer)).to be(true)
      end
    end

    context 'when set the answer to zero and answer is 0' do
      it 'returns true' do
        question = FactoryBot.build(:question, answer: '0')
        answer = 'zero'
        expect(question.correct?(answer)).to be(true)
      end
    end

    context 'when set the answer to hoge and answer is 0' do
      it 'returns false' do
        question = FactoryBot.build(:question, answer: '0')
        answer = 'hoge'
        expect(question.correct?(answer)).to be(false)
      end
    end

    context 'when set the answer to nil and answer is 5' do
      it 'returns false' do
        question = FactoryBot.build(:question)
        answer = nil
        expect(question.correct?(answer)).to be(false)
      end
    end
  end
end
