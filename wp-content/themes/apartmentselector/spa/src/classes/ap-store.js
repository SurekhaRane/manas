define(['underscore', 'extm', 'async'], function(_, Extm, async) {
  return _.extend(Extm.Store.prototype, {
    getUnits: function(unittypeid) {
      var Collection, Model, buildingArray, unitColl;
      unittypeid = parseInt(unittypeid);
      buildingArray = Array();
      unitColl = Array();
      Model = Backbone.Model.extend({});
      Collection = Backbone.Collection.extend({
        model: Model
      });
      return App.store.find('unit', {
        unitType: unittypeid,
        status: 'Available'
      }).then(function(result) {
        var itemcoll, units;
        units = result;
        itemcoll = result;
        units.each(function(item) {
          var maxcoll;
          maxcoll = Array();
          if (buildingArray.indexOf(item.get('building')) === -1) {
            return buildingArray.push(item.get('building'));
          }
        });
        $.each(buildingArray, function(index, value) {
          var buildingid, highArray, high_max_val, high_min_val, itemCollection, lowArray, low_max_val, low_min_val, mainArray, mediumArray, medium_max_val, medium_min_val, newunits;
          itemCollection = new Collection();
          buildingid = value;
          console.log(value);
          newunits = units.where({
            'building': value
          });
          console.log(newunits);
          lowArray = Array();
          mediumArray = Array();
          highArray = Array();
          mainArray = Array();
          $.each(newunits, function(index1, value1) {
            App.store.find('low').then(function(result) {
              var lowcount;
              console.log(result);
              return lowcount = result.filter(function(x) {
                if (x.get('id') === value1.get('floor')) {
                  return lowArray.push(value1.get('id'));
                }
              });
            });
            App.store.find('medium').then(function(result) {
              var mediumcount;
              console.log(result);
              return mediumcount = result.filter(function(x) {
                if (x.get('id') === value1.get('floor')) {
                  return mediumArray.push(value1.get('id'));
                }
              });
            });
            return App.store.find('high').then(function(result) {
              var highcount;
              console.log(result);
              return highcount = result.filter(function(x) {
                if (x.get('id') === value1.get('floor')) {
                  return highArray.push(value1.get('id'));
                }
              });
            });
          });
          console.log(lowArray.length);
          console.log(mediumArray.length);
          console.log(highArray.length);
          low_max_val = 0;
          low_min_val = 0;
          medium_max_val = 0;
          medium_min_val = 0;
          high_min_val = 0;
          high_max_val = 0;
          $.each(lowArray, function(index2, value2) {
            console.log(value2);
            return App.store.find('unit', value2).then(function(result) {
              return App.store.find('unit_type', result.get('unitType')).then(function(result) {}, App.store.find('unit', {
                unitType: result.get('id'),
                status: 'Available'
              }).then(function(result) {
                var max_coll;
                max_coll = Array();
                result.each(function(unit) {
                  return App.store.find('unit_variant', unit.get('unitVariant')).then(function(result) {
                    return max_coll.push(result.get('sellablearea'));
                  });
                });
                console.log(low_max_val = Math.max.apply(Math, max_coll));
                return console.log(low_min_val = Math.min.apply(Math, max_coll));
              }));
            });
          });
          $.each(mediumArray, function(index2, value2) {
            console.log(value2);
            return App.store.find('unit', value2).then(function(result) {
              return App.store.find('unit_type', result.get('unitType')).then(function(result) {
                return App.store.find('unit', {
                  unitType: result.get('id'),
                  status: 'Available'
                }).then(function(result) {
                  var max_coll;
                  max_coll = Array();
                  result.each(function(unit) {
                    return App.store.find('unit_variant', unit.get('unitVariant')).then(function(result) {
                      return max_coll.push(result.get('sellablearea'));
                    });
                  });
                  console.log(medium_max_val = Math.max.apply(Math, max_coll));
                  return console.log(medium_min_val = Math.min.apply(Math, max_coll));
                });
              });
            });
          });
          $.each(highArray, function(index2, value2) {
            console.log(value2);
            return App.store.find('unit', value2).then(function(result) {
              return App.store.find('unit_type', result.get('unitType')).then(function(result) {
                return App.store.find('unit', {
                  unitType: result.get('id'),
                  status: 'Available'
                }).then(function(result) {
                  var max_coll;
                  max_coll = Array();
                  result.each(function(unit) {
                    return App.store.find('unit_variant', unit.get('unitVariant')).then(function(result) {
                      return max_coll.push(result.get('sellablearea'));
                    });
                  });
                  console.log(high_max_val = Math.max.apply(Math, max_coll));
                  return console.log(high_min_val = Math.min.apply(Math, max_coll));
                });
              });
            });
          });
          console.log(buildingid);
          mainArray.push({
            name: lowArray.length,
            low_max_val: low_max_val,
            low_min_val: low_min_val,
            range: 'low',
            unitType: unittypeid,
            buildingid: buildingid
          });
          mainArray.push({
            name: mediumArray.length,
            low_max_val: medium_max_val,
            low_min_val: medium_min_val,
            range: 'medium',
            unitType: unittypeid,
            buildingid: buildingid
          });
          mainArray.push({
            name: highArray.length,
            low_max_val: high_max_val,
            low_min_val: high_min_val,
            range: 'high',
            unitType: unittypeid,
            buildingid: buildingid
          });
          itemCollection.reset(mainArray);
          console.log(itemCollection);
          return App.store.find('building', value).then(function(result) {
            console.log({
              buildingname: result.get('name'),
              units: itemCollection,
              unitType: unittypeid,
              buildingid: result.get('id')
            });
            return unitColl.push({
              buildingname: result.get('name'),
              units: itemCollection,
              unitType: unittypeid,
              buildingid: result.get('id')
            });
          });
        });
        units.reset();
        units.add(unitColl);
        console.log(units);
        return units;
      });
    },
    getAllUnits: function(buildingid, unittypeid, range) {
      var Collection, Model;
      console.log(buildingid);
      console.log(unittypeid);
      Model = Backbone.Model.extend({});
      Collection = Backbone.Collection.extend({
        model: Model
      });
      return App.store.find('unit', {
        unitType: parseInt(unittypeid),
        building: parseInt(buildingid)
      }).then(function(result) {
        var floorArray, unitcollection;
        unitcollection = result;
        floorArray = Array();
        App.store.find(range).then(function(result) {
          return result.each(function(item) {
            var collection, unitArray;
            collection = new Collection();
            unitArray = Array();
            unitcollection.each(function(unit) {
              console.log(item.get('id'));
              console.log(unit.get('floor'));
              if (parseInt(item.get('id')) === parseInt(unit.get('floor'))) {
                App.store.find('unit_variant', unit.get('unitVariant')).then(function(result) {
                  unit.set('size', result.get('sellablearea'));
                  return App.store.find('view', unit.get('view')).then(function(result) {
                    unit.set('view_name', result.get('  '));
                    return unit.set('range', range);
                  });
                });
                return unitArray.push(unit);
              }
            });
            collection.add(unitArray);
            return floorArray.push({
              floorid: item.get('id'),
              units: collection
            });
          });
        });
        console.log(floorArray);
        unitcollection.reset();
        console.log(unitcollection);
        unitcollection.add(floorArray);
        console.log(unitcollection);
        return unitcollection;
      });
    },
    getSingleUnit: function(unit) {
      return App.store.find('unit', parseInt(unit)).then(function(result) {
        unit = result;
        return App.store.find('unit_variant', unit.get('unitVariant')).then(function(result) {
          unit.set('unit_variant_name', result.get('sellablearea'));
          return App.store.find('unit_type', unit.get('unitType')).then(function(result) {
            unit.set('unit_type_name', result.get('name'));
            return App.store.find('view', unit.get('view')).then(function(result) {
              unit.set('view_name', result.get('name'));
              return unit;
            });
          });
        });
      });
    },
    getHeaderView: function(opt) {
      var Model, count, modelnew;
      if (opt == null) {
        opt = {};
      }
      console.log(opt);
      Model = Backbone.Model.extend({});
      modelnew = new Model();
      count = Object.keys(opt).length;
      return modelnew;
    }
  });
});
