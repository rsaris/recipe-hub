# frozen_string_literal: true

class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.belongs_to :user, null: false, index: true, foreign_key: true
      t.text :content, null: false
      t.text :title, null: false
      t.text :yield

      t.timestamps
    end
  end
end
