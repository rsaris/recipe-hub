# frozen_string_literal: true

FactoryBot.define do
  factory :recipe do
    user
    content { '# Ingredients' }
    title { 'Test recipe' }
  end
end
