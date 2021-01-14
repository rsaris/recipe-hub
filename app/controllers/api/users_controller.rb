# frozen_string_literal: true

class Api::UsersController < Api::BaseController
  def show
    authorize(user)
    render_resource(user)
  end

  private

  def user
    @user ||=
      if params[:id] == 'current'
        raise ActiveRecord::RecordNotFound if current_user.nil? # 404 if we are not signed in
        current_user
      else
        User.find(params[:id])
      end
  end
end
