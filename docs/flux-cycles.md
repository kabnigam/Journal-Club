# Flux Cycles
## Article Cycles
### Article API Request Actions
* `fetchAllArticles`
  0. invoked from `ArticlesIndex` `didMount`/`willReceiveProps`
  0. `GET /api/articles` is called.
  0. `receiveAllArticles` is set as the callback.
* `addArticle`
  0. invoked from add article button `onClick`
  0. `POST /api/groups/articles` is called.
  0. `receiveSingleArticle` is set as the callback.
* `fetchSingleArticle`
  0. invoked from `ArticleIndexItem` `didMount`/`willReceiveProps`
  0. `GET /api/groups/:groupid/:articleid` is called.
  0. `receiveSingleArticle` is set as the callback.
* `destroyArticle`
  0. invoked from delete article button `onClick`
  0. `DELETE /api/groups/:groupid/:articleid` is called.
  0. `removeArticle` is set as the callback.

### Article API Response Actions

* `receiveAllArticles`
  0. invoked from an API callback.
  0. `Article` store updates `_articles` and emits change.

* `receiveSingleArticle`
  0. invoked from an API callback.
  0. `Artilce` store updates `_articles[id]` and emits change.

* `removeNote`
  0. invoked from an API callback.
  0. `Article` store removes `_articles[id]` and emits change.

### Store Listeners

* `ArticleIndex` component listens to `Article` store.
* `ArticleDetail` component listens to `Article` store.

## Group Cycles

### Group API Request Actions

* `fetchAllGroups`
  0. invoked from `GroupsIndex` `didMount`/`willReceiveProps`
  0. `GET /api/groups` is called.
  0. `receiveAllGroups` is set as the callback.

* `createGroup`
  0. invoked from new group button `onClick`
  0. `POST /api/groups` is called.
  0. `receiveSingleGroup` is set as the callback.

* `fetchSingleGroup`
  0. invoked from `GroupDetail` `didMount`/`willReceiveProps`
  0. `GET /api/groups/:groupid` is called.
  0. `receiveSingleGroup` is set as the callback.

* `destroyGroup`
  0. invoked from delete group button `onClick`
  0. `DELETE /api/groups/:groupid` is called.
  0. `removeGroup` is set as the callback.

### Group API Response Actions

* `receiveAllGroups`
  0. invoked from an API callback.
  0. `Group` store updates `_groups` and emits change.

* `receiveSingleGroup`
  0. invoked from an API callback.
  0. `Group` store updates `_groups[id]` and emits change.

* `removeGroup`
  0. invoked from an API callback.
  0. `Group` store removes `_groups[id]` and emits change.

### Store Listeners

* `GroupsIndex` component listens to `Group` store.

## User Cycles

### User API Request Actions

* `fetchAllUsers`
  0. invoked from `UsersIndex` `didMount`/`willReceiveProps`
  0. `GET /api/groups/users` is called.
  0. `receiveAllUsers` is set as the callback.

* `createUser`
  0. invoked from new user button `onClick`
  0. `POST /api/users` is called.
  0. `receiveSingleUser` is set as the callback.

* `fetchSingleUser`
  0. invoked from `UserDetail` `didMount`/`willReceiveProps`
  0. `GET /api/users/:userid` is called.
  0. `receiveSingleUser` is set as the callback.

* `destroyUser`
  0. invoked from delete accout button `onClick`
  0. `DELETE /api/users/:userid` is called.
  0. `removeUser is set as the callback.

### User API Response Actions

* `receiveAllUsers`
  0. invoked from an API callback.
  0. `User` store updates `_users` and emits change.

* `receiveSingleUser`
  0. invoked from an API callback.
  0. `User` store updates `_users[id]` and emits change.

* `removeUser`
  0. invoked from an API callback.
  0. `User` store removes `_users[id]` and emits change.

### Store Listeners

* `UsersIndex` component listens to `User` store.

## SearchSuggestion Cycles

* `fetchSearchSuggestions`
  0. invoked from `SearchBar` `onChange` when there is text
  0. `GET /api/groups`, `GET /api/users`, is called with `text` param.
  0. `receiveSearchSuggestions` is set as the callback.

* `receiveSearchSuggestions`
  0. invoked from an API callback.
  0. `SearchSuggestion` store updates `_suggestions` and emits change.

* `removeSearchSuggestions`
  0. invoked from `SearchBar` `onChange` when empty
  0. `SearchSuggestion` store resets `_suggestions` and emits change.

### Store Listeners

* `SearchBarSuggestions` component listens to `SearchSuggestion` store.
