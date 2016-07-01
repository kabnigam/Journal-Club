const React = require('react');
const HighlightsActions = require('../actions/articles_actions');
const HighlightsStore = require('../stores/articles_store');

const ArticleAndHighlights = React.createClass({
  getInitialState: function() {
    return {highlights: ''};
  },
  render: function() {
    return (
      <pre id='article-show-body'>
        {this.article.body}
      </pre>
    );
  }

});

module.exports = ArticleAndHighlights;
