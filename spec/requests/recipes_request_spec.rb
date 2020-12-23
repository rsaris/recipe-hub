# frozen_string_literal: true

require 'rails_helper'

RSpec.describe "Recipes", type: :request do
  def serialized_recipe(recipe)
    {
      id: recipe.id.to_s,
      type: 'recipe',
      attributes: {
        title: recipe.title,
        content: recipe.content,
        yield: recipe.yield,
      },
    }
  end

  describe 'index' do
    def get_index
      get api_recipes_path
    end

    it 'returns nothing if there are no recipes' do
      get_index
      expect(JSON.parse(response.body)).to match_array([])
    end

    it 'returns an existing recipe' do
      recipe = create(:recipe)
      get_index
      expect(response.body).to eql({ data: [serialized_recipe(recipe)] }.to_json)
    end
  end

  describe 'show' do
    let(:recipe) { create(:recipe) }

    def get_show
      get api_recipe_path(id: recipe.id)
    end

    it 'returns a existing recipe' do
      get_show
      expect(response.body).to eql({ data: serialized_recipe(recipe) }.to_json)
    end
  end
end
