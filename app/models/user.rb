class User < ApplicationRecord
  devise :rememberable, :omniauthable, omniauth_providers: [:github, :google_oauth2]

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }
end
