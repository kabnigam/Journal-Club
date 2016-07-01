const HighlightsApiUtil = {
  create(data, successCB, errorsCB) {
    $.ajax({
      url: 'api/highlights',
      method: 'POST',
      data: {highlight: data},
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
      url: `api/highlights/${id}`,
      success(response) {
        successCB(response);
      },
      errors(response) {
        errorsCB(response);
      }
    });
  },
  index(successCB, errorsCB) {
    $.ajax({
      url: 'api/highlights',
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
      url: `api/highlights/${id}`,
      method: 'DELETE',
      success(response) {
        successCB(response);
      }
    });
  }
};

module.exports = HighlightsApiUtil;
