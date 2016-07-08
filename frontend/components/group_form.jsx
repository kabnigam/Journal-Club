const React = require('react');
const UserSearchBar = require('./user_search_bar');
const GroupsActions = require('../actions/groups_actions');
const UserGroups = require('./user_groups');

const GroupForm = React.createClass({
  getInitialState: function() {
    return {name: '', users: [], create: false};
  },
  _addUser: function(user) {
    this.setState({users: this.state.users.concat([user])});
  },

  _handleName: function(e) {
    this.setState({name: e.target.value});
  },
  _handleSubmit: function() {
    let temp = this.state.users.map(user => {
      return user.id;
    });
    GroupsActions.createGroup({name: this.state.name, users: temp});
  },
  _handleClick: function() {
    this.setState({create: true});
  },
  _hideForm: function() {
    this.setState({create: false});
  },

  _deleteUser: function(i) {
    let temp = this.state.users;
    temp.splice(i,1);
    this.setState({users: temp});
  },

  render: function() {

    let users = [];
    for (var i = 0; i < this.state.users.length; i++) {
      users.push(<img className='delete-group-user' onClick={this._deleteUser.bind(this, i)} src='https://cdn0.iconfinder.com/data/icons/form-elements-kit/100/minus-red-rounded-01-128.png' />);
      users.push(<p className='create-group-users'>{this.state.users[i].username}</p>);
      users.push(<br />);
    }

    if (!this.state.create) {
      return (
        <div className='create-group-form'>
          <div id='add-article-click' onClick={this._handleClick}>
            <img id='create-article-button' src='https://www.materialui.co/materialIcons/content/add_circle_outline_grey_192x192.png' />
            Create new group
          </div>

          <UserGroups />

        </div>
      );
    }


    return (

        <div className='create-group-form'>

          <img onClick={this._hideForm} id='hide-group-button' src='http://www.iconsdb.com/icons/preview/dim-gray/minus-5-xxl.png' />
          <h2>Create Group</h2>
          <textarea id='create-group-name' placeholder="Name" onChange={this._handleName}></textarea>
          <br/>
          <label id='select-users'>
            Add Users:
            <ul>
              {users}
            </ul>
            <UserSearchBar addUser={this._addUser}/>

          </label>
          <br/>
          <button onClick={this._handleSubmit} className='create-group-button'>Create Group</button>
          <UserGroups />

        </div>


    );
  }
});

module.exports = GroupForm;
