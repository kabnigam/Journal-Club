const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const SessionStore = require('../stores/session_store');
const ArticlesIndexItem = require('./articles_index_item');
const hashHistory = require('react-router').hashHistory;
const ArticleForm = require('./article_form');
const GroupForm = require('./group_form');

const ArticlesIndex = React.createClass({
  getInitialState: function() {
    return {articles: ArticlesStore.all()};
  },
  componentDidMount: function() {
    this.listener = ArticlesStore.addListener(this._onChange);
    ArticlesActions.fetchArticles();
  },
  _onChange: function() {
    this.setState({articles: ArticlesStore.all()});
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },

  render: function() {
    let articles = [];
    articles = this.state.articles.map(article => {
      return <ArticlesIndexItem article={article}/>;
    });
    let group_form = '';
    if (SessionStore.currentUser().username) {
      group_form = <GroupForm />;
    }
    return (
      <div className='whole-container'>
        <div className='overlay-index'>

          <div id='index-splash'>
            <h2>Explore the world <span id="together">together</span></h2>
            <h3>Journal Club is a place for people to share and annotate articles with their peers so that everyone is on the same page.</h3>
          </div>
        </div>
        <div id='index'>

          <div id='articles'>
            <ul id='articles-list'>
              <li><ArticleForm /></li>
              {articles}
            </ul>

          </div>
          {group_form}
        </div>
      </div>
    );
  }
});



module.exports = ArticlesIndex;
