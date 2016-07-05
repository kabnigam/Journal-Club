const CommentsApiUtil = {
  create(data, successCB, errorsCB) {
    $.ajax({
      url: 'api/comments',
      method: 'POST',
      data: {comment: data},
      success(response) {
        successCB(response);
      },
      errors(response) {
        errorsCB(response);
      }
    });
  },
  update(data, successCB, errorsCB) {
    $.ajax({
      url: `api/comments/${data.id}`,
      method: 'PATCH',
      data: {comment: data},
      success(response) {
        successCB(response);
      },
      errors(response) {
        errorsCB(response);
      }
    });
  },
  show(id, successCB, errorsCB) {
    $.ajax({
      url: `api/comments/${id}`,
      success(response) {
        successCB(response);
      },
      errors(response) {
        errorsCB(response);
      }
    });
  },

  destroy(id, successCB) {
    $.ajax({
      url: `api/comments/${id}`,
      method: 'DELETE',
      success(response) {
        successCB(response);
      }
    });
  }
};

module.exports = CommentsApiUtil;
