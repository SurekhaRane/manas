var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm'], function(Extm) {
  var MainController, facing, facingnames, mainView, view, viewnames;
  view = [];
  facing = [];
  facingnames = [];
  viewnames = [];
  MainController = (function(_super) {
    __extends(MainController, _super);

    function MainController() {
      this._getView = __bind(this._getView, this);
      this.showRegionViews = __bind(this.showRegionViews, this);
      return MainController.__super__.constructor.apply(this, arguments);
    }

    MainController.prototype.initialize = function() {
      var layout;
      this.layout = layout = this._getView();
      App.layout = this.layout;
      this.listenTo(layout, 'show', this.showRegionViews);
      return this.show(layout);
    };

    MainController.prototype.showRegionViews = function() {
      var params;
      App.filter(params = {});
      msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
      return msgbus.showApp('screen:one').insideRegion(this.layout.screenOneRegion).withOptions();
    };

    MainController.prototype._getView = function() {
      return new mainView({
        templateHelpers: {
          SITEURL: SITEURL,
          VIEWS: VIEWS,
          FACINGS: FACINGS
        }
      });
    };

    return MainController;

  })(Extm.RegionController);
  mainView = (function(_super) {
    __extends(mainView, _super);

    function mainView() {
      return mainView.__super__.constructor.apply(this, arguments);
    }

    mainView.prototype.template = '<div id="notify" class="notifyBox" style="display:none;"> You have clicked on a box! </div> <!--<div>dfsfsfs</div>--> <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right" id="cbp-spmenu-s2"> <h3>My Menu</h3> <ul> <li><a href="#"><span class="glyphicon glyphicon-heart"></span> Wishlist</a> <ul class="menuWishlist" id="showWishlist"> </ul> </li> <a href="#" id="compare" class="compareBtn">Compare</a> </ul> <div id="comparetext">Compare Apartments here! You can add Apartments to your wish list by clicking on the \'Add to wish list\' button on the view Apartment page after you have made a selection! You can compare up to 4 apartments!</div> </nav> <nav class="cbp-spmenu cbp-spmenu-horizontal cbp-spmenu-top" id="cbp-spmenu-s3"> <div class="row m-l-0 m-r-0"> <div class="col-sm-3"> <!--<h3>Additional Filters</h3>--> <div class="small blockTitle">Select Position</div> <div id="mainsvg"><label id="floorText">Floormap can be selected only on screen three</label></div> </div> <div class="col-sm-3 b-l b-r b-grey"> <div class="small blockTitle">Select View</div> {{#VIEWS}} <div class="filterBox"> <input type="checkbox" name="view{{id}}" data-name="{{name}}" id="view{{id}}" class="checkbox view" value="{{id}}"/> <label for="view{{id}}">{{name}}</label> </div> {{/VIEWS}} <div class="clearfix"></div> </div> <div class="col-sm-3 b-r b-grey"> <div class="small blockTitle">Select Facing</div> {{#FACINGS}} <div class="filterBox"> <input type="checkbox" name="facing{{id}}" data-name="{{name}}" id="facing{{id}}" class="checkbox facing" value="{{id}}"/> <label for="facing{{id}}">{{name}}</label> </div> {{/FACINGS}} <div class="clearfix"></div> </div> <div class="col-sm-3 summaryBox"> <div class="small blockTitle">Option Selected</div> <div class="section"> <div class="small">Position</div> 5 </div> <div class="section"> <div class="small" >View</div> <span id="viewName"></span> </div> <div class="section"> <div class="small" >Facing</div> <span id="facingName"></span> </div> <a href="#" class="btn btn-primary m-t-20 m-b-10" id="">Apply</a> </div> </div> </nav> <div id="screen-one-region" class="section"> </div> <div id="screen-two-region" > </div> <div id="screen-three-region" > </div> <div id="screen-four-region" > </div>';

    mainView.prototype.events = {
      'click .view': function(e) {
        var index, viewString;
        viewString = 'All';
        if ($('#' + e.target.id).prop('checked') === true) {
          view.push($('#' + e.target.id).val());
          viewnames.push($('#' + e.target.id).attr('data-name'));
        } else {
          index = view.indexOf($('#' + e.target.id).val());
          if (index !== -1) {
            view.splice(index, 1);
            viewnames.splice(index, 1);
          }
        }
        if (view.length !== 0) {
          viewString = view.join(',');
        }
        App.defaults['view'] = viewString;
        return $('#viewName').text(viewnames.join(','));
      },
      'click .facing': function(e) {
        var facingString, index;
        facingString = 'All';
        if ($('#' + e.target.id).prop('checked') === true) {
          facing.push($('#' + e.target.id).val());
          facingnames.push($('#' + e.target.id).attr('data-name'));
        } else {
          index = facing.indexOf($('#' + e.target.id).val());
          if (index !== -1) {
            facing.splice(index, 1);
            facingnames.splice(index, 1);
          }
        }
        if (facing.length !== 0) {
          facingString = facing.join(',');
        }
        App.defaults['facing'] = facingString;
        return $('#facingName').text(facingnames.join(','));
      },
      'click #compare': function(e) {
        var body, menuRight, menuTop, showRightPush, showTop, win;
        win = window.open(SITEURL + "/wishlist/#wishList", '_blank');
        win.focus();
        menuRight = document.getElementById("cbp-spmenu-s2");
        menuTop = document.getElementById("cbp-spmenu-s3");
        showTop = document.getElementById("showTop");
        showRightPush = document.getElementById("showRightPush");
        body = document.body;
        classie.toggle(showRightPush, "active");
        classie.toggle(body, "cbp-spmenu-push-toleft");
        return classie.toggle(menuRight, "cbp-spmenu-open");
      },
      'click .del': function(e) {
        var body, index, menuRight, menuTop, showRightPush, showTop, val;
        App.cookieArray = App.cookieArray;
        val = $('#' + e.target.id).attr('data-id');
        index = App.cookieArray.indexOf(parseInt(val));
        App.cookieArray.splice(index, 1);
        if (App.cookieArray.length <= 1) {
          $('#compare').hide();
        }
        $.cookie('key', App.cookieArray);
        localStorage.setItem("cookievalue", App.cookieArray);
        $('#errormsg').text("");
        if (App.cookieArray.length < 1) {
          $("#showRightPushs").addClass("hidden");
          menuRight = document.getElementById("cbp-spmenu-s2");
          menuTop = document.getElementById("cbp-spmenu-s3");
          showTop = document.getElementById("showTop");
          showRightPush = document.getElementById("showRightPush");
          body = document.body;
          classie.toggle(showRightPush, "active");
          classie.toggle(body, "cbp-spmenu-push-toleft");
          classie.toggle(menuRight, "cbp-spmenu-open");
        }
        return this.showWishList();
      },
      'click a': function(e) {
        return e.preventDefault();
      },
      'click .selectedunit': function(e) {
        var body, buildingModel, floorriserange, menuRight, menuTop, object, rangeArrayVal, rangeModel, showRightPush, showTop, unitModel;
        menuRight = document.getElementById("cbp-spmenu-s2");
        menuTop = document.getElementById("cbp-spmenu-s3");
        showTop = document.getElementById("showTop");
        showRightPush = document.getElementById("showRightPush");
        body = document.body;
        classie.toggle(showRightPush, "active");
        classie.toggle(body, "cbp-spmenu-push-toleft");
        classie.toggle(menuRight, "cbp-spmenu-open");
        App.unit['name'] = $('#' + e.target.id).attr('data-id');
        App.unit['flag'] = 1;
        unitModel = App.master.unit.findWhere({
          id: parseInt($('#' + e.target.id).attr('data-id'))
        });
        App.defaults['unitType'] = unitModel.get('unitType');
        App.defaults['building'] = unitModel.get('building');
        rangeModel = App.master.range;
        App.backFilter['screen3'].push("floor");
        App.backFilter['screen2'].push("floor", "unitVariant");
        buildingModel = App.master.building.findWhere({
          id: unitModel.get('building')
        });
        floorriserange = buildingModel.get('floorriserange');
        object = this;
        rangeArrayVal = [];
        $.each(floorriserange, function(index, value) {
          var end, i, start;
          rangeArrayVal = [];
          i = 0;
          start = parseInt(value.start);
          end = parseInt(value.end);
          while (parseInt(start) <= parseInt(end)) {
            rangeArrayVal[i] = start;
            start = parseInt(start) + 1;
            i++;
          }
          if (jQuery.inArray(parseInt(unitModel.get('floor')), rangeArrayVal) >= 0) {
            return App.defaults['floor'] = rangeArrayVal.join(',');
          }
        });
        App.navigate("screen-four");
        msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        return msgbus.showApp('screen:four').insideRegion(App.layout.screenFourRegion).withOptions();
      }
    };

    mainView.prototype.regions = {
      screenOneRegion: '#screen-one-region',
      screenTwoRegion: '#screen-two-region',
      screenThreeRegion: '#screen-three-region',
      screenFourRegion: '#screen-four-region'
    };

    mainView.prototype.onShow = function() {
      var cookieOldValue, height;
      $.reject({
        reject: {
          msie: 8
        },
        display: [],
        browserShow: true,
        browserInfo: {
          chrome: {
            text: "Google Chrome",
            url: "http://www.google.com/chrome/"
          },
          firefox: {
            text: "Mozilla Firefox",
            url: "http://www.mozilla.com/firefox/"
          },
          safari: {
            text: "Safari",
            url: "http://www.apple.com/safari/download/"
          },
          opera: {
            text: "Opera",
            url: "http://www.opera.com/download/"
          },
          msie: {
            text: "Internet Explorer",
            url: "http://www.microsoft.com/windows/Internet-explorer/",
            allow: false
          }
        },
        header: "<div class='skyiLogo'></div>Oops! Your browser isn't supported!",
        paragraph1: "Your browser is out of date, and is not compatible with " + "our website.",
        paragraph2: "A list of the most popular web browsers can be found below. Just click on the icons to go to the download page.",
        close: false,
        closeMessage: "By closing this window you acknowledge that your experience " + "on this website may be degraded",
        closeLink: "Close This Window",
        closeURL: "#",
        closeESC: false,
        closeCookie: false,
        cookieSettings: {
          path: "/",
          expires: 0
        },
        imagePath: "../wp-content/themes/apartmentselector/images/",
        overlayBgColor: "#fff",
        overlayOpacity: 1,
        fadeInTime: "1",
        fadeOutTime: "fast",
        analytics: false
      });
      height = $(window).scrollTop();
      $(window).scroll(function() {
        height = $(window).scrollTop();
        if (height < 300) {
          return $('.backBtn').addClass('hidden');
        } else {
          return $('.backBtn').removeClass('hidden');
        }
      });
      cookieOldValue = $.cookie("key");
      if (cookieOldValue === void 0 || $.cookie("key") === "") {
        cookieOldValue = [];
      } else {
        cookieOldValue = $.cookie("key").split(',').map(function(item) {
          return parseInt(item);
        });
      }
      if (cookieOldValue.length <= 1) {
        $('#compare').hide();
      }
      App.cookieArray = cookieOldValue;
      localStorage.setItem("cookievalue", App.cookieArray);
      return this.showWishList();
    };

    mainView.prototype.showWishList = function() {
      var building, element, model, selectedUnitsArray, table, unitType, unitVariant, _i, _len;
      table = "";
      if ($.cookie("key") !== void 0 && $.cookie("key") !== "") {
        selectedUnitsArray = $.cookie("key").split(",");
        table = "";
        for (_i = 0, _len = selectedUnitsArray.length; _i < _len; _i++) {
          element = selectedUnitsArray[_i];
          model = App.master.unit.findWhere({
            id: parseInt(element)
          });
          unitType = App.master.unit_type.findWhere({
            id: model.get('unitType')
          });
          unitVariant = App.master.unit_variant.findWhere({
            id: model.get('unitVariant')
          });
          building = App.master.building.findWhere({
            id: model.get('building')
          });
          table += '<li> <a href="#" id="unit' + element + '" data-id="' + element + '" class="selectedunit">' + model.get('name') + '</a> <a href="#" class="del" id="' + element + '" data-id="' + element + '"  ></a> <div class="clearfix"></div> </li>';
        }
      }
      return $('#showWishlist').html(table);
    };

    return mainView;

  })(Marionette.LayoutView);
  return msgbus.registerController('main:app', MainController);
});
