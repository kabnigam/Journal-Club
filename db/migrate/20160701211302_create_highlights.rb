class CreateHighlights < ActiveRecord::Migration
  def change
    create_table :highlights do |t|
      t.integer :start_index, null: false
      t.integer :end_index, null: false
      t.integer :user_id, null: false
      t.integer :article_id, null: false

      t.timestamps null: false
    end
    add_index :highlights, :user_id
    add_index :highlights, :article_id
  end
end
