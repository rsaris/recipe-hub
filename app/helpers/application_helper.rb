# frozen_string_literal: true

module ApplicationHelper
  def dark_mode?
    cookies[:theme] == 'dark'
  end
end
