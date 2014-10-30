define [ 'marionette'], ( Marionette )->

    class ApartmentSelector extends Marionette.AppRouter

        appRoutes:
            'wishList' :  'showpopup'
            'screen-four' : 'showSelectedUnit'
            'screen-three' : 'showUnits'
            'screen-two'  : 'show'
            'screen-one'  : 'showValues'
            ':params' : 'showValues'
            #':params' : 'show'
            'screen-two/:params'  : 'show'
            'screen-three/:params' : 'showUnits'
            'screen-four/:params' : 'showSelectedUnit'








    RouterAPI =
    #Start Sub App
        showValues:(params={})->
            
            msgbus.showApp 'header'
            .insideRegion  App.headerRegion
                .withOptions()

             
            App.backFilter['screen2'] = []
            App.backFilter['screen3'] = []
            App.layout.screenThreeRegion.el.innerHTML = ""
            App.layout.screenTwoRegion.el.innerHTML = ""
            App.layout.screenFourRegion.el.innerHTML = "" 
            $('#screen-two-region').removeClass 'section'
            $('#screen-three-region').removeClass 'section'
            $('#screen-four-region').removeClass 'section'  
            screentwoArray  = App.backFilter['screen1']
            for element in screentwoArray
                key = App.defaults.hasOwnProperty(element)
                if key == true
                    App.defaults[element] = 'All'
            App.currentStore.unit.reset UNITS
            App.currentStore.building.reset BUILDINGS
            App.currentStore.unit_type.reset UNITTYPES
            App.currentStore.unit_variant.reset UNITVARIANTS
            App.filter(params)
            msgbus.showApp 'screen:one'
            .insideRegion  App.layout.screenOneRegion
                .withOptions()




        show :(params={})->
            flag = 0
            $.map(App.defaults, (value, index)->
                if value!='All'
                    flag = 1

            )
            if flag == 0
                msgbus.showApp 'main:app'
                .insideRegion  App.mainRegion
                    .withOptions()
                msgbus.showApp 'screen:one'
                    .insideRegion  App.layout.screenOneRegion
                    .withOptions()
            else
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                $('#screen-three-region').removeClass 'section'
                $('#screen-four-region').removeClass 'section'  
                App.backFilter['screen3'] = []    
                screentwoArray  = App.backFilter['screen2']
                for element in screentwoArray
                    key = App.defaults.hasOwnProperty(element)
                    if key == true
                        App.defaults[element] = 'All'
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params)
            
                setTimeout( (x)->
                    msgbus.showApp 'header'
                    .insideRegion  App.headerRegion
                        .withOptions()

                ,1000) 
            
            
            msgbus.showApp 'screen:two'
            .insideRegion  App.layout.screenTwoRegion
                .withOptions()

        showUnits:(params={})->
            flag = 0
            $.map(App.defaults, (value, index)->
                if value!='All'
                    flag = 1

            )
            if flag == 0
                msgbus.showApp 'main:app'
                .insideRegion  App.mainRegion
                    .withOptions()
                msgbus.showApp 'screen:one'
                .insideRegion  App.layout.screenOneRegion
                    .withOptions()
                msgbus.showApp 'screen:two'
                .insideRegion  App.layout.screenTwoRegion
                    .withOptions()
            else
                App.layout.screenFourRegion.el.innerHTML = ""
                $('#screen-four-region').removeClass 'section'
                App.layout.screenFourRegion.el.innerHTML = ""
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
            
                setTimeout( (x)->
                    msgbus.showApp 'header'
                    .insideRegion  App.headerRegion
                        .withOptions()

                ,1000) 
            
            

            msgbus.showApp 'screen:three'
            .insideRegion  App.layout.screenThreeRegion
                .withOptions()

        showSelectedUnit:(params={})->

            App.filter(params={})
            flag = 0
            $.map(App.defaults, (value, index)->
                if value!='All'
                    flag = 1

            )
            if flag == 0
                msgbus.showApp 'main:app'
                .insideRegion  App.mainRegion
                    .withOptions()
                msgbus.showApp 'screen:one'
                .insideRegion  App.layout.screenOneRegion
                    .withOptions()
                msgbus.showApp 'screen:two'
                .insideRegion  App.layout.screenTwoRegion
                    .withOptions()
                msgbus.showApp 'screen:three'
                .insideRegion  App.layout.screenThreeRegion
                    .withOptions()
            else
                setTimeout( (x)->
                    msgbus.showApp 'header'
                    .insideRegion  App.headerRegion
                        .withOptions()

                ,1000) 
            
            
            msgbus.showApp 'screen:four'
            .insideRegion  App.layout.screenFourRegion
                .withOptions()


        showpopup:->
            msgbus.showApp 'header'
            .insideRegion  App.headerRegion
                .withOptions()
            msgbus.showApp 'popup'
            .insideRegion  App.mainRegion
                .withOptions()










    new ApartmentSelector
        controller : RouterAPI