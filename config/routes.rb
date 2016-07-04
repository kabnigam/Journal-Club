Rails.application.routes.draw do
  root 'static_pages#root'
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show]
    resource :session, only: [:create, :destroy]
    resources :articles, only: [:create, :update, :show, :index, :destroy]
    resources :highlights, only: [:create, :show, :index, :destroy]
    resources :comments, only: [:create, :show, :index, :destroy, :update]
  end
end
