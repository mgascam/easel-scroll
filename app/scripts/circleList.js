/**
 * Created by miguel on 24/06/17.
 */
var CircleList = (function () {
  return function (config) {

    var obj = {};
    var stage;
    var view = {};
    var scroller;
    view.container = new createjs.Container();

    obj.init = function init(p) {
      stage = p.stage;
      for (var i= 0; i < config.circles; i++ ) {
        createCircle(i, config.distance);
      }
      initScroller();
      stage.addChild(view.container);
    };

    function initScroller() {
      scroller = ScrollList();
      scroller.init({parentContainer: view.container})
    }

    function createCircle(index, distance) {
      var circle = new createjs.Shape();
      circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
      circle.x = 100;
      circle.y = 100 + (index * distance);
      view.container.addChild(circle);
    }
    return obj;
  }
})();
