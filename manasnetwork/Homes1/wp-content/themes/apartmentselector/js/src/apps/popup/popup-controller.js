var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['extm', 'src/apps/popup/popup-view'], function(Extm, PopupView) {
  var PopupController;
  PopupController = (function(_super) {
    __extends(PopupController, _super);

    function PopupController() {
      return PopupController.__super__.constructor.apply(this, arguments);
    }

    PopupController.prototype.initialize = function(opt) {
      if (opt == null) {
        opt = {};
      }
      return this.getAjaxData();
    };

    PopupController.prototype._getPopupView = function(Collection) {
      console.log(Collection);
      return new PopupView({
        collection: Collection
      });
    };

    PopupController.prototype._getUnitsCountCollection = function(modelstring) {
      var buildingModel, cookeArray, element, exceptionObject, facingModel, facingModelArray, facingssArray, floorLayoutimage, floorriserange, i, mainArr, rangeArrayVal, roomSizesArray, roomSizesObject, roomTypeArr, roomsizearr, roomsizearray, roomsizesCollection, terraceoptions, terraceoptionstext, unitCollection, unitModel, unitModelArray, unitTypeModel, unitTypeModelName, unitVariantModel, view, viewModel, viewModelArray, viewsArray, _i, _j, _k, _len, _len1, _len2;
      console.log(modelstring);
      console.log(cookeArray = modelstring);
      unitModelArray = [];
      console.log(cookeArray.length);
      floorLayoutimage = "";
      if (cookeArray.length !== 0) {
        for (_i = 0, _len = cookeArray.length; _i < _len; _i++) {
          element = cookeArray[_i];
          console.log(unitModel = element);
          console.log(buildingModel = App.master.building.findWhere({
            id: unitModel.get('building')
          }));
          exceptionObject = buildingModel.get('floorexceptionpositions');
          $.each(exceptionObject, function(index, value1) {
            var floorvalue;
            floorvalue = $.inArray(unitModel.get('floor'), value1.floors);
            if (floorvalue === -1) {
              return floorLayoutimage = buildingModel.get('floor_layout_detailed').image_url;
            } else {
              if (value1.floor_layout_detailed.image_url === "") {
                return floorLayoutimage = buildingModel.get('floor_layout_detailed').image_url;
              } else {
                return floorLayoutimage = value1.floor_layout_detailed.image_url;
              }
            }
          });
          if (exceptionObject.legth === 0) {
            floorLayoutimage = building.get('floor_layout_detailed').image_url;
          }
          floorriserange = buildingModel.get('floorriserange');
          rangeArrayVal = [];
          i = 0;
          $.each(floorriserange, function(index, value) {
            var end, rangename, start;
            rangeArrayVal = [];
            i = 0;
            start = parseInt(value.start);
            end = parseInt(value.end);
            while (parseInt(start) <= parseInt(end)) {
              rangeArrayVal[i] = start;
              start = parseInt(start) + 1;
              i++;
            }
            console.log(rangeArrayVal);
            rangename = "";
            if (jQuery.inArray(parseInt(unitModel.get('floor')), rangeArrayVal) >= 0) {
              if (value.name === "medium") {
                rangename = "mid";
              } else {
                rangename = value.name;
              }
              console.log(rangename);
              rangename = _.str.capitalize(rangename);
              return unitModel.set("flooRange", rangename + 'rise');
            }
          });
          viewModelArray = [];
          facingModelArray = [];
          unitTypeModel = App.master.unit_type.findWhere({
            id: unitModel.get('unitType')
          });
          unitTypeModelName = unitTypeModel.get('name').split(' ');
          unitVariantModel = App.master.unit_variant.findWhere({
            id: unitModel.get('unitVariant')
          });
          unitModel.set("sellablearea", unitVariantModel.get('sellablearea'));
          unitModel.set("carpetarea", unitVariantModel.get('carpetarea'));
          unitModel.set("unitTypeName", unitTypeModelName[0]);
          unitModel.set("buidlingName", buildingModel.get('name'));
          unitModel.set('TwoDimage', unitVariantModel.get('url2dlayout_image'));
          unitModel.set('ThreeDimage', unitVariantModel.get('url3dlayout_image'));
          unitModel.set('floorLayoutimage', floorLayoutimage);
          console.log(unitModel.get('views_name'));
          if (unitModel.get('views_name') !== "") {
            viewsArray = unitModel.get('views_name');
            console.log(viewsArray.length);
            for (_j = 0, _len1 = viewsArray.length; _j < _len1; _j++) {
              element = viewsArray[_j];
              viewModel = App.master.view.findWhere({
                id: parseInt(element)
              });
              viewModelArray.push(viewModel.get('name'));
            }
          } else {
            viewModelArray.push('-----');
          }
          unitModel.set('views', viewModelArray.join(','));
          facingssArray = unitModel.get('facing_name');
          if (facingssArray.length !== 0) {
            for (_k = 0, _len2 = facingssArray.length; _k < _len2; _k++) {
              element = facingssArray[_k];
              facingModel = App.master.facings.findWhere({
                id: parseInt(element)
              });
              facingModelArray.push(facingModel.get('name'));
            }
          } else {
            facingModelArray.push('-----');
          }
          unitModel.set('facings', facingModelArray.join(','));
          roomSizesObject = unitVariantModel.get('roomsizes');
          roomsizearray = [];
          roomTypeArr = [68, 71, 72, 70, 66];
          roomSizesArray = $.map(roomSizesObject, function(index, value1) {
            console.log(index);
            console.log(value1);
            return [index];
          });
          terraceoptions = unitVariantModel.get('terraceoptions');
          if (terraceoptions === null) {
            terraceoptionstext = '---------';
          } else {
            terraceoptionstext = unitVariantModel.get('terraceoptions');
          }
          unitModel.set('terraceoptions', 'with ' + terraceoptionstext);
          terraceoptions = 'with ' + terraceoptionstext;
          console.log(roomSizesArray);
          roomsizearr = [];
          mainArr = [];
          console.log(roomsizesCollection = new Backbone.Collection(roomSizesArray));
          $.each(roomTypeArr, function(ind, val) {
            var ii, roomtype;
            roomsizearr = [];
            console.log(val);
            console.log(roomtype = roomsizesCollection.where({
              room_type_id: parseInt(val)
            }));
            ii = 0;
            if (parseInt(val) === 70) {
              if (ii > 0) {
                terraceoptions = "";
              }
              $.each(roomtype, function(index1, value1) {
                roomsizearr.push({
                  room_size: value1.get('room_size'),
                  terace: terraceoptions
                });
                return ii++;
              });
            } else {
              $.each(roomtype, function(index1, value1) {
                return roomsizearr.push({
                  room_size: value1.get('room_size')
                });
              });
            }
            roomsizearr.sort(function(a, b) {
              return b.room_size - a.room_size;
            });
            if (roomsizearr.length === 0) {
              roomsizearr.push({
                room_size: "----------"
              });
            }
            return mainArr.push({
              subarray: roomsizearr
            });
          });
          console.log(mainArr);
          unitModel.set('mainArr', mainArr);
          unitModelArray.push(unitModel);
        }
        console.log(unitModelArray);
        unitCollection = new Backbone.Collection(unitModelArray);
        this.view = view = this._getPopupView(unitCollection);
        return this.show(view);
      }
    };

    PopupController.prototype.getAjaxData = function() {
      var cookeArray, element, i, modelArray, object, unitModel, unitModelArray, _i, _len;
      console.log(localStorage.getItem("cookievalue"));
      console.log(cookeArray = localStorage.getItem("cookievalue").split(','));
      unitModelArray = [];
      modelArray = [];
      i = 0;
      if (cookeArray.length !== 0) {
        for (_i = 0, _len = cookeArray.length; _i < _len; _i++) {
          element = cookeArray[_i];
          console.log(unitModel = App.master.unit.findWhere({
            id: parseInt(element)
          }));
          object = this;
          $.ajax({
            method: "POST",
            url: AJAXURL + '?action=get_unit_single_details',
            data: 'id=' + unitModel.get('id'),
            success: function(result) {
              var unitModel1;
              i++;
              console.log(unitModel1 = App.master.unit.findWhere({
                id: parseInt(result.id)
              }));
              console.log(result);
              console.log(unitModel1);
              unitModel1.set('persqftprice', result.persqftprice);
              unitModel1.set('views_name', result.views);
              unitModel1.set('facing_name', result.facings);
              console.log(unitModel1);
              modelArray.push(unitModel1);
              if (i === cookeArray.length) {
                console.log(modelArray);
                return object._getUnitsCountCollection(modelArray);
              }
            },
            error: function(result) {}
          });
        }
        console.log(i);
        return console.log(cookeArray.length);
      }
    };

    return PopupController;

  })(Extm.RegionController);
  return msgbus.registerController('popup', PopupController);
});
