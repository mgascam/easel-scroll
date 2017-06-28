(function () {
  $.ajax({
    async: false
  });


 (function () {
    'use strict';
   var stage = new createjs.Stage('stage');
   createjs.Ticker.addEventListener('tick', stage);
   createjs.Touch.enable(stage);
    var result;
    $.getJSON('scripts/gameHistoryConfig.json', function (data) {
      result = data;
      var landscapeContainer = new createjs.Container();
      var portraitContainer = new createjs.Container();
      var desktopContainer = new createjs.Container();

      stage.addChild(landscapeContainer);
      stage.addChild(portraitContainer);
      stage.addChild(desktopContainer);

      var fakeConfig = {
        getGameHistory: function () {
          return result;
        },
        getOrientation: function () {
          return 'landscape';
        },
        getLabel: function (label) {
          var labels = {
            'game-history-round': 'Round',
            'game-history-hits': 'Hits',
            'game-history-win': 'Win',
          };
          return labels[label];
        }
      };

      var gameHistory = GameHistoryController(fakeConfig);
      gameHistory.init({
        landscapeContainer: landscapeContainer,
        portraitContainer: portraitContainer,
        desktopContainer: desktopContainer
      });
      var rounds = [
        {
          roundIndex: 1,
          winThreshold: 15,
          result: {
            state: 'win'
          }
        },
        {
          roundIndex: 2,
          winThreshold: 15,
          result: {
            state: 'win'
          }
        },
      ];

      rounds.forEach(function (round) {
        gameHistory.updateCurrentRound(round);
      })
    });
  }());

  //var circleList = CircleList({circles: 6, distance: 105});
  //circleList.init({stage: stage});




})();
