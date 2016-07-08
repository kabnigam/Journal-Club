const React = require('react');


const UserSearchIndexItem = React.createClass({
  _handleClick: function(user) {
    this.props.addUser(user);
    this.props.hide();
  },

  render: function() {
    let result = '';

    result = this.props.user.username;

    return (
      <div className='sr' onClick={this._handleClick.bind(this, this.props.user)}>
        <a className='group-search-result'>{result}</a>
      </div>
    );
  }
});

module.exports = UserSearchIndexItem;
