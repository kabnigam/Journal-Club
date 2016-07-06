class Api::CommentsController < ApplicationController
  def create
    @comment = Comment.new(comment_params)
    @comment.user_id = current_user.id
    if @comment.save
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  def show
    @comment = Comment.find(params[:id])
  end

  # def index
  #   if (params[:search]) {
  #     @comments = Comment.find_for_article(params[:search])
  #   end
  # end

  def destroy
    @comment = Comment.find(params[:id])
    @comment.destroy
  end

  def update
    @comment = Comment.find(params[:id])
    @comment.user_id = current_user.id
    if @comment.update(comment_params)
      render :show
    else
      render json: @comment.errors.full_messages, status: 422
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :article_id, :ratio)
  end

  def search_params
    params.require(:query).permit(:search)
  end
end
