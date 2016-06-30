class Article < ActiveRecord::Base
  validates :user_id, :title, :body, presence: true

  belongs_to :user,
  primary_key: :id,
  foreign_key: :user_id,
  class_name: "User"

end
