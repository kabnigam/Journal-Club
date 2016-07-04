const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const CommentsConstants = require('../constants/comments_constants');
const hashHistory = require('react-router').hashHistory;

const CommentsStore = new Store(AppDispatcher);

let _comments = {};

function _addComments(comments) {
  comments.forEach(comment => {
    _comments[comment.id] = comment;
  });
  CommentsStore.__emitChange();
}

function _addComment(comment) {
  _comments[comment.id] = comment;
  CommentsStore.__emitChange();
}

function _removeComment(comment) {
  delete _comments[comment.id];
  CommentsStore.__emitChange();
}

CommentsStore.all = function() {
  let comments = [];
  Object.keys(_comments).forEach(id => {
    comments.push(_comments[id]);
  });
};

CommentsStore.onDispatch = function(payload) {
  switch (payload.actionType) {
    case CommentsConstants.COMMENT_RECEIVED:
      _addComment(payload.comment);
      break;
    case CommentsConstants.COMMENT_REMOVED:
      _removeComment(payload.comment);
      break;
  }
};

module.exports = CommentsStore;
