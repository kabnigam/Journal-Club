class RemoveGroupColFromArticles < ActiveRecord::Migration
  def change
    remove_column :articles, :group_id
  end
end
