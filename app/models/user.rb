# frozen_string_literal: true

class User < ApplicationRecord
  devise :rememberable, :omniauthable, omniauth_providers: [:github, :google_oauth2]

  validates :email, presence: true, uniqueness: true
  validates :provider, presence: true
  validates :uid, presence: true, uniqueness: { scope: :provider }

  has_many :labels, dependent: :destroy
  has_many :recipes, dependent: :destroy
end
