# frozen_string_literal: true

class Recipe < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :labels

  validates :content, presence: true
  validates :title, presence: true
end
