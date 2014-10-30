var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/footer/footer-view'], function(Extm, FooterView) {
  var FooterController;
  FooterController = (function(_super) {
    __extends(FooterController, _super);

    function FooterController() {
      return FooterController.__super__.constructor.apply(this, arguments);
    }

    FooterController.prototype.initialize = function() {
      return this.wait();
    };

    FooterController.prototype.onComplete = function() {
      return this.show(new FooterView);
    };

    return FooterController;

  })(Extm.RegionController);
  return msgbus.registerController('footer', FooterController);
});
