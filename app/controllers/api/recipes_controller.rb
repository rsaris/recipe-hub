# frozen_string_literal: true

class Api::RecipesController < Api::BaseController
  def create
    recipe = Recipe.create!(recipe_params.merge(user: current_user))
    render_resource(recipe)
  end

  def index
    render_collection(Recipe.order(:id).all)
  end

  def show
    render_resource(Recipe.find(params[:id]))
  end

  def update
    recipe = Recipe.find(params[:id])
    recipe.update!(recipe_params)
    render_resource(recipe)
  end

  private

  def recipe_params
    params.require(:data).require(:attributes).permit(:title, :content)
  end
end
