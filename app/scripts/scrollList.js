/**
 * Created by miguel on 24/06/17.
 */
var ScrollList = (function () {
  return function (config) {

    var obj = {};
    var parentContainer;
    var view = {};

    var max = 300;
    var min = 0;
    var offset = 0;
    var pressed = false;
    var reference;
    var stage;
    var viewport = {
      width: 0,
      height: 0
    };

    var hitArea;

    view.container = new createjs.Container();

    obj.init = function init(p) {
      parentContainer = p.parentContainer;
      stage = p.stage;
      stage.addChild(view.container);
      viewport.width = p.viewport.width;
      viewport.height = p.viewport.height;
      initHitArea();
      initListeners();
    };

    obj.refresh = function (p) {
      max = p.content.height;
    };

    function initHitArea(viewport) {
      hitArea = new createjs.Shape();
      // TODO take from init params
      hitArea.graphics.beginFill('#fff');
      //view.container.hitArea = hitArea;
      view.container.addChild(hitArea);
      draw();
    }

    function draw() {
      var rect = new createjs.Graphics.Rect(0, 0, viewport.width, viewport.height);
      hitArea.graphics.append(rect);
    }


    function initListeners() {
      view.container.on('mousedown', tap);
      view.container.on('pressmove', drag);
      view.container.on('pressup', release);
    }

    function scroll(y) {
      offset = (y > max) ? max : (y < min) ? min : y;
      parentContainer.y = -offset;
    }

    function tap(e) {
      pressed = true;
      reference = e.stageY;
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    function release(e) {
      pressed = false;
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    function drag(e) {
      var y, delta;
      if (pressed) {
        y = e.stageY;
        delta = reference - y;
        if (delta > 2 || delta < -2) {
          reference = y;
          scroll(offset + delta);
        }
      }
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    return obj;
  }
})();
