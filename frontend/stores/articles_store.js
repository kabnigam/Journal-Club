const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const ArticlesConstants = require('../constants/articles_constants');
const hashHistory = require('react-router').hashHistory;

const ArticlesStore = new Store(AppDispatcher);

let _articles = {};

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
  }
};

ArticlesStore.find = function(id) {
  return _articles[id];
};

module.exports = ArticlesStore;



module.exports = ArticlesStore;
