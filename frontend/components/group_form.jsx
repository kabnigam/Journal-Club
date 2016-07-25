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
      users.push(<img className='delete-group-user' onClick={this._deleteUser.bind(this, i)} src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468019786/minus-4-512_impykc.png' />);
      users.push(<p className='create-group-users'>{this.state.users[i].username}</p>);
      users.push(<br />);
    }

    if (!this.state.create) {
      return (
        <div className='create-group-form'>
          <UserGroups />
          <div id='add-article-click' onClick={this._handleClick}>
            <img id='create-article-button' src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468814176/add_circle_outline_grey_192x192_mkdddo.png' />
            Create New Club
          </div>



        </div>
      );
    }


    return (

        <div className='create-group-form'>
          <UserGroups />
          <img onClick={this._hideForm} id='hide-group-button' src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468814108/minus-5-xxl_jxbfzo.png' />
          <h2>Create Club</h2>
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
          <button onClick={this._handleSubmit} className='create-group-button'>Create Club</button>


        </div>


    );
  }
});

module.exports = GroupForm;
