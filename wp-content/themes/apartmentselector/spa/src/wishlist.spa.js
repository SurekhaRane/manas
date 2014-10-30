define('plugin-loader', ['underscorestring', 'fancybox'], function() {});

define('apps-loader', ['src/apps/footer/footer-controller', 'src/apps/header/header-controller', 'src/apps/screen-one/screen-one-controller', 'src/apps/screen-two/screen-two-controller', 'src/apps/screen-three/screen-three-controller', 'src/apps/screen-four/screen-four-controller', 'src/apps/popup/popup-controller', 'src/apps/main-app/main-layout'], function() {});

require(['plugin-loader', 'spec/javascripts/fixtures/json/range', 'extm', 'src/classes/ap-store', 'src/apps/router', 'apps-loader'], function(plugins, range, Extm) {
  var staticApps;
  window.App = new Extm.Application;
  App.addRegions({
    headerRegion: '#header-region',
    footerRegion: '#footer-region',
    filterRegion: '#filter-region',
    mainRegion: '#main-region',
    wishListRegion: '#wishlist-region'
  });
  App.currentStore = {
    'unit': new Backbone.Collection(UNITS),
    'view': new Backbone.Collection(VIEWS),
    'building': new Backbone.Collection(BUILDINGS),
    'unit_variant': new Backbone.Collection(UNITVARIANTS),
    'unit_type': new Backbone.Collection(UNITTYPES),
    'range': new Backbone.Collection(range),
    'status': new Backbone.Collection(STATUS),
    'facings': new Backbone.Collection(FACINGS)
  };
  App.master = {
    'unit': new Backbone.Collection(UNITS),
    'view': new Backbone.Collection(VIEWS),
    'building': new Backbone.Collection(BUILDINGS),
    'unit_variant': new Backbone.Collection(UNITVARIANTS),
    'unit_type': new Backbone.Collection(UNITTYPES),
    'range': new Backbone.Collection(range),
    'status': new Backbone.Collection(STATUS),
    'facings': new Backbone.Collection(FACINGS)
  };
  App.unit = {
    name: '',
    flag: 0
  };
  App.screenOneFilter = {
    key: '',
    value: ''
  };
  App.backFilter = {
    'screen1': [],
    'screen2': [],
    'screen3': [],
    'back': ""
  };
  App.defaults = {
    "unitType": 'All',
    'budget': 'All',
    "building": 'All',
    "unitVariant": 'All',
    'floor': 'All',
    'view': 'All'
  };
  App.layout = "";
  App.range = range;
  App.currentRoute = [];
  staticApps = [];
  if (window.location.hash === '') {
    staticApps.push(['header', App.headerRegion]);
    staticApps.push(['popup', App.mainRegion]);
  }
  App.addStaticApps(staticApps);
  return App.start();
});
