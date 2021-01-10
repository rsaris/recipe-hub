# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Label, type: :model do
  describe 'validations' do
    subject { build_stubbed(:label) }

    it 'has a valid factory' do
      expect(subject).to be_valid
    end

    it 'requires a user' do
      subject.user = nil
      expect(subject).not_to be_valid
    end

    it 'requires text' do
      subject.text = nil
      expect(subject).not_to be_valid
    end

    it 'requires unique text for a single user' do
      other_label = create(:label)
      subject.text = other_label.text
      subject.user = other_label.user
      expect(subject).not_to be_valid
    end

    it 'does not require unique text between users' do
      subject.text = create(:label).text
      expect(subject).to be_valid
    end
  end

  describe 'associations' do
    subject { create(:label) }

    it 'can add a recipe' do
      subject.recipes << create(:recipe, user: subject.user)
    end
  end

  describe 'text=' do
    subject { build_stubbed(:label) }

    it 'does not blow up on nil' do
      subject.text = nil
      expect(subject.text).to eql(nil)
    end

    it 'lower cases text' do
      subject.text = 'UPPERCASE'
      expect(subject.text).to eql('uppercase')
    end

    it 'strips whitespace on text' do
      subject.text = '  hi there  '
      expect(subject.text).to eql('hi there')
    end
  end
end
