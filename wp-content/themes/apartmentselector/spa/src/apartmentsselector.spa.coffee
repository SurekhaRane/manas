# all modules will start with 'src/'.
# eg: define 'plugins-loader', ['src/bower_component/pluginname'], ->

# add your required plugins here.
define 'plugin-loader', ['selectFx','jquerymousewheel','mapplic','mapplic_new','jqueryEasingmin'
,'jquerytouchswipe','jqueryliquidslider','jqueryCookie', 'sudoSlider','underscorestring', 'jbox', 'jReject','autoNumeric', 'printPreview','bpopup'], ->

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
          'extm'
          'src/classes/ap-store'
          'src/apps/router'
          'apps-loader'], ( plugins,Extm )->

    # global application object
    window.App = new Extm.Application

    App.layout = ""

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
        'status': new Backbone.Collection  STATUS
        'facings': new Backbone.Collection  FACINGS
        'terrace': new Backbone.Collection  TERRACEOPTIONS


    # master store
    App.master =
        'unit' : new Backbone.Collection UNITS
        'view' : new Backbone.Collection  VIEWS
        'building' : new Backbone.Collection  BUILDINGS
        'unit_variant' : new Backbone.Collection  UNITVARIANTS
        'unit_type' : new Backbone.Collection  UNITTYPES
        'status': new Backbone.Collection  STATUS
        'facings': new Backbone.Collection  FACINGS
        'terrace': new Backbone.Collection  TERRACEOPTIONS

    # global variable to keep track of the filter the user has selected on the previous screen
    App.backFilter = {'screen1':[],'screen2':[],'screen3':[],'back':""}

    # global variable to keep track of the filtr the user has selected
    App.defaults = {"unitType" :'All','budget':'All' ,"building":'All',"unitVariant":'All','floor':'All','view':'All','facing':'All','terrace':'All','unittypeback':'All'}


    localStorage.setItem("refreshvalue", 1)
    refreshvalue = localStorage.getItem("refreshvalue")
    if parseInt(refreshvalue) == 1
        window.location.hash = ""
        
        


    
    
    
    #filter function which takes the parameters into account anf filters the current store.
    App.filter = (params={})->
        #check whether url contains any parameters
        if  window.location.href.indexOf('=') > -1
            params = params
            paramsArray = params.split('&')
            #loop through all the parameters
            for element,index in paramsArray
                param_key = element.split('=')
                #check whether defaults has the param key
                key = App.defaults.hasOwnProperty(param_key[0])
                #If yes , assign the new value to the matched key of the defaults
                if key == true
                    #check the screen which the user is on and accordingy store the filters
                    if  window.location.href.indexOf('screen-two') > -1
                        App.backFilter['screen2'].push param_key[0]
                    else if  window.location.href.indexOf('screen-three') > -1
                        App.backFilter['screen3'].push param_key[0]
                    else
                        App.backFilter['screen1'].push param_key[0]
                    #assign the filter value to the respective defaults variable
                    App.defaults[param_key[0]] = param_key[1]


            #set the params with the filters selected by the user
            params = 'unitType='+App.defaults['unitType']+'&budget='+App.defaults['budget']+'&building='+App.defaults['building']+'&unitVariant='+App.defaults['unitVariant']+
            '&floor='+App.defaults['floor']+'&view='+App.defaults['view']+'&facing='+App.defaults['facing']+'&terrace='+App.defaults['terrace']
        else

            #url doesnt contain any parameters take the value of the defaults
            params = 'unitType='+App.defaults['unitType']+'&budget='+App.defaults['budget']+'&building='+App.defaults['building']+'&unitVariant='+App.defaults['unitVariant']+
            '&floor='+App.defaults['floor']+'&view='+App.defaults['view']+'&facing='+App.defaults['facing']+'&terrace='+App.defaults['terrace']



        param_arr = params.split('&')
        budgetUnitArray = []
        $.each(param_arr, (index,value)->
            value_arr  =  value.split('=')
            param_key = value_arr[0]
            param_val = value_arr[1]
            param_val_arr = param_val.split(',')
            paramkey = {}
            paramkey[param_key] = parseInt(param_val)
            # if there are comma seperted values assigned to the filter
            if param_val_arr.length > 1
                collection = []
                #loop through each value
                unitSplitArray = []
                $.each(param_val_arr, (index,value)->
                    paramkey = {}
                    collectionNew = []

                    paramkey[param_key] = parseInt(value)
                    collectionNew = App.currentStore.unit.where(paramkey)
                    if collectionNew.length == 0
                        units = App.currentStore.unit
                        units.each( (item)->
                            if $.inArray(value,item.get('apartment_views')) >=0 || $.inArray(value,item.get('facing')) >=0
                                unitSplitArray.push item

                        collectionNew = unitSplitArray

                        )
                    #loop through the filtered collection and get the updated collection
                    $.each(collectionNew , (index,value)->
                        collection.push value


                    )



                )
                #if thers is only one value assigned to the filter
            else if param_val_arr.length ==  1
                budget_val = param_val_arr[0].split(' ')
                #if filter value is set to ALl
                if param_val_arr[0].toUpperCase() == 'ALL'
                    collection =  App.currentStore.unit.toArray()
                    # if filter is set to budget value
                else if budget_val.length>1
                    budgetUnitArray = App.getBudget(budget_val[0])
                    collection  = budgetUnitArray
                    #if filter is set to a value
                else
                    unitSplitArray = []
                    collection =  App.currentStore.unit.where(paramkey)
                    units = App.currentStore.unit
                    if collection.length == 0
                        units.each( (item)->
                            if $.inArray(value_arr[1],item.get('apartment_views')) >=0 || $.inArray(value_arr[1],item.get('facing')) >=0
                                unitSplitArray.push item
                        )
                        collection = unitSplitArray



            App.currentStore.unit.reset collection


        )


        buildings = App.currentStore.unit.pluck("building")
        uniqBuildings = _.uniq(buildings)
        buildingArray = Array()
        for element , index in uniqBuildings
            buildingModel = App.currentStore.building.get element
            buildingArray.push buildingModel

        unittype = App.currentStore.unit.pluck("unitType")
        uniqUnittype = _.uniq(unittype)
        unittypeArray = Array()
        for element , index in uniqUnittype
            unittypeModel = App.currentStore.unit_type.get element
            unittypeArray.push unittypeModel

        unitvariant = App.currentStore.unit.pluck("unitVariant")
        uniqUnitvariant = _.uniq(unitvariant)
        unitvariantArray = Array()
        for element , index in uniqUnitvariant
            unitvariantModel = App.currentStore.unit_variant.get element
            unitvariantArray.push unitvariantModel

        view = App.currentStore.unit.pluck("apartment_views")
        uniqviews = _.uniq(buildings)
        viewArray = Array()
        for element , index in uniqviews
            viewModel = App.currentStore.view.get element
            viewArray.push viewModel
        App.currentStore.building.reset buildingArray
        App.currentStore.unit_type.reset unittypeArray
        App.currentStore.unit_variant.reset unitvariantArray
        App.currentStore.view.reset viewArray
        App.currentStore.unit

    App.getBudget = (budget)->
        budgetUnitArray = []
        budget_arr = budget.split('-')
        budget_arr[0] = budget_arr[0] + ('00000')
        budget_arr[1] = budget_arr[1]+ ('00000')
        status = App.currentStore.status.findWhere({'name':'Available'})

        units = App.currentStore.unit.where({'status':status.get('id')})
        unitsColl = new Backbone.Collection units
        unitsColl.each (item)->
            buildingModel = App.currentStore.building.findWhere({'id':item.get 'building'})
            floorRise = buildingModel.get 'floorrise'
            floorRiseValue = floorRise[item.get 'floor']
            unitVariantmodel = App.currentStore.unit_variant.findWhere({'id':item.get 'unitVariant'})
            #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
            unitPrice = item.get 'unitPrice'
            item.set({'unitPrice' , unitPrice})
            if item.get('unitPrice') > parseInt(budget_arr[0]) && item.get('unitPrice') < parseInt(budget_arr[1])
                budgetUnitArray.push item
        budgetUnitArray



    App.currentRoute = []

    # load static apps
    staticApps = [

    ]

    # global variable to keep track of the unit the user has clicked on
    App.unit = {name:'',flag:0}

    # global variable to keep track of the filter the user has selected  on the first screen
    App.screenOneFilter = {key:'',value:''}



    if window.location.hash is ''
        App.filter()
        staticApps.push [ 'main:app', App.mainRegion ]

















    App.addStaticApps staticApps

    # start application
    App.start()

