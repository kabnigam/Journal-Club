class CreateUserGroups < ActiveRecord::Migration
  def change
    create_table :user_groups do |t|
      t.integer :user_id, null: false
      t.integer :group_id, null: false
      t.timestamps null: false
    end
    add_index :user_groups, :user_id
    add_index :user_groups, :group_id
  end
end
