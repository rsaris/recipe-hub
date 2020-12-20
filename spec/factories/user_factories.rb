FactoryBot.define do
  factory :user do
    email
    provider { 'github' }
    uid
  end
end
