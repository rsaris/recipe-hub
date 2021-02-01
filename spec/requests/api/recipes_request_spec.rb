# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Recipes', type: :request do
  let(:user) { create(:user) }

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

  shared_examples 'an authorized action' do
    it 'does not allow nobodies' do
      make_request
      expect(response).to have_http_status(:unauthorized)
    end

    it 'does not allow non-owners' do
      sign_in(create(:user))
      make_request
      expect(response).to have_http_status(:unauthorized)
    end

    it 'allows the recipe owner' do
      sign_in(recipe.user)
      make_request
      expect(response).to have_http_status(:success)
    end
  end

  describe 'create' do
    def make_request(attributes = { content: 'content', title: 'title' })
      post api_recipes_path(data: { attributes: attributes })
    end

    context 'when authorized' do
      before :each do
        sign_in(user)
      end

      it 'creates a new recipe' do
        expect { make_request(title: 'New title', content: 'New content') }
          .to(change(Recipe, :count).from(0).to(1))
        recipe = Recipe.last
        expect(recipe.title).to eql('New title')
        expect(recipe.content).to eql('New content')
        expect(recipe.user_id).to eql(user.id)
      end
    end
  end

  describe 'index' do
    def make_request(params = {})
      get api_recipes_path(params)
    end

    context 'when authorized' do
      before do
        sign_in(user)
      end

      it 'returns nothing if there are no recipes' do
        make_request
        expect(JSON.parse(response.body)).to match_array([])
      end

      it 'returns a recipes owned by a user' do
        recipes = [create(:recipe, user: user), create(:recipe, user: user)]
        create(:recipe)
        make_request
        expect(response.body).to eql({ data: recipes.map { |r| serialized_recipe(r) } }.to_json)
      end

      it 'finds matching recipes when searching' do
        recipe = create(:recipe, user: user, title: 'foo')
        create(:recipe, user: user, title: 'bar')
        make_request(search: 'foo')
        expect(response.body).to eql({ data: [serialized_recipe(recipe)] }.to_json)
      end
    end
  end

  describe 'show' do
    let(:recipe) { create(:recipe, user: user) }

    def make_request(params = {})
      get api_recipe_path(params.merge!(id: recipe.id))
    end

    context 'when authorized as the owner' do
      before do
        sign_in(user)
      end

      it 'returns a existing recipe' do
        make_request
        expect(response.body).to eql({ data: serialized_recipe(recipe) }.to_json)
      end

      it 'returns permissions in meta when asked' do
        make_request(include_permissions: true)
        expect(JSON.parse(response.body)['meta']).to eql({
          permissions: {
            recipe.id.to_s => {
              destroy: true,
              edit: true,
              show: true,
            },
          },
        }.as_json)
      end
    end

    context 'when authorized as another user' do
      before do
        sign_in(create(:user))
      end

      it 'returns a existing recipe' do
        make_request
        expect(response.body).to eql({ data: serialized_recipe(recipe) }.to_json)
      end

      it 'returns permissions in meta when asked' do
        make_request(include_permissions: true)
        expect(JSON.parse(response.body)['meta']).to eql({
          permissions: {
            recipe.id.to_s => {
              destroy: false,
              edit: false,
              show: true,
            },
          },
        }.as_json)
      end
    end
  end

  describe 'update' do
    let(:recipe) { create(:recipe, user: user) }

    def make_request(updates = { content: recipe.content })
      patch api_recipe_path(
        id: recipe.id,
        data: { attributes: updates },
      )
    end

    include_examples 'an authorized action'

    context 'when authorized' do
      before do
        sign_in(user)
      end

      it 'updates a recipes content' do
        expect { make_request(content: 'New content') }
          .to change { recipe.reload.content }.to('New content')
      end

      it 'updates a recipes title' do
        expect { make_request(title: 'New title') }
          .to change { recipe.reload.title }.to('New title')
      end
    end
  end

  describe 'destroy' do
    let(:recipe) { create(:recipe, user: user) }

    def make_request
      delete api_recipe_path(id: recipe.id)
    end

    include_examples 'an authorized action'

    context 'when authorized' do
      before do
        sign_in(user)
        recipe # Ensure recipe is created
      end

      it 'deletes a recipe' do
        expect { make_request }.to change { Recipe.count }.from(1).to(0)
      end
    end
  end
end
