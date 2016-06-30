const ArticlesApiUtil = {
  create(data, successCB, errorCB) {
    $.ajax({
      url: 'api/articles',
      method: 'POST',
      data: {article: data},
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },
  update(data, successCB, errorCB) {
    $.ajax({
      url: `api/articles/${data.id}`,
      method: 'PATCH',
      data: {article: data},
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },
  show(id, successCB, errorCB) {
    $.ajax({
      url: `api/articles/${id}`,
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },
  index(successCB, errorCB) {
    $.ajax({
      url: 'api/articles',
      success(response) {
        successCB(response);
      },
      error(response) {
        errorCB(response);
      }
    });
  },
  destroy(id, successCB) {

  }
};

module.exports = ArticlesApiUtil;
