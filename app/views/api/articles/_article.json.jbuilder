json.extract! article, :title, :body, :source, :user, :id, :picture_url
# json.comments article.comments
json.group article.group
json.users article.users
json.comments article.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.article_id comment.article_id
  json.user_id comment.user_id
  json.username comment.user.username
  json.ratio comment.ratio
end
