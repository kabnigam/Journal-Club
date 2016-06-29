const AppDispatcher = require('../dispatcher/dispatcher');
const SessionApiUtil = require('../util/session_api_util');
const SessionStore = require('../stores/session_store');
const SessionConstants = require('../constants/session_constants');
const ErrorsActions = require('../actions/errors_actions');
const hashHistory = require('react-router').hashHistory;

const SessionActions = {
  signup(user) {
    SessionApiUtil.signup(user, this.receiveCurrentUser, ErrorsActions.setErrors.bind(null, 'signup_form'));
  },
  login(user) {
    SessionApiUtil.login(user, this.receiveCurrentUser, ErrorsActions.setErrors.bind(null, 'login_form'));
  },
  logout() {
    SessionApiUtil.logout(this.removeCurrentUser);
  },
  receiveCurrentUser(user) {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },
  removeCurrentUser() {
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT
    });
    hashHistory.push("/login");
  }
};


module.exports = SessionActions;
