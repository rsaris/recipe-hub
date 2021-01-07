# frozen_string_literal: true

class RecipesController < ApplicationController
  before_action :redirect_unless_signed_in

  def index; end
end
