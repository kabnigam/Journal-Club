const React = require('react');
const CommentsActions = require('../actions/comments_actions');
const ToolSidebar = require('./scroll_toolbar');

const CommentsForm = React.createClass({
  getInitialState: function() {
    return {body: ''};
  },


  _handleBody: function(e) {
    this.setState({body: e.target.value});
  },
  _handleSubmit: function() {
    CommentsActions.createComment({body: this.state.body, article_id: this.props.articleId, y_index: this.props.ycoord});
    this.props.hide();
  },
  _handleClose: function() {
    this.props.hide();
  },

  render: function() {

    if (!this.props.commentState || !this.props.showForm) {
      return (<div></div>);
    }

    return (
      <div className={`create-comment-form `}>
        <img onClick={this._handleClose} id='close-button' src='https://cdn2.iconfinder.com/data/icons/status-4/24/close-circle-128.png' />
        <textarea className='create-comment-body' placeholder="Body" onChange={this._handleBody}></textarea>
        <br/>
        <button className='comment-submit' onClick={this._handleSubmit}>Post</button>
      </div>
    );
  }
});

module.exports = CommentsForm;
