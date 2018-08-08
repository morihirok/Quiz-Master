# frozen_string_literal: true

Rails.application.routes.draw do
  root 'home#index'
  resources :questions

  namespace :quiz_mode do
    resources :questions, only: :show do
      resources :answer, only: :index
    end
  end
end
