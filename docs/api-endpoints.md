# API Endpoints

## HTML API

### Root

- `GET /` - loads React spalsh page

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Articles
- `GET /api/groups/:groupid/:articleid`
- `PATCH /api/groups/:groupid/:articleid`
- `DELETE /api/groups/:groupid/:articleid`

### Groups

- `GET /api/groups`
    - index of all groups for search purposes
- `POST /api/groups`
- `GET /api/groups/:groupid`
- `PATCH /api/groups/:groupid`
- `DELETE /api/groups/:groupid`
- `GET /api/groups/:groupid/articles`
  - index of all articles for a group

### Users
- `GET /api/users`
    - index of all users for search purposes  
- A groups's users will be included in the group show template
- `GET /api/groups/:groupid/users`
- `POST /api/groups/:groupid/users`: add user to group
- `DELETE /api/groups/:groupid/users/:userid`: remove user from group
