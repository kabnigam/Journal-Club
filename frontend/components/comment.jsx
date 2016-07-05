const React = require('react');
const CommentsActions = require('../actions/comments_actions');
const ToolSidebar = require('./scroll_toolbar');

const CommentsForm = React.createClass({
  getInitialState: function() {
    return {body: ''};
  },
  componentDidMount: function() {
    document.querySelector('.create-comment-form').addEventListener('click', this._stopProp);
  },

  componentWillUnmount: function() {
    document.querySelector('.create-comment-form').removeEventListener('click', this._stopProp);
  },

  _handleBody: function(e) {
    this.setState({body: e.target.value});

  },
  _handleSubmit: function() {
    CommentsActions.createComment({body: this.state.body, article_id: this.props.articleId, y_index: this.props.yCoord});
    this.props.hide();
  },
  _stopProp: function(e) {

    // e.stopPropagation();
  },
  _handleClose: function() {
    this.props.hide();
  },

  render: function() {
    let klass = 'create-comment-form';
    if (!this.props.commentState || !this.props.showForm) {
      klass = 'create-comment-form hidden';
    }

    return (
      <div className={klass} style={{top: this.props.yCoord}}>
        <img onClick={this._handleClose} id='close-button' src='https://cdn2.iconfinder.com/data/icons/status-4/24/close-circle-128.png' />
        <textarea className='create-comment-body' placeholder="Body" onChange={this._handleBody} ></textarea>
        <br/>
        <button className='comment-submit' onClick={this._handleSubmit}>Post</button>
      </div>
    );
  }
});

module.exports = CommentsForm;
