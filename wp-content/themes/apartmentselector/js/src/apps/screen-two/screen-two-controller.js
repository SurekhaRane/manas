var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/screen-two/screen-two-view'], function(Extm, ScreenTwoView) {
  var ScreenTwoController, tagsArray;
  tagsArray = "";
  ScreenTwoController = (function(_super) {
    __extends(ScreenTwoController, _super);

    function ScreenTwoController() {
      this._unitCountSelected = __bind(this._unitCountSelected, this);
      this.showViews = __bind(this.showViews, this);
      this.showUpdateBuilding = __bind(this.showUpdateBuilding, this);
      return ScreenTwoController.__super__.constructor.apply(this, arguments);
    }

    ScreenTwoController.prototype.initialize = function() {
      this.Collection = this._getUnitsCountCollection();
      this.layout = new ScreenTwoView.ScreenTwoLayout({
        collection: this.Collection[1],
        buildingColl: this.Collection[0],
        uintVariantId: this.Collection[9],
        uintVariantIdArray: this.Collection[10],
        unitVariants: this.Collection[8],
        templateHelpers: {
          selection: this.Collection[2],
          unitsCount: this.Collection[3],
          unittypes: this.Collection[4],
          high: this.Collection[5],
          medium: this.Collection[6],
          low: this.Collection[7],
          unitVariants: this.Collection[8],
          AJAXURL: AJAXURL
        }
      });
      this.listenTo(this.layout, "show", this.showViews);
      this.listenTo(this.layout, "show:updated:building", this.showUpdateBuilding);
      this.listenTo(this.layout, 'unit:variants:selected', this.showUpdateBuildings);
      this.listenTo(this.layout, 'unit:count:selected', this._unitCountSelected);
      return this.show(this.layout);
    };

    ScreenTwoController.prototype.showUpdateBuildings = function() {
      this.Collection = this._getUnitsCountCollection();
      this.layout = new ScreenTwoView.ScreenTwoLayout({
        collection: this.Collection[1],
        buildingColl: this.Collection[0],
        uintVariantId: this.Collection[9],
        uintVariantIdArray: this.Collection[10],
        unitVariants: this.Collection[8],
        templateHelpers: {
          selection: this.Collection[2],
          unitsCount: this.Collection[3],
          unittypes: this.Collection[4],
          high: this.Collection[5],
          medium: this.Collection[6],
          low: this.Collection[7],
          unitVariants: this.Collection[8],
          AJAXURL: AJAXURL
        }
      });
      this.listenTo(this.layout, "show", this.showViews);
      this.listenTo(this.layout, "show:updated:building", this.showUpdateBuilding);
      this.listenTo(this.layout, 'unit:variants:selected', this.showUpdateBuildings);
      this.listenTo(this.layout, 'unit:count:selected', this._unitCountSelected);
      return this.show(this.layout);
    };

    ScreenTwoController.prototype.showUpdateBuilding = function(id) {
      var buidlingValue, building, itemview1, itemview2, masterbuilding, scr;
      this.Collection = this._getUnitsCountCollection(id);
      itemview1 = new ScreenTwoView.UnitTypeChildView({
        collection: this.Collection[0]
      });
      itemview2 = new ScreenTwoView.UnitTypeView({
        collection: this.Collection[1]
      });
      this.layout.buildingRegion.$el.empty();
      this.layout.unitRegion.$el.empty();
      this.layout.buildingRegion.$el.append(itemview1.render().el);
      this.layout.unitRegion.$el.append(itemview2.render().el);
      scr = document.createElement('script');
      scr.src = '../wp-content/themes/apartmentselector/js/src/preload/main2.js';
      document.body.appendChild(scr);
      building = this.Collection[0].toArray();
      buidlingValue = _.first(building);
      masterbuilding = App.master.building;
      masterbuilding.each(function(index) {
        return $("#highlighttower" + index.get('id')).attr('class', 'overlay');
      });
      return $("#highlighttower" + buidlingValue.get('id')).attr('class', 'overlay highlight');
    };

    ScreenTwoController.prototype.showViews = function() {
      this.buildingCollection = this.Collection[0];
      this.unitCollection = this.Collection[1];
      this.showBuildingRegion(this.buildingCollection);
      return this.showUnitRegion(this.unitCollection);
    };

    ScreenTwoController.prototype.showBuildingRegion = function(buildingCollection) {
      var itemview1;
      itemview1 = this.getView(buildingCollection);
      return this.layout.buildingRegion.show(itemview1);
    };

    ScreenTwoController.prototype.showUnitRegion = function(unitCollection) {
      var itemview2;
      itemview2 = this.getUnitsView(unitCollection);
      return this.layout.unitRegion.show(itemview2);
    };

    ScreenTwoController.prototype.getView = function(buildingCollection) {
      return new ScreenTwoView.UnitTypeChildView({
        collection: buildingCollection
      });
    };

    ScreenTwoController.prototype.getUnitsView = function(unitCollection) {
      return new ScreenTwoView.UnitTypeView({
        collection: unitCollection
      });
    };

    ScreenTwoController.prototype._unitCountSelected = function() {
      return App.navigate("screen-three", {
        trigger: true
      });
    };

    ScreenTwoController.prototype._getUnitsCountCollection = function(paramid) {
      var Countunits, MainCollection, ModelActualArr, arrayvalue, buildingArray, buildingArrayModel, buildingCollection, buildingModel, buildingUnits, buildingsactual, buildingvalue, first, flag, floorCollection, floorCollunits, floorUnitsArray, floorriserange, highLength, hnewarr, i, index, itemCollection, j, key, keycheck, lnewarr, mainArray, mainnewarr, mainunique, mainunitTypeArray, mainunitTypeArray1, mainunitsTypeArray, mnewarr, modelArr, modelIdArr, myArray, param, paramkey, range, status, templateArr, templateString, uniqUnitvariant, unitColl, unitVariantID, unitVariantModels, units, units1, unitsactual, unitslen, unitvariant;
      if (paramid == null) {
        paramid = {};
      }
      buildingArray = Array();
      buildingArrayModel = Array();
      unitColl = Array();
      templateArr = [];
      mainunitTypeArray = [];
      mainnewarr = [];
      lnewarr = [];
      mnewarr = [];
      hnewarr = [];
      mainunique = {};
      MainCollection = new Backbone.Model();
      status = App.currentStore.status.findWhere({
        'name': 'Available'
      });
      key = _.isEmpty(paramid);
      if (key === true) {
        units = App.currentStore.unit.where({
          'status': status.get('id')
        });
      } else {
        units = App.currentStore.unit.where({
          'status': status.get('id')
        });
      }
      Countunits = App.currentStore.unit.where({
        'status': status.get('id')
      });
      param = {};
      paramkey = {};
      flag = 0;
      mainunitsTypeArray = [];
      mainArray = [];
      $.each(App.defaults, function(index, value) {
        var budget_Val, element, string_val, valuearr, _i, _len, _results;
        if (value !== 'All') {
          param[index] = value;
          string_val = _.isString(value);
          valuearr = "";
          if (string_val === true) {
            valuearr = value.split(',');
          }
          if (valuearr.length > 1) {
            _results = [];
            for (_i = 0, _len = valuearr.length; _i < _len; _i++) {
              element = valuearr[_i];
              if (index === 'unitType') {
                key = App.master.unit_type.findWhere({
                  id: parseInt(element)
                });
                templateArr.push(key.get('name'));
              }
              if (index === 'building') {
                key = App.master.building.findWhere({
                  id: parseInt(element)
                });
                templateArr.push(key.get('name'));
              }
              if (index === 'budget') {
                budget_Val = value + 'lakhs';
                templateArr.push(budget_Val);
              }
              if (index === 'floor') {
                _results.push(templateArr.push(value));
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            if (index === 'unitType') {
              key = App.master.unit_type.findWhere({
                id: parseInt(value)
              });
              templateArr.push(key.get('name'));
            }
            if (index === 'building') {
              key = App.master.building.findWhere({
                id: parseInt(value)
              });
              templateArr.push(key.get('name'));
            }
            if (index === 'budget') {
              budget_Val = value;
              templateArr.push(budget_Val);
            }
            if (index === 'floor') {
              return templateArr.push(value);
            }
          }
        }
      });
      if (templateArr.length === 0) {
        templateArr.push('All');
      }
      if (flag === 1) {
        first = _.first(templateArr);
        buildingModel = App.master.building.findWhere({
          id: App.building['name']
        });
        floorriserange = buildingModel.get('floorriserange');
        if (parseInt(first) >= floorriserange[0].start && parseInt(first) <= floorriserange[0].end) {
          range = 'LOWRISE' + ',' + buildingModel.get('name');
        }
        if (parseInt(first) >= floorriserange[1].start && parseInt(first) <= floorriserange[1].end) {
          range = 'MIDRISE' + ',' + buildingModel.get('name');
        }
        if (parseInt(first) >= floorriserange[2].start && parseInt(first) <= floorriserange[2].end) {
          range = 'HIGHRISE' + ',' + buildingModel.get('name');
        }
        templateString = range;
      } else {
        templateString = templateArr.join(',');
      }
      param = {};
      paramkey = {};
      flag = 0;
      floorUnitsArray = [];
      myArray = [];
      $.map(App.defaults, function(value, index) {
        if (value !== 'All') {
          if (index !== 'unitVariant' && index !== 'unittypeback') {
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
      unitslen = App.currentStore.unit.where({
        'status': status.get('id')
      });
      $.each(unitslen, function(index, value1) {
        var floorArray, floorstring;
        if (App.defaults['floor'] !== 'All') {
          floorstring = App.defaults['floor'];
          floorArray = floorstring.split(',');
          return $.each(floorArray, function(index, value) {
            if (value1.get('floor') === parseInt(value)) {
              return floorUnitsArray.push(value1);
            }
          });
        }
      });
      if (App.defaults['floor'] === "All") {
        floorUnitsArray = unitslen;
      }
      floorCollunits = [];
      $.each(floorUnitsArray, function(index, value1) {
        flag = 0;
        $.each(myArray, function(index, value) {
          var budget_arr, budget_price, floorRise, floorRiseValue, paramKey, unitPrice, unitVariantmodel;
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
            value1.get(value.key) + '== ' + parseInt(value.value);
            if (value1.get(value.key) === parseInt(value.value)) {
              return flag++;
            }
          }
        });
        if (flag === myArray.length) {
          return floorCollunits.push(value1);
        }
      });
      floorCollection = new Backbone.Collection(floorCollunits);
      unitvariant = floorCollection.pluck("unitVariant");
      uniqUnitvariant = _.uniq(unitvariant);
      unitVariantModels = [];
      unitVariantID = [];
      $.each(uniqUnitvariant, function(index, value) {
        var unitVarinatModel;
        unitVarinatModel = App.currentStore.unit_variant.findWhere({
          id: value
        });
        unitVariantModels.push({
          id: unitVarinatModel.get('id'),
          name: unitVarinatModel.get('name'),
          sellablearea: unitVarinatModel.get('sellablearea')
        });
        return unitVariantID.push(parseInt(unitVarinatModel.get('id')));
      });
      unitVariantModels.sort(function(a, b) {
        return a.id - b.id;
      });
      unitVariantID.sort(function(a, b) {
        return a - b;
      });
      mainunitTypeArray1 = [];
      units1 = App.master.unit.where({
        'status': status.get('id')
      });
      $.each(units1, function(index, value) {
        var unitType;
        unitType = App.master.unit_type.findWhere({
          id: value.get('unitType')
        });
        return mainunitTypeArray1.push({
          id: unitType.get('id'),
          name: unitType.get('name')
        });
      });
      $.each(units, function(index, value) {
        var maxcoll, unitType;
        maxcoll = Array();
        if (buildingArray.indexOf(value.get('building')) === -1) {
          buildingArray.push(value.get('building'));
        }
        unitType = App.master.unit_type.findWhere({
          id: value.get('unitType')
        });
        return mainunitTypeArray.push({
          id: unitType.get('id'),
          name: unitType.get('name')
        });
      });
      $.each(mainunitTypeArray1, function(key, item) {
        var classname, count;
        if (!mainunique[item.id]) {
          if (item.id !== 14 && item.id !== 16) {
            status = App.master.status.findWhere({
              'name': 'Available'
            });
            count = App.currentStore.unit.where({
              unitType: item.id,
              'status': status.get('id')
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
      buildingUnits = [];
      $.each(buildingArray, function(index, value) {
        var availableunits, buildingid, data, disablehigh, disablelow, disablemedium, flag1, flag2, flag3, flag4, flag5, floors, hclassname, hcount, hfloorvalue, highArray, high_max_val, high_min_val, hunique, hunitTypeArray, itemCollection, lclassname, lcount, lfloorvalue, lowArray, low_max_val, low_min_val, lunique, lunitTypeArray, mclassname, mcount, mediumArray, medium_max_val, medium_min_val, mfloorvalue, munique, munitTypeArray, newarr, newunits, totalfloorcollection, totalunits, uniqFloors, unique, unitTypeArray, variantsDataValues, viewmodels;
        buildingid = value;
        unitTypeArray = Array();
        newarr = [];
        unique = {};
        viewmodels = [];
        lunitTypeArray = [];
        lnewarr = [];
        lunique = {};
        munitTypeArray = [];
        mnewarr = [];
        munique = {};
        hunitTypeArray = [];
        hnewarr = [];
        hunique = {};
        lcount = [];
        mcount = [];
        hcount = [];
        mainArray = Array();
        lclassname = "";
        mclassname = "";
        hclassname = "";
        status = App.currentStore.status.findWhere({
          'name': 'Available'
        });
        totalunits = App.currentStore.unit.where({
          'building': value
        });
        buildingModel = App.master.building.findWhere({
          id: buildingid
        });
        floorriserange = buildingModel.get('floorriserange');
        variantsDataValues = [];
        data = [];
        flag = 0;
        flag1 = 0;
        $.each(mainunitTypeArray, function(key, item) {
          var count;
          if (!lunique[item.id]) {
            lunitTypeArray = [];
            status = App.currentStore.status.findWhere({
              'name': 'Available'
            });
            count = App.currentStore.unit.where({
              unitType: item.id,
              'status': status.get('id'),
              building: buildingid
            });
            $.each(count, function(index, value) {
              if ((value.get('floor') >= parseInt(floorriserange[0].start) && value.get('floor') <= parseInt(floorriserange[0].end)) && item.id === value.get('unitType')) {
                return lunitTypeArray.push(value);
              }
            });
            $.each(lunitTypeArray, function(index, value) {
              if (value.get('unitType') === 9) {
                flag = 1;
              }
              if (value.get('unitType') === 10) {
                return flag1 = 1;
              }
            });
            if (parseInt(flag) === 1) {
              lclassname = 'twoBHK';
            }
            if (parseInt(flag1) === 1) {
              lclassname = 'threeBHK';
            }
            if (parseInt(flag) === 1 && parseInt(flag1) === 1) {
              lclassname = 'multiBHK';
            }
            lnewarr.push({
              id: item.id,
              name: item.name,
              count: lunitTypeArray.length,
              classname: lclassname
            });
            return lunique[item.id] = item;
          }
        });
        flag2 = 0;
        flag3 = 0;
        $.each(mainunitTypeArray, function(key, item) {
          var count;
          if (!munique[item.id]) {
            munitTypeArray = [];
            status = App.currentStore.status.findWhere({
              'name': 'Available'
            });
            count = App.currentStore.unit.where({
              unitType: item.id,
              'status': status.get('id'),
              building: buildingid
            });
            $.each(count, function(index, value) {
              if ((value.get('floor') >= parseInt(floorriserange[1].start) && value.get('floor') <= parseInt(floorriserange[1].end)) && item.id === value.get('unitType')) {
                return munitTypeArray.push(value);
              }
            });
            $.each(munitTypeArray, function(index, value) {
              if (value.get('unitType') === 9) {
                flag2 = 1;
              }
              if (value.get('unitType') === 10) {
                return flag3 = 1;
              }
            });
            if (parseInt(flag2) === 1) {
              mclassname = 'twoBHK';
            }
            if (parseInt(flag3) === 1) {
              mclassname = 'threeBHK';
            }
            if (parseInt(flag2) === 1 && parseInt(flag3) === 1) {
              mclassname = 'multiBHK';
            }
            mnewarr.push({
              id: item.id,
              name: item.name,
              count: munitTypeArray.length,
              classname: mclassname
            });
            return munique[item.id] = item;
          }
        });
        flag4 = 0;
        flag5 = 0;
        $.each(mainunitTypeArray, function(key, item) {
          var count;
          if (!hunique[item.id]) {
            hunitTypeArray = [];
            status = App.currentStore.status.findWhere({
              'name': 'Available'
            });
            count = App.currentStore.unit.where({
              unitType: item.id,
              'status': status.get('id'),
              building: buildingid
            });
            $.each(count, function(index, value) {
              if ((value.get('floor') >= parseInt(floorriserange[2].start) && value.get('floor') <= parseInt(floorriserange[2].end)) && item.id === value.get('unitType')) {
                return hunitTypeArray.push(value);
              }
            });
            $.each(hunitTypeArray, function(index, value) {
              if (value.get('unitType') === 9) {
                flag4 = 1;
              }
              if (value.get('unitType') === 10) {
                return flag5 = 1;
              }
            });
            if (parseInt(flag4) === 1) {
              hclassname = 'twoBHK';
            }
            if (parseInt(flag5) === 1) {
              hclassname = 'threeBHK';
            }
            if (parseInt(flag4) === 1 && parseInt(flag5) === 1) {
              hclassname = 'multiBHK';
            }
            hnewarr.push({
              id: item.id,
              name: item.name,
              count: hunitTypeArray.length,
              classname: hclassname
            });
            return hunique[item.id] = item;
          }
        });
        availableunits = App.currentStore.unit.where({
          'building': value,
          'status': status.get('id')
        });
        totalfloorcollection = new Backbone.Collection(totalunits);
        floors = totalfloorcollection.pluck("floor");
        uniqFloors = _.uniq(floors);
        newunits = floorCollection.where({
          'building': value,
          'status': status.get('id')
        });
        buildingUnits.push({
          id: buildingid,
          count: newunits.length,
          name: 'tower' + buildingid
        });
        lowArray = Array();
        mediumArray = Array();
        highArray = Array();
        mainArray = Array();
        unitTypeArray = [];
        $.each(newunits, function(index, value) {
          var unitType;
          if (value.get('floor') >= parseInt(floorriserange[0].start) && value.get('floor') <= parseInt(floorriserange[0].end)) {
            lowArray.push(value.get('id'));
          }
          if (value.get('floor') >= parseInt(floorriserange[1].start) && value.get('floor') <= parseInt(floorriserange[1].end)) {
            mediumArray.push(value.get('id'));
          }
          if (value.get('floor') >= parseInt(floorriserange[2].start) && value.get('floor') <= parseInt(floorriserange[2].end)) {
            highArray.push(value.get('id'));
          }
          unitType = App.master.unit_type.findWhere({
            id: value.get('unitType')
          });
          return unitTypeArray.push({
            id: unitType.get('id'),
            name: unitType.get('name')
          });
        });
        $.each(unitTypeArray, function(key, item) {
          var classname, count;
          if (!unique[item.id]) {
            status = App.currentStore.status.findWhere({
              'name': 'Available'
            });
            count = App.currentStore.unit.where({
              unitType: item.id,
              'status': status.get('id'),
              'building': buildingid
            });
            if (parseInt(item.id) === 9) {
              classname = 'twoBHK m-l-20';
            } else {
              classname = 'oneBHK';
            }
            newarr.push({
              id: item.id,
              name: item.name,
              count: count.length,
              classname: classname
            });
            return unique[item.id] = item;
          }
        });
        low_max_val = 0;
        low_min_val = 0;
        medium_max_val = 0;
        medium_min_val = 0;
        high_min_val = 0;
        high_max_val = 0;
        lfloorvalue = "";
        mfloorvalue = "";
        hfloorvalue = "";
        disablehigh = "other";
        disablemedium = "other";
        disablelow = "other";
        lfloorvalue = 'Floors ' + floorriserange[0].start + '-' + floorriserange[0].end;
        mfloorvalue = 'Floors ' + floorriserange[1].start + '-' + floorriserange[1].end;
        hfloorvalue = 'Floors ' + floorriserange[2].start + '-' + floorriserange[2].end;
        $.each(lowArray, function(index, value) {
          var max_coll, unitCollection, unitmodel, unittypemodel;
          disablelow = "";
          unitmodel = App.currentStore.unit.findWhere({
            id: value
          });
          unittypemodel = App.currentStore.unit_type.findWhere({
            id: unitmodel.get('unitType')
          });
          unitCollection = App.currentStore.unit.where({
            unitType: unittypemodel.get('id')
          });
          max_coll = Array();
          $.each(unitCollection, function(index, value) {
            var variantmodel;
            variantmodel = App.currentStore.unit_variant.findWhere({
              id: value.get('unitVariant')
            });
            return max_coll.push(variantmodel.get('sellablearea'));
          });
          low_max_val = Math.max.apply(Math, max_coll);
          return low_min_val = Math.min.apply(Math, max_coll);
        });
        $.each(mediumArray, function(index, value) {
          var max_coll, unitCollection, unitmodel, unittypemodel;
          disablemedium = "";
          unitmodel = App.currentStore.unit.findWhere({
            id: value
          });
          unittypemodel = App.currentStore.unit_type.findWhere({
            id: unitmodel.get('unitType')
          });
          munitTypeArray.push({
            id: unittypemodel.get('id'),
            name: unittypemodel.get('name')
          });
          unitCollection = App.currentStore.unit.where({
            unitType: unittypemodel.get('id')
          });
          max_coll = Array();
          $.each(unitCollection, function(index, value) {
            var variantmodel;
            variantmodel = App.currentStore.unit_variant.findWhere({
              id: value.get('unitVariant')
            });
            return max_coll.push(variantmodel.get('sellablearea'));
          });
          medium_max_val = Math.max.apply(Math, max_coll);
          return medium_min_val = Math.min.apply(Math, max_coll);
        });
        $.each(highArray, function(index, value) {
          var max_coll, unitCollection, unitmodel, unittypemodel;
          disablehigh = "";
          unitmodel = App.currentStore.unit.findWhere({
            id: value
          });
          unittypemodel = App.currentStore.unit_type.findWhere({
            id: unitmodel.get('unitType')
          });
          hunitTypeArray.push({
            id: unittypemodel.get('id'),
            name: unittypemodel.get('name')
          });
          unitCollection = App.currentStore.unit.where({
            unitType: unittypemodel.get('id')
          });
          max_coll = Array();
          $.each(unitCollection, function(index, value) {
            var variantmodel;
            variantmodel = App.currentStore.unit_variant.findWhere({
              id: value.get('unitVariant')
            });
            return max_coll.push(variantmodel.get('sellablearea'));
          });
          high_max_val = Math.max.apply(Math, max_coll);
          return high_min_val = Math.min.apply(Math, max_coll);
        });
        if (App.defaults['unitType'] !== 'All') {
          mainnewarr = [];
          hclassname = "";
          mclassname = "";
          lclassname = "";
        }
        mainArray.push({
          count: highArray.length,
          low_max_val: high_max_val,
          low_min_val: high_min_val,
          range: 'high',
          buildingid: buildingid,
          unittypes: hnewarr,
          classname: hclassname,
          rangetext: 'HIGHRISE',
          rangeNo: hfloorvalue,
          disable: disablehigh
        });
        mainArray.push({
          count: mediumArray.length,
          low_max_val: medium_max_val,
          low_min_val: medium_min_val,
          range: 'medium',
          buildingid: buildingid,
          unittypes: mnewarr,
          classname: mclassname,
          rangetext: 'MIDRISE',
          rangeNo: mfloorvalue,
          disable: disablemedium
        });
        mainArray.push({
          count: lowArray.length,
          low_max_val: low_max_val,
          low_min_val: low_min_val,
          range: 'low',
          buildingid: buildingid,
          unittypes: lnewarr,
          classname: lclassname,
          rangetext: 'LOWRISE',
          rangeNo: lfloorvalue,
          disable: disablelow
        });
        itemCollection = new Backbone.Collection(mainArray);
        buildingModel = App.master.building.findWhere({
          id: value
        });
        unitColl.push({
          id: buildingModel.get('id'),
          buildingname: buildingModel.get('name'),
          units: itemCollection,
          buildingid: buildingModel.get('id'),
          unittypes: newarr,
          availableunits: availableunits.length,
          totalunits: totalunits.length,
          totalfloors: uniqFloors.length,
          views: variantsDataValues
        });
        return buildingArrayModel.push(buildingModel);
      });
      mainArray = [];
      if (buildingUnits.length === 2) {
        buildingUnits.push({
          id: 100,
          count: 0,
          name: 'tower' + 100
        });
        mainArray.push({
          count: '---',
          low_max_val: 0,
          low_min_val: 0,
          range: 'high',
          buildingid: 100,
          unittypes: 0,
          classname: "",
          rangetext: 'HIGHRISE',
          rangeNo: 'Floors --'
        });
        mainArray.push({
          count: '---',
          low_max_val: 0,
          low_min_val: 0,
          range: 'medium',
          buildingid: 100,
          unittypes: 0,
          classname: "",
          rangetext: 'MIDRISE',
          rangeNo: 'Floors --'
        });
        mainArray.push({
          count: '---',
          low_max_val: 0,
          low_min_val: 0,
          range: 'low',
          buildingid: 100,
          unittypes: 0,
          classname: "",
          rangetext: 'LOWRISE',
          rangeNo: 'Floors --'
        });
        itemCollection = new Backbone.Collection(mainArray);
        unitColl.push({
          id: 100,
          buildingname: 'Random',
          units: itemCollection,
          buildingid: 100,
          unittypes: 0,
          availableunits: 0,
          totalunits: 0,
          totalfloors: 0,
          views: 0
        });
      }
      buildingvalue = _.max(buildingUnits, function(model) {
        return model.count;
      });
      buildingUnits.sort(function(a, b) {
        return a.id - b.id;
      });
      modelIdArr = [];
      modelArr = [];
      ModelActualArr = [];
      $.each(buildingUnits, function(index, value) {
        return modelIdArr.push(value.id);
      });
      key = _.isEmpty(paramid);
      if (key === true) {
        index = _.indexOf(modelIdArr, buildingvalue.id);
        modelArr.push(buildingvalue.id);
      } else {
        keycheck = _.findWhere(buildingUnits, {
          name: paramid
        });
        index = _.indexOf(modelIdArr, keycheck.id);
        modelArr.push(keycheck.id);
      }
      highLength = modelIdArr.length - index;
      i = index + 1;
      while (i < modelIdArr.length) {
        modelArr.push(modelIdArr[i]);
        i++;
      }
      j = 0;
      while (j < index) {
        modelArr.push(modelIdArr[j]);
        j++;
      }
      if (modelArr.length === 2) {
        arrayvalue = _.last(modelArr);
        modelArr.push(arrayvalue);
      }
      buildingsactual = [];
      unitsactual = [];
      buildingCollection = new Backbone.Collection(buildingArrayModel);
      units = new Backbone.Collection(unitColl);
      $.each(modelArr, function(index, value) {
        value = value;
        buildingsactual.push(buildingCollection.get(value));
        return unitsactual.push(units.get(value));
      });
      buildingCollection = new Backbone.Collection(buildingsactual);
      units = new Backbone.Collection(unitsactual);
      return [buildingCollection, units, templateString, Countunits.length, mainnewarr, hnewarr, mnewarr, lnewarr, unitVariantModels, unitVariantID, unitVariantID];
    };

    return ScreenTwoController;

  })(Extm.RegionController);
  return msgbus.registerController('screen:two', ScreenTwoController);
});
