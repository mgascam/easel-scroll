(function (CircleList) {
  var stage = new createjs.Stage('stage');
  createjs.Ticker.addEventListener('tick', stage);
  createjs.Touch.enable(stage);

  //var circleList = CircleList({circles: 6, distance: 105});
  //circleList.init({stage: stage});

  var landscapeContainer = new createjs.Container();
  var portraitContainer = new createjs.Container();
  var desktopContainer = new createjs.Container();

  stage.addChild(landscapeContainer);
  stage.addChild(portraitContainer);
  stage.addChild(desktopContainer);

  var fakeConfig = {
    getGameHistory: function () {
      var deferred = $.Deferred();
      $.getJSON('scripts/gameHistoryConfig.json', function (data) {
        deferred.resolve(data);
      });

      return deferred.promise();
    },
    getOrientation: function () {
      return 'landscape';
    }
  };
  var gameHistory = GameHistoryController(fakeConfig);
  gameHistory.init({
    landscapeContainer: landscapeContainer,
    portraitContainer: portraitContainer,
    desktopContainer: desktopContainer
  })

})(CircleList);
