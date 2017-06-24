/**
 * Created by miguel on 24/06/17.
 */
var ScrollList = (function () {
  return function (config) {

    var obj = {};
    var parentContainer;
    var view = {};

    view.container = new createjs.Container();

    obj.init = function init(p) {
      parentContainer = p.parentContainer;
      createMask();
      parentContainer.addChild(view.container);
      view.container.on('click', function (e) {
        parentContainer.y += 1;
      });
    };

    function createMask() {
      view.mask = new createjs.Shape();
      view.mask.graphics.beginFill('#fff').drawRect(0, 0, 200, 300);
      view.container.hitArea = view.mask;
      parentContainer.mask = view.mask;
    }

    return obj;
  }
})();
