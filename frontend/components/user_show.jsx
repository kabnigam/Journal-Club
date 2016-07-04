const React = require('react');
const SessionActions = require('../actions/session_actions');
const SearchStore = require('../stores/search_store');
const ArticleIndexItem = require('./articles_index_item');

const UserShow = React.createClass({
  getInitialState: function() {
    return {user: ''};
  },
  componentDidMount: function() {
    SearchStore.addListener(this._onChange);
    SessionActions.findUser(this.props.params.userId);
  },
  _onChange: function() {
    this.setState({user: SearchStore.find_user(this.props.params.userId)});
  },
  render: function() {

    if (this.state.user == '') {
      return <div>Loading...</div>;
    }
    return (
      <div className = 'user-page'>
        <div id='article-show-image'>

            <img src='http://2.bp.blogspot.com/-6ZahTZlK3Wc/VVsDSP0QUxI/AAAAAAAAB5A/ppNZTMxs_uM/s1600/ThinkstockPhotos-134992626.jpg' />

        </div>
        <div id='article-show-user'>
          <img src='http://errantscience.com/wp-content/uploads/Duck-face.jpg' />
          <h3><span id='username'>{this.state.user.username}</span></h3>
        </div>
        <div id='users-articles'>
          {this.state.user.articles.map(article => {
            return <ArticleIndexItem article={article} />;
          })}
        </div>
      </div>
    );
  }

});
module.exports = UserShow;
