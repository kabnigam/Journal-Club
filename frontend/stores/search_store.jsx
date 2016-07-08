const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const ArticlesConstants = require('../constants/articles_constants');
const GroupsConstants = require('../constants/groups_constants');
const hashHistory = require('react-router').hashHistory;

const SearchStore = new Store(AppDispatcher);

let _users = {};
let _articles = {};
let _groups = {};

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
function _addGroups(groups) {
  if (groups.length > 0) {
    _resetGroups();
    groups.forEach(group => {
      _groups[group.id] = group;
    });
    SearchStore.__emitChange();
  } else {
    _resetGroups();
    SearchStore.__emitChange();
  }
}

function _addUser(user) {
  _users[user.id] = user;
  SearchStore.__emitChange();
}

function _resetGroups() {
  _groups = {};
}

function _resetUsers() {
  _users = {};
}
function _resetArticles() {
  _articles = {};
}

function _deleteUser(id) {

  delete _users[id];
  SearchStore.__emitChange();
}

SearchStore.reset = function() {
  _resetUsers();
  _resetArticles();
  _resetArticles();

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
SearchStore.all_groups = function() {
  let groups = [];
  Object.keys(_groups).forEach(id => {
    groups.push(_groups[id]);
  });

  return groups;
};

SearchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.RECEIVE_USER_RESULTS:
      _addUsers(payload.users);
      break;
    case ArticlesConstants.RECEIVED_ARTICLES_SEARCH:
      _addArticles(payload.articles);
      break;
    case GroupsConstants.RECEIVED_GROUPS_SEARCH:
      _addGroups(payload.groups);
      break;
    case SessionConstants.RECEIVE_USER:
      _addUser(payload.user);
      break;
    case 'DELETE_USER':
      _deleteUser(payload.id);
      break;
  }
};

module.exports = SearchStore;
