json.extract! article, :title, :body, :source, :user, :id, :picture_url
json.comments article.comments
json.group article.group
json.users article.users
# json.comments article.comments do |comment|
#   json.parital! 'api/comments/comment', comment: comment
# end
