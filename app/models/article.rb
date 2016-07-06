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

  has_one :ArticleGrouping,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: "ArticleGroup"

  has_one :group,
  through: :ArticleGrouping,
  source: :group

  has_many :users,
  through: :group,
  source: :users

  def self.search_for(params)
    query = params[:search] + '%'
    self.where("UPPER(title) LIKE UPPER(?)", query)
  end

end
