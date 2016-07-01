const AppDispatcher = require('../dispatcher/dispatcher.js');
const Store = require('flux/utils').Store;
const HighlightsConstants = require('../constants/highlights_constants');
const hashHistory = require('react-router').hashHistory;

const HighlightsStore = new Store(AppDispatcher);

let _highlights = {};

function _addHighlight(highlight) {
  _highlights[highlight.start_index] = highlight;
  HighlightsStore.__emitChange();
}

function _addHighlights(highlights) {
  highlights.forEach(highlight => {
    _highlights[highlight.start_index] = highlight;
  });
}

function _removeHighlight(highlight) {
  delete _highlights[highlight.start_index];
}

HighlightsStore.all = function() {
  let highlights = [];
  Object.keys(_highlights).reverse().forEach(idx => {
    highlights.push(_highlights[idx]);
  });
  return highlights;
};

HighlightsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case HighlightsConstants.RECEIVED_ARTICLE:
      _addHighlight(payload.highlight);
      break;
    case HighlightsConstants.RECEIVED_ARTICLES:
      _addHighlights(payload.highlights);
      break;
    case HighlightsConstants.REMOVE_ARTICLE:
      _removeHighlight(payload.highlight);
      break;
  }
};

module.exports = HighlightsStore;
