
class Api::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def index
    @users = search_params[:search].strip.length == 0 ? [] : User.search_for(search_params)
    render :index
  end

  def show
    @user = User.find_by_id(params[:id])
  end



  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end

  def search_params
    params.require(:query).permit(:search)
  end
end
