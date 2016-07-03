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
  },

  index(params, successCB) {
    $.ajax({
      url: 'api/users',
      data: {query: {search: params}},
      success(response) {
        successCB(response);
      }
    });
  }
};

module.exports = SessionApiUtil;
