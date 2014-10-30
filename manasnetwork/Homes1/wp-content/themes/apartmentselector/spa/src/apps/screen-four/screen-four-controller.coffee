define [ 'extm', 'src/apps/screen-four/screen-four-view' ], ( Extm, ScreenFourView )->

    # Screen four controller
    class ScreenFourController extends Extm.RegionController

        initialize :(opt)->
            @getPerSqFtPrice()

            

        showViews:=>
            @unitCollection = @Collection[0]
            @mainCollection = @Collection[0]
            @showUnitRegion @unitCollection
            @showMainRegion @mainCollection





        showUnitRegion:(unitCollection)->
            itemview1 = @getView unitCollection
            @layout.unitRegion.show itemview1



        showMainRegion:(mainCollection)->
            itemview2 = @getUnitsView mainCollection
            @layout.mainRegion.show itemview2










        getView:(unitCollection)->
            new ScreenFourView.UnitTypeChildView
                collection : unitCollection

        getUnitsView:(mainCollection)->
            new ScreenFourView.UnitTypeView
                collection : mainCollection

        _getSelelctedUnit:->
            units = App.master.unit.where({id:parseInt(App.unit['name'])})
            unitsArray = App.master.unit.toArray()
            $.each(units, (index,value)->

                unitVariantModel = App.master.unit_variant.findWhere({id:value.get('unitVariant')})
                unitTypeModel = App.master.unit_type.findWhere({id:value.get('unitType')})
                value.set 'unittypename' , unitTypeModel.get('name')
                value.set 'terracearea' , unitVariantModel.get('terracearea')
                value.set 'sellablearea' , unitVariantModel.get('sellablearea')
                value.set 'carpetarea' , unitVariantModel.get('carpetarea')
                value.set 'unittypename' , unitTypeModel.get('name')
                value.set 'TwoDimage' , unitVariantModel.get('url2dlayout_image')
                value.set 'ThreeDimage' , unitVariantModel.get('url3dlayout_image')

                building = App.master.building.findWhere({id:value.get('building')})
                value.set 'buildingname' , building.get('name')
                exceptionObject = building.get 'floorexceptionpositions'
                floorLayoutimage = ""
                $.each(exceptionObject, (index,value1)->
                    floorvalue = $.inArray( value.get('floor'),value1.floors)
                    if floorvalue == -1
                        floorLayoutimage = building.get('floor_layout_detailed').image_url
                    else
                        if value1.floor_layout_detailed.image_url == ""
                            floorLayoutimage = building.get('floor_layout_detailed').image_url
                        else
                            floorLayoutimage = value1.floor_layout_detailed.image_url



                )
                if exceptionObject.legth == 0
                    floorLayoutimage = building.get('floor_layout_detailed').image_url

                    
                #console.log exceptionObject[0].floors
                #console.log floorvalue = $.inArray( value.get('floor'),exceptionObject[0].floors)
                ##floorLayoutimage = ""
                #if floorvalue == -1
                    #console.log positionObject = building.get 'floorpositions'
                    #$.each(positionObject, (index,value1)->
                        #if value.get('unitAssigned') == value1.flat_no
                            #floorLayoutimage =value1.image_url



                    #)
                #else
                    #positionObject = exceptionObject[0].detailed_image
                    #$.each(positionObject, (index,value1)->
                        #if value.get('unitAssigned') == value1.flat_no
                            #floorLayoutimage =value1.image_url



                    #)
                #floorLayoutimage = building.get('floor_layout_detailed').thumbnail_url


                roomSizesArray = unitVariantModel.get 'roomsizes'
                temp = []
                roomsizearray = []
                $.each(roomSizesArray, (index,value1)->
                    roomsizearray.push({size: value1.room_size, type: value1.room_type})




                )
                viewModelArray = []
                facingModelArray = []
                if value.get('views').length != 0
                    viewsArray = value.get('views')
                    for element in viewsArray
                        viewModel = App.master.view.findWhere({id:parseInt(element)})
                        viewModelArray.push(viewModel.get('name'))
                else
                    viewModelArray.push('-----')
                value.set 'facings_name' , viewModelArray.join(', ')
                facingssArray = value.get('facing')
                if facingssArray.length != 0
                    for element in facingssArray
                        facingModel = App.master.facings.findWhere({id:parseInt(element)})
                        facingModelArray.push(facingModel.get('name'))

                else
                    facingModelArray.push('-----')
                value.set 'views_name' , facingModelArray.join(', ')

                terraceoptions = unitVariantModel.get 'terraceoptions'
                terraceModel = App.master.terrace.findWhere({id:parseInt(terraceoptions)})
                terraceoptionstext = ""
                terraceoptionstextArr = []
                if terraceModel == undefined
                    terraceoptionstext = '---------'
                else
                    terraceoptionstext = terraceModel.get 'name'
                    
                
                
                #value.set 'facings_name',facingModelArray.join(', ')
                value.set 'floorLayoutimage' , floorLayoutimage
                value.set 'BuildingPositionimage' , building.get('positioninproject').image_url
                value.set 'roomsizearray' , roomsizearray
                value.set 'terraceoptions' , terraceoptionstext
                value.set 'zoomedinimage' , building.get('zoomedinimage').image_url
                value.set 'floor_layout_basic' , building.get('floor_layout_basic').image_url

                floorriserange = building.get 'floorriserange'
                    #floorriserange = [{"name":"low","start":"1","end":"2"},{"name":"medium","start":"3","end":"4"},{"name":"high","start":"5","end":"6"}]
                rangeArrayVal = []
                i = 0
                $.each(floorriserange, (index,value1)->
                    rangeArrayVal = []
                    i = 0
                    start = parseInt(value1.start)
                    end = parseInt(value1.end)
                    while parseInt(start) <= parseInt(end)
                        rangeArrayVal[i] = start
                        start = parseInt(start) + 1
                        i++
                    rangename = ""
                    if jQuery.inArray(parseInt(value.get('floor')),rangeArrayVal) >= 0
                        if value.name1 == "medium"
                            rangename = "mid"
                        else
                            rangename = value1.name
                    
                        rangename = _.str.capitalize rangename
                        value.set "flooRange" ,rangename+'rise'



                )





            )
            



            units.sort( (a,b) ->
                a.get('id') - b.get('id')
            )
            modelIdArr = []
            modelArr = []
            ModelActualArr = []
            $.each(units, (index,value)->
                modelIdArr.push(value.get('id'))

            )
            index = _.indexOf(modelIdArr, parseInt(App.unit['name']))
            highLength = modelIdArr.length - index
            i = index
            while(i<modelIdArr.length)
                modelArr.push(modelIdArr[i])
                i++
            j= 0
            while(j<index)
                modelArr.push(modelIdArr[j])
                j++







            unitCollection = new Backbone.Collection(units)
            $.each(modelArr, (index,value)->
                ModelActualArr.push(unitCollection.get(value))

            )

            unitCollection = new Backbone.Collection(ModelActualArr)
            [unitCollection , PAYMENTPLANS]


        getPerSqFtPrice:->
            unitModel = App.master.unit.findWhere({id:parseInt(App.unit['name'])})
            object = @
            $.ajax(
                method: "POST" ,
                url : AJAXURL+'?action=get_unit_single_details',
                data : 'id='+unitModel.get('id'),
                success :(result)-> 
                    unitModel.set 'persqftprice' , result.persqftprice
                    unitModel.set 'views' , result.views
                    unitModel.set 'facing' , result.facings
                    object.Collection = object._getSelelctedUnit()
                    object.layout = new ScreenFourView.ScreenFourLayout(
                        templateHelpers:
                            paymentplans :object.Collection[1]
                    )


                    object.listenTo object.layout, "show", object.showViews
                    object.show object.layout

            #@listenTo @layout, "get:perSqft:price", @getPerSqFtPrice




            
                    #object.layout.triggerMethod "show:cost:sheet" , result
                error:(result)->

            )













    msgbus.registerController 'screen:four', ScreenFourController