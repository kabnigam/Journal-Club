# Schema Information

## Articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id          | integer   | not null, foreign_key
title       | string   | not null
body       | string   | not null
picture_url       | string   |


## Groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null


## Users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
email        | string    | not null
username        | string    | not null
password_digest        | string    | not null
session_token        | string    | not null



## User-Group Join Table 
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key
group_id    | integer   | not null, foreign key

## Article-Group Join Table
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article_id     | integer   | not null, foreign key
group_id    | integer   | not null, foreign key

## Highlights
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article_id   | integer   | not null, foreign key
user_id   | integer   | not null, foreign key
start_idx   | integer   | not null
end_idx   | integer   | not null



## Comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id        | integer    | not null, indexed
article_id        | integer    | not null, indexed
body | text    | not null
ratio  | float    | not null
