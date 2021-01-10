# frozen_string_literal: true

class CreateLabels < ActiveRecord::Migration[6.0]
  def change
    create_table :labels do |t|
      t.string :text, null: false

      t.belongs_to :user, index: false, null: false, foreign_key: true

      t.index [:user_id, :text], unique: true

      t.timestamps
    end
  end
end
