# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Question, type: :model do
  it 'is valid with a content and answer' do
    expect(FactoryBot.build(:question)).to be_valid
  end
end
