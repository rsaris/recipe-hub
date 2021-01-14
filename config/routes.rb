Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  root 'static_pages#root'

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth' }

  namespace :api, defaults: { format: :json } do
    resources :recipes, only: [:create, :destroy, :index, :show, :update]
    resources :users, only: [:show]

    devise_scope :user do
      resource :session, only: [:destroy]
    end
  end

  get '*path', to: 'static_pages#app', format: :html
  get 'recipes', to: 'static_pages#app', format: :html, as: :recipes
end
