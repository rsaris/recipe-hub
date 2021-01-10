# frozen_string_literal: true

FactoryBot.define do
  sequence :text do |n|
    "label #{n}"
  end

  factory :label do
    user
    text
  end
end
