class User < ApplicationRecord
  devise :rememberable, :omniauthable, omniauth_providers: [:github]

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
end
