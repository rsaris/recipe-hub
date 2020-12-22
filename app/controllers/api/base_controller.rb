# frozen_string_literal: true

class Api::BaseController < ApplicationController
  protected

  def render_collection(
    resources,
    serializer: default_serializer_for(resources.first)
  )
    if resources.empty?
      return render json: []
    end

    render json: serializer.new(resources, is_collection: true).serializable_hash
  end

  def render_resource(
    resource,
    serializer: default_serializer_for(resource)
  )
    render json: serializer.new(resource).serializable_hash
  end

  private

  def default_serializer_for(model)
    return nil unless model.present?

    klass_name = model.model_name.to_s.safe_constantize
    "#{klass_name}Serializer".constantize
  end
end
