const React = require('react');
const SessionActions = require('../actions/session_actions');
const SearchStore = require('../stores/search_store');

const ShowComment = React.createClass({
  getInitialState: function() {
    return {reply: ''};
  },
  componentDidMount: function() {
    SearchStore.addListener(this._onChange);
    SessionActions.findUser(this.props.comment.user_id);
  },
  _handleReply: function(e) {
    this.setState({reply: e.target.value});
  },
  _onChange: function() {
    this.setState({user: SearchStore.find_user(this.props.comment.user_id)});
  },
  render: function() {
    return (
      <div className='show-comment'>
        <h3>{this.props.comment.user_id}:</h3>
        &nbsp;<p>{this.props.comment.body}</p><br/><br/>
      <label className='comment-reply'>Reply:
        <textarea onChange={this._handleReply} className='comment-reply'></textarea>
      </label>
      <button>Post</button>
      </div>
    );
  }
});

module.exports = ShowComment;
