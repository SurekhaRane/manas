var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/screen-four/screen-four-view'], function(Extm, ScreenFourView) {
  var ScreenFourController;
  ScreenFourController = (function(_super) {
    __extends(ScreenFourController, _super);

    function ScreenFourController() {
      this.showViews = __bind(this.showViews, this);
      return ScreenFourController.__super__.constructor.apply(this, arguments);
    }

    ScreenFourController.prototype.initialize = function(opt) {
      return this.getPerSqFtPrice();
    };

    ScreenFourController.prototype.showViews = function() {
      this.unitCollection = this.Collection[0];
      this.mainCollection = this.Collection[0];
      this.showUnitRegion(this.unitCollection);
      return this.showMainRegion(this.mainCollection);
    };

    ScreenFourController.prototype.showUnitRegion = function(unitCollection) {
      var itemview1;
      itemview1 = this.getView(unitCollection);
      return this.layout.unitRegion.show(itemview1);
    };

    ScreenFourController.prototype.showMainRegion = function(mainCollection) {
      var itemview2;
      itemview2 = this.getUnitsView(mainCollection);
      return this.layout.mainRegion.show(itemview2);
    };

    ScreenFourController.prototype.getView = function(unitCollection) {
      return new ScreenFourView.UnitTypeChildView({
        collection: unitCollection
      });
    };

    ScreenFourController.prototype.getUnitsView = function(mainCollection) {
      return new ScreenFourView.UnitTypeView({
        collection: mainCollection
      });
    };

    ScreenFourController.prototype._getSelelctedUnit = function() {
      var ModelActualArr, highLength, i, index, j, modelArr, modelIdArr, unitCollection, units, unitsArray;
      units = App.master.unit.where({
        id: parseInt(App.unit['name'])
      });
      unitsArray = App.master.unit.toArray();
      $.each(units, function(index, value) {
        var building, element, exceptionObject, facingModel, facingModelArray, facingssArray, floorLayoutimage, roomSizesArray, roomsizearray, terraceoptions, terraceoptionstext, unitTypeModel, unitVariantModel, viewModel, viewModelArray, viewsArray, _i, _j, _len, _len1;
        unitVariantModel = App.master.unit_variant.findWhere({
          id: value.get('unitVariant')
        });
        unitTypeModel = App.master.unit_type.findWhere({
          id: value.get('unitType')
        });
        value.set('terracearea', unitVariantModel.get('terracearea'));
        value.set('sellablearea', unitVariantModel.get('sellablearea'));
        value.set('carpetarea', unitVariantModel.get('carpetarea'));
        value.set('unittypename', unitTypeModel.get('name'));
        value.set('TwoDimage', unitVariantModel.get('url2dlayout_image'));
        value.set('ThreeDimage', unitVariantModel.get('url3dlayout_image'));
        building = App.master.building.findWhere({
          id: value.get('building')
        });
        exceptionObject = building.get('floorexceptionpositions');
        floorLayoutimage = "";
        $.each(exceptionObject, function(index, value1) {
          var floorvalue;
          floorvalue = $.inArray(value.get('floor'), value1.floors);
          console.log(floorvalue);
          if (floorvalue === -1) {
            return floorLayoutimage = building.get('floor_layout_detailed').image_url;
          } else {
            if (value1.floor_layout_detailed.image_url === "") {
              return floorLayoutimage = building.get('floor_layout_detailed').image_url;
            } else {
              return floorLayoutimage = value1.floor_layout_detailed.image_url;
            }
          }
        });
        if (exceptionObject.legth === 0) {
          floorLayoutimage = building.get('floor_layout_detailed').image_url;
        }
        roomSizesArray = unitVariantModel.get('roomsizes');
        roomsizearray = [];
        $.each(roomSizesArray, function(index, value1) {
          return roomsizearray.push({
            size: value1.room_size,
            type: value1.room_type
          });
        });
        viewModelArray = [];
        facingModelArray = [];
        if (value.get('views').length !== 0) {
          viewsArray = value.get('views');
          for (_i = 0, _len = viewsArray.length; _i < _len; _i++) {
            element = viewsArray[_i];
            viewModel = App.master.view.findWhere({
              id: parseInt(element)
            });
            viewModelArray.push(viewModel.get('name'));
          }
        } else {
          viewModelArray.push('-----');
        }
        value.set('facings_name', viewModelArray.join(', '));
        facingssArray = value.get('facing');
        if (facingssArray.length !== 0) {
          for (_j = 0, _len1 = facingssArray.length; _j < _len1; _j++) {
            element = facingssArray[_j];
            facingModel = App.master.facings.findWhere({
              id: parseInt(element)
            });
            facingModelArray.push(facingModel.get('name'));
          }
        } else {
          facingModelArray.push('-----');
        }
        value.set('views_name', facingModelArray.join(', '));
        terraceoptions = unitVariantModel.get('terraceoptions');
        if (terraceoptions === null) {
          terraceoptionstext = '---------';
        } else {
          terraceoptionstext = unitVariantModel.get('terraceoptions');
        }
        value.set('floorLayoutimage', floorLayoutimage);
        value.set('BuildingPositionimage', building.get('positioninproject').image_url);
        value.set('roomsizearray', roomsizearray);
        return value.set('terraceoptions', terraceoptionstext);
      });
      units.sort(function(a, b) {
        return a.get('id') - b.get('id');
      });
      modelIdArr = [];
      modelArr = [];
      ModelActualArr = [];
      $.each(units, function(index, value) {
        return modelIdArr.push(value.get('id'));
      });
      index = _.indexOf(modelIdArr, parseInt(App.unit['name']));
      highLength = modelIdArr.length - index;
      i = index;
      while (i < modelIdArr.length) {
        modelArr.push(modelIdArr[i]);
        i++;
      }
      j = 0;
      while (j < index) {
        modelArr.push(modelIdArr[j]);
        j++;
      }
      unitCollection = new Backbone.Collection(units);
      $.each(modelArr, function(index, value) {
        return ModelActualArr.push(unitCollection.get(value));
      });
      unitCollection = new Backbone.Collection(ModelActualArr);
      return [unitCollection, PAYMENTPLANS];
    };

    ScreenFourController.prototype.getPerSqFtPrice = function() {
      var object, unitModel;
      unitModel = App.master.unit.findWhere({
        id: parseInt(App.unit['name'])
      });
      object = this;
      return $.ajax({
        method: "POST",
        url: AJAXURL + '?action=get_unit_single_details',
        data: 'id=' + unitModel.get('id'),
        success: function(result) {
          unitModel.set('persqftprice', result.persqftprice);
          unitModel.set('views', result.views);
          unitModel.set('facing', result.facings);
          object.Collection = object._getSelelctedUnit();
          object.layout = new ScreenFourView.ScreenFourLayout({
            templateHelpers: {
              paymentplans: object.Collection[1]
            }
          });
          object.listenTo(object.layout, "show", object.showViews);
          return object.show(object.layout);
        },
        error: function(result) {}
      });
    };

    return ScreenFourController;

  })(Extm.RegionController);
  return msgbus.registerController('screen:four', ScreenFourController);
});
