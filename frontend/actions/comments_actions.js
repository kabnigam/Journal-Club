const AppDispatcher = require('../dispatcher/dispatcher');
const CommentsApiUtil = require('../util/comments_api_util');
const CommentsConstants = require('../constants/comments_constants');
const hashHistory = require('react-router').hashHistory;

const CommentsActions = {
  createComment(comment) {
    CommentsApiUtil.create(comment, CommentsActions.receiveComment, error);
  },
  deleteComment(id) {
    CommentsApiUtil.destroy(id, CommentsActions.removeComment);
  },
  updateComment(comment) {
    CommentsApiUtil.update(comment, CommentsActions.receiveComment, error);
  },
  receiveComment(comment) {
    AppDispatcher.dispatch({
      actionType: CommentsConstants.COMMENT_RECEIVED,
      comment: comment
    });
  },
  removeComment(comment) {
    AppDispatcher.dispatch({
      actionType: CommentsConstants.COMMENT_REMOVED,
      comment: comment
    });
  },
};

let error = function(a) {alert('!');};

module.exports = CommentsActions;
