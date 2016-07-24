const React = require('react');
const ArticlesActions = require('../actions/articles_actions');
const ArticlesStore = require('../stores/articles_store');
const GroupsStore = require('../stores/groups_store');
const ArticleAndAnnotations = require('./articles_and_annotations');
const ToolSidebar = require('./scroll_toolbar');
const hashHistory = require('react-router').hashHistory;

const ArticlesShow = React.createClass({
  getInitialState: function() {
    this.articleId = parseInt(this.props.params.articleId);
    this.article = ArticlesStore.find(this.articleId);
    return {article: ArticlesStore.find(this.articleId), title: '', body: '', picture_url: '', edit: false, highlight: false, comment: false, showForm: false,
    all_highlights: false, all_comments: false};
  },
  componentDidMount: function() {
    this.listener = ArticlesStore.addListener(this._onChange);
    this.groupListener = GroupsStore.addListener(this._onChange);
    ArticlesActions.fetchArticles();
    // this.setState({picture_url: this.article.picture_url});
  },

  componentWillReceiveProps: function(newProps) {
    this.article = ArticlesStore.find(parseInt(newProps.params.articleId));
    this.setState({title: this.article.title, body: this.article.body, picture_url: this.article.picture_url});
  },
  _onChange: function() {


    this.article = ArticlesStore.find(parseInt(this.props.params.articleId));
    this.setState({title: this.article.title, body: this.article.body, picture_url: this.article.picture_url});
  },
  componentWillUnmount: function() {
    this.listener.remove();
    this.groupListener.remove();
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

  _triggerAllHighlights: function() {
    this.setState({all_highlights: !this.state.all_highlights});
  },

_triggerAllComments: function() {
  this.setState({all_comments: !this.state.all_comments});
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

  _redirectToUser() {
    hashHistory.push(`/users/${this.article.user.id}`);
  },

  _redirectToGroup() {
    hashHistory.push(`/groups/${this.article.group.id}`);
  },


  render: function() {
    let group = [];


    if (!this.state.body) {
      return <div>loading...</div>;
    } else {
      if (this.article.group) {
        group.push(' in ');
        group.push(<span key={group.name} onClick={this._redirectToGroup} id='group-name'>{this.article.group.name}</span>);
      }
    }
    if (this.state.edit) {
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
                <img src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468814339/Duck-face_f6qn4u.jpg' />
                <h3>Posted by <span id='username'>{this.article.user.username}</span>
                {group}
                </h3>
              </div>

              <div id='article-edit-body'>

                <textarea id='edit-body' value={this.state.body} onChange={this._editBody} />
              </div>
            </div>
            <ToolSidebar user={this.article.user.username} article={this.article}
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
                <img src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468814339/Duck-face_f6qn4u.jpg' />
                <h3>Posted by <span onClick={this._redirectToUser} id='username'>{this.article.user.username}</span>
                {group}
                </h3>
              </div>

              <ArticleAndAnnotations article={this.article} highlightState={this.state.highlight} commentState={this.state.comment} triggerCommentMode={this._triggerCommentMode} showForm={this.state.showForm} triggerShowForm={this._triggerShowForm} allHighlightsState={this.state.all_highlights} allCommentsState={this.state.all_comments}/>
            </div>
            <ToolSidebar user={this.article.user.username} article={this.article} editMode={this._editMode} highlightMode={this._triggerHighlightMode} commentMode={this._triggerCommentMode} commentState={this.state.comment} showForm={this.state.showForm} triggerShowForm={this._triggerShowForm}
              allHighlightsMode={this._triggerAllHighlights} allCommentsMode={this._triggerAllComments}/>
          </div>
      </div>
    );
  }

});

module.exports = ArticlesShow;
