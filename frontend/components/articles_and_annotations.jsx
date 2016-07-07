const React = require('react');
const ReactDOM = require('react-dom');
const HighlightsActions = require('../actions/highlights_actions');
const HighlightsStore = require('../stores/highlights_store');
const SessionStore = require('../stores/session_store');
const CommentsActions = require('../actions/comments_actions');
const CommentsForm = require('./comment');
const ShowComment= require('./show_comment');


const ArticleAndAnnotations = React.createClass({
  getInitialState: function() {
    return {my_highlights: [], highlight_state: this.props.highlightState, yCoord: undefined, show_comment: false};
  },
  componentDidMount: function() {

    this.listenerH = HighlightsStore.addListener(this._onChange);
    HighlightsActions.fetchHighlights(this.props.article.id);
    document.querySelector('.show-body').addEventListener('click', this._getCommentCoords);

  },

  _addMouseOver: function() {
    // document.querySelector('.highlighted-text').addEventListener('mouseover', this._showDeleteHighlight);
  },

  _onChange: function() {
    // this._addMouseOver();

    this.setState({my_highlights: HighlightsStore.find(SessionStore.currentUser().id)});
  },
  componentWillUnmount: function() {

    this.listenerH.remove();
    document.querySelector('.show-body').removeEventListener('click', this._getCommentCoords);
    HighlightsStore.reset();

  },

  _deleteHighlight: function(id) {
    HighlightsActions.deleteHighlight(id);
  },

  _showDeleteHighlight: function(e) {

    document.querySelector('highlight-trash').className = 'show-trash';
  },

  _highlightMode: function() {
    if (this.props.highlightState === true) {

      document.getElementById('ghost-article').addEventListener("mouseup", this._getHighlightCoords);
    } else if (document.getElementById('ghost-article')) {
      document.getElementById('ghost-article').removeEventListener("mouseup", this._getHighlightCoords);
    }
  },


  _getCommentCoords(e) {


    if (e.target.id === 'ghost-article') {

      this.setState({yCoord: e.offsetY});
    }
    if (!this.props.showForm && this.props.commentState) {

      this.props.triggerShowForm();
    }
  },

  _showComments(comments, pos) {

    this.comment = <ShowComment articleId={this.props.article.id} comment={comments} hideComment={this._hideComment} pos = {pos}/>;
    this.setState({show_comment: true});

  },

  _hideComment() {

    this.comment = undefined;
    this.setState({show_comment: false});
  },

  _getHighlightCoords() {
    let target = window.getSelection();
    let start = target.anchorOffset;
    let end = target.focusOffset;
    if (start !== end) {

      this._handleOverlap(start, end);
    }
  },

  _handleClickDelete(e) {
    $('#ghost-article').hide();
    document.elementFromPoint(e.clientX, e.clientY).click();
    $('#ghost-article').show();
  },

  _handleOverlap: function(start, end) {
    let iterator = this.state.my_highlights.slice();
    let created = false;
    iterator.forEach(highlight => {
      let hlStart = highlight.start_index;
      let hlEnd = highlight.end_index;
      if (start < hlStart && end < hlEnd && end > hlStart) {
        created = true;
        HighlightsActions.deleteHighlight(highlight.id);
        HighlightsActions.createHighlight({start_index: start, end_index: hlEnd, article_id: this.props.article.id});
      } else if (start > hlStart && start < hlEnd && end > hlEnd) {
        created = true;
        HighlightsActions.deleteHighlight(highlight.id);
        HighlightsActions.createHighlight({start_index: hlStart, end_index: end, article_id: this.props.article.id});
      } else if (start < hlStart && end > hlEnd) {
        HighlightsActions.deleteHighlight(highlight.id);
      }
    });
    if (!created) {
      if (start > end) {
        end = [start, start = end][0];
      }
      HighlightsActions.createHighlight({start_index: start, end_index: end, article_id: this.props.article.id});
    }
  },

  _createBody: function() {
    let body_string = this.props.article.body;
    let body_els = [];
    let i = 0;

    this.state.my_highlights.forEach(highlight => {
      body_els.push(body_string.slice(i, highlight.start_index));
      body_els.push(<span className='highlighted-text'>{body_string.slice(highlight.start_index, highlight.end_index)}<img className='show-trash' onClick={this._deleteHighlight.bind(this, highlight.id)} src="https://cdn3.iconfinder.com/data/icons/fillies-large/64/trashcan-512.png" /></span>);

      i = highlight.end_index;
    });
    body_els.push(body_string.slice(i));
    return body_els;
  },

  // _renderAllHighlights: function() {
  //   let allHighlights = HighlightsStore.all();
  //   let body_string = this.props.article.body;
  //   let body_els = [];
  //   let i = 0;
  //
  //   allHighlights.forEach(highlight => {
  //     if (highlight.user_id !== SessionStore.currentUser().id) {
  //       body_els.push(body_string.slice(i, highlight.start_index));
  //       body_els.push(<span className='all-highlights-text'>{body_string.slice(highlight.start_index, highlight.end_index)}</span>);
  //
  //       i = highlight.end_index;
  //     }
  //   });
  //   body_els.push(body_string.slice(i));
  //   return body_els;
  // },


  _renderAllHighlights: function() {
    let allHighlights = HighlightsStore.highlightsByUser();
    delete allHighlights[SessionStore.currentUser().id];
    let layers = [];
    Object.keys(allHighlights).forEach(user_id => {
      let hue = 'rgba(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',0.3)';

      let body_string = this.props.article.body;
      let body_els = [];
      let i = 0;
      let divStyle = {
        backgroundColor: hue
      };

      allHighlights[user_id].forEach(highlight => {
        body_els.push(body_string.slice(i, highlight.start_index));
        body_els.push(<span className='all-highlights-text'
        style={{background: `${hue}`}}>
        {body_string.slice(highlight.start_index, highlight.end_index)}</span>);

        i = highlight.end_index;
      });
      body_els.push(body_string.slice(i));

      layers.push(body_els);
    });
    return layers;
  },

  _renderMyComments: function() {

    let comments =  this.props.article.comments.map(comment => {
      // console.log(comment);
      if (comment.user_id === SessionStore.currentUser().id) {

        let y = comment.ratio * $('.show-body').outerHeight();
        // - ($('.show-body').offset().top + $('.show-body').position().top);

        return <img className='comment-icon' style={{top: y}} onClick={this._showComments.bind(this, comment)} src="https://cdn4.iconfinder.com/data/icons/eldorado-basic/40/comment_chat-512.png" />;
      }
    });

    // console.log(comments);

    return comments;
  },

  _renderAllComments: function() {
    let positionComments = {};
    let that = this;

    this.props.article.comments.forEach(comment => {
      let pushed = false;
      let y = comment.ratio * $('.show-body').outerHeight();
      Object.keys(positionComments).forEach(position => {
        if ((parseFloat(position) - 25) < y && (parseFloat(position) + 25) > y) {

          positionComments[position].push(comment);
          pushed = true;
        }
      });
      if (!pushed) {
        positionComments[y] = [comment];
      }
    });


    return Object.keys(positionComments).map(position => {
    
      return <img className='comment-icon' style={{top: position}} onClick={this._showComments.bind(this, positionComments[position], position)} src="https://cdn4.iconfinder.com/data/icons/eldorado-basic/40/comment_chat-512.png" />;
    });

    // return this.props.article.comments.map(comment => {
    //
    //     let y = comment.ratio * $('.show-body').outerHeight();
    //     // - ($('.show-body').offset().top + $('.show-body').position().top);
    //
    //     return <img className='comment-icon' style={{top: y}} onClick={this._showComment.bind(this, comment)} src="https://cdn4.iconfinder.com/data/icons/eldorado-basic/40/comment_chat-512.png" />;
    // });
  },

  _hide: function() {
    this.props.triggerShowForm();
    this.props.triggerCommentMode();
  },

  render: function() {

    this._highlightMode();
    let comment = [];
    if (this.comment) {

      comment.push(this.comment);
    }
    let layers = [];
    if (this.props.allHighlightsState) {
      let allHighlights = this._renderAllHighlights();
      allHighlights.forEach(layer => {
        layers.push(
          <div id='ghost-all-highlights'>
            {layer}
          </div>
        );
      });
    }
    let allComments = [];
    if (this.props.allCommentsState) {
      allComments = this._renderAllComments();
    }


    return (
      <div className='ghost-article-wrap'>

        <div className='show-body'>
          {this._renderMyComments()}
          {allComments}
          <CommentsForm commentState={this.props.commentState} showForm={this.props.showForm} yCoord={this.state.yCoord} articleId={this.props.article.id} hide={this._hide}/>
          <div id='ghost-article' onClick={this._handleClickDelete}>
            {this.props.article.body}
          </div>
          {layers}
          <div id='article'>
            {this._createBody()}
          </div>
          {comment}
        </div>
      </div>
    );
  }

});

module.exports = ArticleAndAnnotations;


// _handleOverlap: function(start, end) {
//   let iterator = this.state.highlights.slice();
//
//   let found = false;
//   let del = false;
//   if (this.state.highlights.length === 0) {
//     HighlightsActions.createHighlight({start_index: start, end_index: end, article_id: this.props.article.id});
//   }
//   iterator.forEach(highlight => {
//     let hlStart = highlight.start_index;
//     let hlEnd = highlight.end_index;
//     if (start >= hlStart && start < hlEnd) {
//       found = true;
//
//       HighlightsActions.deleteHighlight(highlight.id);
//       if (start !== hlStart){
//         HighlightsActions.createHighlight({start_index: hlStart, end_index: start, article_id: this.props.article.id});
//       }
//       if (end > hlEnd){
//         HighlightsActions.createHighlight({start_index: hlEnd, end_index: end, article_id: this.props.article.id});
//       } else if (end !== hlEnd) {
//         HighlightsActions.createHighlight({start_index: end, end_index: hlEnd, article_id: this.props.article.id});
//       }
//     }
//     else if (end > hlStart && end <= hlEnd) {
//       found = true;
//       HighlightsActions.deleteHighlight(highlight.id);
//       if (end !== hlEnd){
//         HighlightsActions.createHighlight({start_index: end, end_index: hlEnd, article_id: this.props.article.id});
//       }
//       HighlightsActions.createHighlight({start_index: start, end_index: hlStart, article_id: this.props.article.id});
//     } else if (start < hlStart && end > hlEnd) {
//
//       HighlightsActions.deleteHighlight(highlight.id);
//     }
//   });
//   if (!found) {
//     HighlightsActions.createHighlight({start_index: start, end_index: end, article_id: this.props.article.id});
//   }
// },

// _handleOverlap: function(start, end) {
//   let overlappingHighlights = this.state.highlights.slice().select(highlight => {
//     if (end > highlight.start_index && start < highlight.start_index && end < highlight.end_index) {
//       HighlightsActions.updateHighlight(highlight.id, end, 'start');
//       _handleOverlap()
//       HighlightsActions.createHighlight({start_index: start, end_index: highlight.start_index, article_id: this.props.article.id});
//     } else if (start < highlight.end_index && end > highlight.end_index && start > highlight.start_index) {
//       HighlightsActions.updateHighlight(highlight.id, start, 'end');
//       HighlightsActions.createHighlight({start_index: highlight.end_index, end_index: end, article_id: this.props.article.id});
//     } else if (start < higlight.start_index && end > highlight.end_index)
//   });
//
//
// },
