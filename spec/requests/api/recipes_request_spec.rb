# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Recipes', type: :request do
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

  describe 'create' do
    def post_create(attributes)
      post api_recipes_path(data: { attributes: attributes })
    end

    context 'with signed in user' do
      before :each do
        sign_in(create(:user))
      end

      it 'creates a new recipe' do
        expect { post_create(title: 'New title', content: 'New content') }
          .to(change(Recipe, :count).from(0).to(1))
        recipe = Recipe.last
        expect(recipe.title).to eql('New title')
        expect(recipe.content).to eql('New content')
      end
    end
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

  describe 'update' do
    let(:recipe) { create(:recipe) }

    def patch_update(updates = {})
      patch api_recipe_path(
        id: recipe.id,
        data: { attributes: updates },
      )
    end

    it 'updates a recipes content' do
      expect { patch_update(content: 'New content') }
        .to change { recipe.reload.content }.to('New content')
    end

    it 'updates a recipes title' do
      expect { patch_update(title: 'New title') }
        .to change { recipe.reload.title }.to('New title')
    end
  end
end
