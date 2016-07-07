const React = require('react');
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const SearchStore = require('../stores/search_store');
const CommentsActions = require('../actions/comments_actions');

const ShowComment = React.createClass({
  getInitialState: function() {
    return {reply: '', currentReplies: []};
  },
  // componentDidMount: function() {
  //   SearchStore.addListener(this._onChange);
  //   SessionActions.findUser(this.props.comment.user_id);
  // },
  _handleReply: function(e) {
    this.setState({reply: e.target.value});
  },
  _handleSubmit: function() {
    CommentsActions.createComment({body: this.state.reply, article_id: this.props.articleId, ratio: this.comments[0].ratio});
    this.setState({currentReplies: this.state.currentReplies.concat([<p className='comment-block'>{SessionStore.currentUser().id}: {this.state.reply}</p>])});
    this.setState({reply: ''});

  },
  _handleClose: function() {

    this.props.hideComment();
  },

  // _handleDelete: function() {
  //   CommentsActions.deleteComment(this.props.comment.id);
  //   this._handleClose();
  // },
  // _onChange: function() {
  //   this.setState({user: SearchStore.find_user(this.props.comment.user_id)});
  // },
  render: function() {
    let del = [];
    if (this.props.comment.user_id === SessionStore.currentUser().id) {
      del = <button onClick={this._handleDelete}>DELETE</button>;
    }
    this.comments = [];
    if (this.props.comment.id) {
      this.comments.push(this.props.comment);
    } else {
      this.comments = this.props.comment;
    }
    let rendered = this.comments.map(comment => {

      return <p className='comment-block'>{comment.user_id}: {comment.body}</p>;
    });
    rendered = rendered.concat(this.state.currentReplies);
    
    return (
      <div className='show-comment'>

        <img onClick={this._handleClose} id='close-button' src='https://cdn2.iconfinder.com/data/icons/status-4/24/close-circle-128.png' />
      {rendered}
      <br/><br/>
      <label className='comment-reply'>Reply:
        <textarea onChange={this._handleReply} className='comment-reply' value={this.state.reply}></textarea>
      </label>
      <button onClick={this._handleSubmit}>POST</button>
      {del}
      </div>
    );
  }
});

module.exports = ShowComment;
