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

function _setHighlights(highlights) {
  _highlights = {};
  highlights.forEach(highlight => {
    _highlights[highlight.start_index] = highlight;
  });
  HighlightsStore.__emitChange();
}

function _removeHighlight(highlight) {
  delete _highlights[highlight.start_index];
  HighlightsStore.__emitChange();
}

HighlightsStore.all = function() {
  let highlights = [];
  Object.keys(_highlights).forEach(idx => {
    highlights.push(_highlights[idx]);
  });
  return highlights;
};

HighlightsStore.reset = function() {
  _highlights = {};
};

HighlightsStore.__onDispatch = function(payload) {
  switch (payload.actionType) {
    case HighlightsConstants.RECEIVED_HIGHLIGHT:
      _addHighlight(payload.highlight);
      break;
    case HighlightsConstants.RECEIVED_HIGHLIGHTS:
      _setHighlights(payload.highlights);
      break;
    case HighlightsConstants.REMOVE_HIGHLIGHT:
      _removeHighlight(payload.highlight);
      break;
  }
};

module.exports = HighlightsStore;
