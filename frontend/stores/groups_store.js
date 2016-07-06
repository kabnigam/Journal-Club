const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const GroupsConstants = require('../constants/groups_constants');
const hashHistory = require('react-router').hashHistory;


const GroupsStore = new Store(AppDispatcher);

let _groups = {};

function _addGroup(group) {
  _groups[group.id] = group;
  GroupsStore.__emitChange();
}

function _addGroups(groups) {
  groups.forEach(group => {
    _groups[group.id] = group;
  });
  GroupsStore.__emitChange();
}

function _removeGroup(group) {
  delete _groups[group.id];
}

GroupsStore.all = function() {
  let groups = [];
  Object.keys(_groups).forEach(id => {
    groups.push(_groups[id]);
  });
  return groups;
};

GroupsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case GroupsConstants.RECEIVED_GROUP:
      _addGroup(payload.group);
      break;
    case GroupsConstants.RECEIVED_GROUPS:
      _addGroups(payload.groups);
      break;
    case GroupsConstants.REMOVE_GROUP:
      _removeGroup(payload.group);
      break;
  }
};

GroupsStore.find = function(id) {
  return _groups[id];
};

module.exports = GroupsStore;
