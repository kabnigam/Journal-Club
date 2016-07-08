const React = require('react');
const hashHistory = require('react-router').hashHistory;
const ArticlesStore = require('../stores/articles_store');

const SearchIndexItem = React.createClass({
  _handleClick: function() {
    hashHistory.push(this.url);

  },

  render: function() {
    let result = '';
    let img = <img></img>;
    let url = '';
    if (this.props.user) {
      result = this.props.user.username;
      img = <img className = 'search-image' src="http://www.freeiconspng.com/uploads/profile-icon-person-user-19.png"></img>;
      this.url = `/users/${this.props.user.id}`;
    }
    else if (this.props.article) {
      result = this.props.article.title;
      img =
      <img className='search-image' src="https://cdn2.iconfinder.com/data/icons/budicon-document-2/16/3-document_-_article_news_newspaper-512.png"></img>;
      this.url = `/articles/${this.props.article.id}`;
    } else if (this.props.group) {
      result = this.props.group.name;
      img =
      <img className='search-image'
      src="http://image.flaticon.com/icons/png/512/27/27825.png"></img>;
      this.url = `/groups/${this.props.group.id}`;
    }
    if (result.length > 15) {
      result = result.slice(0,15) + '...';
    }
    return (
      <div onClick={this._handleClick} className='search-index-item'>
        {img}
        <a id='search-results'>{result}</a>
      </div>
    );
  }
});

module.exports = SearchIndexItem;
