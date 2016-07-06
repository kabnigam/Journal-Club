const GroupsApiUtil = {
  create(data, successCB, errorsCB) {
    $.ajax({
      url: 'api/groups',
      method: 'POST',
      data: {group: data},
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
      url: `api/groups/${id}`,
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
      url: `api/groups`,
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
      url: `api/groups/${id}`,
      method: 'DELETE',
      success(response) {
        successCB(response);
      }
    });
  }
};

module.exports = GroupsApiUtil;
