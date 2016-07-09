const React = require('react');
const SessionStore = require('../stores/session_store');
const hashHistory = require('react-router').hashHistory;

const UserGroups = React.createClass({
  _redirectToGroup: function(group) {
    hashHistory.push(`/groups/${group.id}`);
  },
  render: function() {
    let groups = [];
    if (SessionStore.currentUser().groups.length > 0) {
      groups = SessionStore.currentUser().groups.map(group => {
        return <li onClick={this._redirectToGroup.bind(this, group)} className='group-name'>{group.name}</li>;
      });
    }
    return (
      <div className='my-groups'>
        <h2>My Groups</h2>
        <ul>
          {groups}
        </ul>
      </div>
    );
  }

});

module.exports = UserGroups;
