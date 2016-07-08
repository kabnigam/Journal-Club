json.username user.username
json.id user.id

json.groups user.groups

json.articles user.articles do |article|
  json.user article.user
  json.group article.group
  json.id article.id
  json.body article.body
  json.picture_url article.picture_url
  json.title article.title
end
