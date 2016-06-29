const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const SessionConstants = require('../constants/session_constants');
const hashHistory = require('react-router').hashHistory;


const SessionStore = new Store(AppDispatcher);

let _currentUser = {};

function _login(user) {
  _currentUser = user;
  SessionStore.__emitChange();
}

function _logout() {
  _currentUser = {};
  SessionStore.__emitChange();
}

SessionStore.currentUser = function() {
  return _currentUser;
};

SessionStore.isUserLoggedIn = function() {
  if (_currentUser.id) {
    return true;
  }
  return false;
};

SessionStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      break;
    case SessionConstants.LOGOUT:
      _logout();
      break;
  }
};

module.exports = SessionStore;
