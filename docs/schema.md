# Schema Information

## Articles
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article       | string?   | ? references url or location of upload
group_id | integer   | not null, foreign key (references group), indexed

## Groups
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
description | string    |

## users
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
password_digest        | string    | not null
session_token        | string    | not null
interests   | text      |
description | text      |


## user-group join table
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key
group_id    | integer   | not null, foreign key

## highlights
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
article_id   | integer   | not null, foreign key
article_location      | ?   | not null

## highlight-user join table
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
highlight_id   | integer   | not null, foreign key
user_id      | integer   | not null, foreign key

## comments
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
user_id        | integer    | not null, indexed
content | string    | not null
article_location   | ?    | not null
