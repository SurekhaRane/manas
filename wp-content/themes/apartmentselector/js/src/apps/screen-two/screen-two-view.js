var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'marionette'], function(Extm, Marionette) {
  var BuildingView, ScreenTwoLayout, UnitTypeChildView, UnitTypeView, UnitView, UnitViewChildView, cloneunitVariantArrayColl, count, firstElement, globalUnitArrayInt, m, object, rangeArray, tagsArray, unitVariantArray, unitVariantIdArray, unitVariantString, unitVariants;
  m = "";
  unitVariantArray = '';
  unitVariantIdArray = [];
  unitVariantString = '';
  globalUnitArrayInt = [];
  firstElement = '';
  rangeArray = [];
  tagsArray = [];
  count = 0;
  object = "";
  unitVariants = [];
  cloneunitVariantArrayColl = "";
  ScreenTwoLayout = (function(_super) {
    __extends(ScreenTwoLayout, _super);

    function ScreenTwoLayout() {
      return ScreenTwoLayout.__super__.constructor.apply(this, arguments);
    }

    ScreenTwoLayout.prototype.template = '<div class=""> <h3 class="text-center light m-t-0 m-b-20 unittype hidden animated pulse">We found <span class="bold text-primary"> {{unitsCount }} </span> apartments that matched your selection</h3> <h3 class="text-center light m-t-0 m-b-20 budget hidden animated pulse">We found <span class="bold text-primary"> {{unitsCount }} </span>  apartments in your budget of <strong>{{selection}}</strong></h3> <h3 class="text-center light m-t-0 m-b-20 refresh hidden animated pulse">You are now seeing <span class="bold text-primary">All</span> apartments across all the towers.</h3> <!--<div class="text-center introTxt m-b-10">These apartments are spread over different towers. Each tower has three floor blocks. The number in the boxes indicate the number of apartments of your selection. Select one for more details.</div>--> <div class="introTxt text-center">You are seeing <div id="tagslist" class="taglist"> <ul></ul> </div> <span class="text-primary variantToggle1"> </span>variants of your apartment selection </div> <div class="variantBox1"> <div class="grid-container"> <div class="pull-left m-l-15"> <input type="checkbox" name="selectall" id="selectall" class="checkbox" value="0" checked/> <label for="selectall">Select/Unselect All</label> </div> <div class="text-right m-b-20"> <span class="variantClose1 glyphicon glyphicon-remove text-grey"></span> </div> {{#unitVariants}} <div class="grid-block-3" > <a class="grid-link selected" href="#" id="grid{{id}}" data-id="{{id}}"> {{sellablearea}} Sq.ft.<input type="hidden" name="check{{id}}"   id="check{{id}}"   value="1" /> </a> </div> {{/unitVariants}} <div class="variantAction m-t-5 m-b-20"> <a class="btn btn-primary m-r-10 done">DONE</a> <a class="btn btn-default cancel">CANCEL</a> </div> </div> </div> </div> <div class="row m-l-0 m-r-0 bgClass"> <div class="col-md-5 col-lg-4"> <div class="legend text-center m-b-20"> {{#unittypes}} <span class={{classname}}>.</span>{{name}} {{/unittypes}} </div> <div class="towerTable"> <div class="tableBody"> <div id="vs-container2" class="vs-container vs-triplelayout"> <header class="vs-header" id="building-region"></header> <div id="unit-region"></div> </div> </div> </div> <div class="h-align-middle m-t-20 m-b-20"> <a href="#screen-three-region" class="btn btn-default btn-lg disabled" id="screen-two-button">Show Apartments</a> </div> </div> <div class="col-md-7 col-lg-8 b-grey b-l visible-md visible-lg"> <div class="m-t-10 text-center"> <!--<h4 class="bold m-t-0">Where is this tower located in the project?</h4> <p class="light">This is a map of the entire project that shows the location of the tower selected (on the left).</p>--> <div id="loadmap"><div id="mapplic1" class="towersMap center-block"></div></div> </div> </div><input type="hidden" name="currency1" id="currency1" class="demo" data-a-sign="Rs. " data-d-group="2"> </div>';

    ScreenTwoLayout.prototype.className = 'page-container row-fluid';

    ScreenTwoLayout.prototype.regions = {
      buildingRegion: '#building-region',
      unitRegion: '#unit-region'
    };

    ScreenTwoLayout.prototype.onAfterRender = function(Collection) {
      this.itemview1 = new UnitTypeChildView({
        collection: Collection[0]
      });
      this.itemview2 = new UnitTypeView({
        collection: Collection[1]
      });
      this.$el.empty();
      this.itemview1.delegateEvents();
      this.$el.append(this.itemview1.render().el);
      return this.$el.append(this.itemview2.render().el);
    };

    ScreenTwoLayout.prototype.events = {
      'mouseout .im-pin': function(e) {
        return $('.im-tooltip').hide();
      },
      'mouseout .tower-link': function(e) {
        return $('.im-tooltip').hide();
      },
      'mouseover a.tower-link': function(e) {
        var buildigmodel, countunits, currency, element, floorCollunits, floorUnitsArray, id, key, locationData, mainnewarr, mainunique, mainunitTypeArray1, min, minmodel, myArray, screenonearray, selectorname, status, str1, text, units, units1, unitslen, unittypemodel, unittypetext, _i, _len;
        id = e.target.id;
        console.log(str1 = id.replace(/[^\d.]/g, ''));
        floorUnitsArray = [];
        myArray = [];
        buildigmodel = App.master.building.findWhere({
          id: parseInt(str1)
        });
        if (buildigmodel === void 0 || buildigmodel === "") {
          return false;
        }
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
        $.map(App.defaults, function(value, index) {
          if (value !== 'All') {
            if (index === 'unittypeback') {
              return myArray.push({
                key: index,
                value: value
              });
            }
          }
        });
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
          var classname;
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
        countunits = units.where({
          building: parseInt(str1)
        });
        buildigmodel = App.master.building.findWhere({
          id: parseInt(str1)
        });
        unittypetext = "";
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
            $('#currency1').autoNumeric('init');
            $('#currency1').autoNumeric('set', minmodel.get('unitPrice'));
            currency = $('#currency1').val();
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
      },
      'mouseover a.im-pin': function(e) {
        var id, locationData;
        id = e.target.id;
        locationData = m.getLocationData(id);
        return m.showTooltip(locationData);
      },
      'click a': function(e) {
        var id;
        e.preventDefault();
        return id = e.target.id;
      },
      'click .tower-link': function(e) {
        var id;
        e.preventDefault();
        return id = e.target.id;
      },
      'click .remodalcheck': function(e) {
        return e.preventDefault();
      },
      'click .tower-link': function(e) {
        var buildigmodel, element, floorColl, floorCollunits, floorUnitsArray, id, key, locationData, myArray, params, screenonearray, screenthreeArray, screentwoArray, status, str1, text, units, unitslen, _i, _j, _k, _len, _len1, _len2;
        console.log(id = e.target.id);
        console.log(str1 = id.replace(/[^\d.]/g, ''));
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
        $.map(App.defaults, function(value, index) {
          if (value !== 'All') {
            if (index === 'unittypeback') {
              return myArray.push({
                key: index,
                value: value
              });
            }
          }
        });
        status = App.master.status.findWhere({
          'name': 'Available'
        });
        unitslen = App.master.unit.where({
          'status': status.get('id')
        });
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
        floorColl = new Backbone.Collection(floorCollunits);
        units = floorColl.where({
          building: parseInt(str1)
        });
        console.log(units.length);
        if (units.length !== 0) {
          App.layout.screenThreeRegion.el.innerHTML = "";
          App.layout.screenFourRegion.el.innerHTML = "";
          $('#screen-three-region').removeClass('section');
          $('#screen-four-region').removeClass('section');
          screentwoArray = App.backFilter['screen2'];
          for (_j = 0, _len1 = screentwoArray.length; _j < _len1; _j++) {
            element = screentwoArray[_j];
            key = App.defaults.hasOwnProperty(element);
            if (key === true) {
              App.defaults[element] = 'All';
            }
          }
          screenthreeArray = App.backFilter['screen3'];
          for (_k = 0, _len2 = screenthreeArray.length; _k < _len2; _k++) {
            element = screenthreeArray[_k];
            key = App.defaults.hasOwnProperty(element);
            if (key === true) {
              App.defaults[element] = 'All';
            }
          }
          console.log(App.defaults['unittypeback']);
          App.defaults['unitVariant'] = App.defaults['unittypeback'];
          App.navigate("screen-two");
          App.currentStore.unit.reset(UNITS);
          App.currentStore.building.reset(BUILDINGS);
          App.currentStore.unit_type.reset(UNITTYPES);
          App.currentStore.unit_variant.reset(UNITVARIANTS);
          console.log(App.defaults);
          App.filter(params = {});
          msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
          return this.trigger('show:updated:building', $('#' + e.target.id).attr('data-id'));
        } else {
          text = "This Tower does not contain any apartments as per your current selection";
          locationData = m.getLocationData(id);
          return m.showTooltip(locationData, text);
        }
      },
      'click .grid-link': function(e) {
        var id, index, track;
        count = unitVariantArray.length;
        id = $('#' + e.target.id).attr('data-id');
        track = 0;
        if ($('#check' + id).val() === '1') {
          index = unitVariantArray.indexOf(parseInt(id));
          if (index !== -1) {
            unitVariantArray.splice(index, 1);
            $('#check' + id).val('0');
            track = 0;
            unitVariantIdArray.push(parseInt(id));
          }
        } else {
          track = 1;
          unitVariantArray.push(parseInt(id));
          $('#check' + id).val('1');
        }
        if (globalUnitArrayInt.length !== 0) {
          if (track === 0) {
            unitVariantArray = _.intersection(unitVariantArray, globalUnitArrayInt);
          } else {
            globalUnitArrayInt.push(parseInt(id));
            unitVariantArray = globalUnitArrayInt;
          }
        }
        unitVariantArray = _.uniq(unitVariantArray);
        if (unitVariantArray.length === 0) {
          unitVariantString = firstElement.toString();
        } else {
          if (cloneunitVariantArrayColl.length === unitVariantArray.length) {
            unitVariantString = 'All';
          } else {
            unitVariantString = unitVariantArray.join(',');
          }
        }
        if (unitVariantString === "All") {
          return $('#selectall').prop('checked', true);
        } else {
          return $('#selectall').prop('checked', false);
        }
      },
      'click .done': function(e) {
        var params, q;
        q = 1;
        if (unitVariantString === "") {
          unitVariantString = "All";
        }
        $(".variantBox1").slideToggle();
        $.map(App.backFilter, function(value, index) {
          var element, key, screenArray, _i, _len;
          if (q !== 1) {
            screenArray = App.backFilter[index];
            for (_i = 0, _len = screenArray.length; _i < _len; _i++) {
              element = screenArray[_i];
              if (element === 'unitVariant') {
                App.defaults[element] = unitVariantString;
              } else {
                key = App.defaults.hasOwnProperty(element);
                if (key === true) {
                  App.defaults[element] = 'All';
                }
              }
            }
          }
          return q++;
        });
        App.layout.screenThreeRegion.el.innerHTML = "";
        App.layout.screenFourRegion.el.innerHTML = "";
        App.navigate("screen-two");
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        if (unitVariantString === "") {
          unitVariantString = 'All';
        }
        App.defaults['unitVariant'] = unitVariantString;
        App.defaults['unittypeback'] = unitVariantString;
        App.backFilter['screen2'].push('unitVariant');
        App.filter(params = {});
        return this.trigger('unit:variants:selected');
      },
      'click .cancel': function(e) {
        var globalUnitVariants;
        unitVariantArray = _.union(unitVariantArray, unitVariantIdArray);
        $(".variantBox1").slideToggle();
        globalUnitVariants = App.defaults['unitVariant'].split(',');
        globalUnitArrayInt = [];
        $.each(globalUnitVariants, function(index, value) {
          return globalUnitArrayInt.push(parseInt(value));
        });
        if (App.defaults['unitVariant'] !== 'All') {
          return $.each(unitVariantArray, function(index, value) {
            var key;
            key = _.contains(globalUnitArrayInt, parseInt(value));
            if (key === true) {
              $('#grid' + value).addClass('selected');
              return $('#check' + value).val('1');
            } else {
              $('#grid' + value).removeClass('selected');
              return $('#check' + value).val('0');
            }
          });
        }
      },
      'click #selectall': function(e) {
        var remainainArray, tempArray, units, value;
        if ($('#' + e.target.id).prop('checked') === true) {
          cloneunitVariantArrayColl.each(function(index) {
            $('#grid' + index.get('id')).addClass('selected');
            $('#check' + index.get('id')).val('1');
            return unitVariantArray.push(index.get('id'));
          });
          unitVariantArray = _.uniq(unitVariantArray);
          units = cloneunitVariantArrayColl.toArray();
          units.sort(function(a, b) {
            return a.get('id') - b.get('id');
          });
          return unitVariantString = 'All';
        } else {
          tempArray = [];
          cloneunitVariantArrayColl.each(function(value) {
            return tempArray.push(parseInt(value.get('id')));
          });
          value = _.first(tempArray);
          remainainArray = _.rest(tempArray);
          $.each(remainainArray, function(index, value) {
            $('#grid' + value).removeClass('selected');
            $('#check' + value).val('0');
            index = unitVariantArray.indexOf(parseInt(value));
            if (index !== -1) {
              return unitVariantArray.splice(index, 1);
            }
          });
          return unitVariantString = value.toString();
        }
      },
      'click #screen-two-button': function(e) {
        $('#screen-three-region').addClass('section');
        return this.trigger('unit:count:selected');
      }
    };

    ScreenTwoLayout.prototype.showHighlightedTowers = function() {
      var buidlingValue, building, masterbuilding;
      building = Marionette.getOption(this, 'buildingColl').toArray();
      buidlingValue = _.first(building);
      masterbuilding = App.master.building;
      return masterbuilding.each(function(index) {
        return $("#highlighttower" + index.get('id')).attr('class', 'overlay');
      });
    };

    ScreenTwoLayout.prototype.onShow = function() {
      var ajaxurl, buidlingValue, building, defer, globalUnitVariants, i, params, scr, selector, testtext, unitVariantArrayColl, unitVariantArrayText, unitVariantsArray;
      $('#screen-two-button').on('click', function() {
        return new jBox('Notice', {
          content: 'Finding available apartments that match your selection...',
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
      rangeArray = [];
      globalUnitArrayInt = [];
      if (App.defaults['unitVariant'] !== 'All') {
        globalUnitVariants = App.defaults['unitVariant'].split(',');
        $.each(globalUnitVariants, function(index, value) {
          return globalUnitArrayInt.push(parseInt(value));
        });
      }
      if (unitVariantString === "All" || App.defaults['unitVariant'] === "All") {
        $('#selectall').prop('checked', true);
      } else {
        $('#selectall').prop('checked', false);
      }
      if (App.screenOneFilter['key'] === 'unitType') {
        $('.unittype').removeClass('hidden');
      } else if (App.screenOneFilter['key'] === 'budget') {
        $('.budget').removeClass('hidden');
      } else if (App.screenOneFilter['key'] === "") {
        $('.refresh').removeClass('hidden');
      }
      unitVariantArray = Marionette.getOption(this, 'uintVariantId');
      unitVariantsArray = Marionette.getOption(this, 'unitVariants');
      unitVariantArrayColl = new Backbone.Collection(unitVariantsArray);
      cloneunitVariantArrayColl = unitVariantArrayColl.clone();
      unitVariants = unitVariantArray;
      firstElement = _.first(unitVariantArray);
      if (App.defaults['unitVariant'] !== 'All') {
        unitVariantArray = _.union(unitVariantArray, unitVariantIdArray);
        $.each(unitVariantArray, function(index, value) {
          var key;
          key = _.contains(globalUnitArrayInt, parseInt(value));
          if (key === true) {
            $('#grid' + value).addClass('selected');
            return $('#check' + value).val('1');
          } else {
            index = unitVariantArray.indexOf(parseInt(value));
            $('#grid' + value).removeClass('selected');
            return $('#check' + value).val('0');
          }
        });
      } else {
        unitVariantArray = unitVariantArray;
        $.each(unitVariantArray, function(index, value) {
          $('#grid' + value).addClass('selected');
          return $('#check' + value).val('1');
        });
      }
      $(".variantToggle1").click(function() {
        $(this).toggleClass("open");
        $(".variantBox1").slideToggle();
      });
      $(".variantClose1").click(function() {
        $(".variantBox1").slideToggle();
        $(".variantToggle1").toggleClass("open");
      });
      $(".grid-link").click(function(e) {
        $(this).toggleClass("selected");
      });
      i = 1;
      building = Marionette.getOption(this, 'buildingColl').toArray();
      buidlingValue = _.first(building);
      while (window['mapplic' + i] !== void 0) {
        params = window['mapplic' + i];
        selector = '#mapplic' + i;
        ajaxurl = AJAXURL;
        defer = $(selector).mapplic({
          'id': 5,
          'width': params.width,
          'height': params.height,
          'option': buidlingValue
        });
        i++;
      }
      m = $('#mapplic1').data('mapplic');
      this.showHighlightedTowers();
      $('html, body').delay(600).animate({
        scrollTop: $('#screen-two-region').offset().top
      }, 'slow');
      tagsArray = [];
      testtext = App.defaults['unitVariant'];
      if (testtext !== 'All') {
        unitVariantArrayText = testtext.split(',');
        $.each(unitVariantArrayText, function(index, value) {
          var unitVariantModel;
          unitVariantModel = App.master.unit_variant.findWhere({
            id: parseInt(value)
          });
          return tagsArray.push({
            id: value,
            area: unitVariantModel.get('sellablearea') + 'Sq.ft.'
          });
        });
      } else {
        unitVariantArrayText = testtext.split(',');
        tagsArray.push({
          id: 'All',
          area: 'All'
        });
      }
      this.doListing();
      object = this;
      scr = document.createElement('script');
      scr.src = '../wp-content/themes/apartmentselector/js/src/preload/main2.js';
      document.body.appendChild(scr);
      scr = document.createElement('script');
      scr.src = '../wp-content/themes/apartmentselector/js/src/preload/jquery.remodal.js';
      return document.body.appendChild(scr);
    };

    $(document).on("click", ".closeButton", function() {
      var theidtodel;
      theidtodel = $(this).parent('li').attr('id');
      return object.delItem($('#' + theidtodel).attr('data-itemNum'));
    });

    ScreenTwoLayout.prototype.doListing = function() {
      $('#tagslist ul li').remove();
      $.each(tagsArray, function(index, value) {
        return $('#tagslist ul').append('<li id="li-item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.area + '</span><div class="closeButton"></div></li>');
      });
      if (tagsArray.length === 1) {
        return $('.closeButton').addClass('hidden');
      }
    };

    ScreenTwoLayout.prototype.delItem = function(delnum) {
      var i, index, key, params, q, removeItem, unitvariantarrayValues;
      removeItem = delnum;
      i = 0;
      key = "";
      $.each(tagsArray, function(index, val) {
        if (val.id === delnum) {
          key = i;
        }
        return i++;
      });
      index = key;
      if (index >= 0) {
        tagsArray.splice(index, 1);
        $('#li-item-' + delnum).remove();
        unitvariantarrayValues = [];
        $.each(tagsArray, function(index, value) {
          return unitvariantarrayValues.push(value.id);
        });
        q = 1;
        $.map(App.backFilter, function(value, index) {
          var element, screenArray, _i, _len;
          if (q !== 1) {
            screenArray = App.backFilter[index];
            for (_i = 0, _len = screenArray.length; _i < _len; _i++) {
              element = screenArray[_i];
              if (element === 'unitVariant') {
                App.defaults[element] = unitVariantString;
              } else {
                key = App.defaults.hasOwnProperty(element);
                if (key === true) {
                  App.defaults[element] = 'All';
                }
              }
            }
          }
          return q++;
        });
        App.layout.screenThreeRegion.el.innerHTML = "";
        App.layout.screenFourRegion.el.innerHTML = "";
        App.navigate("screen-two");
        App.defaults['unitVariant'] = unitvariantarrayValues.join(',');
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        App.filter(params = {});
        return this.trigger('unit:variants:selected');
      }
    };

    return ScreenTwoLayout;

  })(Marionette.LayoutView);
  BuildingView = (function(_super) {
    __extends(BuildingView, _super);

    function BuildingView() {
      return BuildingView.__super__.constructor.apply(this, arguments);
    }

    BuildingView.prototype.template = '<a  class="link" href="tower{{id}}">{{name}}</a>';

    BuildingView.prototype.tagName = 'li';

    BuildingView.prototype.className = 'vs-nav-current';

    BuildingView.prototype.events = {
      'click .link': function(e) {
        var i, id, params, selector;
        id = this.model.get('id');
        i = 1;
        params = window['mapplic' + i];
        selector = '#mapplic' + i;
        if (this.model.get('id') === void 0) {
          id = "";
        }
        return this.showHighlightedBuildings(id);
      }
    };

    BuildingView.prototype.showHighlightedBuildings = function(id) {
      var building, masterbuilding;
      masterbuilding = App.master.building;
      masterbuilding.each(function(index) {
        return $("#highlighttower" + index.get('id')).attr('class', 'overlay');
      });
      if (id !== "") {
        building = id;
        return $("#highlighttower" + building).attr('class', 'overlay highlight');
      }
    };

    BuildingView.prototype.initialize = function() {
      return this.$el.prop("id", 'towerlink' + this.model.get("id"));
    };

    return BuildingView;

  })(Marionette.ItemView);
  UnitTypeChildView = (function(_super) {
    __extends(UnitTypeChildView, _super);

    function UnitTypeChildView() {
      return UnitTypeChildView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeChildView.prototype.tagName = 'ul';

    UnitTypeChildView.prototype.className = 'vs-nav';

    UnitTypeChildView.prototype.childView = BuildingView;

    UnitTypeChildView.prototype.onShow = function() {
      var id, model;
      model = this.collection.at(0);
      return id = 'tower' + model.get('id');
    };

    return UnitTypeChildView;

  })(Marionette.CompositeView);
  UnitViewChildView = (function(_super) {
    __extends(UnitViewChildView, _super);

    function UnitViewChildView() {
      return UnitViewChildView.__super__.constructor.apply(this, arguments);
    }

    UnitViewChildView.prototype.template = '<div id="range{{range}}{{buildingid}}" class="boxBlank {{classname}} {{disable}}"> <div class="pull-left light text-center"> <h4 class="rangeName bold m-t-5">{{rangetext}}</h4> <div class="small">{{rangeNo}}</div> </div> <div class="unitCount pull-right text-center"> <h4 class="bold m-b-5 m-t-0">{{count}}</h4> <div class="small">FLATS</div> </div> <div class="clearfix"></div> </div> <input type="hidden" name="checkrange{{range}}{{buildingid}}"   id="checkrange{{range}}{{buildingid}}"       value="0" />                             </div>';

    UnitViewChildView.prototype.className = 'towerSelect';

    UnitViewChildView.prototype.events = {
      'click ': function(e) {
        var buildingModel, element, floorriserange, i, index, q, rangeArrayVal, rangeString, _i, _len;
        q = 1;
        $.map(App.backFilter, function(value, index) {
          var element, key, screenArray, _i, _len;
          if (q !== 1) {
            screenArray = App.backFilter[index];
            for (_i = 0, _len = screenArray.length; _i < _len; _i++) {
              element = screenArray[_i];
              if (element === 'unitVariant') {
                if (unitVariantString === "") {
                  unitVariantString = "All";
                }
                App.defaults[element] = unitVariantString;
              } else {
                key = App.defaults.hasOwnProperty(element);
                if (key === true) {
                  App.defaults[element] = 'All';
                }
              }
            }
          }
          return q++;
        });
        App.navigate("screen-two");
        $('#screen-three-region').removeClass('section');
        $('#screen-four-region').removeClass('section');
        App.layout.screenThreeRegion.el.innerHTML = "";
        App.layout.screenFourRegion.el.innerHTML = "";
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        if (this.model.get('count') !== 0) {
          for (index = _i = 0, _len = rangeArray.length; _i < _len; index = ++_i) {
            element = rangeArray[index];
            if (element === this.model.get('range') + this.model.get('buildingid')) {
              $("#checkrange" + this.model.get('range') + this.model.get('buildingid')).val('1');
            } else {
              $("#checkrange" + element).val('0');
              $('#range' + element).removeClass('selected');
              rangeArray = [];
            }
          }
          if (parseInt($("#checkrange" + this.model.get('range') + this.model.get('buildingid')).val()) === 0) {
            rangeArray.push(this.model.get('range') + this.model.get('buildingid'));
            $('#range' + this.model.get('range') + this.model.get('buildingid')).addClass('selected');
            $("#checkrange" + this.model.get('range') + this.model.get('buildingid')).val("1");
            buildingModel = App.currentStore.building.findWhere({
              id: this.model.get('buildingid')
            });
            floorriserange = buildingModel.get('floorriserange');
            object = this;
            rangeArrayVal = [];
            i = 0;
            $.each(floorriserange, function(index, value) {
              var end, start;
              if (object.model.get('range') === value.name) {
                start = parseInt(value.start);
                end = parseInt(value.end);
                while (parseInt(start) <= parseInt(end)) {
                  rangeArrayVal[i] = start;
                  start = parseInt(start) + 1;
                  i++;
                }
                return rangeArrayVal;
              }
            });
            rangeString = rangeArrayVal.join(',');
            App.defaults['floor'] = rangeString;
            App.backFilter['screen2'].push('floor');
            App.defaults['building'] = parseInt(this.model.get('buildingid'));
            App.backFilter['screen2'].push('building');
            $('#screen-two-button').removeClass('disabled btn-default');
            $("#screen-two-button").addClass('btn-primary');
            console.log(App.defaults);
            this.trigger('unit:count:selected');
          } else {
            rangeArray = [];
            $("#checkrange" + this.model.get('range') + this.model.get('buildingid')).val("0");
            $('#range' + this.model.get('range') + this.model.get('buildingid')).removeClass('selected');
          }
        }
        if (parseInt($("#checkrange" + this.model.get('range') + this.model.get('buildingid')).val()) === 0) {
          $("#screen-two-button").addClass('disabled btn-default');
          $("#screen-two-button").removeClass('btn-primary');
          return false;
        }
      }
    };

    return UnitViewChildView;

  })(Marionette.ItemView);
  UnitView = (function(_super) {
    __extends(UnitView, _super);

    function UnitView() {
      return UnitView.__super__.constructor.apply(this, arguments);
    }

    UnitView.prototype.template = '<div class="vs-content"> <div class="towerUnits"> <div class="subHeader "> <div class="row small light"> <div class="col-xs-5"> FLOOR<br>RANGE </div> <div class="col-xs-7 text-right"> NO. OF UNITS OF<br>YOUR SELECTION </div> </div> </div> </div> <!--<div class="towerDetails m-t-10"> <div class="row"> <div class="col-xs-4"> <h4 class="m-t-0 m-b-0 bold">Total Apartments</h4> <h3 class="light m-t-0">{{totalunits}}</h3> </div> <div class="col-xs-4"> <h4 class="m-t-0 m-b-0 bold">Available Apartments</h4> <h3 class="light m-t-0">{{availableunits}}</h3> </div> <div class="col-xs-4"> <h4 class="m-t-0 m-b-0 bold">Number of Floors</h4> <h3 class="light m-t-0">{{totalfloors}}</h3> </div> </div> <div class="row"> <div class="col-sm-12 m-t-10"> <div class="col"> <p>Climb leg make muffins or sweet beast play time and hate dog or chew foot. Stretch climb leg. Play time give attitude for all of a sudden go crazy chase imaginary bugs lick butt. Claw drapes burrow under covers so hide when guests come over, inspect anything brought into the house hopped up on goofballs. Nap all day swat at dog and rub face on everything stick butt in face all of a sudden go crazy need to chase tail yet rub face on everything.</p> </div> </div> </div> <h4 class="m-t-0 m-b-5 text-primary"><span class="bold">VIEWS</span> for this tower</h4> <div class="row m-b-20"> {{#views}} <div class="col-sm-6"> {{#data}}<span class="glyphicon glyphicon-asterisk small text-grey"></span> {{name}}<br>{{/data}} </div> {{/views}} </div> </div>--> </div>';

    UnitView.prototype.tagName = 'section';

    UnitView.prototype.childView = UnitViewChildView;

    UnitView.prototype.childViewContainer = '.towerUnits';

    UnitView.prototype.initialize = function() {
      this.collection = this.model.get('units');
      return this.$el.prop("id", 'tower' + this.model.get("buildingid"));
    };

    UnitView.prototype.onShow = function() {
      if ($("#unit-region section").length < 2) {
        $("#unit-region section").addClass("vs-current");
      }
    };

    return UnitView;

  })(Marionette.CompositeView);
  UnitTypeView = (function(_super) {
    __extends(UnitTypeView, _super);

    function UnitTypeView() {
      return UnitTypeView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeView.prototype.childView = UnitView;

    UnitTypeView.prototype.className = "vs-wrapper";

    return UnitTypeView;

  })(Marionette.CompositeView);
  return {
    ScreenTwoLayout: ScreenTwoLayout,
    UnitTypeChildView: UnitTypeChildView,
    UnitTypeView: UnitTypeView
  };
});
