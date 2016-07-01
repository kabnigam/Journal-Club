class Api::HighlightsController < ApplicationController
  def create
    @highlight = Highlight.new(highlight_params)
    @highlight.user_id = current_user.id
    if @highlight.save
      render :show
    else
      render json: @highlight.errors.full_messages, status: 422
    end
  end

  def destroy
    @highlight = Highlight.find(params[:id])
    @highlight.destroy
    render :index
  end

  def show
    @highlight = Highlight.find(params[:id])
  end

  def index
    @highlights = Highlight.find_by_article(highlight_params[:article_id])
  end

  private
  def article_params
    params.require(:highlight).permit(:start_index, :end_index, :article_id)
  end
end
