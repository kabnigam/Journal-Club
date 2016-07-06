class CreateArticleGroups < ActiveRecord::Migration
  def change
    create_table :article_groups do |t|
      t.integer :article_id, null: false
      t.integer :group_id, null: false
      t.timestamps null: false
    end
    add_index :article_groups, :article_id
    add_index :article_groups, :group_id
  end
end
