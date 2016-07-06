const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const ArticleAndAnnotations = require('./articles_and_annotations');
const ToolSidebar = require('./scroll_toolbar');

const ArticlesShow = React.createClass({
  getInitialState: function() {
    this.articleId = parseInt(this.props.params.articleId);
    this.article = ArticlesStore.find(this.articleId);
    return {title: '', body: '', picture_url: '', edit: false, highlight: false, comment: false, showForm: false};
  },
  componentDidMount: function() {
    this.listener = ArticlesStore.addListener(this._onChange);
    ArticlesActions.fetchArticles();
    this.setState({picture_url: this.article.picture_url});
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
    let url = this.state.picture_url;
    if (url === '') {
      url = this.article.picture_url;
    }
    ArticlesActions.updateArticle({
      title: this.state.title,
      body: this.state.body,
      id: this.articleId,
      picture_url: url
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

    this.setState({highlight: !this.state.highlight});

  },
  _triggerCommentMode: function() {

    this.setState({comment: !this.state.comment});
  },

  _triggerShowForm: function() {
    this.setState({showForm: !this.state.showForm});
  },

  postImage(url) {
    this.setState({picture_url: url});
  },
  _upload(e) {
    e.preventDefault();
    let that = this;
    window.cloudinary.openUploadWidget(
      window.cloudinary_options,
      function(error, images) {
        if (error === null) {
          that.postImage(images[0].url);
        }
      }
    );
  },





  render: function() {

    if (!this.state.body) {
      return <div>loading...</div>;
    }
    else if (this.state.edit) {
      return (
        <div id='article-show-container'>
          <div id='article-show-image'>

            <img src={this.article.picture_url} />

          </div>
            <div id='article-edit-title'>
              <textarea id='edit-title' value={this.state.title} onChange={this._editTitle} />
            </div><br />

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
            <ToolSidebar user={this.article.user.username} articleId={this.articleId}
              editMode={this._editMode} editState={this.state.edit} saveMode={this._saveMode} uploadMode={this._upload}/>
          </div>
        </div>
      );
    }

    return (

      <div id='article-show-container'>
        <div id='article-show-image'>

            <img src={this.article.picture_url} />

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

              <ArticleAndAnnotations article={this.article} highlightState={this.state.highlight} commentState={this.state.comment} triggerCommentMode={this._triggerCommentMode} showForm={this.state.showForm} triggerShowForm={this._triggerShowForm}/>
            </div>
            <ToolSidebar user={this.article.user.username} articleId={this.articleId} editMode={this._editMode} highlightMode={this._triggerHighlightMode} commentMode={this._triggerCommentMode} commentState={this.state.comment} showForm={this.state.showForm} triggerShowForm={this._triggerShowForm}/>
          </div>
      </div>
    );
  }

});

module.exports = ArticlesShow;
