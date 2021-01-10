# frozen_string_literal: true

class Label < ApplicationRecord
  belongs_to :user

  validates :text, presence: true, uniqueness: { scope: :user_id }

  def text=(text)
    super(format_text(text))
  end

  private

  def format_text(text)
    text&.downcase&.strip
  end
end
