var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var ScreenOneView, UnitTypeView, m, object, unitType;
  unitType = [];
  object = "";
  m = "";
  UnitTypeView = (function(_super) {
    __extends(UnitTypeView, _super);

    function UnitTypeView() {
      return UnitTypeView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeView.prototype.className = "grid-block-1";

    UnitTypeView.prototype.template = '<a class="grid-link"> <div class="grid-text-wrap"> <span class="grid-main-title">{{name}}</span> <span class="grid-sub-title">{{min_value}} to {{max_value}} (sq. ft.)</span> <input type="hidden" name="check{{id}}"   id="check{{id}}"       value="0" /> </div> </a>';

    UnitTypeView.prototype.events = {
      'click ': 'unitTypeSelected'
    };

    UnitTypeView.prototype.initialize = function() {
      return this.$el.prop("id", 'unittype' + this.model.get("id"));
    };

    UnitTypeView.prototype.unitTypeSelected = function(evt) {
      var buildings, element, index, newColl, newUnits, status, uniqBuildings, unitTypeModel, unitTypeString, _i, _len;
      $.map(App.backFilter, function(value, index) {
        var element, key, screenArray, _i, _len, _results;
        screenArray = App.backFilter[index];
        _results = [];
        for (_i = 0, _len = screenArray.length; _i < _len; _i++) {
          element = screenArray[_i];
          key = App.defaults.hasOwnProperty(element);
          if (key === true) {
            _results.push(App.defaults[element] = 'All');
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
      App.layout.screenTwoRegion.el.innerHTML = "";
      App.layout.screenThreeRegion.el.innerHTML = "";
      App.layout.screenFourRegion.el.innerHTML = "";
      App.navigate("");
      App.currentStore.unit.reset(UNITS);
      App.currentStore.building.reset(BUILDINGS);
      App.currentStore.unit_type.reset(UNITTYPES);
      App.currentStore.unit_variant.reset(UNITVARIANTS);
      evt.preventDefault();
      msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
      $("li").removeClass('cs-selected');
      $(".cs-placeholder").text('Undecided');
      $('a').removeClass('selected');
      for (index = _i = 0, _len = unitType.length; _i < _len; index = ++_i) {
        element = unitType[index];
        if (parseInt(element) === parseInt(this.model.get('id'))) {
          $("#check" + this.model.get('id')).val('1');
        } else {
          $("#check" + element).val('0');
          unitType = [];
          App.backFilter['screen1'] = [];
        }
      }
      if (parseInt($("#check" + this.model.get('id')).val()) === 0) {
        unitType.push(this.model.get('id'));
        App.backFilter['screen1'].push('unitType');
        $('#unittype' + this.model.get("id") + ' a').addClass('selected');
        $("#check" + this.model.get('id')).val("1");
      } else {
        this.unHighlightedTowers();
        unitType = [];
        App.backFilter['screen1'] = [];
        $("#check" + this.model.get('id')).val("0");
      }
      if (parseInt($("#check" + this.model.get('id')).val()) === 0) {
        $("#finalButton").addClass('disabled btn-default');
        $("#finalButton").removeClass('btn-primary');
        $("#finalButton").text("Show Apartments");
        $('#screen-two-region').removeClass('section');
        $('#screen-three-region').removeClass('section');
        $('#screen-four-region').removeClass('section');
        return false;
      }
      unitTypeString = unitType.join(',');
      App.defaults['unitType'] = unitTypeString;
      $('#screen-two-region').removeClass('section');
      $('#screen-three-region').removeClass('section');
      $('#screen-four-region').removeClass('section');
      App.screenOneFilter['value'] = unitTypeString;
      App.screenOneFilter['key'] = 'unitType';
      $("#finalButton").removeClass('disabled btn-default');
      $("#finalButton").addClass('btn-primary');
      unitTypeModel = App.master.unit_type.findWhere({
        id: parseInt(App.defaults['unitType'])
      });
      $("#finalButton").text("Show " + unitTypeModel.get('name') + " Apartments");
      status = App.currentStore.status.findWhere({
        'name': 'Available'
      });
      newUnits = App.currentStore.unit.where({
        unitType: parseInt(App.defaults['unitType']),
        status: status.get('id')
      });
      newColl = new Backbone.Collection(newUnits);
      buildings = newColl.pluck("building");
      uniqBuildings = _.uniq(buildings);
      return this.showHighlightedTowers(uniqBuildings);
    };

    object = UnitTypeView;

    UnitTypeView.prototype.showHighlightedTowers = function(uniqBuildings) {
      var building, masterbuilding;
      masterbuilding = App.master.building;
      masterbuilding.each(function(index) {
        return $("#hglighttower" + index.get('id')).attr('class', 'overlay');
      });
      building = uniqBuildings;
      return $.each(uniqBuildings, function(index, value) {
        var buidlingValue;
        buidlingValue = App.master.building.findWhere({
          id: parseInt(value)
        });
        return $("#hglighttower" + buidlingValue.get('id')).attr('class', 'overlay highlight');
      });
    };

    UnitTypeView.prototype.unHighlightedTowers = function() {
      var masterbuilding;
      masterbuilding = App.master.building;
      return masterbuilding.each(function(index) {
        return $("#hglighttower" + index.get('id')).attr('class', 'overlay');
      });
    };

    return UnitTypeView;

  })(Marionette.ItemView);
  return ScreenOneView = (function(_super) {
    __extends(ScreenOneView, _super);

    function ScreenOneView() {
      return ScreenOneView.__super__.constructor.apply(this, arguments);
    }

    ScreenOneView.prototype.template = '<h3 class="light text-center m-t-0">LOREM IPSUM TITLE</h3> <h4 class="text-center introTxt">We at Skyi have built a unique apartment selector for you.<br>Of the hundreds of apartments available you can now find the one that best fits your requirements.</h4> <!--<div class="text-center introTxt">The apartment selector helps you find your ideal home. Browse through available apartments and find the location, size, budget and layout that best suit you.</div> <div class="introTxt text-center">To get started, either:</div>--> <div class="row m-l-0 m-r-0 bgClass"> <div class="col-md-5 col-lg-4"> <div class="text-center subTxt">Choose a unit type</div> <div class="grid-container"></div> <h5 class="text-center m-t-20 m-b-20 bold">OR</h5> <div class="text-center subTxt">Choose a budget</div> <section> <select class="cs-select cs-skin-underline" id="budgetValue"> <option value="" disabled selected>Undecided</option> {{#priceArray}} <option value="{{id}}">{{name}}</option> {{/priceArray}} </select> </section> <div class="h-align-middle m-t-50 m-b-20"> <a href="#screen-two-region" class="btn btn-default btn-lg disabled" id="finalButton">Show Apartments</a> </div> </div> <div class="col-md-7 col-lg-8 b-grey b-l visible-md visible-lg"> <div id="mapplic_new1" class="towersMap center-block"></div> </div><input type="hidden" name="currency" id="currency" class="demo" data-a-sign="Rs. " data-d-group="2"> </div>';

    ScreenOneView.prototype.className = 'page-container row-fluid';

    ScreenOneView.prototype.childView = UnitTypeView;

    ScreenOneView.prototype.childViewContainer = '.grid-container';

    ScreenOneView.prototype.events = {
      'click #finalButton': function(e) {
        var budget_price, budget_val;
        if ($(".cs-placeholder").text() !== 'Undecided') {
          budget_val = $(".cs-selected").text().split(' ');
          if (budget_val[1] === 'lakhs') {
            budget_price = budget_val[0].split('-');
            budget_price[0] = budget_price[0] + '00000';
            budget_price[1] = budget_price[1] + '00000';
            budget_price = budget_price.join('-');
          }
          App.defaults['budget'] = $(".cs-selected").text();
          App.backFilter['screen1'].push('budget');
          App.screenOneFilter['value'] = $(".cs-selected").text();
          App.screenOneFilter['key'] = 'budget';
        } else {
          App.defaults['budget'] = 'All';
        }
        $('#screen-two-region').addClass('section');
        return this.trigger('unit:type:clicked');
      },
      'click .cs-selected': function(e) {
        var budget_price, budget_val, buildings, element, newColl, newUnits, uniqBuildings, _i, _len;
        $.map(App.backFilter, function(value, index) {
          var element, key, screenArray, _i, _len, _results;
          screenArray = App.backFilter[index];
          _results = [];
          for (_i = 0, _len = screenArray.length; _i < _len; _i++) {
            element = screenArray[_i];
            key = App.defaults.hasOwnProperty(element);
            if (key === true) {
              _results.push(App.defaults[element] = 'All');
            } else {
              _results.push(void 0);
            }
          }
          return _results;
        });
        if ($(".cs-placeholder").text() !== 'Undecided') {
          budget_val = $(".cs-selected").text().split(' ');
          if (budget_val[1] === 'lakhs') {
            budget_price = budget_val[0].split('-');
            budget_price[0] = budget_price[0] + '00000';
            budget_price[1] = budget_price[1] + '00000';
            budget_price = budget_price.join('-');
          }
          App.defaults['budget'] = $(".cs-selected").text();
          App.backFilter['screen1'].push('budget');
          App.screenOneFilter['value'] = $(".cs-selected").text();
          App.screenOneFilter['key'] = 'budget';
        } else {
          App.defaults['budget'] = 'All';
        }
        $('#screen-two-region').removeClass('section');
        $('#screen-three-region').removeClass('section');
        $('#screen-four-region').removeClass('section');
        App.layout.screenTwoRegion.el.innerHTML = "";
        App.layout.screenThreeRegion.el.innerHTML = "";
        App.layout.screenFourRegion.el.innerHTML = "";
        App.navigate("");
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        for (_i = 0, _len = unitType.length; _i < _len; _i++) {
          element = unitType[_i];
          $('a').removeClass('selected');
          $("#check" + element).val("0");
        }
        unitType = [];
        App.defaults['unitType'] = 'All';
        $("#finalButton").removeClass('disabled btn-default');
        $("#finalButton").addClass('btn-primary');
        $("#finalButton").text("Show Apartments in my Budget");
        budget_val = $(".cs-selected").text().split(' ');
        newUnits = App.getBudget(budget_val[0]);
        newColl = new Backbone.Collection(newUnits);
        buildings = newColl.pluck("building");
        uniqBuildings = _.uniq(buildings);
        return this.showHighlightedTowers(uniqBuildings);
      },
      'click a': function(e) {
        return e.preventDefault();
      },
      'mouseover a': function(e) {
        var id, locationData;
        id = e.target.id;
        return locationData = m.getLocationData(id);
      },
      'click .tower-over': function(e) {
        var id;
        e.preventDefault();
        id = e.target.id;
        return m.showLocation(id, 800);
      },
      'mouseout .tower-over': function(e) {
        return $('.im-tooltip').hide();
      },
      'mouseover .tower-over': function(e) {
        var buildigmodel, countunits, currency, element, floorCollunits, floorUnitsArray, id, key, locationData, mainnewarr, mainunique, mainunitTypeArray1, min, minmodel, myArray, screenonearray, selectorname, status, str1, text, units, units1, unitslen, unittypemodel, unittypetext, _i, _len;
        e.preventDefault();
        id = e.target.id;
        str1 = id.replace(/[^\d.]/g, '');
        buildigmodel = App.master.building.findWhere({
          id: parseInt(str1)
        });
        if (buildigmodel === void 0 || buildigmodel === "") {
          return false;
        }
        floorUnitsArray = [];
        myArray = [];
        screenonearray = App.backFilter['screen1'];
        for (_i = 0, _len = screenonearray.length; _i < _len; _i++) {
          element = screenonearray[_i];
          if (App.defaults[element] !== 'All') {
            key = App.defaults.hasOwnProperty(element);
            if (key === true) {
              console.log(App.defaults[element]);
              myArray.push({
                key: element,
                value: App.defaults[element]
              });
            }
          }
        }
        status = App.master.status.findWhere({
          'name': 'Available'
        });
        unitslen = App.master.unit.where({
          'status': status.get('id')
        });
        console.log(myArray);
        floorCollunits = [];
        $.each(unitslen, function(index, value1) {
          var flag;
          flag = 0;
          $.each(myArray, function(index, value) {
            var budget_arr, budget_price, buildingModel, floorRise, floorRiseValue, initvariant, paramKey, temp, tempstring, unitPrice, unitVariantmodel, _j, _len1, _results;
            paramKey = {};
            paramKey[value.key] = value.value;
            if (value.key === 'budget') {
              buildingModel = App.master.building.findWhere({
                'id': value1.get('building')
              });
              floorRise = buildingModel.get('floorrise');
              floorRiseValue = floorRise[value1.get('floor')];
              unitVariantmodel = App.master.unit_variant.findWhere({
                'id': value1.get('unitVariant')
              });
              unitPrice = value1.get('unitPrice');
              budget_arr = value.value.split(' ');
              budget_price = budget_arr[0].split('-');
              budget_price[0] = budget_price[0] + '00000';
              budget_price[1] = budget_price[1] + '00000';
              if (parseInt(unitPrice) >= parseInt(budget_price[0]) && parseInt(unitPrice) <= parseInt(budget_price[1])) {
                return flag++;
              }
            } else if (value.key !== 'floor') {
              if (value.key === 'unittypeback') {
                value.key = 'unitVariant';
              }
              temp = [];
              temp.push(value.value);
              tempstring = temp.join(',');
              initvariant = tempstring.split(',');
              if (initvariant.length > 1) {
                _results = [];
                for (_j = 0, _len1 = initvariant.length; _j < _len1; _j++) {
                  element = initvariant[_j];
                  if (value1.get(value.key) === parseInt(element)) {
                    _results.push(flag++);
                  } else {
                    _results.push(void 0);
                  }
                }
                return _results;
              } else {
                if (value1.get(value.key) === parseInt(value.value)) {
                  return flag++;
                }
              }
            }
          });
          if (flag === myArray.length) {
            return floorCollunits.push(value1);
          }
        });
        mainnewarr = [];
        mainunique = {};
        if (myArray.length === 0) {
          floorCollunits = unitslen;
        }
        units = new Backbone.Collection(floorCollunits);
        mainunitTypeArray1 = [];
        units1 = App.master.unit.where({
          'status': status.get('id')
        });
        $.each(units1, function(index, value) {
          var unitTypemodel;
          unitTypemodel = App.master.unit_type.findWhere({
            id: value.get('unitType')
          });
          return mainunitTypeArray1.push({
            id: unitTypemodel.get('id'),
            name: unitTypemodel.get('name')
          });
        });
        console.log(mainunitTypeArray1);
        $.each(mainunitTypeArray1, function(key, item) {
          var classname, count;
          if (!mainunique[item.id]) {
            if (item.id !== 14 && item.id !== 16) {
              status = App.master.status.findWhere({
                'name': 'Available'
              });
              count = units.where({
                unitType: item.id,
                'status': status.get('id'),
                'building': parseInt(str1)
              });
              if (parseInt(item.id) === 9) {
                classname = 'twoBHK';
              } else {
                classname = 'threeBHK';
              }
              mainnewarr.push({
                id: item.id,
                name: item.name,
                classname: classname,
                count: count
              });
              return mainunique[item.id] = item;
            }
          }
        });
        console.log(mainnewarr);
        unittypetext = "";
        countunits = units.where({
          building: parseInt(str1)
        });
        buildigmodel = App.master.building.findWhere({
          id: parseInt(str1)
        });
        if (buildigmodel === void 0 || buildigmodel === "") {
          text = "Not Launched";
        } else {
          min = "";
          text = "<span></span>";
          if (countunits.length > 0) {
            console.log(minmodel = _.min(countunits, function(model) {
              if (model.get('unitType') !== 14 && model.get('unitType') !== 16) {
                return model.get('unitPrice');
              }
            }));
            $('#currency').autoNumeric('init');
            $('#currency').autoNumeric('set', minmodel.get('unitPrice'));
            currency = $('#currency').val();
            if (App.defaults['unitType'] !== 'All') {
              selectorname = App.defaults['unitType'];
              unittypemodel = App.master.unit_type.findWhere({
                id: parseInt(App.defaults['unitType'])
              });
              selectorname = unittypemodel.get('name');
              text = selectorname + ' apartments - </span>' + countunits.length + '<br/><span>Starting Price - </span>' + currency;
            } else if (App.defaults['budget'] !== "All") {
              selectorname = App.defaults['budget'];
              $.each(mainnewarr, function(index, value) {
                return unittypetext += '<span>' + value.name + ' :</span><span>' + value.count.length + '</span></br>';
              });
              text = '<span>Apartments within ' + selectorname + ' - </span>' + countunits.length + '<br/>' + unittypetext + '<br/><span>Starting Price - </span>' + currency;
            } else if (App.defaults['unitType'] === 'All' && App.defaults['budget'] === "All") {
              selectorname = "";
              $.each(mainnewarr, function(index, value) {
                return unittypetext += '<span>' + value.name + ' :</span><span>' + value.count.length + '</span></br>';
              });
              text = '<span>No. of ' + selectorname + ' apartments - </span>' + countunits.length + '<br/>' + unittypetext + '<br/><span>Starting Price - </span>' + currency;
            }
          } else {
            if (App.defaults['unitType'] !== 'All') {
              selectorname = App.defaults['unitType'];
              unittypemodel = App.master.unit_type.findWhere({
                id: parseInt(App.defaults['unitType'])
              });
              selectorname = unittypemodel.get('name');
              text = selectorname + ' apartments - </span>' + countunits.length + '<br/><span>';
            } else if (App.defaults['budget'] !== "All") {
              selectorname = App.defaults['budget'];
              text = '<span>Apartments within ' + selectorname + ' - </span>' + countunits.length;
            }
          }
        }
        locationData = m.getLocationData(id);
        return m.showTooltip(locationData, text);
      }
    };

    ScreenOneView.prototype.showHighlightedTowers = function(uniqBuildings) {
      var building, masterbuilding;
      masterbuilding = App.master.building;
      masterbuilding.each(function(index) {
        return $("#hglighttower" + index.get('id')).attr('class', 'overlay');
      });
      building = uniqBuildings;
      return $.each(uniqBuildings, function(index, value) {
        var buidlingValue;
        buidlingValue = App.master.building.findWhere({
          id: parseInt(value)
        });
        return $("#hglighttower" + buidlingValue.get('id')).attr('class', 'overlay highlight');
      });
    };

    ScreenOneView.prototype.onShow = function() {
      var ajaxurl, i, params, selector;
      $('#finalButton').on('click', function() {
        return new jBox('Notice', {
          content: 'Finding available apartments matching your selection...',
          autoClose: 2000,
          addClass: 'notifyBox',
          position: {
            x: 'center',
            y: 'top'
          },
          animation: {
            open: 'slide:top',
            close: 'slide:top'
          }
        });
      });
      [].slice.call(document.querySelectorAll('select.cs-select')).forEach(function(el) {
        return new SelectFx(el);
      });
      $(".grid-link").click(function() {
        return $(this).toggleClass("selected");
      });
      unitType = [];
      i = 1;
      while (window['mapplic_new' + i] !== void 0) {
        params = window['mapplic_new' + i];
        selector = '#mapplic_new' + i;
        ajaxurl = AJAXURL;
        $(selector).mapplic_new({
          'id': 6,
          'width': params.width,
          'height': params.height
        });
        i++;
      }
      return m = $('#mapplic_new1').data('mapplic_new');
    };

    return ScreenOneView;

  })(Marionette.CompositeView);
});
