const React = require('react');
const HighlightsActions = require('../actions/highlights_actions');
const HighlightsStore = require('../stores/highlights_store');
const CommentsActions = require('../actions/comments_actions');
const CommentsStore = require('../stores/comments_store');
const CommentsForm = require('./comment');

const ArticleAndAnnotations = React.createClass({
  getInitialState: function() {
    return {highlights: [], highlight_state: this.props.highlightState, comments: [], comment_state: this.props.commentState, showForm: false};
  },
  componentDidMount: function() {
    this.listenerH = HighlightsStore.addListener(this._onChange);
    this.listenerC = CommentsStore.addListener(this._onChange);


    HighlightsActions.fetchHighlights(this.props.article.id);
    this.setState({comments: this.props.article.comments});
  },
  componentWillReceiveProps: function() {
    this.setState({comment_state: this.props.commentState});
  },
  _onChange: function() {
    this.setState({highlights: HighlightsStore.all()});
    this.setState({comments: this.props.article.comments});
  },
  componentWillUnmount: function() {

    this.listenerH.remove();
    this.listenerC.remove();
    HighlightsStore.reset();
    CommentsStore.reset();
  },

  _highlightMode: function() {
    if (this.props.highlightState === true) {

      document.getElementById('ghost-article').addEventListener("mouseup", this._getHighlightCoords);
    } else if (document.getElementById('ghost-article')) {
      document.getElementById('ghost-article').removeEventListener("mouseup", this._getHighlightCoords);
    }
  },
  _commentMode: function() {

    if (this.props.commentState) {

      document.addEventListener("click", this._getCommentCoords);
    } else if (document.getElementById('ghost-article')) {
      document.removeEventListener("click", this._getCommentCoords);
    }
  },

  _getCommentCoords(e) {
    let x = e.pageX;
    this.y = e.pageY;

    this.setState({showForm: true});
  },


  _getHighlightCoords() {
    let target = window.getSelection();
    let start = target.anchorOffset;
    let end = target.focusOffset;
    if (start !== end) {

      this._handleOverlap(start, end);
    }
  },

  _handleOverlap: function(start, end) {
    let iterator = this.state.highlights.slice();
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
      HighlightsActions.createHighlight({start_index: start, end_index: end, article_id: this.props.article.id});
    }
  },

  _createBody: function() {
    let body_string = this.props.article.body;
    let body_els = [];
    let i = 0;
    this.state.highlights.forEach(highlight => {
      body_els.push(body_string.slice(i, highlight.start_index));
      body_els.push(<span className='highlighted-text'>{body_string.slice(highlight.start_index, highlight.end_index)}</span>);
      i = highlight.end_index;
    });
    body_els.push(body_string.slice(i));
    return body_els;
  },

  _renderComments: function() {
    let comments_dup = this.state.comments.slice();
    let comment_els = comments_dup.map(comment => {
      let y = comment.y_index - ($('.show-body').offset().top + $('.show-body').position().top);
      return <img className='comment-icon' style={{top: y}} src="https://cdn4.iconfinder.com/data/icons/eldorado-basic/40/comment_chat-512.png" />;
    });
    return comment_els;
  },

  _hide: function() {
    this.setState({showForm: false});
    this.props.triggerCommentMode();
  },

  render: function() {
    this._highlightMode();
    this._commentMode();

    return (
      <div className='show-body'>
        {this._renderComments()}
        <CommentsForm commentState={this.props.commentState} showForm={this.state.showForm} ycoord={this.y} articleId={this.props.article.id} hide={this._hide}/>
        <pre id='ghost-article'>
          {this.props.article.body}
        </pre>
        <pre id='article'>
          {this._createBody()}
        </pre>
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
