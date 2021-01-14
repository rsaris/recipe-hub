# frozen_string_literal: true

class Api::SessionsController < Devise::SessionsController
  def destroy
    super
    head :no_content
  end
end
