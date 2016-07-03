const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;

const SearchStore = new Store(AppDispatcher);

let _users = {};

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

function _resetUsers() {
  _users = {};
}

SearchStore.all_users = function() {
  let users = [];
  Object.keys(_users).forEach(id => {
    users.push(_users[id]);
  });

  return users;
};

SearchStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.RECEIVE_USER_RESULTS:
      _addUsers(payload.users);
      break;

  }
};

module.exports = SearchStore;
