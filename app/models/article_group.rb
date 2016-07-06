class ArticleGroup < ActiveRecord::Base
  validates :group_id, :article_id, presence: true

  belongs_to :group,
  primary_key: :id,
  foreign_key: :group_id,
  class_name: "Group"

  belongs_to :article,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: "Article"
end
