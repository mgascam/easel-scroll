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
    var velocity;
    var amplitude;
    var timestamp;
    var ticker;
    var frame;
    var target;
    var timeConstant = 325;
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

      velocity = 0;
      amplitude = 0;
      frame = offset;
      timestamp = Date.now();
      clearInterval(ticker);
      ticker = setInterval(track, 100);

      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    function release(e) {
      pressed = false;
      clearInterval(ticker);

      if (velocity > 10 || velocity < -10) {
        amplitude = 0.8 * velocity;
        target = Math.round(offset + amplitude);
        timestamp = Date.now();
        requestAnimationFrame(autoScroll);
      }

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

    function track() {
      var now, elapsed, delta, v;

      now = Date.now();
      elapsed = now - timestamp;
      timestamp = now;
      delta = offset - frame;
      frame = offset;

      v = 1000 * delta / (1 + elapsed);
      velocity = 0.8 * v + 0.2 * velocity;
    }

    function autoScroll() {
      var elapsed, delta;
      if (amplitude) {
        elapsed = Date.now() - timestamp;
        delta = -amplitude * Math.exp(-elapsed / timeConstant);
        if (delta > 0.5 || delta < -0.5) {
          scroll(target + delta);
          requestAnimationFrame(autoScroll);
        } else {
          scroll(target);
        }
      }
    }

    return obj;
  }
})();
