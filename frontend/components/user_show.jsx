const React = require('react');
const SessionActions = require('../actions/session_actions');
const SearchStore = require('../stores/search_store');
const ArticleIndexItem = require('./articles_index_item');
const hashHistory = require('react-router').hashHistory;

const UserShow = React.createClass({
  getInitialState: function() {
    return {user: ''};
  },
  componentDidMount: function() {
    this.listener = SearchStore.addListener(this._onChange);
    SessionActions.findUser(this.props.params.userId);
  },
  componentWillReceiveProps: function(newProps) {
    SessionActions.findUser(parseInt(newProps.params.userId));
    // this.setState({user: SearchStore.find_user(parseInt(newProps.params.userId))});
  },

  componentWillUnmount: function() {
    this.listener.remove();
  },

  _onChange: function() {

      this.setState({user: SearchStore.find_user(this.props.params.userId)});

  },

  _redirectToGroup: function(id) {
    hashHistory.push(`/groups/${id}`);
  },

  render: function() {

    if (this.state.user === '') {
      return <div>Loading...</div>;
    }

    let groups = [];
    if (this.state.user.groups.length > 0) {
      groups = this.state.user.groups.map(group => {

        return <li key={group.name} onClick={this._redirectToGroup.bind(this, group.id)}><a>{group.name}</a></li>;
      });
    } else {
      groups.push(<p key='nogroups'>You are currently not a member of any group.</p>);
    }

    let articles = [];
    if (this.state.user.articles.length > 0) {

      articles = this.state.user.articles.map(article => {
        return <ArticleIndexItem key={article.id} article={article} />;
      });
    } else {
      articles.push(<p key='none' >You have not posted any articles.</p>);
    }

    return (
      <div className='user-banner'>
        <div className='overlay-index'>

          <div id='index-splash'>

          </div>
          <div className = 'user-page'>
            <div className='user-prof'>
              <img src='http://errantscience.com/wp-content/uploads/Duck-face.jpg' />
              <h3><span id='username'>{this.state.user.username}</span></h3>
            </div>
            <div className='panels'>

              <div id='users-articles'>
                <h2>ARTICLES</h2>
                {articles}
              </div>
              <div className='my-groups'>
                <h2>CLUBS</h2>
                <ul>
                  {groups}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
module.exports = UserShow;
