class AddRatiocolumn < ActiveRecord::Migration
  def change
    remove_column :comments, :y_index
    add_column :comments, :ratio, :float
  end
end
