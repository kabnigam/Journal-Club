class Article < ActiveRecord::Base
  validates :user_id, :title, :body, presence: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"

  has_many :highlights,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: 'Highlight'

  has_many :comments,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: 'Comment'

  has_many :ArticleGroupings,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: "ArticleGroup"

  has_many :groups,
  through: :ArticleGroupings,
  source: :group

  def self.search_for(params)
    query = params[:search] + '%'
    self.where("UPPER(title) LIKE UPPER(?)", query)
  end

end
