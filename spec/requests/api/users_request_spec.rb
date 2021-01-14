# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Api::Users', type: :request do
  let(:user) { create(:user) }

  describe 'show' do
    shared_examples 'a user fetch method' do
      it 'returns the user' do
        sign_in(user)
        make_request
        expect(response).to have_http_status(:success)
        expect(JSON.parse(response.body)).to eql({
          data: {
            id: user.id.to_s,
            type: 'user',
            attributes: {
              email: user.email,
            },
          },
        }.as_json)
      end
    end

    describe 'current user' do
      def make_request
        get api_user_path(id: 'current')
      end

      include_examples 'a user fetch method'

      it 'throws a 404 if not signed in' do
        expect { make_request }.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

    describe 'by id' do
      def make_request
        get api_user_path(id: user.id)
      end

      include_examples 'a user fetch method'

      it 'does not allow nobodies' do
        make_request
        expect(response).to have_http_status(:unauthorized)
      end

      it 'does not allow another user' do
        sign_in(create(:user))
        make_request
        expect(response).to have_http_status(:unauthorized)
      end
    end
  end
end
