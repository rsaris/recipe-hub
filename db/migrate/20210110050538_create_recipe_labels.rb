# frozen_string_literal: true

class CreateRecipeLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :labels_recipes, id: false do |t|
      t.belongs_to :label, index: false, foreign_key: true, null: false
      t.belongs_to :recipe, index: true, foreign_key: true, null: false
      t.timestamps

      t.index [:label_id, :recipe_id], unique: true
    end
  end
end
