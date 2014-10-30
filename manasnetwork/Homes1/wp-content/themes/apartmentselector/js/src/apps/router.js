var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ApartmentSelector, RouterAPI;
  ApartmentSelector = (function(_super) {
    __extends(ApartmentSelector, _super);

    function ApartmentSelector() {
      return ApartmentSelector.__super__.constructor.apply(this, arguments);
    }

    ApartmentSelector.prototype.appRoutes = {
      'wishList': 'showpopup',
      'screen-four': 'showSelectedUnit',
      'screen-three': 'showUnits',
      'screen-two': 'show',
      'screen-one': 'showValues',
      ':params': 'showValues',
      'screen-two/:params': 'show',
      'screen-three/:params': 'showUnits',
      'screen-four/:params': 'showSelectedUnit'
    };

    return ApartmentSelector;

  })(Marionette.AppRouter);
  RouterAPI = {
    showValues: function(params) {
      var element, key, screentwoArray, _i, _len;
      if (params == null) {
        params = {};
      }
      msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
      App.backFilter['screen2'] = [];
      App.backFilter['screen3'] = [];
      App.layout.screenThreeRegion.el.innerHTML = "";
      App.layout.screenTwoRegion.el.innerHTML = "";
      App.layout.screenFourRegion.el.innerHTML = "";
      $('#screen-two-region').removeClass('section');
      $('#screen-three-region').removeClass('section');
      $('#screen-four-region').removeClass('section');
      screentwoArray = App.backFilter['screen1'];
      for (_i = 0, _len = screentwoArray.length; _i < _len; _i++) {
        element = screentwoArray[_i];
        key = App.defaults.hasOwnProperty(element);
        if (key === true) {
          App.defaults[element] = 'All';
        }
      }
      App.currentStore.unit.reset(UNITS);
      App.currentStore.building.reset(BUILDINGS);
      App.currentStore.unit_type.reset(UNITTYPES);
      App.currentStore.unit_variant.reset(UNITVARIANTS);
      App.filter(params);
      return msgbus.showApp('screen:one').insideRegion(App.layout.screenOneRegion).withOptions();
    },
    show: function(params) {
      var element, flag, key, screentwoArray, _i, _len;
      if (params == null) {
        params = {};
      }
      console.log(App.defaults);
      flag = 0;
      $.map(App.defaults, function(value, index) {
        if (value !== 'All') {
          return flag = 1;
        }
      });
      if (flag === 0) {
        msgbus.showApp('main:app').insideRegion(App.mainRegion).withOptions();
        msgbus.showApp('screen:one').insideRegion(App.layout.screenOneRegion).withOptions();
      } else {
        App.layout.screenThreeRegion.el.innerHTML = "";
        App.layout.screenFourRegion.el.innerHTML = "";
        $('#screen-three-region').removeClass('section');
        $('#screen-four-region').removeClass('section');
        App.backFilter['screen3'] = [];
        console.log(App.backFilter['screen2']);
        screentwoArray = App.backFilter['screen2'];
        for (_i = 0, _len = screentwoArray.length; _i < _len; _i++) {
          element = screentwoArray[_i];
          key = App.defaults.hasOwnProperty(element);
          if (key === true) {
            App.defaults[element] = 'All';
          }
        }
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        App.filter(params);
        setTimeout(function(x) {
          return msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        }, 1000);
      }
      return msgbus.showApp('screen:two').insideRegion(App.layout.screenTwoRegion).withOptions();
    },
    showUnits: function(params) {
      var flag;
      if (params == null) {
        params = {};
      }
      console.log("wwwwwwwwwwww");
      flag = 0;
      $.map(App.defaults, function(value, index) {
        if (value !== 'All') {
          return flag = 1;
        }
      });
      if (flag === 0) {
        msgbus.showApp('main:app').insideRegion(App.mainRegion).withOptions();
        msgbus.showApp('screen:one').insideRegion(App.layout.screenOneRegion).withOptions();
        msgbus.showApp('screen:two').insideRegion(App.layout.screenTwoRegion).withOptions();
      } else {
        App.layout.screenFourRegion.el.innerHTML = "";
        $('#screen-four-region').removeClass('section');
        App.layout.screenFourRegion.el.innerHTML = "";
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        App.filter(params = {});
        setTimeout(function(x) {
          return msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        }, 1000);
      }
      return msgbus.showApp('screen:three').insideRegion(App.layout.screenThreeRegion).withOptions();
    },
    showSelectedUnit: function(params) {
      var flag;
      if (params == null) {
        params = {};
      }
      App.filter(params = {});
      flag = 0;
      $.map(App.defaults, function(value, index) {
        if (value !== 'All') {
          return flag = 1;
        }
      });
      if (flag === 0) {
        msgbus.showApp('main:app').insideRegion(App.mainRegion).withOptions();
        msgbus.showApp('screen:one').insideRegion(App.layout.screenOneRegion).withOptions();
        msgbus.showApp('screen:two').insideRegion(App.layout.screenTwoRegion).withOptions();
        msgbus.showApp('screen:three').insideRegion(App.layout.screenThreeRegion).withOptions();
      } else {
        setTimeout(function(x) {
          return msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        }, 1000);
      }
      return msgbus.showApp('screen:four').insideRegion(App.layout.screenFourRegion).withOptions();
    },
    showpopup: function() {
      msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
      return msgbus.showApp('popup').insideRegion(App.mainRegion).withOptions();
    }
  };
  return new ApartmentSelector({
    controller: RouterAPI
  });
});
