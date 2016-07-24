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
      <li key={`article${this.props.article.id}${this.props.article.name}`} onClick={this._showRedirect}>
        <div id='posted-text'>
        </div>
        <div id="article-image">
          <img src={this.props.article.picture_url} />
        </div>
        <div id="article-author">
          Posted by&nbsp;
          {this.props.article.user.username}
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
