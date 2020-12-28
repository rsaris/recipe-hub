# frozen_string_literal: true

module ApplicationHelper
  def dark_mode?
    !!(params[:dark_mode] || params[:dark])
  end
end
