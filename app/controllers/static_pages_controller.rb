# frozen_string_literal: true

class StaticPagesController < ApplicationController
  before_action :redirect_if_signed_in

  def root; end
end
