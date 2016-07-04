const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const ArticleAndAnnotations = require('./articles_show_and_highlights');
const ToolSidebar = require('./scroll_toolbar');

const ArticlesShow = React.createClass({
  getInitialState: function() {
    this.articleId = parseInt(this.props.params.articleId);
    this.article = ArticlesStore.find(this.articleId);
    return {title: '', body: '', edit: false, highlight: false, comment: false};
  },
  componentDidMount: function() {
    this.listener = ArticlesStore.addListener(this._onChange);
    ArticlesActions.fetchArticles();
  },
  _onChange: function() {
    this.article = ArticlesStore.find(this.articleId);
    this.setState({title: this.article.title, body: this.article.body});
  },
  componentWillUnmount: function() {
    this.listener.remove();
  },
  _editMode: function() {
    this.setState({edit: true});
  },
  _saveMode: function() {
    ArticlesActions.updateArticle({
      title: this.state.title,
      body: this.state.body,
      id: this.articleId
    });
    this.setState({edit: false});
  },

  _editTitle: function(e) {
    this.setState({title: e.target.value});
  },
  _editBody: function(e) {
    this.setState({body: e.target.value});
  },
  _triggerHighlightMode: function() {

    this.setState({highlight: true});

  },

  _triggerCommentMode: function() {
    this.setState({comment: true});
  },

  render: function() {

    if (!this.state.body) {
      return <div>loading...</div>;
    } else if (this.state.edit) {
      return (
        <div id='article-show-container'>
          <div id='article-show-image'>

            <img src='http://2.bp.blogspot.com/-6ZahTZlK3Wc/VVsDSP0QUxI/AAAAAAAAB5A/ppNZTMxs_uM/s1600/ThinkstockPhotos-134992626.jpg' />

          </div>
            <div id='article-edit-title'>
              <textarea id='edit-title' value={this.state.title} onChange={this._editTitle} />
            </div>

          <div id='article-content-container'>
            <div id="article-and-sidebar">
              <div id='article-show-user'>
                <img src='http://errantscience.com/wp-content/uploads/Duck-face.jpg' />
                <h3>Posted by <span id='username'>{this.article.user.username}</span></h3>
              </div>
              <div id='article-edit-body'>

                <textarea id='edit-body' value={this.state.body} onChange={this._editBody} />
              </div>
            </div>
            <ToolSidebar user={this.article.username} articleId={this.articleId}
              editMode={this._editMode} saveMode={this._saveMode}/>
          </div>
        </div>
      );
    }

    return (
      <div id='article-show-container'>
        <div id='article-show-image'>

            <img src='http://2.bp.blogspot.com/-6ZahTZlK3Wc/VVsDSP0QUxI/AAAAAAAAB5A/ppNZTMxs_uM/s1600/ThinkstockPhotos-134992626.jpg' />

        </div>
        <div id='article-show-title'>
          <h1>{this.article.title}</h1>
        </div>

          <div id='article-content-container'>
            <div id="article-and-sidebar">
              <div id='article-show-user'>
                <img src='http://errantscience.com/wp-content/uploads/Duck-face.jpg' />
                <h3>Posted by <span id='username'>{this.article.user.username}</span></h3>
              </div>
              <ArticleAndAnnotations article={this.article} highlightState={this.state.highlight} commentState={this.state.comment}/>
            </div>
            <ToolSidebar user={this.article.username} articleId={this.articleId} editMode={this._editMode} highlightMode={this._triggerHighlightMode} commentMode={this._triggerCommentMode}/>
          </div>
      </div>
    );
  }

});

module.exports = ArticlesShow;
