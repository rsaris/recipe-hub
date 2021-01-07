module AuthConcern
  include ActiveSupport::Concern

  def after_sign_in_path_for(_)
    recipes_path
  end

  def redirect_if_signed_in
    return unless signed_in?
    redirect_to recipes_path
  end

  def redirect_unless_signed_in
    return if signed_in?
    redirect_to root_path
  end
end
