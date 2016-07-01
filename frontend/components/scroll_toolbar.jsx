const React = require('react');
const SessionStore = require('../stores/session_store');
const ArticlesActions = require('../actions/articles_actions');

const ToolSidebar = React.createClass({
  getInitialState: function() {
    return {klass: 'absolute'};
  },
  componentDidMount: function() {
    window.addEventListener('scroll', this._scrollHeight);
  },
  _scrollHeight: function(event) {
    if (window.scrollY > 508) {
      this.setState({klass: 'fixed'});
    } else {
      this.setState({klass: 'absolute'});
    }
  },
  _handleDelete: function() {
    ArticlesActions.deleteArticle(this.props.articleId);
  },
  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._scrollHeight);
  },
  render: function() {
    let edit_delete = [];
    if (SessionStore.currentUser().username === this.props.user) {
      edit_delete.push(<button className='edit-delete'>EDIT</button>);
      edit_delete.push(<button onClick={this._handleDelete}className='edit-delete'>DELETE</button>);
    }
    return (
      <div className={`tools-sidebar ${this.state.klass}`}>
        {edit_delete}
      </div>
    );
  }
});

module.exports = ToolSidebar;
