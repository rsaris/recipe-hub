# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'StaticPages', type: :request do
  let(:user) { create(:user) }

  describe 'app' do
    it 'redirects to root if not signed in' do
      get recipes_path
      expect(response).to redirect_to(root_path)
    end

    context 'when signed in' do
      before do
        sign_in(user)
      end

      describe 'paths' do
        after do
          expect(response).to render_template('app')
        end

        it 'renders app layout for the recipes path' do
          get recipes_path
        end

        it 'renders app layout for the show recipe path' do
          get '/recipes/19'
        end

        it 'renders app layout for the edit recipe path' do
          get '/recipes/19/edit'
        end

        it 'renders app layout for foo path' do
          get '/foo'
        end
      end
    end
  end

  describe 'root' do
    it 'redirects to app if signed in' do
      sign_in(user)
      get root_path
      expect(response).to redirect_to(recipes_path)
    end

    it 'renders the root view for the root path' do
      get root_path
      expect(response).to render_template('root')
    end
  end
end
