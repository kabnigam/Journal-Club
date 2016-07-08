const React = require('react');
const GroupsActions = require('../actions/groups_actions');
const GroupsStore = require('../stores/groups_store');
const ArticleIndexItem = require('./articles_index_item');
const hashHistory = require('react-router').hashHistory;

const GroupShow = React.createClass({
  getInitialState: function() {
    return {group: ''};
  },
  componentDidMount: function() {
    this.listener = GroupsStore.addListener(this._onChange);
    GroupsActions.fetchGroup(this.props.params.groupId);
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  // componentWillReceiveProps: function(newProps) {
  //   GroupsActions.fetchGroup(newProps.params.groupId);
  // },
  _onChange: function() {
    this.setState({group: GroupsStore.find(this.props.params.groupId)});
  },
  _redirectToUser: function(id) {
    hashHistory.push(`/users/${id}`);
  },
  render: function() {
    if (this.state.group === ''){
      return <div>loading...</div>;
    }
    let articles = [];
    if (this.state.group.articles.length > 0) {
      articles = this.state.group.articles.map(article => {
        return <ArticleIndexItem article={article} />;
      });
    } else {
      articles.push(<p>There are no articles associated with this group.</p>);
    }

    let users = [];
    if (this.state.group.users.length > 0) {
      users = this.state.group.users.map(user => {
        return <li onClick={this._redirectToUser.bind(this, user.user_id)}><a>{user.username}</a></li>;
      });
    } else {
      users.push(<p>There are no users in this group.</p>);
    }
    return (
      <div className='group-show'>
        <h1>{this.state.group.name}</h1>
          <div className='panels'>
            <div id='group-articles'>
              <h2>ARTICLES</h2>
              {articles}
            </div>
            <div className='group-users'>
              <h2>USERS</h2>
              <ul>
                {users}
              </ul>
            </div>
          </div>
      </div>
    );
  }
});

module.exports = GroupShow;
