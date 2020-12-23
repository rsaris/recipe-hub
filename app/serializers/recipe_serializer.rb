# frozen_string_literal: true

class RecipeSerializer < ApplicationSerializer
  attribute :title, :content, :yield
end
