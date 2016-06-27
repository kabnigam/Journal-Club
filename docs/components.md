## Component Hierarchy


* **App**
  * Home
    * Search
    * GroupIndex
        * GroupIndexItem  
    * ArticleIndex
        * ArticleIndexItem
    * GroupForm
  * **ArticlesIndex**
    * ArticleIndex
        * Article Index Item
    * UserIndex
        * UserIndexItem   
    * **ArticleIndexItem**
      * Highlights
      * Comments


## Routes

* **component:** `App` **path:** `/`
  * **component:** `Home` **path:** index
  * **component:** `GroupIndex` **path:** `groups/:groupId`
    * **component:** `ArticleIndexItem` **path:** `groups/:groupId/:articleId`
  * **component:** `UsersIndex` **path:** none
    * **component:** `UserIndexItem` **path:** `users/:userId`
