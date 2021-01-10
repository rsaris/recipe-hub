# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    let(:user) { build_stubbed(:user) }

    it 'is valid by default' do
      expect(user.valid?).to be(true)
    end

    it 'requires an email' do
      user.email = nil
      expect(user.valid?).to be(false)
      expect(user.errors[:email]).not_to be_empty
    end

    it 'requires a provider' do
      user.provider = nil
      expect(user.valid?).to be(false)
      expect(user.errors[:provider]).not_to be_empty
    end

    it 'requires an uid' do
      user.uid = nil
      expect(user.valid?).to be(false)
      expect(user.errors[:uid]).not_to be_empty
    end

    context 'with existing user' do
      let!(:other_user) { create(:user) }

      it 'allows for the same provider' do
        user.provider = other_user.provider
        expect(user.valid?).to be(true)
      end

      it 'allows for the same uid' do
        user.uid = other_user.uid
        user.provider = "other #{other_user.provider}"
        expect(user.valid?).to be(true)
      end

      it 'requires a unique uid and provider pair' do
        user.provider = other_user.provider
        user.uid = other_user.uid
        expect(user.valid?).to be(false)
        expect(user.errors[:uid]).not_to be_empty
      end
    end
  end

  describe 'associations' do
    let(:user) { create(:user) }

    it 'deletes all linked recipes' do
      recipe = create(:recipe, user: user)
      user.destroy
      expect { recipe.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end

    it 'deletes all linked labels' do
      label = create(:label, user: user)
      user.destroy
      expect { label.reload }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
