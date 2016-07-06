const AppDispatcher = require('../dispatcher/dispatcher');
const HighlightsApiUtil = require('../util/highlights_api_util');
const HighlightsConstants = require('../constants/highlights_constants');
const hashHistory = require('react-router').hashHistory;

const HighlightsActions = {
  createHighlight(highlight) {
    HighlightsApiUtil.create(highlight, HighlightsActions.receiveHighlight, error);
  },
  fetchHighlight(id) {
    HighlightsApiUtil.show(id, HighlightsActions.receiveHighlight, error);
  },
  fetchHighlights(article_id) {
    HighlightsApiUtil.index(parseInt(article_id), HighlightsActions.receiveHighlights, error);
  },
  deleteHighlight(id) {
    HighlightsApiUtil.destroy(id, HighlightsActions.removeHighlight);
  },
  receiveHighlight(highlight) {
    AppDispatcher.dispatch({
      actionType: HighlightsConstants.RECEIVED_HIGHLIGHT,
      highlight: highlight
    });
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
  }
};

let error = function(a) {alert('!');};

module.exports = HighlightsActions;
