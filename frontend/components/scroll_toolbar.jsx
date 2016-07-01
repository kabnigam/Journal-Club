const React = require('react');
const SessionStore = require('../stores/session_store');
const ArticlesActions = require('../actions/articles_actions');

const ToolSidebar = React.createClass({
  getInitialState: function() {
    return {klass: 'absolute', edit: false};
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
    this.props.editMode();
    this.setState({edit: true});
  },
  _handleSave: function() {
    this.props.saveMode();
    this.setState({edit: false});
  },
  _handleHighlight: function() {
    this.props.highlightMode();
  },

  componentWillUnmount: function() {
    window.removeEventListener('scroll', this._scrollHeight);
  },
  render: function() {
    let edit_delete = [];
    if (SessionStore.currentUser().username === this.props.user) {
      if (this.state.edit) {
        edit_delete.push(<button onClick={this._handleSave} className='edit-delete'>SAVE</button>);
      } else {
        edit_delete.push(<button onClick={this._handleEdit} className='edit-delete'>EDIT</button>);
      }
      edit_delete.push(<button onClick={this._handleDelete} className='edit-delete'>DELETE</button>);
    }
    return (
      <div className={`tools-sidebar ${this.state.klass}`}>
        {edit_delete}
        <button onClick={this._handleHighlight} className='highlight edit-delete'>HIGHLIGHT</button>
      </div>
    );
  }
});

module.exports = ToolSidebar;
