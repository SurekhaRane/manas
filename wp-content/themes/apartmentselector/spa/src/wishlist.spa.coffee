# all modules will start with 'src/'.
# eg: define 'plugins-loader', ['src/bower_component/pluginname'], ->

# add your required plugins here.
define 'plugin-loader', ['underscorestring', 'fancybox'], ->

    # add your marionette apps here
define 'apps-loader', [

    'src/apps/footer/footer-controller'
    'src/apps/header/header-controller'
    'src/apps/screen-one/screen-one-controller'
    'src/apps/screen-two/screen-two-controller'
    'src/apps/screen-three/screen-three-controller'
    'src/apps/screen-four/screen-four-controller'
    'src/apps/popup/popup-controller'
    'src/apps/main-app/main-layout'
], ->

    # set all plugins for this page here
require [ 'plugin-loader'
          'spec/javascripts/fixtures/json/range'
          'extm'
          'src/classes/ap-store'
          'src/apps/router'
          'apps-loader'], ( plugins,range,  Extm )->

    # global application object
    window.App = new Extm.Application

    # add your application main regions here
    App.addRegions
        headerRegion : '#header-region'
        footerRegion : '#footer-region'
        filterRegion : '#filter-region'
        mainRegion : '#main-region'
        wishListRegion : '#wishlist-region'


    # current store
    App.currentStore =
        'unit' : new Backbone.Collection UNITS
        'view' : new Backbone.Collection  VIEWS
        'building' : new Backbone.Collection  BUILDINGS
        'unit_variant' : new Backbone.Collection  UNITVARIANTS
        'unit_type' : new Backbone.Collection  UNITTYPES
        'range': new Backbone.Collection  range
        'status': new Backbone.Collection  STATUS
        'facings': new Backbone.Collection  FACINGS

    # master store
    App.master =
        'unit' : new Backbone.Collection UNITS
        'view' : new Backbone.Collection  VIEWS
        'building' : new Backbone.Collection  BUILDINGS
        'unit_variant' : new Backbone.Collection  UNITVARIANTS
        'unit_type' : new Backbone.Collection  UNITTYPES
        'range': new Backbone.Collection  range
        'status': new Backbone.Collection  STATUS
        'facings': new Backbone.Collection  FACINGS

    # global variable to keep track of the unit the user has clicked on
    App.unit = {name:'',flag:0}

    # global variable to keep track of the filter the user has selected  on the first screen
    App.screenOneFilter = {key:'',value:''}

    # global variable to keep track of the filter the user has selected on the previous screen
    App.backFilter = {'screen1':[],'screen2':[],'screen3':[],'back':""}

    # global variable to keep track of the filtr the user has selected
    App.defaults = {"unitType" :'All','budget':'All' ,"building":'All',"unitVariant":'All','floor':'All','view':'All'}



    App.layout = ""


    App.range = range








    App.currentRoute = []

    # load static apps
    staticApps = [

    ]

    if window.location.hash is ''
        staticApps.push [ 'header', App.headerRegion ]
        staticApps.push [ 'popup', App.mainRegion ]

















    App.addStaticApps staticApps

    # start application
    App.start()

