# frozen_string_literal: true

class Api::RecipesController < Api::BaseController
  def create
    authorize(Recipe)

    recipe = Recipe.create!(recipe_params.merge(user: current_user))
    render_resource(recipe)
  end

  def index
    authorize(Recipe)

    recipe_scope =
      if params[:search].present?
        Recipe.by_title_search(params[:search])
      else
        Recipe.order(:id)
      end

    render_collection(policy_scope(recipe_scope))
  end

  def show
    authorize(recipe)

    render_resource(recipe)
  end

  def update
    authorize(recipe)

    recipe.update!(recipe_params)
    render_resource(recipe)
  end

  def destroy
    authorize(recipe)

    recipe.destroy
    head :no_content
  end

  private

  def recipe
    @recipe ||= Recipe.find(params[:id])
  end

  def recipe_params
    params.require(:data).require(:attributes).permit(:title, :content)
  end
end
