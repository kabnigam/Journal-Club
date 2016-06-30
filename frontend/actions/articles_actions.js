const AppDispatcher = require('../dispatcher/dispatcher');
const ArticlesApiUtil = require('../util/articles_api_util');
const ArticlesConstants = require('../constants/articles_constants');

const ArticlesActions = {
  createArticle(article) {
    ArticlesApiUtil.create(article, this.receiveArticle, error);
  },
  updateArticle(article) {
    ArticlesApiUtil.update(article, this.receiveArticle, error);
  },
  fetchArticle(id) {
    ArticlesApiUtil.show(id, this.receiveArticle, error);
  },
  fetchArticles() {
    ArticlesApiUtil.index(this.receiveArticles, error);
  },
  receiveArticle(article) {
    AppDispatcher.dispatch({
      actionType: ArticlesConstants.RECEIVED_ARTICLE,
      article: article
    });
  },
  receiveArticles(articles) {
    AppDispatcher.dispatch({
      actionType: ArticlesConstants.RECEIVED_ARTICLES,
      articles: articles
    });
  }
};

let error = function(a) {alert('!');};

module.exports = ArticlesActions;
