# frozen_string_literal: true

class StaticPagesController < ApplicationController
  before_action :redirect_if_signed_in, only: :root
  before_action :redirect_unless_signed_in, only: :app

  def app; end

  def root; end
end
