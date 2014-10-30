var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Mariontte) {
  var HeaderView;
  return HeaderView = (function(_super) {
    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.template = '<div class="backBtn {{textClass}}"> <a  class="back text-white"><span class="glyphicon glyphicon-chevron-left "></span></a> </div> <div class="rightBtns  {{btnClass}}"> <a  id="showTop" class="text-white hidden"><span class="glyphicon glyphicon-filter"></span></a> <a id="showRightPush" class="text-white hidden "><span class="glyphicon glyphicon-user"></span></a> </div> <div class="text-center"> <h3 class="m-t-15 light"><span class="slctnTxt">Your selection</span> <span id="textstring"></span> </h3> </div>';

    HeaderView.prototype.className = "header navbar navbar-inverse";

    HeaderView.prototype.events = {
      'click .back': function(e) {
        var element, key, myArray, params, screenoneArray, screenthreeArray, screentwoArray, _i, _j, _k, _len, _len1, _len2;
        if (window.location.href.indexOf('screen-three') > -1) {
          App.backFilter['screen3'] = [];
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
          key = App.defaults.hasOwnProperty(App.screenOneFilter['key']);
          if (key === true) {
            App.defaults[App.screenOneFilter['key']] = App.screenOneFilter['value'];
          }
          e.preventDefault();
          App.filter(params = {});
          App.layout.screenThreeRegion.el.innerHTML = "";
          $('#screen-three-region').removeClass('section');
          return App.navigate("screen-two", {
            trigger: true
          });
        } else if (window.location.href.indexOf('screen-four') > -1) {
          screenthreeArray = App.backFilter['screen3'];
          for (_j = 0, _len1 = screenthreeArray.length; _j < _len1; _j++) {
            element = screenthreeArray[_j];
            key = App.defaults.hasOwnProperty(element);
            if (key === true) {
              App.defaults[element] = App.defaults['floor'];
            }
          }
          App.currentStore.unit.reset(UNITS);
          App.currentStore.building.reset(BUILDINGS);
          App.currentStore.unit_type.reset(UNITTYPES);
          App.currentStore.unit_variant.reset(UNITVARIANTS);
          e.preventDefault();
          App.filter(params = {});
          App.layout.screenFourRegion.el.innerHTML = "";
          $('#screen-four-region').removeClass('section');
          return App.navigate("screen-three", {
            trigger: true
          });
        } else {
          App.backFilter['screen2'] = [];
          screenoneArray = App.backFilter['screen1'];
          myArray = [];
          $.map(App.defaults, function(value, index) {
            if (value !== 'All') {
              return myArray.push({
                key: index,
                value: value
              });
            }
          });
          for (_k = 0, _len2 = myArray.length; _k < _len2; _k++) {
            element = myArray[_k];
            App.defaults[element.key] = 'All';
          }
          App.currentStore.unit.reset(UNITS);
          App.currentStore.building.reset(BUILDINGS);
          App.currentStore.unit_type.reset(UNITTYPES);
          App.currentStore.unit_variant.reset(UNITVARIANTS);
          e.preventDefault();
          App.filter(params = {});
          App.layout.screenTwoRegion.el.innerHTML = "";
          $('#screen-two-region').removeClass('section');
          App.navigate("screen-one", {
            trigger: true
          });
          return App.navigate("");
        }
      }
    };

    HeaderView.prototype.onShow = function() {
      var body, capability, cookieOldValue, disableOther, flag, menuRight, menuTop, showRightPush, textString, usermodel;
      usermodel = new Backbone.Model(USER);
      capability = usermodel.get('all_caps');
      if (usermodel.get('id') !== "0" && $.inArray('see_special_filters', capability) >= 0) {
        console.log("222");
        $('#showTop').removeClass('hidden');
      } else {
        $('#showTop').hide();
      }
      textString = Marionette.getOption(this, 'textString');
      $('#textstring').html(textString);
      flag = 0;
      if (window.location.href.indexOf('wishList') > -1) {
        flag = 1;
      }
      $(window).scroll(function() {
        var height;
        flag = 0;
        height = $(window).scrollTop();
        if (height === 0 && flag === 0) {
          $('.backBtn').addClass('hidden');
          return $('h3').addClass('step1');
        }
      });
      disableOther = function(button) {
        if (button !== "showRightPush") {
          classie.toggle(showRightPush, "disabled");
        }
      };
      menuRight = document.getElementById("cbp-spmenu-s2");
      menuTop = document.getElementById("cbp-spmenu-s3");
      showRightPush = document.getElementById("showRightPush");
      body = document.body;
      showTop.onclick = function() {
        classie.toggle(this, "active");
        classie.toggle(menuTop, "cbp-spmenu-open");
        disableOther("showTop");
      };
      showRightPush.onclick = function() {
        classie.toggle(this, "active");
        classie.toggle(body, "cbp-spmenu-push-toleft");
        classie.toggle(menuRight, "cbp-spmenu-open");
        disableOther("showRightPush");
      };
      if (window.location.href.indexOf('screen-two') > -1 || window.location.href.indexOf('screen-three') > -1 || window.location.href.indexOf('screen-four') > -1) {
        true;
      } else if (window.location.href.indexOf('wishList') > -1) {
        $('#showRightPush').addClass('hidden');
        $('.backBtn').addClass('hidden');
        $('.slctnTxt').addClass('hidden');
        $('h3').addClass('step1');
      } else {
        $('.backBtn').addClass('hidden');
        $('.slctnTxt').addClass('hidden');
        $('h3').addClass('step1');
      }
      cookieOldValue = localStorage.getItem("cookievalue");
      if (cookieOldValue === void 0 || cookieOldValue === "") {
        cookieOldValue = [];
      } else {
        cookieOldValue = cookieOldValue.split(',').map(function(item) {
          return parseInt(item);
        });
      }
      if (cookieOldValue.length >= 1) {
        return $("#showRightPush").removeClass("hidden");
      }
    };

    return HeaderView;

  })(Marionette.ItemView);
});
