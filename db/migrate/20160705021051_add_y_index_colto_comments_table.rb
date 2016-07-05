class AddYIndexColtoCommentsTable < ActiveRecord::Migration
  def change
    add_column :comments, :y_index, :integer
  end
end
