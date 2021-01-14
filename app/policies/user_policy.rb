# frozen_string_literal: true

class UserPolicy < ApplicationPolicy
  def destroy?
    false
  end

  def edit?
    user && user.id == record.id
  end

  def show?
    user && user.id == record.id
  end
end
