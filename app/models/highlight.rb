class Highlight < ActiveRecord::Base
  validates :start_index, :end_index, :user_id, :article_id, presence: true
  validates :user_id, uniqueness: { scope: [:start_index, :end_index, :article_id] }

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"

  belongs_to :article,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: "Article"

  def self.find_by_article(article_id)
    self.where("article_id = ?", article_id)
  end
end
