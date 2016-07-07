const React = require('react');
const SessionStore = require('../stores/session_store');

const Sidebar = React.createClass({
  render: function() {
    if (SessionStore.currentUser().groups.length > 0) {
      let groups = SessionStore.currentUser().groups.map(group => {return <li className='my-groups-li'>{group.name}</li>;});
      return (
        <div className='index-sidebar'>
          <h3>My Groups</h3>
          <ul className='my-groups'>
            {groups}
          </ul>
        </div>
      );
    }

    return (
      <div className='index-sidebar'>
        <h3>My Groups</h3>
        <h4>You have not joined any groups. Search for groups to get started!</h4>
      </div>
    );

  }

});

module.exports = Sidebar;
