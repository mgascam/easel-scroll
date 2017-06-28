/*
 ///////////////////////////////////////////////////////////////////////////
 Module:
 Created Date: 09/06/2017
 Author: mgasca
 Description

 //////////////////////////////////////////////////////////////////////////////
 //       Copyright (c) 2017 - The Workshop  All rights reserved.
 //////////////////////////////////////////////////////////////////////////////
 */
var GameHistoryController = (function(){
  return function(config) {
    var obj = {};
    var view = GameHistoryView(config);
    var history = [];
    var currentRound = {
      hits: 0,
      index: 1,
      winThreshold: 15
    };

    obj.init = function(p) {
      view.init(p);
    };

    obj.changeOrientation = function() {
      view.changeOrientation();
    };

    obj.show = function() {
      refreshView();
      return view.show();
    };

    obj.nextRound = function(newRoundIndex) {
      currentRound.index = newRoundIndex;
      currentRound.hits = 0;
      currentRound.winThreshold = 15;
    };

    obj.updateCurrentRound = function(params) {
      currentRound.index = params.roundIndex;
      currentRound.winThreshold = parseInt(params.minimumHitsToWin, 10);
      updateRoundHits(params.result.state);
      return refreshView();
    };

    obj.getHistory = function() {
      return history;
    };

    obj.resetCurrentRound = function() {
      currentRound = {
        hits: 0,
        index: 1,
        winThreshold: 15
      };
    };

    obj.resetHistory = function() {
      history = [];
    };

    obj.addRoundToHistory = function(params) {
      currentRound.outcome = params.outcome.payout;
      history.unshift(currentRound);
      return view.addRoundToHistory(currentRound);
    };

    function updateRoundHits(state) {
      if (state === 'win') {
        currentRound.hits++;
      }
    }

    function refreshView() {
      view.setCurrentRoundIndex(currentRound.index);
      view.setCurrentRoundHits(currentRound.hits);
      if (currentRound.winThreshold === currentRound.hits && currentRound.hits !== 0) {
        view.setCurrentRoundStar();
      }
      return $.when();
    }

    return obj;
  };
})();
