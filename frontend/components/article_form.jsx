const React = require('react');
const ArticlesActions = require('../actions/articles_actions');

const ArticleForm = React.createClass({
  getInitialState: function() {
    return {title: '', body: '', source: '', picture_url: '', clicked: false};
  },
  _handleTitle: function(e) {
    this.setState({title: e.target.value});
  },
  _handleBody: function(e) {
    this.setState({body: e.target.value});
  },
  _handleSource: function(e) {
    this.setState({source: e.target.value});
  },
  _handleClick: function() {
    this.setState({clicked: true});
  },
  _handleClose: function() {
    this.setState({clicked: false});
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
  _handleSubmit: function() {
    ArticlesActions.createArticle({
      title: this.state.title,
      body: this.state.body,
      source: this.state.source,
      picture_url: this.state.picture_url
    });
    this.setState({title: '', body: '', source: '', clicked: false});
  },
  render: function() {
    if (this.state.clicked) {
      return (
        <div id='create-article-form'>
          <img onClick={this._handleClose} id='close-button' src='https://cdn2.iconfinder.com/data/icons/status-4/24/close-circle-128.png' />
          <input id='create-article-title' placeholder="Title" onChange={this._handleTitle}></input>
          <br/>
          <textarea id='create-article-body' placeholder="Body" onChange={this._handleBody}></textarea>
          <br/>
          <input id='create-article-source' placeholder="Source (optional)" onChange={this._handleSource}></input>
          <br/>
          <button id='create-article-submit' onClick={this._handleSubmit}>Post</button>
          <button id='upload-photo' onClick={this._upload}>Upload Photo</button>
        </div>
      );
    }
    return (

      <div id='add-article-click' onClick={this._handleClick}>
        <img id='create-article-button' src='https://www.materialui.co/materialIcons/content/add_circle_outline_grey_192x192.png' />
        Add article here...
      </div>
    );
  }
});

module.exports = ArticleForm;
