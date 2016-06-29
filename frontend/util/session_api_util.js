const SessionApiUtil = {
  signup(data, successCB, errorCB) {
    $.ajax({
      url: 'api/users',
      method: 'POST',
      data: {user: data},
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },

  login(data, successCB, errorCB) {
    $.ajax({
      url: 'api/session',
      method: 'POST',
      data: {user: data},
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },

  logout(successCB) {
    $.ajax({
      url: 'api/session',
      method: 'DELETE',
      success(response) {
        successCB(response);
      }
    });
  }
};

module.exports = SessionApiUtil;
