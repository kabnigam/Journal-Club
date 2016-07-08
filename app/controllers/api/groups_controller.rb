class Api::GroupsController < ApplicationController
  def create
    @group = Group.new({name: group_params[:name]})
    if @group.save
      group_params[:users].each do |id|
        @group.UserGroupings.create(user_id: id)
      end
      @group.UserGroupings.create(user_id: current_user.id)
      render :show
    else
      render json: @group.errors.full_messages, status: 422
    end
  end

  def update
    @group = Group.find(params[:id])
    if group_params[:user]
      @group.UserGroupings.create(user_id: group_params[:user])
      render :show
    end
  end

  def index
    if (group_params[:search])
      @groups = Group.search_for(group_params)
    else
      @groups = Group.all
    end
  end

  def destroy
    @group = Group.find(params[:id])
    @group.destroy
    render :show
  end

  def show
    @group = Group.find(params[:id])
  end

  private
  def group_params
    params.require(:group)
  end
end
