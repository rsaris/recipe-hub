# frozen_string_literal: true

class RecipePolicy < ApplicationPolicy
  def index?
    user.present?
  end

  def create?
    user.present?
  end

  def show?
    user.present?
  end

  def update?
    belongs_to_user?
  end

  def destroy?
    belongs_to_user?
  end

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      scope.where(user_id: user.id)
    end
  end

  private

  def belongs_to_user?
    return false if user.nil?

    record.user_id == user.id
  end
end
