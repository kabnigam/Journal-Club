const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const ArticlesConstants = require('../constants/articles_constants');
const CommentsConstants = require('../constants/comments_constants');
const hashHistory = require('react-router').hashHistory;


const ArticlesStore = new Store(AppDispatcher);

let _articles = {};

function _selectNewArticle() {
  ArticlesStore.__emitChange();
}

function _addArticle(article) {
  _articles[article.id] = article;
  ArticlesStore.__emitChange();
}

function _addArticles(articles) {
  articles.forEach(article => {
    _articles[article.id] = article;
  });
  ArticlesStore.__emitChange();
}

function _removeArticle(article) {
  delete _articles[article.id];
}

function _addComment(comment) {
  _articles[comment.article_id].comments.push(comment);
  ArticlesStore.__emitChange();
}

function _removeComment(comment) {
  _articles[comment.article_id].comments.splice(_articles[comment.article_id].comments.indexOf(comment), 1);
  ArticlesStore.__emitChange();
}

ArticlesStore.findCommentByReply = function(reply, user_id, article_id) {
  for (var i = 0; i < _articles[article_id].comments.length; i++) {
    let comment = _articles[article_id].comments[i];
    if (comment.body === reply && comment.user_id === user_id) {
      return comment;
    }
  }
},

ArticlesStore.all = function() {
  let articles = [];
  Object.keys(_articles).forEach(id => {
    articles.push(_articles[id]);
  });
  return articles;
};

ArticlesStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ArticlesConstants.RECEIVED_ARTICLE:
      _addArticle(payload.article);
      break;
    case ArticlesConstants.RECEIVED_ARTICLES:
      _addArticles(payload.articles);
      break;
    case ArticlesConstants.REMOVE_ARTICLE:
      _removeArticle(payload.article);
      break;
    case CommentsConstants.COMMENT_RECEIVED:
      _addComment(payload.comment);
      break;
    case CommentsConstants.COMMENT_REMOVED:
      _removeComment(payload.comment);
      break;
  }
};

ArticlesStore.find = function(id) {
  return _articles[id];
};

module.exports = ArticlesStore;
