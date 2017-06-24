(function (CircleList) {
  var stage = new createjs.Stage('stage');
  createjs.Ticker.addEventListener('tick', stage);

  var circleList = CircleList({circles: 6, distance: 105});

  circleList.init({stage: stage});

})(CircleList);
