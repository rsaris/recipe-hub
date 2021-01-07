# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include AuthConcern
  include Pundit

  # Render unauthorized when Pundit explodes
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  protect_from_forgery with: :exception

  private

  def user_not_authorized
    head :unauthorized
  end
end
