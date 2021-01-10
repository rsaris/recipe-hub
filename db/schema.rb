# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_01_10_050538) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "labels", force: :cascade do |t|
    t.string "text", null: false
    t.bigint "user_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id", "text"], name: "index_labels_on_user_id_and_text", unique: true
  end

  create_table "labels_recipes", id: false, force: :cascade do |t|
    t.bigint "label_id", null: false
    t.bigint "recipe_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["label_id", "recipe_id"], name: "index_labels_recipes_on_label_id_and_recipe_id", unique: true
    t.index ["recipe_id"], name: "index_labels_recipes_on_recipe_id"
  end

  create_table "recipes", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.text "content", null: false
    t.text "title", null: false
    t.text "yield"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_recipes_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.datetime "remember_created_at"
    t.string "provider", null: false
    t.string "uid", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "labels", "users"
  add_foreign_key "labels_recipes", "labels"
  add_foreign_key "labels_recipes", "recipes"
  add_foreign_key "recipes", "users"
end
