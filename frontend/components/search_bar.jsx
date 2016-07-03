const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const SessionActions = require('../actions/session_actions');
const SearchIndexItem = require('./search_index_item');
const SearchStore = require('../stores/search_store');

const SearchBar = React.createClass({
  getInitialState: function() {
    return {search: '', user_results: []};
  },
  componentDidMount: function() {
    SearchStore.addListener(this._onChange);
  },
  _onChange: function() {

    this.setState({user_results: SearchStore.all_users()});
  },
  _handleSearch: function(e) {
    this.setState({search: e.target.value});
    SessionActions.searchUsers(e.target.value);
  },
  render: function() {
    let user_results = [];
    if (this.state.user_results) {
      user_results = this.state.user_results.map(result => {
        return <SearchIndexItem user={result} />;
      });
    }
    console.log(user_results);
    return (
      <div className='search-bar'>
        <input className='search-field' value={this.state.search} onChange={this._handleSearch} />
        <div className="dropdown-content search-content">
          {user_results}
        </div>
      </div>

    );
  },

});

module.exports = SearchBar;
