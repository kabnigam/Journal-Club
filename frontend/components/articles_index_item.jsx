const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const hashHistory = require('react-router').hashHistory;

const ArticlesIndexItem = React.createClass({
  _showRedirect: function() {
    hashHistory.push(`/articles/${this.props.article.id}`);
  },
  render: function() {
    return (
      <li key={`article${this.props.article.id}`} onClick={this._showRedirect}>
        <div id='posted-text'>
          Posted by&nbsp;
        </div>
        <div id="article-author">
          {this.props.article.username}
        </div>

        <div id="article-image">

        </div>

        <h2 id="article-title">
          {this.props.article.title}
        </h2>

        <pre id='article-body'>
          {this.props.article.body.slice(0,300)+'...'}
        </pre>
      </li>
    );
  }
});

module.exports = ArticlesIndexItem;
