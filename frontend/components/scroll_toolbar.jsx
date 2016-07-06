const React = require('react');
const SessionStore = require('../stores/session_store');
const ArticlesActions = require('../actions/articles_actions');
const CommentsForm = require('./comment');

const ToolSidebar = React.createClass({
  getInitialState: function() {
    return {klass: 'absolute', edit: false, comment_state: false};
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this._scrollHeight);
  },


  _scrollHeight: function() {
    if (window.scrollY > $("div#article-and-sidebar").offset().top) {
      this.setState({klass: 'fixed'});
    } else {
      this.setState({klass: 'absolute'});
    }
  },
  _handleDelete: function() {
    ArticlesActions.deleteArticle(this.props.articleId);
  },
  _handleEdit: function() {
    this.setState({edit: true});
    this.props.editMode();
  },
  _handleSave: function() {
    this.props.saveMode();
    this.setState({edit: false});
  },
  _handleUpload: function(e) {
    this.props.uploadMode(e);
  },
  _handleHighlight: function(e) {
    if ($(e.target).hasClass('clicked')) {
      $(e.target).removeClass('clicked');
    }
    else {
      $(e.target).addClass('clicked');
    }
    this.props.highlightMode();
  },
  _handleComment: function(e) {
    if (this.props.showForm) {
      this.props.triggerShowForm();

    }
    this.props.commentMode();
  },



  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._scrollHeight);
  },


  render: function() {

    let edit_delete = [];
    if (SessionStore.currentUser().username === this.props.user) {

      if (this.props.editState) {
        edit_delete.push(<button onClick={this._handleSave} className='edit-delete'>SAVE</button>);
        edit_delete.push(<button onClick={this._handleUpload} className='edit-delete'>UPLOAD IMAGE</button>);
      } else {
        edit_delete.push(<button onClick={this._handleEdit} className='edit-delete'>EDIT</button>);
      }
      edit_delete.push(<button onClick={this._handleDelete} className='edit-delete'>DELETE</button>);
    }
    let commentKlass = 'highlight edit-delete comment';
    if (this.props.commentState) {
      commentKlass = 'highlight edit-delete comment clicked';
    }

    return (
      <div className={`tools-sidebar ${this.state.klass}`}>
        {edit_delete}
        <button onClick={this._handleHighlight} className='highlight edit-delete'>HIGHLIGHT</button>
        <div className='comment-section'>

          <button onClick={this._handleComment} className={commentKlass}>COMMENT</button>
        </div>
      </div>
    );
  }
});

module.exports = ToolSidebar;
