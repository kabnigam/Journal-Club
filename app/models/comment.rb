class Comment < ActiveRecord::Base
  validates :body, :user_id, :article_id, presence: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: 'User'

  belongs_to :article,
  primary_key: :id,
  foreign_key: :article_id,
  class_name: 'Article'

  def self.find_for_article(id)
    self.where('id = ?', id)
  end
end
