# frozen_string_literal: true

class Api::RecipesController < Api::BaseController
  def index
    render_collection(Recipe.all)
  end

  def show
    render_resource(Recipe.find(params[:id]))
  end
end
