const AppDispatcher = require('../dispatcher/dispatcher');
const GroupsApiUtil = require('../util/groups_api_util');
const GroupsConstants = require('../constants/groups_constants');
const hashHistory = require('react-router').hashHistory;

const GroupsActions = {
  createGroup(group) {
    GroupsApiUtil.create(group, this.receiveGroup, error);
  },

  fetchGroup(id) {
    GroupsApiUtil.show(id, this.receiveGroup, error);
  },
  fetchGroups() {
    GroupsApiUtil.index(this.receiveGroups, error);
  },
  deleteGroup(id) {
    GroupsApiUtil.destroy(id, this.removeGroup, error);
  },
  searchGroups(params) {
    GroupsApiUtil.search(params, this.receiveGroupsSearch);
  },
  receiveGroup(group) {
    AppDispatcher.dispatch({
      actionType: GroupsConstants.RECEIVED_GROUP,
      group: group
    });
    hashHistory.push(`/groups/${group.id}`);
  },
  receiveGroups(groups) {
    AppDispatcher.dispatch({
      actionType: GroupsConstants.RECEIVED_GROUPS,
      groups: groups
    });
  },
  removeGroup(group) {
    AppDispatcher.dispatch({
      actionType: GroupsConstants.REMOVE_GROUP,
      group: group
    });
    hashHistory.push('/');
  },
  receiveGroupsSearch(groups) {
    AppDispatcher.dispatch({
      actionType: GroupsConstants.RECEIVED_GROUPS_SEARCH,
      groups: groups
    });
  }
};

let error = function(a) {alert('!');};

module.exports = GroupsActions;
