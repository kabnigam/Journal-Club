const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const SessionActions = require('../actions/session_actions');
const UserSearchIndexItem = require('./user_search_index_item');
const SearchStore = require('../stores/search_store');

const UserSearchBar = React.createClass({
  getInitialState: function() {
    return {search: '', user_results: []};
  },
  componentDidMount: function() {
    this.listener = SearchStore.addListener(this._onChange);
    $('.search-content').hide();
    $(document).on('click', e => {
      if (e.target.id != 'search-field' || e.target.id != 'group-user-search'){
        $('.group-user-search').hide();
      } else {
        $('.group-user-search').show();
      }
    });
  },
  _onChange: function() {

    this.setState({user_results: SearchStore.all_users()});
  },
  componentWillUnmount: function() {
    this.listener.remove();
    // $(document).removeEventListener('click');
  },
  _handleSearch: function(e) {
    this.setState({search: e.target.value});
    SessionActions.searchUsers(e.target.value);
  },
  _handleClick: function() {

    this.setState({search: ''});
    SearchStore.reset();
    $('.group-user-search').hide();
  },
  _handleFieldClick: function(e) {
    $('.group-user-search').show();
  },
  render: function() {

    let user_results = [];

    if (this.state.user_results && this.state.search !== '') {
      user_results = this.state.user_results.map(result => {
        return <UserSearchIndexItem  hide={this._handleClick} addUser={this.props.addUser} user={result} />;
      });
    }

    return (
      <div className='search-bar group-search'>
        <input className='search-field' value={this.state.search} onChange={this._handleSearch} placeholder='Search Users' onClick={this._handleFieldClick}/>
        <div className="dropdown-content group-user-search" onClick={this._handleClick}>


            {user_results}


        </div>
      </div>

    );
  },

});

module.exports = UserSearchBar;
