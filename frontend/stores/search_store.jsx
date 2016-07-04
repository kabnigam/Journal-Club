const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const ArticlesConstants = require('../constants/articles_constants');
const hashHistory = require('react-router').hashHistory;

const SearchStore = new Store(AppDispatcher);

let _users = {};
let _articles = {};

function _addUsers(users) {
  if (users.length > 0) {
    _resetUsers();
    users.forEach(user => {
      _users[user.id] = user;
    });
    SearchStore.__emitChange();
  } else {
    _resetUsers();
    SearchStore.__emitChange();
  }
}

function _addArticles(articles) {
  if (articles.length > 0) {
    _resetArticles();
    articles.forEach(article => {
      _articles[article.id] = article;
    });
    SearchStore.__emitChange();
  } else {
    _resetArticles();
    SearchStore.__emitChange();
  }
}

function _addUser(user) {
  _users[user.id] = user;
  SearchStore.__emitChange();
}

function _resetUsers() {
  _users = {};
}
function _resetArticles() {
  _articles = {};
}

SearchStore.reset = function() {
  _resetUsers();
  _resetArticles();
  SearchStore.__emitChange();
},
SearchStore.find_user = function(id) {
  return _users[id];
},
SearchStore.all_users = function() {
  let users = [];
  Object.keys(_users).forEach(id => {
    users.push(_users[id]);
  });

  return users;
};
SearchStore.all_articles = function() {
  let articles = [];
  Object.keys(_articles).forEach(id => {
    articles.push(_articles[id]);
  });

  return articles;
};

SearchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.RECEIVE_USER_RESULTS:
      _addUsers(payload.users);
      break;
    case ArticlesConstants.RECEIVED_ARTICLES_SEARCH:
      _addArticles(payload.articles);
      break;
    case SessionConstants.RECEIVE_USER:
      _addUser(payload.user);
      break;
  }
};

module.exports = SearchStore;
