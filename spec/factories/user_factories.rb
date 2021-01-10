FactoryBot.define do
  sequence :uid do |n|
    "#{n}"
  end

  factory :user do
    email
    provider { 'github' }
    uid
  end
end
