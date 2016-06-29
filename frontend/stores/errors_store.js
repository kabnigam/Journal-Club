const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const ErrorsConstants = require('../constants/errors_constants');
const hashHistory = require('react-router').hashHistory;

const ErrorsStore = new Store(AppDispatcher);

let _errors = {};
let _form = '';

ErrorsStore.formErrors = function(form) {
  let errors = [];
  if (_form === form) {

    Object.keys(_errors).forEach(field => {
      errors.push(`${_errors[field]}`);
    });

  }
  return errors;
};

ErrorsStore.form = function() {
  return _form;
};

function setErrors(form, errors) {
  _errors = errors;
  _form = form;
  ErrorsStore.__emitChange();
}

function clearErrors() {
  _errors = {};
  _form = '';
  ErrorsStore.__emitChange();
}

ErrorsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case ErrorsConstants.SET_ERRORS:
      setErrors(payload.form, payload.errors);
      break;
    case ErrorsConstants.CLEAR_ERRORS:
      clearErrors();
      break;
  }
};

module.exports = ErrorsStore;
