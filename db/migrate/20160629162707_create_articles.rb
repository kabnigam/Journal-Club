class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.integer :user_id, null: false
      t.string :title, null: false
      t.text :body, null: false
      t.string :source
      t.timestamps null: false
    end
    add_index :articles, [:user_id], name: "index_stories_on_author_id"
  end
end
