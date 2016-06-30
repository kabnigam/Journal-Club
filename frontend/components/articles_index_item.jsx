const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const hashHistory = require('react-router').hashHistory;

const ArticlesIndexItem = React.createClass({
  render: function() {
    return (
      <li key={`article${this.props.article.id}`}>
        <div id="article-author">
          {this.props.article.username}
        </div>

        <div id="article-image">

        </div>

        <h2 id="article-title">
          {this.props.article.title}
        </h2>

        <div id='article-body'>
          {this.props.article.body.slice(0,300)+'...'}
        </div>
      </li>
    );
  }
});

module.exports = ArticlesIndexItem;
