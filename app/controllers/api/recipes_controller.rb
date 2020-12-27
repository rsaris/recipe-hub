# frozen_string_literal: true

class Api::RecipesController < Api::BaseController
  def create
    recipe = Recipe.create!(recipe_params.merge(user: current_user))
    render_resource(recipe)
  end

  def index
    render_collection(Recipe.all)
  end

  def show
    render_resource(Recipe.find(params[:id]))
  end

  private

  def recipe_params
    params.require(:data).require(:attributes).permit(:title, :content)
  end
end
