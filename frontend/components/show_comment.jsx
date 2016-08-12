const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const SearchStore = require('../stores/search_store');
const CommentsActions = require('../actions/comments_actions');
const ArticlesStore = require('../stores/articles_store');

const ShowComment = React.createClass({
  getInitialState: function() {
    return {reply: '', currentReplies: [], editMode: false, deleted: []};
  },

  _handleReply: function(e) {
    this.setState({reply: e.target.value});
  },
  _handleSubmit: function() {
    CommentsActions.createComment({body: this.state.reply, article_id: this.props.articleId, ratio: this.comments[0].ratio});
    this.setState({currentReplies: this.state.currentReplies.concat([<p key={this.state.reply} reply={this.state.reply} className='comment-block'>
      <img key={`img${this.state.reply}`} onClick={this._deleteCurrentReply.bind(this, this.state.reply)} className='delete-icon hidden-icon' src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468019786/minus-4-512_impykc.png' />
      {SessionStore.currentUser().username}: {this.state.reply}
    </p>])});
    this.setState({reply: ''});

  },
  _handleClose: function() {

    this.props.hideComment();
  },

  _handleEdit: function(e) {
    this.setState({editMode: !this.state.editMode});
    if ($(e.target).hasClass('clicked')) {
      $(e.target).removeClass('clicked');
    }
    else {
      $(e.target).addClass('clicked');
    }
  },

  _handleDelete: function(id) {
    CommentsActions.deleteComment(id);
    this.setState({deleted: this.state.deleted.concat([id])});
    this._handleClose();
  },

  _deleteCurrentReply: function(reply) {

    for (var i = 0; i < this.state.currentReplies.length; i++) {
      if (this.state.currentReplies[i].props.reply === reply) {
        break;
      }
    }
    let crr = this.state.currentReplies;
    crr.splice(i,1);
    this.setState({currentReplies: crr});
    let comment = ArticlesStore.findCommentByReply(reply, SessionStore.currentUser().id, this.props.articleId);
    CommentsActions.deleteComment(comment.id);

  },

  render: function() {

    this.comments = [];
    if (this.props.comment.id) {
      this.comments.push(this.props.comment);
    } else {
      this.comments = this.props.comment;
    }
    let rendered = this.comments.map(comment => {
      if (this.state.deleted.includes(comment.id)) {
        return undefined;
      }
      if (this.state.editMode) {
        if (comment.user_id === SessionStore.currentUser().id) {
          return <p key={comment.id} className='comment-block'>
            <img onClick={this._handleDelete.bind(this, comment.id)} className='delete-icon' src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468019786/minus-4-512_impykc.png' />
            {comment.username}: {comment.body}</p>;
        } else {
          return <p key={comment.id} className='comment-block'>{comment.username}: {comment.body}</p>;
        }
      } else {
        return <p key={comment.id} className='comment-block'>{comment.username}: {comment.body}</p>;
      }
    });

    if (this.state.editMode) {

      rendered = rendered.concat(
        this.state.currentReplies.map(reply => {

          return <p key={reply.props.reply} reply={reply.props.reply} className='comment-block'>
            <img onClick={this._deleteCurrentReply.bind(this, reply.props.reply)} className='delete-icon' src='http://res.cloudinary.com/dzpkgj9f0/image/upload/v1468019786/minus-4-512_impykc.png' />
            {SessionStore.currentUser().username}: {reply.props.reply}
          </p>;
        })
      );
    } else {
      rendered = rendered.concat(this.state.currentReplies);
    }

    let del = [];

    if (this.comments.map(comment => {return comment.user_id;}).includes(SessionStore.currentUser().id)) {
      del = <button key='editcomment' className='comment-buttons' onClick={this._handleEdit}>EDIT</button>;
    }

    return (
      <div className='show-comment'>

        <img onClick={this._handleClose} id='close-button' src='https://cdn2.iconfinder.com/data/icons/status-4/24/close-circle-128.png' />
      {rendered}
      <br/><br/>
      <label className='comment-reply'>Reply:
        <textarea onChange={this._handleReply} className='comment-reply' value={this.state.reply}></textarea>
      </label>
      <button className='comment-buttons' onClick={this._handleSubmit}>POST</button>
      {del}
      </div>
    );
  }
});

module.exports = ShowComment;
