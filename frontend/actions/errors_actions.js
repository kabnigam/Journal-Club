const AppDispatcher = require('../dispatcher/dispatcher');
const SessionApiUtil = require('../util/session_api_util');
const ErrorsStore = require('../stores/errors_store');
const ErrorsConstants = require('../constants/errors_constants');

const ErrorsActions = {
  setErrors(form, response) {
    AppDispatcher.dispatch({
      actionType: ErrorsConstants.SET_ERRORS,
      form: form,
      errors: response.responseJSON
    });
  },
  clearErrors(response) {
    AppDispatcher.dispatch({
      actionType: ErrorsConstants.CLEAR_ERRORS
    });
  }
};

module.exports = ErrorsActions;
