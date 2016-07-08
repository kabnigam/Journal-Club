class Group < ActiveRecord::Base
  validates :name, presence: true

  has_many :UserGroupings,
  primary_key: :id,
  foreign_key: :group_id,
  class_name: "UserGroup"

  has_many :ArticleGroupings,
  primary_key: :id,
  foreign_key: :group_id,
  class_name: "ArticleGroup"

  has_many :users,
  through: :UserGroupings,
  source: :user

  has_many :articles,
  through: :ArticleGroupings,
  source: :article

  def self.search_for(params)
    if (params[:search].strip != '')
      query = '%' + params[:search] + '%'
      self.where("UPPER(name) LIKE UPPER(?)", query)
    end
  end
end
