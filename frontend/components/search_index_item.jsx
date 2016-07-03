const React = require('react');

const SearchIndexItem = React.createClass({
  render: function() {
    return (
      <a href="#">{this.props.user.username}</a>
    );
  }
});

module.exports = SearchIndexItem;
