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
      //for (var i= 0; i < config.circles; i++ ) {
      //  createCircle(i, config.distance);
      //}
      var index = 0;
      setInterval(function () {
        createCircle(index, config.distance);
        index++;
        refreshScroller();
      }, 1000);
      createMask();
      initScroller();
      stage.addChild(view.container);
    };

    function initScroller() {
      scroller = ScrollList();
      scroller.init({parentContainer: view.container, stage: stage, viewport: {width: 200, height: 300}})
    }

    function createCircle(index, distance) {
      var circle = new createjs.Shape();
      circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
      circle.x = 100;
      circle.y = 100 + (index * distance);
      view.container.setBounds(100, circle.y, 100, 100 * index);
      view.container.addChild(circle);
    }

    function createMask() {
      view.mask = new createjs.Shape();
      view.mask.graphics.beginFill('#fff').drawRect(0, 0, 200, 300);
      view.container.mask = view.mask;
    }

    function refreshScroller() {
        scroller.refresh({content: view.container.getBounds()})
    }

    return obj;
  }
})();
