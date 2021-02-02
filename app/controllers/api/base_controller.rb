# frozen_string_literal: true

class Api::BaseController < ApplicationController
  after_action :verify_authorized

  protected

  def render_collection(
    resources,
    serializer: default_serializer_for(resources.first)
  )
    if resources.empty?
      return render json: { data: [] }
    end

    render json: serializer.new(resources, is_collection: true).serializable_hash
  end

  def render_resource(
    resource,
    serializer: default_serializer_for(resource)
  )
    render json: serializer.new(resource, meta: default_meta(resource)).serializable_hash
  end

  private

  def default_meta(model)
    @default_meta = {}

    if params[:include_permissions]
      @default_meta[:permissions] = { model.id.to_s => permissions_meta(model) }
    end

    @default_meta
  end

  def default_serializer_for(model)
    return nil unless model.present?

    klass_name = model.model_name.to_s.safe_constantize
    "#{klass_name}Serializer".constantize
  end

  def permissions_meta(model)
    return nil unless model.present?

    model_policy = policy(model)

    {
      destroy: model_policy.destroy?,
      edit: model_policy.edit?,
      show: model_policy.show?,
    }
  end
end
