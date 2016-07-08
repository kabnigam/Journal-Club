json.id group.id
json.name group.name


json.articles group.articles do |article|
  json.user article.user
  json.group article.group
  json.id article.id
  json.body article.body
  json.picture_url article.picture_url
  json.title article.title
end

json.users group.users do |user|
  json.username user.username
  json.user_id user.id
end
