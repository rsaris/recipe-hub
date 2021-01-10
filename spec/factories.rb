FactoryBot.define do
  sequence :email do |n|
    "user+#{n}@bobsaris.com"
  end
end
