const AppDispatcher = require('../dispatcher/dispatcher');
const HighlightsApiUtil = require('../util/highlights_api_util');
const HighlightsConstants = require('../constants/highlights_constants');
const hashHistory = require('react-router').hashHistory;

const HighlightsActions = {
  createHighlight(highlight) {
    HighlightsApiUtil.create(highlight, this.receiveArticle, error);
  },
  fetchHighlight(id) {
    HighlightsApiUtil.show(id, this.receiveArticle, error);
  },
  fetchHighlights() {
    HighlightsApiUtil.index(this.receiveHighlights, error);
  },
  deleteHighlight(id) {
    HighlightsApiUtil.destroy(id, this.removeArticle, error);
  },
  receiveHighlight(highlight) {
    AppDispatcher.dispatch({
      actionType: HighlightsConstants.RECEIVED_HIGHLIGHT,
      highlight: highlight
    });
    hashHistory.push(`/highlights/${highlight.id}`);
  },
  receiveHighlights(highlights) {
    AppDispatcher.dispatch({
      actionType: HighlightsConstants.RECEIVED_HIGHLIGHTS,
      highlights: highlights
    });
  },
  removeHighlight(highlight) {
    AppDispatcher.dispatch({
      actionType: HighlightsConstants.REMOVE_HIGHLIGHT,
      highlight: highlight
    });
    hashHistory.push('/');
  }
};

let error = function(a) {alert('!');};

module.exports = HighlightsActions;
