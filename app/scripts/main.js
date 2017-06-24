(function (CircleList) {
  var stage = new createjs.Stage('stage');
  createjs.Ticker.addEventListener('tick', stage);
  createjs.Touch.enable(stage);

  var circleList = CircleList({circles: 6, distance: 105});

  circleList.init({stage: stage});
  /*document.getElementById('stage').addEventListener('mousewheel', function (e) {
      console.log(e);
  });*/
})(CircleList);
