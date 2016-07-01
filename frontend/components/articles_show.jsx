const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const ToolSidebar = require('./scroll_toolbar');

const ArticlesShow = React.createClass({
  getInitialState: function() {
    this.articleId = parseInt(this.props.params.articleId);
    return {article: ArticlesStore.find(this.articleId), edit: false};
  },
  componentDidMount: function() {
    this.listener = ArticlesStore.addListener(this._onChange);
    ArticlesActions.fetchArticles();
  },
  _onChange: function() {
    this.setState({article: ArticlesStore.find(this.articleId)});
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  render: function() {
    if (!this.state.article) {
      return <div>loading...</div>;
    } else if (this.state.edit) {

    }
    return (
      <div id='article-show-container'>
        <div id='article-show-image'>

            <img src='http://2.bp.blogspot.com/-6ZahTZlK3Wc/VVsDSP0QUxI/AAAAAAAAB5A/ppNZTMxs_uM/s1600/ThinkstockPhotos-134992626.jpg' />

        </div>
        <div id='article-show-title'>
          <h1>{this.state.article.title}</h1>
        </div>

          <div id='article-content-container'>
            <div id="article-and-sidebar">
              <div id='article-show-user'>
                <img src='http://errantscience.com/wp-content/uploads/Duck-face.jpg' />
                <h3>Posted by <span id='username'>{this.state.article.username}</span></h3>
              </div>
              <pre id='article-show-body'>
                {this.state.article.body}
              </pre>
            </div>
            <ToolSidebar user={this.state.article.username} articleId={this.articleId}/>
          </div>
      </div>
    );
  }

});

module.exports = ArticlesShow;
