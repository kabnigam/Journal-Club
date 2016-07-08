
class Api::ArticlesController < ApplicationController
  def show
    @article = Article.includes(:comments, comments: [:user]).find_by_id(params[:id])
    # @article = Article.find(params[:id])
  end

  def create
    @article = Article.new(article_params.except!(:group_id))
    @article.user_id = current_user.id
    if @article.save
      @article.create_ArticleGrouping(group_id: article_params[:group_id]) if article_params[:group_id]
      render :show
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def update
    @article = Article.find(params[:id])
    @article.user_id = current_user.id
    if @article.update(article_params)
      render :show
    else
      render json: @article.errors.full_messages, status: 422
    end
  end

  def index
    if (search_params[:search] != 'false')
      @articles = search_params[:search].strip.length == 0 ? [] : Article.search_for(search_params)
    else
      @articles = Article.all
    end
  end

  def destroy
    @article = Article.find(params[:id])
    @article.destroy
    render :show
  end

  private

  def article_params
    params.require(:article).permit(:title, :body, :source, :picture_url, :group_id)
  end

  def search_params
    params.require(:query).permit(:search)
  end
end
