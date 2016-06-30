const React = require('react');
const ArticleStore = require('../stores/articles_store');
const ArticleActions = require('../actions/articles_actions');

const ArticlesShow = React.render({
  getInitialState: function() {
    return {article: ArticleStore.find(this.props.params.articleId)};
  },
  componentDidMount: function() {
    ArticleStore.addListener(this._onChange);
    ArticleActions.fetchArticle(this.props.params.articleId);
  },
  _onChange: function() {
    this.setState({article: ArticleStore.find(this.props.params.articleId)});
  },
  render: function() {
    return (
      <div id='article-show-container'>
        <div id='article-show-image'>

        </div>
        <div id='article-show-user'>
          {this.state.article.username}
        </div>
        <div id='article-show-title'>
          {this.state.article.title}
        </div>
        <div id='article-show-body'>
          {this.state.article.body}
        </div>
      </div>
    );
  }

});

module.exports = ArticlesShow;
