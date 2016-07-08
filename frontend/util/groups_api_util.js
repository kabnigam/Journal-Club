const GroupsApiUtil = {
  create(data, successCB, errorsCB) {

    $.ajax({
      url: 'api/groups',
      method: 'POST',
      data: {group: {name: data.name, users: data.users}},
      success(response) {
        successCB(response);
      },
      errors(response) {
        errorsCB(response);
      }
    });
  },
  updateUser(data, successCB, errorsCB) {

    $.ajax({
      url: `api/groups/${data.group_id}`,
      method: 'PATCH',
      data: {group: {user: data.user}},
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

  search(params, successCB) {
    $.ajax({
      url: 'api/groups',
      data: {group: {search: params}},
      success(response) {
        successCB(response);
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
