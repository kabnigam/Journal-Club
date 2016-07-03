const React = require('react');
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');
const hashHistory = require('react-router').hashHistory;
const SearchBar = require('./search_bar');

const NavBar = React.createClass({
  _backHome() {
    hashHistory.push('/');
  },
  _handleLogout() {
    SessionActions.logout();
  },

  render: function() {
    return (
      <div>
        <nav id='navbar'>


          <div id='site-name' onClick={this._backHome}>

            JOURNAL CLUB
            <img src="http://i.imgur.com/ixBgo1y.png"></img>
          </div>
          <SearchBar />
          <div id='left'>

            <div id='username'>
              {SessionStore.currentUser().username}
            </div>
            <div className="dropdown">
              <button className="dropbtn">
                <div id='menu'>
                  <img src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/menu-alt-512.png" />
                </div>
              </button>
              <div className="dropdown-content">
                <a href="#">PROFILE</a>
                <a href="#">SETTINGS</a>
                <a onClick={this._handleLogout}>LOGOUT</a>
              </div>
            </div>

          </div>
        </nav>
      </div>
    );
  }
});

module.exports = NavBar;
