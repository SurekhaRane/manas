var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(['marionette'], function(Marionette) {
  var BuildingView, ScreenThreeLayout, UnitTypeChildView, UnitTypeView, UnitView, cloneunitVariantArrayColl, count, firstElement, flag_set, globalUnitArrayInt, object1, position, rangeunitArray, sudoSlider, tagsArray, unitAssigedArray, unitChildView, unitVariantArray, unitVariantIdArray, unitVariantString, unitVariants;
  flag_set = 0;
  unitVariantArray = '';
  unitVariantIdArray = [];
  unitVariantString = '';
  firstElement = '';
  tagsArray = [];
  count = 0;
  object1 = "";
  unitVariants = [];
  cloneunitVariantArrayColl = "";
  rangeunitArray = [];
  globalUnitArrayInt = [];
  position = "";
  unitAssigedArray = [];
  sudoSlider = "";
  ScreenThreeLayout = (function(_super) {
    __extends(ScreenThreeLayout, _super);

    function ScreenThreeLayout() {
      return ScreenThreeLayout.__super__.constructor.apply(this, arguments);
    }

    ScreenThreeLayout.prototype.template = '<h3 class="text-center light m-t-0 m-b-20 unittype hidden animated pulse">We found <span class="bold text-primary"> {{countUnits }} </span> apartments that matched your selection.</h3> <h3 class="text-center light m-t-0 m-b-20 budget hidden animated pulse">We found <span class="bold text-primary"> {{countUnits }} </span>  apartments in your budget of <strong>{{selection}}</strong></h3> <h3 class="text-center light m-t-0 m-b-20 refresh hidden animated pulse">You just refreshed the page. You are now seeing <span class="bold text-primary">All</span> apartments across all the towers.</h3> <div class="text-center subTxt m-b-20 All hidden animated pulse">You are seeing <span class="bold text-primary">All</span> apartments in the selected floor range of the tower.</div> <div class="introTxt text-center">These apartments are available in different size variations on different floors of the tower. Click on any available apartment for more details. <!--<br><em>(You can scroll between towers to see other options.)</em>--></div> <div class="text-center light"> You are seeing <div id="tagslist1" class="taglist"> <ul></ul> </div> <span class="text-primary variantToggle"></span>variants of your apartment selection </div> <div class="variantBox"> <div class="pull-left m-l-15"> <input type="checkbox" name="unselectall" id="unselectall" class="checkbox" value="0" checked/> <label for="unselectall">Select/Unselect All</label> </div> <div class="text-right"><span class="variantClose glyphicon glyphicon-remove text-grey"></span></div> <div class="grid-container"> {{#unitVariants}} <div class="grid-block-3" > <a class="grid-link selected" href="#" id="gridlink{{id}}" data-id="{{id}}"> {{sellablearea}} Sq.ft.<input type="hidden" name="checklink{{id}}"   id="checklink{{id}}"   value="1" /> </a> </div> {{/unitVariants}} <div class="variantAction m-t-5 m-b-20"> <a class="btn btn-primary m-r-10 done">DONE</a> <a class="btn btn-default cancel">CANCEL</a> </div> </div> </div> <div class="row m-l-0 m-r-0 m-t-20 bgClass"> <div class="col-md-5 col-lg-4"> <div id="vs-container" class="vs-container"> <header class="vs-header" id="building-region"></header> <div id="floorsvg" class="floorSvg"></div> <div  id="unit-region"></div> </div> <div class="h-align-middle m-t-20 m-b-20"> <a href="#screen-three-region" class="btn btn-default btn-lg disabled" id="screen-three-button">Show Unit</a> </div> </div> <div class="col-md-7 col-lg-8 b-grey b-l visible-md visible-lg rightTowerSvg"> <div id="positionsvg" class="positionSvg"> </div> </div> <input type="hidden" name="currency2" id="currency2" class="demo" data-a-sign="Rs. " data-d-group="2"> </div>';

    ScreenThreeLayout.prototype.className = 'page-container row-fluid';

    ScreenThreeLayout.prototype.regions = {
      buildingRegion: '#building-region',
      unitRegion: '#unit-region'
    };

    ScreenThreeLayout.prototype.events = {
      'click .customLink': function(e) {
        var element, id, index, _i, _len;
        id = parseInt(e.target.id);
        for (index = _i = 0, _len = unitAssigedArray.length; _i < _len; index = ++_i) {
          element = unitAssigedArray[index];
          if (element === parseInt(id)) {
            $('#' + element).attr('class', 'floor-pos position');
          } else {
            $('#' + element).attr('class', 'floor-pos ');
          }
        }
        $('#' + id).attr('class', 'floor-pos position');
        unitAssigedArray.push(id);
        return this.loadsvg(id);
      },
      'click .unit-hover': function(e) {
        var buildinArray, building, buildingCollection, buildingModel, flatid, floorriserange, id, indexvalue, rangeArrayVal, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues;
        buildingCollection = Marionette.getOption(this, 'buildingCollection');
        buildinArray = buildingCollection.toArray();
        building = _.first(buildinArray);
        buildingModel = App.master.building.findWhere({
          id: parseInt(building.get('id'))
        });
        svgdata = buildingModel.get('svgdata');
        floorriserange = buildingModel.get('floorriserange');
        svgposition = "";
        unitvalues = "";
        indexvalue = "";
        temp = ['f', 'ff'];
        temp1 = ['t', 'tt'];
        temp2 = ['c', 'cc'];
        id = $('#' + e.target.id).attr('data-value');
        flatid = $('#' + e.target.id).attr('data-id');
        unitModel = App.master.unit.findWhere({
          id: parseInt(id)
        });
        position = unitModel.get('unitAssigned');
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
        $.each(svgdata, function(index, value) {
          var ii;
          if ($.inArray(position, value.svgposition) >= 0 && value.svgposition !== null) {
            ii = 0;
            return $.each(value.svgposition, function(index1, val1) {
              var element, indexvalue1, unit, unitsarray, _i, _j, _len, _len1;
              if (position === val1) {
                svgposition = value.svgfile;
                unitsarray = value.units;
                indexvalue = unitsarray[position];
                indexvalue1 = unitsarray[val1];
                $.map(indexvalue1, function(index, value) {
                  $('#f' + value).attr('class', 'unselected-floor ');
                  return $('#ff' + value).attr('class', 'unselected-floor ');
                });
                $.map(indexvalue, function(index, value) {
                  var floorArr;
                  if (App.defaults['floor'] !== "All") {
                    floorArr = App.defaults['floor'].split(',');
                    return $.each(floorArr, function(ind, val) {
                      if (parseInt(value) === parseInt(val)) {
                        $('#' + temp[ii] + value).attr('class', 'unit-hover range');
                        return $('#' + temp1[ii] + value).attr('class', 'unit-hover range');
                      }
                    });
                  } else {
                    $('#' + temp[ii] + value).attr('class', 'unit-hover range');
                    return $('#' + temp1[ii] + value).attr('class', 'unit-hover range');
                  }
                });
                $("#" + e.target.id).attr('class', 'selected-flat');
                $("#" + temp1[ii] + flatid).attr('class', 'selected-flat');
                unit = indexvalue[parseInt(flatid)];
                console.log(unitModel = App.master.unit.findWhere({
                  id: parseInt(unit)
                }));
                position = unitModel.get('unitAssigned');
                for (index = _i = 0, _len = unitAssigedArray.length; _i < _len; index = ++_i) {
                  element = unitAssigedArray[index];
                  if (element === parseInt(unitModel.get('unitAssigned'))) {
                    $('#' + element).attr('class', 'floor-pos position');
                  } else {
                    $('#' + element).attr('class', 'floor-pos ');
                  }
                }
                unitAssigedArray.push(unitModel.get('unitAssigned'));
                $('#' + unitModel.get('unitAssigned')).attr('class', 'position');
                sudoSlider.goToSlide(unitModel.get('unitAssigned'));
                for (index = _j = 0, _len1 = rangeunitArray.length; _j < _len1; index = ++_j) {
                  element = rangeunitArray[index];
                  if (element === parseInt(unit)) {
                    $("#select" + unit).val('1');
                  } else {
                    $("#select" + element).val('0');
                    $('#check' + element).removeClass('selected');
                    rangeunitArray = [];
                  }
                }
                rangeunitArray.push(parseInt(unit));
                $('#check' + unit).addClass("selected");
                $("#select" + unit).val("1");
                $("#screen-three-button").removeClass('disabled btn-default');
                $("#screen-three-button").addClass('btn-primary');
              }
              return ii++;
            });
          }
        });
        unitModel;
        return this.trigger("load:range:data", unitModel);
      },
      'click .unselected-floor': function(e) {
        var buildinArray, building, buildingCollection, buildingModel, flatid, floorriserange, id, indexvalue, rangeArrayVal, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues;
        buildingCollection = Marionette.getOption(this, 'buildingCollection');
        buildinArray = buildingCollection.toArray();
        building = _.first(buildinArray);
        buildingModel = App.master.building.findWhere({
          id: parseInt(building.get('id'))
        });
        svgdata = buildingModel.get('svgdata');
        floorriserange = buildingModel.get('floorriserange');
        svgposition = "";
        unitvalues = "";
        indexvalue = "";
        temp = ['f', 'ff'];
        temp1 = ['t', 'tt'];
        temp2 = ['c', 'cc'];
        console.log(id = $('#' + e.target.id).attr('data-value'));
        flatid = $('#' + e.target.id).attr('data-id');
        unitModel = App.master.unit.findWhere({
          id: parseInt(id)
        });
        position = unitModel.get('unitAssigned');
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
        $.each(svgdata, function(index, value) {
          var ii;
          if ($.inArray(position, value.svgposition) >= 0 && value.svgposition !== null) {
            ii = 0;
            return $.each(value.svgposition, function(index1, val1) {
              var indexvalue1, unit, unitsarray;
              if (position === val1) {
                svgposition = value.svgfile;
                unitsarray = value.units;
                indexvalue = unitsarray[position];
                indexvalue1 = unitsarray[val1];
                flatid = $('#' + e.target.id).attr('data-id');
                unit = indexvalue[parseInt(flatid)];
                $.map(indexvalue1, function(index, value) {
                  $('#f' + value).attr('class', 'unselected-floor ');
                  return $('#ff' + value).attr('class', 'unselected-floor ');
                });
                $.map(indexvalue, function(index, value) {
                  var floorArr;
                  if (App.defaults['floor'] !== "All") {
                    floorArr = App.defaults['floor'].split(',');
                    return $.each(floorArr, function(ind, val) {
                      if (parseInt(value) === parseInt(val)) {
                        $('#' + temp[ii] + value).attr('class', 'unit-hover range');
                        return $('#' + temp1[ii] + value).attr('class', 'unit-hover range');
                      }
                    });
                  } else {
                    $('#' + temp[ii] + value).attr('class', 'unselected-floor ');
                    return $('#' + temp1[ii] + value).attr('class', 'unselected-floor ');
                  }
                });
                console.log(e.target.id);
                $("#" + e.target.id).attr('class', 'selected-flat');
                $("#" + temp1[ii] + flatid).attr('class', 'selected-flat');
              }
              return ii++;
            });
          }
        });
        console.log(unitModel);
        return this.trigger("load:range:data", unitModel);
      },
      'mouseover .unit-hover': function(e) {
        var buildinArray, building, buildingCollection, buildingModel, checktrack, flatid, floorriserange, id, indexvalue, pos, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues;
        buildingCollection = Marionette.getOption(this, 'buildingCollection');
        buildinArray = buildingCollection.toArray();
        building = _.first(buildinArray);
        buildingModel = App.master.building.findWhere({
          id: parseInt(building.get('id'))
        });
        svgdata = buildingModel.get('svgdata');
        floorriserange = buildingModel.get('floorriserange');
        svgposition = "";
        unitvalues = "";
        indexvalue = "";
        temp = ['f', 'ff'];
        temp1 = ['t', 'tt'];
        temp2 = ['c', 'cc'];
        id = $('#' + e.target.id).attr('data-value');
        flatid = $('#' + e.target.id).attr('data-id');
        unitModel = App.master.unit.findWhere({
          id: parseInt(id)
        });
        pos = unitModel.get('unitAssigned');
        checktrack = this.checkSelection(unitModel);
        $.each(svgdata, function(index, value) {
          var ii;
          if ($.inArray(pos, value.svgposition) >= 0 && value.svgposition !== null) {
            ii = 0;
            return $.each(value.svgposition, function(index1, val1) {
              var currency, text, unittpe;
              if (pos === val1) {
                $('#currency2').autoNumeric('init');
                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                currency = $('#currency2').val();
                unittpe = App.master.unit_type.findWhere({
                  id: unitModel.get('unitType')
                });
                text = '<tspan x="10" y="45">Flat no:' + unitModel.get('name') + '</tspan><tspan x="10" y="60">unittype:' + unittpe.get('name') + '</tspan><tspan x="10" y="75">Unit Price:' + currency + '</tspan>';
                $('#' + temp1[ii] + flatid).html(text);
              }
              return ii++;
            });
          }
        });
        if (checktrack === 1 && parseInt(unitModel.get('status')) === 9) {
          return $("#" + e.target.id).attr('class', 'unit-hover aviable');
        } else if (checktrack === 1 && (parseInt(unitModel.get('status')) === 8 || parseInt(unitModel.get('status')) === 47)) {
          return $("#" + e.target.id).attr('class', 'sold');
        } else {
          return $("#" + e.target.id).attr('class', 'other');
        }
      },
      'mouseover .range': function(e) {
        var buildinArray, building, buildingCollection, buildingModel, checktrack, flatid, floorriserange, id, indexvalue, pos, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues;
        buildingCollection = Marionette.getOption(this, 'buildingCollection');
        buildinArray = buildingCollection.toArray();
        building = _.first(buildinArray);
        buildingModel = App.master.building.findWhere({
          id: parseInt(building.get('id'))
        });
        svgdata = buildingModel.get('svgdata');
        floorriserange = buildingModel.get('floorriserange');
        svgposition = "";
        unitvalues = "";
        indexvalue = "";
        temp = ['f', 'ff'];
        temp1 = ['t', 'tt'];
        temp2 = ['c', 'cc'];
        id = $('#' + e.target.id).attr('data-value');
        flatid = $('#' + e.target.id).attr('data-id');
        unitModel = App.master.unit.findWhere({
          id: parseInt(id)
        });
        pos = unitModel.get('unitAssigned');
        checktrack = this.checkSelection(unitModel);
        $.each(svgdata, function(index, value) {
          var ii;
          if ($.inArray(pos, value.svgposition) >= 0 && value.svgposition !== null) {
            ii = 0;
            return $.each(value.svgposition, function(index1, val1) {
              var currency, text, unittpe;
              if (pos === val1) {
                $('#currency2').autoNumeric('init');
                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                currency = $('#currency2').val();
                unittpe = App.master.unit_type.findWhere({
                  id: unitModel.get('unitType')
                });
                text = '<tspan x="10" y="45">Flat no:' + unitModel.get('name') + '</tspan><tspan x="10" y="60">unittype:' + unittpe.get('name') + '</tspan><tspan x="10" y="75">Unit Price:' + currency + '</tspan>';
                $('#' + temp1[ii] + flatid).html(text);
              }
              return ii++;
            });
          }
        });
        if (checktrack === 1 && parseInt(unitModel.get('status')) === 9) {
          return $("#" + e.target.id).attr('class', 'unit-hover range aviable');
        } else if (checktrack === 1 && (parseInt(unitModel.get('status')) === 8 || parseInt(unitModel.get('status')) === 47)) {
          return $("#" + e.target.id).attr('class', 'sold range');
        } else {
          return $("#" + e.target.id).attr('class', 'other range');
        }
      },
      'mouseover .unselected-floor': function(e) {
        var buildinArray, building, buildingCollection, buildingModel, checktrack, flatid, floorriserange, id, indexvalue, pos, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues;
        buildingCollection = Marionette.getOption(this, 'buildingCollection');
        buildinArray = buildingCollection.toArray();
        building = _.first(buildinArray);
        buildingModel = App.master.building.findWhere({
          id: parseInt(building.get('id'))
        });
        svgdata = buildingModel.get('svgdata');
        floorriserange = buildingModel.get('floorriserange');
        svgposition = "";
        unitvalues = "";
        indexvalue = "";
        temp = ['f', 'ff'];
        temp1 = ['t', 'tt'];
        temp2 = ['c', 'cc'];
        id = $('#' + e.target.id).attr('data-value');
        flatid = $('#' + e.target.id).attr('data-id');
        unitModel = App.master.unit.findWhere({
          id: parseInt(id)
        });
        pos = unitModel.get('unitAssigned');
        checktrack = this.checkSelection(unitModel);
        $.each(svgdata, function(index, value) {
          var ii;
          if ($.inArray(pos, value.svgposition) >= 0 && value.svgposition !== null) {
            ii = 0;
            return $.each(value.svgposition, function(index1, val1) {
              var text, unittpe;
              console.log(position);
              console.log(temp1[ii]);
              if (parseInt(pos) === parseInt(val1)) {
                $('#currency2').autoNumeric('init');
                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                unittpe = App.master.unit_type.findWhere({
                  id: unitModel.get('unitType')
                });
                text = '<tspan x="10" y="45">Flat no:' + unitModel.get('name') + '</tspan><tspan x="10" y="60">unittype:' + unittpe.get('name') + '</tspan><tspan x="10" y="75">Unit Price:' + currency + '</tspan>';
                $('#' + temp1[ii] + flatid).html(text);
              }
              return ii++;
            });
          }
        });
        checktrack = this.checkSelection(unitModel);
        if (checktrack === 1 && parseInt(unitModel.get('status')) === 9) {
          return $("#" + e.target.id).attr('class', 'unselected-floor aviable');
        } else if (checktrack === 1 && (parseInt(unitModel.get('status')) === 8 || parseInt(unitModel.get('status')) === 47)) {
          return $("#" + e.target.id).attr('class', 'sold ');
        } else {
          return $("#" + e.target.id).attr('class', 'other ');
        }
      },
      'click #screen-three-button': function(e) {
        $('#screen-four-region').addClass('section');
        return this.trigger('unit:item:selected');
      },
      'click a': function(e) {
        return e.preventDefault();
      },
      'click .grid-link': function(e) {
        var id, index, track;
        count = unitVariantArray.length;
        id = $('#' + e.target.id).attr('data-id');
        track = 0;
        if ($('#checklink' + id).val() === '1') {
          index = unitVariantArray.indexOf(parseInt(id));
          if (index !== -1) {
            unitVariantArray.splice(index, 1);
            $('#checklink' + id).val('0');
            track = 0;
            unitVariantIdArray.push(parseInt(id));
          }
        } else {
          track = 1;
          unitVariantArray.push(parseInt(id));
          $('#checklink' + id).val('1');
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
          return $('#unselectall').prop('checked', true);
        } else {
          return $('#unselectall').prop('checked', false);
        }
      },
      'click .done': function(e) {
        var params;
        App.layout.screenFourRegion.el.innerHTML = "";
        App.navigate("screen-three");
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        console.log(cloneunitVariantArrayColl.length);
        console.log(unitVariantArray.length);
        if (unitVariantString === "" || parseInt(cloneunitVariantArrayColl.length) === parseInt(unitVariantArray.length)) {
          unitVariantString = "All";
        }
        App.defaults['unitVariant'] = unitVariantString;
        App.backFilter['screen2'].push("unitVariant");
        App.filter(params = {});
        return this.trigger('unit:variants:selected');
      },
      'click .cancel': function(e) {
        var globalUnitVariants;
        unitVariantArray = _.union(unitVariantArray, unitVariantIdArray);
        $(".variantBox").slideToggle();
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
              $('#gridlink' + value).addClass('selected');
              return $('#checklink' + value).val('1');
            } else {
              $('#gridlink' + value).removeClass('selected');
              return $('#checklink' + value).val('0');
            }
          });
        }
      },
      'click #unselectall': function(e) {
        var remainainArray, tempArray, units, value;
        if ($('#' + e.target.id).prop('checked') === true) {
          cloneunitVariantArrayColl.each(function(index) {
            $('#gridlink' + index.get('id')).addClass('selected');
            $('#checklink' + index.get('id')).val('1');
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
            $('#gridlink' + value).removeClass('selected');
            $('#checklink' + value).val('0');
            index = unitVariantArray.indexOf(parseInt(value));
            if (index !== -1) {
              return unitVariantArray.splice(index, 1);
            }
          });
          return unitVariantString = value.toString();
        }
      }
    };

    ScreenThreeLayout.prototype.onShow = function() {
      var $columns_number, globalUnitVariants, selectedArray, testtext, unitVariantArrayColl, unitVariantArrayText, unitVariantsArray;
      unitVariantString = "";
      $('#screen-three-button').on('click', function() {
        return new jBox('Notice', {
          content: 'Loading your apartment...',
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
      $('#mainsvg').text("");
      rangeunitArray = [];
      globalUnitArrayInt = [];
      this.loadbuildingsvg();
      $('#sliderplans').liquidSlider({
        slideEaseFunction: "fade",
        autoSlide: true,
        includeTitle: false,
        fadeOutDuration: 1000,
        minHeight: 500,
        forceAutoSlide: true,
        autoSlideInterval: 5000,
        dynamicArrows: false,
        fadeInDuration: 1000
      });
      if (App.screenOneFilter['key'] === 'unitType') {
        $('.unittype').removeClass('hidden');
      } else if (App.screenOneFilter['key'] === 'budget') {
        $('.budget').removeClass('hidden');
      } else if (App.defaults['floor'] === 'All') {
        $('.refresh').removeClass('hidden');
      } else {
        $('.All').removeClass('hidden');
      }
      $columns_number = $('.unitTable .cd-table-container').find('.cd-block').length;
      $('.cd-table-container').on('scroll', function() {
        var $this, table_viewport, total_table_width;
        $this = $(this);
        total_table_width = parseInt($('.cd-table-wrapper').css('width').replace('px', ''));
        table_viewport = parseInt($('.unitTable').css('width').replace('px', ''));
        if ($this.scrollLeft() >= total_table_width - table_viewport - $columns_number) {
          $('.unitTable').addClass('table-end');
          return $('.cd-scroll-right').hide();
        } else {
          $('.unitTable').removeClass('table-end');
          return $('.cd-scroll-right').show();
        }
      });
      $('.cd-scroll-right').on('click', function() {
        var $this, column_width, new_left_scroll;
        $this = $(this);
        column_width = $(this).siblings('.cd-table-container').find('.cd-block').eq(0).css('width').replace('px', '');
        new_left_scroll = parseInt($('.cd-table-container').scrollLeft()) + parseInt(column_width);
        return $('.cd-table-container').animate({
          scrollLeft: new_left_scroll
        }, 200);
      });
      $(".variantToggle").click(function() {
        $(this).toggleClass("open");
        $(".variantBox").slideToggle();
      });
      $(".variantClose").click(function() {
        $(".variantBox").slideToggle();
        $(".variantToggle").toggleClass("open");
      });
      $(".grid-link").click(function(e) {
        $(this).toggleClass("selected");
      });
      unitVariantArray = Marionette.getOption(this, 'uintVariantId');
      unitVariantsArray = Marionette.getOption(this, 'unitVariants');
      unitVariantArrayColl = new Backbone.Collection(unitVariantsArray);
      cloneunitVariantArrayColl = unitVariantArrayColl.clone();
      unitVariants = unitVariantArray;
      firstElement = _.first(unitVariantArray);
      globalUnitVariants = App.defaults['unitVariant'].split(',');
      if (App.defaults['unitVariant'] !== 'All') {
        globalUnitVariants = App.defaults['unitVariant'].split(',');
        $.each(globalUnitVariants, function(index, value) {
          return globalUnitArrayInt.push(parseInt(value));
        });
      }
      selectedArray = [];
      if (App.defaults['unitVariant'] !== 'All') {
        unitVariantArray = _.union(unitVariantArray, unitVariantIdArray);
        $.each(unitVariantArray, function(index, value) {
          var key;
          key = _.contains(globalUnitArrayInt, parseInt(value));
          if (key === true) {
            $('#gridlink' + value).addClass('selected');
            $('#checklink' + value).val('1');
            return selectedArray.push(value);
          } else {
            index = unitVariantArray.indexOf(parseInt(value));
            $('#gridlink' + value).removeClass('selected');
            return $('#checklink' + value).val('0');
          }
        });
      } else {
        unitVariantArray = unitVariantArray;
        $.each(unitVariantArray, function(index, value) {
          $('#gridlink' + value).addClass('selected');
          $('#checklink' + value).val('1');
          return selectedArray.push(value);
        });
      }
      App.defaults['unitVariant'] = selectedArray.join(',');
      App.backFilter['screen2'].push("unitVariant");
      console.log(selectedArray);
      console.log(unitVariantArray);
      if (unitVariantString === "All" || App.defaults['unitVariant'] === "All" || selectedArray.length === unitVariantArray.length) {
        $('#unselectall').prop('checked', true);
      } else {
        $('#unselectall').prop('checked', false);
      }
      $('html, body').delay(600).animate({
        scrollTop: $('#screen-three-region').offset().top
      }, 'slow');
      tagsArray = [];
      testtext = App.defaults['unitVariant'];
      if (parseInt(selectedArray.length) !== parseInt(unitVariantArray.length)) {
        console.log(selectedArray);
        unitVariantArrayText = selectedArray;
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
      return object1 = this;
    };

    $(document).on("click", ".closeButton1", function() {
      var theidtodel;
      theidtodel = $(this).parent('li').attr('id');
      return object1.delItem($('#' + theidtodel).attr('data-itemNum'));
    });

    ScreenThreeLayout.prototype.loadbuildingsvg = function() {
      var buildinArray, building, buildingCollection, buildingModel, floor_layout_Basic, floorid, maxvalue, path, svgdata;
      console.log(buildingCollection = Marionette.getOption(this, 'buildingCollection'));
      buildinArray = buildingCollection.toArray();
      console.log(building = _.first(buildinArray));
      buildingModel = App.master.building.findWhere({
        id: parseInt(building.get('id'))
      });
      svgdata = buildingModel.get('svgdata');
      floor_layout_Basic = buildingModel.get('floor_layout_basic').image_url;
      console.log(maxvalue = Marionette.getOption(this, 'maxvalue'));
      if (floor_layout_Basic !== "") {
        path = floor_layout_Basic;
        $('<div></div>').load(path, function(x) {
          $('#' + maxvalue.id).attr('class', 'floor-pos position');
          return unitAssigedArray.push(maxvalue.id);
        }).appendTo("#floorsvg");
      } else {
        path = "";
      }
      floorid = maxvalue.id;
      return this.loadsvg(floorid);
    };

    ScreenThreeLayout.prototype.loadsvg = function(floorid) {
      var buildinArray, building, buildingCollection, buildingModel, floorange, highrange, indexvalue, lowrange, mediumrange, svgdata, svgposition, temp, temp1, temp2, unitvalues;
      buildingCollection = Marionette.getOption(this, 'buildingCollection');
      buildinArray = buildingCollection.toArray();
      console.log(building = _.first(buildinArray));
      buildingModel = App.master.building.findWhere({
        id: parseInt(building.get('id'))
      });
      floorange = buildingModel.get('floorriserange');
      lowrange = floorange[0];
      mediumrange = floorange[1];
      highrange = floorange[2];
      svgdata = buildingModel.get('svgdata');
      if (floorid === void 0) {
        floorid = 1;
      }
      svgposition = "";
      unitvalues = "";
      indexvalue = "";
      $('#positionsvg').text("");
      temp = ['f', 'ff'];
      temp1 = ['t', 'tt'];
      temp2 = ['c', 'cc'];
      $.each(svgdata, function(index, value) {
        var ii, unitsarray;
        if ($.inArray(floorid, value.svgposition) >= 0 && value.svgposition !== null) {
          ii = 0;
          if (value.svgfile !== "") {
            svgposition = value.svgfile;
            unitsarray = value.units;
            return $('#positionsvg').load(svgposition, function(x) {
              console.log(value.svgposition);
              value.svgposition.sort(function(a, b) {
                return b - a;
              });
              console.log(value.svgposition);
              return $.each(value.svgposition, function(index1, val1) {
                var i, rangClass;
                indexvalue = unitsarray[val1];
                $.map(indexvalue, function(index, value) {
                  console.log(temp[ii]);
                  $('#' + temp[ii] + value).attr('class', 'unselected-floor');
                  return $('#' + temp[ii] + value).attr('data-value', index);
                });
                $.map(indexvalue, function(index1, value1) {
                  var floorArr;
                  console.log(floorid);
                  console.log(val1);
                  if (App.defaults['floor'] !== "All") {
                    floorArr = App.defaults['floor'].split(',');
                    if (floorid === val1) {
                      return $.each(floorArr, function(ind, val) {
                        if (parseInt(value1) === parseInt(val)) {
                          $('#' + temp[ii] + value1).attr('class', 'unit-hover range');
                          return $('#' + temp1[ii] + value1).attr('class', 'unit-hover range');
                        }
                      });
                    }
                  } else {
                    $('#' + temp[ii] + value1).attr('class', 'unit-hover range');
                    return $('#' + temp1[ii] + value1).attr('class', 'unit-hover range');
                  }
                });
                rangClass = ['LOWRISE', 'MIDRISE', 'HIGHRISE'];
                i = 0;
                $.each(floorange, function(index, value) {
                  var end, start;
                  start = parseInt(value.start);
                  end = parseInt(value.end);
                  while (parseInt(start) <= parseInt(end)) {
                    $('#' + temp2[ii] + start).attr('class', rangClass[i]);
                    $('#' + temp2[ii] + start).text(rangClass[i]);
                    start++;
                  }
                  return i++;
                });
                return ii++;
              });
            });
          }
        }
      });
      return position = floorid;
    };

    ScreenThreeLayout.prototype.checkSelection = function(model) {
      var flag, myArray, object, track;
      myArray = [];
      $.map(App.defaults, function(value, index) {
        if (value !== 'All' && index !== 'floor' && index !== 'unittypeback') {
          return myArray.push({
            key: index,
            value: value
          });
        }
      });
      flag = 0;
      object = this;
      track = 0;
      $.each(myArray, function(index, value) {
        var budget_arr, budget_price, buildingModel, element, floorRise, floorRiseValue, initvariant, paramKey, temp, tempstring, unitPrice, unitVariantmodel, _i, _len, _results;
        paramKey = {};
        if (value.key === 'budget') {
          buildingModel = App.master.building.findWhere({
            'id': model.get('building')
          });
          floorRise = buildingModel.get('floorrise');
          floorRiseValue = floorRise[model.get('floor')];
          unitVariantmodel = App.master.unit_variant.findWhere({
            'id': model.get('unitVariant')
          });
          unitPrice = model.get('unitPrice');
          budget_arr = value.value.split(' ');
          budget_price = budget_arr[0].split('-');
          budget_price[0] = budget_price[0] + '00000';
          budget_price[1] = budget_price[1] + '00000';
          if (parseInt(unitPrice) >= parseInt(budget_price[0]) && parseInt(unitPrice) <= parseInt(budget_price[1])) {
            return flag++;
          }
        } else if (value.key !== 'floor') {
          temp = [];
          temp.push(value.value);
          tempstring = temp.join(',');
          initvariant = tempstring.split(',');
          if (initvariant.length > 1) {
            _results = [];
            for (_i = 0, _len = initvariant.length; _i < _len; _i++) {
              element = initvariant[_i];
              if (model.get(value.key) === parseInt(element)) {
                _results.push(flag++);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            if (model.get(value.key) === parseInt(value.value)) {
              return flag++;
            }
          }
        }
      });
      if (flag === myArray.length) {
        track = 1;
      }
      if (myArray.length === 0) {
        track = 1;
      }
      return track;
    };

    ScreenThreeLayout.prototype.onShowRangeData = function(unitModel, collection) {
      var buildinArray, building, buildingCollection, buildingModel, element, exceptionObject, floorLayoutimage, index, object, pos, unitcoll, _i, _j, _len, _len1;
      $('#floorsvg').text("");
      console.log(unitModel);
      position = unitModel.get('unitAssigned');
      object = this;
      unitcoll = collection.toArray();
      $.each(unitcoll, function(index, value) {
        var units;
        units = value.get('units');
        return units.each(function(item) {
          return object.checkClassSelection(item);
        });
      });
      buildingCollection = Marionette.getOption(this, 'buildingCollection');
      buildinArray = buildingCollection.toArray();
      building = _.first(buildinArray);
      buildingModel = App.master.building.findWhere({
        id: parseInt(building.get('id'))
      });
      exceptionObject = buildingModel.get('floorexceptionpositions');
      floorLayoutimage = "";
      $.each(exceptionObject, function(index, value1) {
        var floorvalue;
        floorvalue = $.inArray(unitModel.get('floor'), value1.floors);
        console.log(floorvalue);
        if (floorvalue === -1) {
          return floorLayoutimage = building.get('floor_layout_basic').image_url;
        } else {
          if (value1.floor_layout_basic.image_url === "") {
            return floorLayoutimage = building.get('floor_layout_basic').image_url;
          } else {
            return floorLayoutimage = value1.floor_layout_basic.image_url;
          }
        }
      });
      if (exceptionObject.legth === 0) {
        floorLayoutimage = building.get('floor_layout_basic').image_url;
      }
      pos = unitModel.get('unitAssigned');
      $('<div></div>').load(floorLayoutimage, function(x) {
        $('#' + pos).attr('class', 'floor-pos position');
        return unitAssigedArray.push(pos);
      }).appendTo("#floorsvg");
      for (index = _i = 0, _len = unitAssigedArray.length; _i < _len; index = ++_i) {
        element = unitAssigedArray[index];
        if (element === parseInt(unitModel.get('unitAssigned'))) {
          $('#' + element).attr('class', 'floor-pos position');
        } else {
          $('#' + element).attr('class', 'floor-pos ');
        }
      }
      unitAssigedArray.push(unitModel.get('unitAssigned'));
      $('#' + unitModel.get('unitAssigned')).attr('class', 'position');
      console.log(unitModel.get('unitAssigned'));
      console.log(sudoSlider);
      sudoSlider.goToSlide(unitModel.get('unitAssigned'));
      for (index = _j = 0, _len1 = rangeunitArray.length; _j < _len1; index = ++_j) {
        element = rangeunitArray[index];
        if (element === parseInt(unitModel.get('id'))) {
          $("#select" + unitModel.get('id')).val('1');
        } else {
          $("#select" + element).val('0');
          $('#check' + element).removeClass('selected');
          rangeunitArray = [];
        }
      }
      rangeunitArray.push(parseInt(unitModel.get('id')));
      $('#check' + unitModel.get('id')).addClass("selected");
      $("#select" + unitModel.get('id')).val("1");
      $("#screen-three-button").removeClass('disabled btn-default');
      return $("#screen-three-button").addClass('btn-primary');
    };

    ScreenThreeLayout.prototype.checkClassSelection = function(model) {
      var flag, myArray, object, track;
      myArray = [];
      $.map(App.defaults, function(value, index) {
        if (value !== 'All' && index !== 'floor' && index !== 'unittypeback') {
          return myArray.push({
            key: index,
            value: value
          });
        }
      });
      flag = 0;
      object = this;
      track = 0;
      $.each(myArray, function(index, value) {
        var budget_arr, budget_price, buildingModel, element, floorRise, floorRiseValue, initvariant, paramKey, temp, tempstring, unitPrice, unitVariantmodel, _i, _len, _results;
        paramKey = {};
        if (value.key === 'budget') {
          buildingModel = App.master.building.findWhere({
            'id': model.get('building')
          });
          floorRise = buildingModel.get('floorrise');
          floorRiseValue = floorRise[model.get('floor')];
          unitVariantmodel = App.master.unit_variant.findWhere({
            'id': model.get('unitVariant')
          });
          unitPrice = model.get('unitPrice');
          budget_arr = value.value.split(' ');
          budget_price = budget_arr[0].split('-');
          budget_price[0] = budget_price[0] + '00000';
          budget_price[1] = budget_price[1] + '00000';
          if (parseInt(unitPrice) >= parseInt(budget_price[0]) && parseInt(unitPrice) <= parseInt(budget_price[1])) {
            return flag++;
          }
        } else if (value.key !== 'floor') {
          temp = [];
          temp.push(value.value);
          tempstring = temp.join(',');
          initvariant = tempstring.split(',');
          if (initvariant.length > 1) {
            _results = [];
            for (_i = 0, _len = initvariant.length; _i < _len; _i++) {
              element = initvariant[_i];
              if (model.get(value.key) === parseInt(element)) {
                _results.push(flag++);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            if (model.get(value.key) === parseInt(value.value)) {
              return flag++;
            }
          }
        }
      });
      if (flag === myArray.length) {
        track = 1;
      }
      if (myArray.length === 0) {
        track = 1;
      }
      if (track === 1 && model.get('status') === 9 && model.get('unitType') !== 14 && model.get('unitType') !== 16) {
        $('#check' + model.get("id")).addClass('boxLong filtered');
        return $('#flag' + model.get("id")).val('1');
      } else if (track === 1 && model.get('status') === 8 && model.get('unitType') !== 14 && model.get('unitType') !== 16) {
        return $('#check' + model.get("id")).addClass('boxLong sold');
      } else {
        $('#check' + model.get("id")).addClass('boxLong other');
        return $('#check' + model.get("id")).text(model.get('unitTypeName'));
      }
    };

    ScreenThreeLayout.prototype.doListing = function() {
      $('#tagslist1 ul li').remove();
      $.each(tagsArray, function(index, value) {
        return $('#tagslist1 ul').append('<li id="uli-item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.area + '</span><div class="closeButton1"></div></li>');
      });
      if (tagsArray.length === 1) {
        return $('.closeButton1').addClass('hidden');
      }
    };

    ScreenThreeLayout.prototype.delItem = function(delnum) {
      var i, index, key, params, removeItem, unitvariantarrayValues;
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
        $('#uli-item-' + delnum).remove();
        unitvariantarrayValues = [];
        $.each(tagsArray, function(index, value) {
          return unitvariantarrayValues.push(value.id);
        });
        App.layout.screenFourRegion.el.innerHTML = "";
        App.navigate("screen-three");
        App.defaults['unitVariant'] = unitvariantarrayValues.join(',');
        App.currentStore.unit.reset(UNITS);
        App.currentStore.building.reset(BUILDINGS);
        App.currentStore.unit_type.reset(UNITTYPES);
        App.currentStore.unit_variant.reset(UNITVARIANTS);
        App.filter(params = {});
        return this.trigger('unit:variants:selected');
      }
    };

    return ScreenThreeLayout;

  })(Marionette.LayoutView);
  BuildingView = (function(_super) {
    __extends(BuildingView, _super);

    function BuildingView() {
      return BuildingView.__super__.constructor.apply(this, arguments);
    }

    BuildingView.prototype.template = '<a class="link" >{{name}}</a>';

    BuildingView.prototype.tagName = 'li';

    BuildingView.prototype.events = {
      'click a': function(e) {
        return e.preventDefault();
      },
      'click .link': function(e) {
        var params;
        $('#tower' + this.model.get('id')).removeClass('hidden');
        App.defaults['building'] = this.model.get('id');
        App.filter(params = {});
        msgbus.showApp('header').insideRegion(App.headerRegion).withOptions();
        return this.trigger('building:link:selected');
      }
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

    return UnitTypeChildView;

  })(Marionette.CompositeView);
  unitChildView = (function(_super) {
    __extends(unitChildView, _super);

    function unitChildView() {
      return unitChildView.__super__.constructor.apply(this, arguments);
    }

    unitChildView.prototype.template = '<div class="pull-left light"> <h5 class="rangeName bold m-t-5">Floor {{floor}}</h5> </div> <div class="pull-right text-center"> <div class="unitNo">{{name}}</div> <div class="small">{{unittypename}} {{sellablearea}} Sq.ft.</div> </div> <input type="hidden" id="flag{{id}}" name="flag{{id}}" value="0"/> <input type="hidden" id="select{{id}}" name="select{{id}}" value="0"/> <div class="clearfix"></div>';

    unitChildView.prototype.className = 'check';

    unitChildView.prototype.initialize = function() {
      return this.$el.prop("id", 'check' + this.model.get("id"));
    };

    unitChildView.prototype.events = {
      'click ': function(e) {
        var buildingModel, check, element, index, indexvalue, object, screenThreeLayout, svgdata, svgposition, temp, temp1, temp2, unitModel, unitvalues, _i, _len;
        screenThreeLayout = new ScreenThreeLayout();
        check = screenThreeLayout.checkSelection(this.model);
        if (check === 1 && this.model.get('status') === 9) {
          buildingModel = App.master.building.findWhere({
            id: parseInt(this.model.get('building'))
          });
          console.log(svgdata = buildingModel.get('svgdata'));
          svgposition = "";
          unitvalues = "";
          indexvalue = "";
          temp = ['f', 'ff'];
          temp1 = ['t', 'tt'];
          temp2 = ['c', 'cc'];
          $.each(svgdata, function(index, value) {
            if ($.inArray(position, value.svgposition) >= 0 && value.svgposition !== null) {
              return $.each(value.svgposition, function(index1, val1) {
                var indexvalue1, unitsarray, unitsarray1;
                unitsarray1 = value.units;
                indexvalue1 = unitsarray1[val1];
                if (parseInt(position) === parseInt(val1)) {
                  console.log(position);
                  svgposition = value.svgfile;
                  unitsarray = value.units;
                  indexvalue = unitsarray[position];
                }
                return $.map(indexvalue1, function(index, value) {
                  $('#f' + value).attr('class', 'unit-hover');
                  return $('#ff' + value).attr('class', 'unit-hover');
                });
              });
            }
          });
          $('#screen-four-region').removeClass('section');
          App.layout.screenFourRegion.el.innerHTML = "";
          App.navigate("screen-three");
          App.currentStore.unit.reset(UNITS);
          App.currentStore.building.reset(BUILDINGS);
          App.currentStore.unit_type.reset(UNITTYPES);
          App.currentStore.unit_variant.reset(UNITVARIANTS);
          console.log(unitModel = App.master.unit.findWhere({
            id: this.model.get("id")
          }));
          console.log(indexvalue);
          for (index = _i = 0, _len = rangeunitArray.length; _i < _len; index = ++_i) {
            element = rangeunitArray[index];
            if (element === this.model.get('id')) {
              $("#select" + this.model.get('id')).val('1');
            } else {
              $("#select" + element).val('0');
              $('#check' + element).removeClass('selected');
              if (unitModel.get('status') === 9) {
                $("#" + element).attr('class', 'unit-hover aviable ');
              } else if (unitModel.get('status') === 8) {
                $("#" + element).attr('class', 'unit-hover sold ');
              }
              rangeunitArray = [];
            }
          }
          if (parseInt($("#select" + this.model.get('id')).val()) === 0) {
            rangeunitArray.push(this.model.get('id'));
            $('#check' + this.model.get("id")).addClass("selected");
            $("#select" + this.model.get('id')).val("1");
            object = this;
            $.map(indexvalue, function(index, value) {
              var floorArr;
              if (App.defaults['floor'] !== 'All') {
                floorArr = App.defaults['floor'].split(',');
                return $.each(floorArr, function(ind, val) {
                  console.log(position);
                  if (parseInt(value) === parseInt(val)) {
                    if (position === 3 || position === 1) {
                      $('#f' + value).attr('class', 'unit-hover range');
                      return $('#t' + value).text("");
                    } else {
                      $('#ff' + value).attr('class', 'unit-hover range');
                      return $('#tt' + value).text("");
                    }
                  }
                });
              } else {
                $('#f' + value).attr('class', 'unit-hover');
                $('#t' + value).text("");
                $('#ff' + value).attr('class', 'unit-hover');
                return $('#tt' + value).text("");
              }
            });
            $.map(indexvalue, function(index, value) {
              var positionassigend;
              if (parseInt(index) === object.model.get("id")) {
                positionassigend = value;
                if (position === 3 || position === 1) {
                  $("#f" + value).attr('class', 'selected-flat');
                  $("#t" + value).attr('class', 'selected-flat');
                  return $('#t' + value).text(object.model.get('name'));
                } else {
                  $("#ff" + value).attr('class', 'selected-flat');
                  $("#tt" + value).attr('class', 'selected-flat');
                  return $('#tt' + value).text(object.model.get('name'));
                }
              }
            });
            $('#' + this.model.get("unitAssigned")).attr('class', 'floor-pos position');
            App.unit['name'] = this.model.get("id");
            $("#screen-three-button").removeClass('disabled btn-default');
            $("#screen-three-button").addClass('btn-primary');
          } else {
            rangeunitArray = [];
            $("#select" + this.model.get('id')).val("0");
            $('#check' + this.model.get('id')).removeClass('selected');
            if (unitModel.get('status') === 9) {
              $("#" + this.model.get("id")).attr('class', 'unit-hover aviable ');
            } else if (unitModel.get('status') === 8) {
              $("#" + this.model.get("id")).attr('class', 'unit-hover sold ');
            }
          }
          if (parseInt($("#select" + this.model.get('id')).val()) === 0) {
            $("#screen-three-button").addClass('disabled btn-default');
            $("#screen-three-button").removeClass('btn-primary');
            object = this;
            $.map(indexvalue, function(index, value) {
              var floorArr;
              if (App.defaults['floor'] !== 'All') {
                floorArr = App.defaults['floor'].split(',');
                return $.each(floorArr, function(ind, val) {
                  if (parseInt(value) === parseInt(val)) {
                    if (position === 3 || position === 1) {
                      return $('#f' + val).attr('class', 'unit-hover range');
                    } else {
                      return $('#ff' + val).attr('class', 'unit-hover range');
                    }
                  }
                });
              }
            });
            $('#' + this.model.get("unitAssigned")).attr('class', 'floor-pos ');
            return false;
          }
        }
      }
    };

    unitChildView.prototype.onShow = function() {
      var flag, myArray, object, track;
      myArray = [];
      $.map(App.defaults, function(value, index) {
        if (value !== 'All' && index !== 'floor' && index !== 'unittypeback') {
          return myArray.push({
            key: index,
            value: value
          });
        }
      });
      flag = 0;
      object = this;
      track = 0;
      $.each(myArray, function(index, value) {
        var budget_arr, budget_price, buildingModel, element, floorRise, floorRiseValue, initvariant, paramKey, temp, tempstring, unitPrice, unitVariantmodel, _i, _len, _results;
        paramKey = {};
        if (value.key === 'budget') {
          buildingModel = App.master.building.findWhere({
            'id': object.model.get('building')
          });
          floorRise = buildingModel.get('floorrise');
          floorRiseValue = floorRise[object.model.get('floor')];
          unitVariantmodel = App.master.unit_variant.findWhere({
            'id': object.model.get('unitVariant')
          });
          unitPrice = object.model.get('unitPrice');
          budget_arr = value.value.split(' ');
          budget_price = budget_arr[0].split('-');
          budget_price[0] = budget_price[0] + '00000';
          budget_price[1] = budget_price[1] + '00000';
          if (parseInt(unitPrice) >= parseInt(budget_price[0]) && parseInt(unitPrice) <= parseInt(budget_price[1])) {
            return flag++;
          }
        } else if (value.key !== 'floor') {
          temp = [];
          temp.push(value.value);
          tempstring = temp.join(',');
          initvariant = tempstring.split(',');
          if (initvariant.length > 1) {
            _results = [];
            for (_i = 0, _len = initvariant.length; _i < _len; _i++) {
              element = initvariant[_i];
              if (object.model.get(value.key) === parseInt(element)) {
                _results.push(flag++);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          } else {
            if (object.model.get(value.key) === parseInt(value.value)) {
              return flag++;
            }
          }
        }
      });
      if (flag === myArray.length) {
        track = 1;
      }
      if (myArray.length === 0) {
        track = 1;
      }
      if (track === 1 && this.model.get('status') === 9 && this.model.get('unitType') !== 14 && this.model.get('unitType') !== 16) {
        $('#check' + this.model.get("id")).addClass('boxLong filtered');
        return $('#flag' + this.model.get("id")).val('1');
      } else if (track === 1 && this.model.get('status') === 8 && this.model.get('unitType') !== 14 && this.model.get('unitType') !== 16) {
        return $('#check' + this.model.get("id")).addClass('boxLong sold');
      } else {
        $('#check' + this.model.get("id")).addClass('boxLong other');
        return $('#check' + this.model.get("id")).text(this.model.get('unitTypeName'));
      }
    };

    return unitChildView;

  })(Marionette.ItemView);
  UnitView = (function(_super) {
    __extends(UnitView, _super);

    function UnitView() {
      return UnitView.__super__.constructor.apply(this, arguments);
    }

    UnitView.prototype.template = '<div class="unitContainer"></div>';

    UnitView.prototype.childView = unitChildView;

    UnitView.prototype.childViewContainer = '.unitContainer';

    UnitView.prototype.initialize = function() {
      this.collection = this.model.get('units');
      return this.$el.prop("id", this.model.get("id"));
    };

    return UnitView;

  })(Marionette.CompositeView);
  UnitTypeView = (function(_super) {
    __extends(UnitTypeView, _super);

    function UnitTypeView() {
      return UnitTypeView.__super__.constructor.apply(this, arguments);
    }

    UnitTypeView.prototype.template = '<div class="unitTable"> <div id="unitsSlider" class="unitSlider"> </div></div>';

    UnitTypeView.prototype.childView = UnitView;

    UnitTypeView.prototype.childViewContainer = '.unitSlider';

    UnitTypeView.prototype.onShow = function() {
      var container, height, maxcoll, maxvalue;
      console.log(container = $("#unitsSlider"));
      height = container.height("auto").height();
      container.height("auto");
      sudoSlider = $("#unitsSlider").sudoSlider({
        customLink: "a",
        prevNext: false,
        responsive: true,
        speed: 800
      });
      console.log(maxcoll = this.collection.toArray());
      console.log(maxvalue = _.max(maxcoll, function(model) {
        return model.get('count');
      }));
      return sudoSlider.goToSlide(maxvalue.get('id'));
    };

    return UnitTypeView;

  })(Marionette.CompositeView);
  return {
    ScreenThreeLayout: ScreenThreeLayout,
    UnitTypeChildView: UnitTypeChildView,
    UnitTypeView: UnitTypeView
  };
});
