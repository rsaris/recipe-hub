# frozen_string_literal: true

class Recipe < ApplicationRecord
  belongs_to :user

  validates :content, presence: true
  validates :title, presence: true

  scope :by_title_search, ->(search) do
    query_string = sanitize_sql_array([
      'plainto_tsquery(?)',
      search,
    ])

    where("to_tsvector(title) @@ #{query_string}")
      .order(Arel.sql("ts_rank(to_tsvector(title), #{query_string})"))
  end
end
