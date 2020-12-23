# frozen_string_literal: true

class Recipe < ApplicationRecord
  belongs_to :user

  validates :content, presence: true
  validates :title, presence: true
end
