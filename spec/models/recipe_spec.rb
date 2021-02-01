# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Recipe, type: :model do
  describe 'validation' do
    let(:recipe) { build_stubbed(:recipe) }

    it 'has a valid factory' do
      expect(recipe.valid?).to be(true)
    end

    it 'requires a user' do
      recipe.user = nil
      expect(recipe.valid?).to be(false)
      expect(recipe.errors[:user]).not_to be_empty
    end

    it 'requires a title' do
      recipe.title = nil
      expect(recipe.valid?).to be(false)
      expect(recipe.errors[:title]).not_to be_empty
    end

    it 'requires content' do
      recipe.content = nil
      expect(recipe.valid?).to be(false)
      expect(recipe.errors[:content]).not_to be_empty
    end

    it 'does not require a yield' do
      recipe.yield = nil
      expect(recipe.valid?).to be(true)
    end
  end

  describe 'by_title_search' do
    let!(:foo_recipe) { create(:recipe, title: 'foo') }
    let!(:foo_bar_recipe) { create(:recipe, title: 'foo bar') }
    let!(:bar_recipe) { create(:recipe, title: 'bar') }

    it 'returns a matching recipe' do
      expect(described_class.by_title_search('foo'))
        .to match_array([foo_recipe, foo_bar_recipe])
    end
  end
end
