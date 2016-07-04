const React = require('react');
const HighlightsActions = require('../actions/highlights_actions');
const HighlightsStore = require('../stores/highlights_store');

const ArticleAndHighlights = React.createClass({
  getInitialState: function() {
    return {highlights: [], highlight_state: this.props.highlightState};
  },
  componentDidMount: function() {
    this.listener = HighlightsStore.addListener(this._onChange);
    this._highlightMode();
    HighlightsActions.fetchHighlights(this.props.article.id);
  },
  _onChange: function() {
    this.setState({highlights: HighlightsStore.all()});
  },
  componentWillUnmount: function() {

    this.listener.remove();
    HighlightsStore.reset();
  },

  _highlightMode: function() {
    if (this.props.highlightState === true) {

      document.getElementById('ghost-article').addEventListener("mouseup", event => {
        console.log(window.getSelection());
        let target = window.getSelection();
        let start = target.anchorOffset;
        let end = target.focusOffset;
        if (start != end) {

          this._handleOverlap(start, end);
        }
      });
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
  render: function() {
    this._highlightMode();
    return (
      <div className='show-body'>

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

module.exports = ArticleAndHighlights;
