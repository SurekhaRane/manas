define [ 'extm', 'src/apps/screen-two/screen-two-view' ], ( Extm, ScreenTwoView )->

    # Screen two controller
    tagsArray = ""
    class ScreenTwoController extends Extm.RegionController

        initialize : ()->

            @Collection = @_getUnitsCountCollection()


            @layout = new ScreenTwoView.ScreenTwoLayout(
                collection:@Collection[1]
                buildingColl : @Collection[0]
                uintVariantId : @Collection[9]
                uintVariantIdArray : @Collection[10]
                unitVariants:@Collection[8]
                views :@Collection[13] 
                facings : @Collection[14]
                Oviews :@Collection[11] 
                Ofacings : @Collection[12]
                terrace :@Collection[15] 
                terraceID : @Collection[16]
                templateHelpers:
                    selection :@Collection[2]
                    unitsCount:@Collection[3]
                    unittypes:  @Collection[4]
                    high : @Collection[5]
                    medium : @Collection[6]
                    low : @Collection[7]
                    unitVariants:@Collection[8]
                    views :@Collection[11] 
                    facings : @Collection[12]
                    terrace :@Collection[15] 
                    terraceID : @Collection[16]
                    AJAXURL : AJAXURL)


            @listenTo @layout, "show", @showViews

            @listenTo @layout, "show:updated:building", @showUpdateBuilding

            @listenTo @layout, 'unit:variants:selected', @showUpdateBuildings

            @listenTo @layout, 'unit:count:selected', @_unitCountSelected






            @show @layout


        showUpdateBuildings:->
            
            @Collection = @_getUnitsCountCollection()


            @layout = new ScreenTwoView.ScreenTwoLayout(
                collection:@Collection[1]
                buildingColl : @Collection[0]
                uintVariantId : @Collection[9]
                uintVariantIdArray : @Collection[10]
                views :@Collection[13] 
                facings : @Collection[14]
                Oviews :@Collection[11] 
                Ofacings : @Collection[12]
                unitVariants:@Collection[8]
                terrace :@Collection[15] 
                terraceID : @Collection[16]
                templateHelpers:
                    selection :@Collection[2]
                    unitsCount:@Collection[3]
                    unittypes:  @Collection[4]
                    high : @Collection[5]
                    medium : @Collection[6]
                    low : @Collection[7]
                    unitVariants:@Collection[8]
                    views :@Collection[11] 
                    facings : @Collection[12]
                    terrace :@Collection[15] 
                    terraceID : @Collection[16]
                    AJAXURL : AJAXURL)


            @listenTo @layout, "show", @showViews

            @listenTo @layout, "show:updated:building", @showUpdateBuilding

            @listenTo @layout, 'unit:variants:selected', @showUpdateBuildings

            @listenTo @layout, 'unit:count:selected', @_unitCountSelected






            @show @layout


        showUpdateBuilding:(id)=>
            @Collection = @_getUnitsCountCollection(id)

            
            itemview1 = new ScreenTwoView.UnitTypeChildView
                collection : @Collection[0]

            itemview2 = new ScreenTwoView.UnitTypeView
                collection : @Collection[1]

            
            @layout.buildingRegion.$el.empty();
            @layout.unitRegion.$el.empty();
            @layout.buildingRegion.$el.append(itemview1.render().el ); 
            @layout.unitRegion.$el.append(itemview2.render().el ); 
            scr = document.createElement('script')
            scr.src = '../wp-content/themes/apartmentselector/js/src/preload/main2.js'
            document.body.appendChild(scr)
            
            
            building = @Collection[0].toArray()
            buidlingValue = _.first(building)
            masterbuilding = App.master.building
            masterbuilding.each ( index)->
                $("#highlighttower"+index.get('id')).attr('class','overlay')
            $("#highlighttower"+buidlingValue.get('id')).attr('class','overlay highlight')





            


            

       
            

            



        showViews:=>
            @buildingCollection = @Collection[0]
            @unitCollection = @Collection[1]
            @showBuildingRegion @buildingCollection
            @showUnitRegion @unitCollection





        showBuildingRegion:(buildingCollection)->
            itemview1 = @getView buildingCollection
            @layout.buildingRegion.show itemview1



        showUnitRegion:(unitCollection)->
            itemview2 = @getUnitsView unitCollection
            @layout.unitRegion.show itemview2








        getView:(buildingCollection)->
            new ScreenTwoView.UnitTypeChildView
                collection : buildingCollection

        getUnitsView:(unitCollection)->
            new ScreenTwoView.UnitTypeView
                collection : unitCollection


        _unitCountSelected:=>
            App.navigate "screen-three" , trigger:true









        _getUnitsCountCollection:(paramid={})->
            buildingArray = Array()
            buildingArrayModel = Array()
            unitColl = Array()
            templateArr = []
            mainunitTypeArray = []
            mainnewarr =  []
            lnewarr =  []
            mnewarr =  []
            hnewarr =  []
            mainunique = {}
            MainCollection = new Backbone.Model()
            status = App.currentStore.status.findWhere({'name':'Available'})
            key =  _.isEmpty(paramid)
            if key == true
                units = App.currentStore.unit.where({'status':status.get('id')})
            else
               units = App.currentStore.unit.where({'status':status.get('id')}) 
            Countunits = App.currentStore.unit.where({'status':status.get('id')})
            param = {}
            paramkey = {}
            flag = 0
            mainunitsTypeArray = []
            mainArray = []
            $.each(App.defaults, (index,value)->
                if(value !='All')
                    param[index] = value
                    string_val = _.isString(value)
                    valuearr = ""
                    if string_val == true
                        valuearr = value.split(',')
                    if valuearr.length > 1
                        for element  in valuearr
                            if index == 'unitType'
                                key = App.master.unit_type.findWhere({id:parseInt(element)})
                                templateArr.push key.get 'name'
                            if index == 'building'
                                key = App.master.building.findWhere({id:parseInt(element)})
                                templateArr.push key.get 'name'
                            if index == 'budget'
                                budget_Val = value+'lakhs'
                                templateArr.push budget_Val
                            if index == 'floor'
                                templateArr.push value
                                #flag = 1
                    else
                        if index == 'unitType'
                            key = App.master.unit_type.findWhere({id:parseInt(value)})
                            templateArr.push key.get 'name'
                        if index == 'building'
                            key = App.master.building.findWhere({id:parseInt(value)})
                            templateArr.push key.get 'name'
                        if index == 'budget'
                            budget_Val = value
                            templateArr.push budget_Val
                        if index == 'floor'
                            templateArr.push value
                            #flag = 1




            )
            if templateArr.length == 0
                templateArr.push 'All'
            if(flag==1)
                first = _.first(templateArr)
                buildingModel = App.master.building.findWhere({id:App.building['name']})
                floorriserange = buildingModel.get('floorriserange')
                if parseInt(first) >= floorriserange[0].start &&  parseInt(first) <= floorriserange[0].end
                    range = 'LOWRISE'+',' +buildingModel.get('name')



                if parseInt(first) >= floorriserange[1].start &&  parseInt(first) <= floorriserange[1].end
                    range = 'MIDRISE'+',' +buildingModel.get('name')


                if parseInt(first) >= floorriserange[2].start &&  parseInt(first) <= floorriserange[2].end
                    range = 'HIGHRISE'+',' +buildingModel.get('name')
                templateString = range
            else
                templateString  = templateArr.join(',')

            param = {}
            paramkey = {}
            flag = 0
            floorUnitsArray = []
            myArray = []
            $.map(App.defaults, (value, index)->
                if value!='All' 
                    if  index != 'unitVariant' && index != 'view' && index != 'facing' && index != 'terrace'
                        myArray.push({key:index,value:value})

            )
            
            status = App.master.status.findWhere({'name':'Available'})
            unitslen = App.currentStore.unit.where({'status':status.get('id')})
            unitslen1 = App.master.unit.where({'status':status.get('id')})


            $.each(unitslen1, (index,value1)->

                if App.defaults['floor'] !='All'
                    floorstring = App.defaults['floor']
                    floorArray  = floorstring.split(',')
                    $.each(floorArray, (index,value)->
                        if value1.get('floor') == parseInt(value)
                            floorUnitsArray.push(value1)




                    )


            )
            if App.defaults['floor'] == "All"
                floorUnitsArray = unitslen1
            floorCollunits = []
            $.each(floorUnitsArray, (index,value1)->
                flag = 0
                $.each(myArray, (index,value)->
                    paramKey = {}
                    paramKey[value.key] = value.value
                    if value.key == 'budget'
                        buildingModel = App.master.building.findWhere({'id':value1.get 'building'})
                        floorRise = buildingModel.get 'floorrise'
                        floorRiseValue = floorRise[value1.get 'floor']
                        unitVariantmodel = App.master.unit_variant.findWhere({'id':value1.get 'unitVariant'})
                        #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
                        unitPrice = value1.get 'unitPrice'
                        budget_arr = value.value.split(' ')
                        budget_price = budget_arr[0].split('-')
                        budget_price[0] = budget_price[0]+'00000'
                        budget_price[1] = budget_price[1]+'00000'
                        if parseInt(unitPrice) >= parseInt(budget_price[0]) && parseInt(unitPrice) <= parseInt(budget_price[1])
                            flag++
                    else if value.key != 'floor'
                        tempnew = []
                        if value.key == 'view' ||  value.key == 'apartment_views'
                            tempnew = []
                            value.key = 'apartment_views'
                            tempnew = value1.get(value.key)
                            if tempnew != ""
                                tempnew = tempnew.map((item)->
                                    return parseInt(item))
                        else if value.key == 'facing'
                            tempnew = []
                            tempnew = value1.get(value.key)
                            if tempnew.length != 0
                                tempnew = tempnew.map((item)->
                                    return parseInt(item))
                        temp = []
                        temp.push value.value
                        tempstring = temp.join(',')
                        initvariant = tempstring.split(',').map((item)->
                            return parseInt(item)
                        )
                        
                        if initvariant.length >= 1
                            for element in initvariant
                                if value1.get(value.key) == parseInt(element)
                                    flag++ 
                                else if $.inArray(parseInt(element),tempnew) >=0 
                                    flag++ 

                        else
                            if value1.get(value.key) == parseInt(value.value)
                                flag++
                        


                )
                if flag >= myArray.length
                    floorCollunits.push(value1)





            )
            
            floorCollection = new Backbone.Collection(floorCollunits)
            unitvariant = floorCollection.pluck("unitVariant")
            uniqUnitvariant = _.uniq(unitvariant)
            unitVariantModels = []
            unitVariantID = []
            viewModels = []
            viewID = []
            viewtemp = []
            facingModels = []
            facingID = []
            facingtemp = []
            terraceModels = []
            terraceID = []
            terracetemp = []
            usermodel = new Backbone.Model USER
            capability = usermodel.get('all_caps')
            if usermodel.get('id') != "0" && $.inArray('see_special_filters',capability) >= 0
                # floorCollection = App.currentStore.unit
                floorCollection.each (item)->
                    if item.get('apartment_views') != ""
                            $.merge(viewtemp,item.get('apartment_views'))
                        if item.get('facing').length != 0
                            $.merge(facingtemp,item.get('facing'))
                        if item.get('terrace') != ""
                            terracetemp.push item.get('terrace')


                    
                uniqviews = _.uniq(viewtemp)
                uniqfacings = _.uniq(facingtemp)
                uniqterrace = _.uniq(terracetemp)

                $.each(uniqviews, (index,value)->
                    viewModel = App.master.view.findWhere({id:parseInt(value)})
                    viewModels.push({id:viewModel.get('id'),name:viewModel.get('name')})
                    viewID.push(parseInt(viewModel.get('id')))

                )
                $.each(uniqfacings, (index,value)->
                    facingModel = App.master.facings.findWhere({id:parseInt(value)})
                    facingModels.push({id:facingModel.get('id'),name:facingModel.get('name')})
                    facingID.push(parseInt(facingModel.get('id')))

                )
                $.each(uniqterrace, (index,value)->
                    terraceModel = App.master.terrace.findWhere({id:parseInt(value)})
                    terraceModels.push({id:parseInt(terraceModel.get('id')),name:terraceModel.get('name')})
                    terraceID.push(parseInt(terraceModel.get('id')))

                )
                
            $.each(uniqUnitvariant, (index,value)->
                unitVarinatModel = App.master.unit_variant.findWhere({id:value})
                unitVariantModels.push({id:unitVarinatModel.get('id'),name:unitVarinatModel.get('name'),sellablearea:unitVarinatModel.get('sellablearea')})
                unitVariantID.push(parseInt(unitVarinatModel.get('id')))


            )
            
            unitVariantModels.sort( (a,b)->
                a.id - b.id

            )
            unitVariantID.sort( (a,b)->
                a - b

            )
            mainunitTypeArray1 = []
            units1 = App.master.unit.where({'status':status.get('id')})
            $.each(units1, (index,value)->
                unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                mainunitTypeArray1.push({id:unitType.get('id'),name: unitType.get('name')})
            )
            $.each(units, (index,value)->
                maxcoll = Array()
                
                if buildingArray.indexOf(value.get 'building') ==  -1
                    buildingArray.push value.get 'building'
                    


                unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                mainunitTypeArray.push({id:unitType.get('id'),name: unitType.get('name')})
            )


            $.each(mainunitTypeArray1, (key,item)->
                if (!mainunique[item.id])
                    if item.id != 14 && item.id != 16
                        status = App.master.status.findWhere({'name':'Available'})

                        count = App.currentStore.unit.where({unitType:item.id,'status':status.get('id')})

                        if parseInt(item.id) == 9
                            classname = 'twoBHK'
                        else
                            classname = 'threeBHK'

                        mainnewarr.push({id:item.id,name:item.name,classname:classname,count:count})
                        mainunique[item.id] = item;


            )


            buildingUnits = []
            $.each(buildingArray, (index,value)->
                buildingid = value
                unitTypeArray = Array()
                newarr =  []
                unique = {}
                viewmodels = []
                lunitTypeArray = []
                lnewarr =  []
                lunique = {}
                munitTypeArray = []
                mnewarr =  []
                munique = {}
                hunitTypeArray = []
                hnewarr =  []
                hunique = {}
                lcount = []
                mcount = []
                hcount = []
                mainArray = Array()
                lclassname = ""
                mclassname = ""
                hclassname = ""
                status = App.currentStore.status.findWhere({'name':'Available'})
                totalunits = App.currentStore.unit.where({'building':value})
                buildingModel = App.master.building.findWhere({id:buildingid})
                floorriserange = buildingModel.get 'floorriserange'
                #floorriserange = [{"name":"low","start":"1","end":"2"},{"name":"medium","start":"3","end":"4"},{"name":"high","start":"5","end":"6"}]

                #$.each(totalunits, (index,value)->
                    #viewsData = value.get('views')
                    #viewmodels = $.merge(viewmodels, viewsData)
                #)
                #uniqueViewArry = _.uniq(viewmodels);
                variantsDataValues = []
                data = []
                #$.each(uniqueViewArry, (index,value)->
                    #viewModel = App.master.view.findWhere({id:parseInt(value)})

                    #data.push({id:viewModel.get('id'),name:viewModel.get('name')})
                    #if data.length == 2
                        #variantsDataValues.push({data:data})
                        #data = []



                #)
                flag = 0
                flag1 = 0
                $.each(mainunitTypeArray, (key,item)->
                    if (!lunique[item.id])
                        lunitTypeArray = []
                        status = App.currentStore.status.findWhere({'name':'Available'})
                        count = App.currentStore.unit.where({unitType:item.id,'status':status.get('id'),building:buildingid})
                        $.each(count, (index,value)->
                            #lowUnits = App.currentStore.range.findWhere({name:'low'})
                            if (value.get('floor') >= parseInt(floorriserange[0].start) &&  value.get('floor') <= parseInt(floorriserange[0].end)) && item.id == value.get('unitType')
                                lunitTypeArray.push value
                        )
                        $.each(lunitTypeArray, (index,value)->
                            if value.get('unitType') == 9
                                flag = 1
                            if value.get('unitType') == 10
                                flag1 = 1

                        )
                        if parseInt(flag) == 1
                            lclassname = 'twoBHK'
                        if parseInt(flag1) == 1
                            lclassname = 'threeBHK'
                        if parseInt(flag) == 1 && parseInt(flag1) == 1
                            lclassname = 'multiBHK'





                        lnewarr.push({id:item.id,name:item.name,count:lunitTypeArray.length,classname:lclassname})
                        lunique[item.id] = item;

                )
                flag2 = 0
                flag3 = 0

                $.each(mainunitTypeArray, (key,item)->
                    if (!munique[item.id])
                        munitTypeArray = []
                        status = App.currentStore.status.findWhere({'name':'Available'})
                        count = App.currentStore.unit.where({unitType:item.id,'status':status.get('id'),building:buildingid})
                        $.each(count, (index,value)->
                            if (value.get('floor') >= parseInt(floorriserange[1].start) &&  value.get('floor') <= parseInt(floorriserange[1].end)) && item.id == value.get('unitType')
                                munitTypeArray.push value
                        )
                        $.each(munitTypeArray, (index,value)->
                            if value.get('unitType') == 9
                                flag2 = 1
                            if value.get('unitType') == 10
                                flag3 = 1

                        )
                        if parseInt(flag2) == 1
                            mclassname = 'twoBHK'
                        if parseInt(flag3) == 1
                            mclassname = 'threeBHK'
                        if parseInt(flag2) == 1 && parseInt(flag3) == 1
                            mclassname = 'multiBHK'


                        mnewarr.push({id:item.id,name:item.name,count:munitTypeArray.length,classname:mclassname})
                        munique[item.id] = item;


                )
                flag4 = 0
                flag5 = 0
                $.each(mainunitTypeArray, (key,item)->

                    if (!hunique[item.id])
                        hunitTypeArray = []
                        status = App.currentStore.status.findWhere({'name':'Available'})
                        count = App.currentStore.unit.where({unitType:item.id,'status':status.get('id'),building:buildingid})

                        $.each(count, (index,value)->
                            if (value.get('floor') >= parseInt(floorriserange[2].start) &&  value.get('floor') <= parseInt(floorriserange[2].end)) && item.id == value.get('unitType')
                                hunitTypeArray.push value
                        )
                        $.each(hunitTypeArray, (index,value)->
                            if value.get('unitType') == 9
                                flag4 = 1
                            if value.get('unitType') == 10
                                flag5 = 1

                        )

                        if parseInt(flag4) == 1
                            hclassname = 'twoBHK'
                        if parseInt(flag5) == 1
                            hclassname = 'threeBHK'
                        if parseInt(flag4) == 1 && parseInt(flag5) == 1
                            hclassname = 'multiBHK'

                        hnewarr.push({id:item.id,name:item.name,count:hunitTypeArray.length,classname:hclassname})
                        hunique[item.id] = item;


                )





                availableunits = App.currentStore.unit.where({'building':value,'status':status.get('id')})
                totalfloorcollection = new Backbone.Collection(totalunits)
                floors = totalfloorcollection.pluck("floor")
                uniqFloors = _.uniq(floors)
                newunits = App.currentStore.unit.where({'building':value,'status':status.get('id')})
                buildingUnits.push({id:buildingid,count:newunits.length,name:'tower'+buildingid})
                lowArray = Array()
                mediumArray = Array()
                highArray = Array()
                mainArray = Array()
                unitTypeArray = []
                $.each(newunits, (index,value)->
                    if  value.get('unitType') != 14 && value.get('unitType') != 16
                        if (value.get('floor') >= parseInt(floorriserange[0].start) &&  value.get('floor') <= parseInt(floorriserange[0].end))
                            lowArray.push value.get 'id'



                        if (value.get('floor') >= parseInt(floorriserange[1].start) &&  value.get('floor') <= parseInt(floorriserange[1].end))
                            mediumArray.push value.get 'id'


                        if (value.get('floor') >= parseInt(floorriserange[2].start) &&  value.get('floor') <= parseInt(floorriserange[2].end))
                            highArray.push value.get 'id'

                    unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                    unitTypeArray.push({id:unitType.get('id'),name: unitType.get('name')})

                )
                $.each(unitTypeArray, (key,item)->
                    if (!unique[item.id])
                        status = App.currentStore.status.findWhere({'name':'Available'})
                        count = App.currentStore.unit.where({unitType:item.id,'status':status.get('id'),'building':buildingid})
                        if parseInt(item.id) == 9
                            classname = 'twoBHK m-l-20'
                        else
                            classname = 'oneBHK'
                        newarr.push({id:item.id,name:item.name,count:count.length,classname:classname})
                        unique[item.id] = item;


                )
                low_max_val = 0
                low_min_val = 0
                medium_max_val = 0
                medium_min_val = 0
                high_min_val = 0
                high_max_val = 0
                lfloorvalue = ""
                mfloorvalue = ""
                hfloorvalue = ""
                disablehigh = "other"
                disablemedium = "other"
                disablelow = "other"
                lfloorvalue = 'Floors '+floorriserange[0].start+'-'+floorriserange[0].end
                mfloorvalue = 'Floors '+floorriserange[1].start+'-'+floorriserange[1].end
                hfloorvalue = 'Floors '+floorriserange[2].start+'-'+floorriserange[2].end




                $.each(lowArray , (index,value)->
                    disablelow = ""
                    unitmodel = App.master.unit.findWhere({id:value})
                    unittypemodel = App.master.unit_type.findWhere({id :  unitmodel.get( 'unitType' ) })
                    unitCollection = App.master.unit.where({unitType: unittypemodel.get( 'id' ) } )
                    max_coll = Array()
                    $.each(unitCollection, (index,value)->

                        variantmodel = App.master.unit_variant.findWhere({id: value.get( 'unitVariant' )} )
                        max_coll.push variantmodel.get 'sellablearea'


                    )
                    low_max_val = Math.max.apply( Math, max_coll )
                    low_min_val = Math.min.apply( Math, max_coll )
                )

                $.each(mediumArray , (index,value)->
                    disablemedium = ""
                    unitmodel = App.master.unit.findWhere({id:value})
                    unittypemodel = App.master.unit_type.findWhere({id :  unitmodel.get( 'unitType' ) })
                    munitTypeArray.push({id:unittypemodel.get('id'),name: unittypemodel.get('name')})

                    unitCollection = App.master.unit.where({unitType: unittypemodel.get( 'id' ) } )
                    max_coll = Array()
                    $.each(unitCollection, (index,value)->

                        variantmodel = App.master.unit_variant.findWhere({id: value.get( 'unitVariant' )} )
                        max_coll.push variantmodel.get 'sellablearea'


                    )
                    medium_max_val = Math.max.apply( Math, max_coll )
                    medium_min_val = Math.min.apply( Math, max_coll )
                )

                $.each(highArray , (index,value)->
                    disablehigh = ""
                    unitmodel = App.master.unit.findWhere({id:value})
                    unittypemodel = App.master.unit_type.findWhere({id :  unitmodel.get( 'unitType' ) })
                    hunitTypeArray.push({id:unittypemodel.get('id'),name: unittypemodel.get('name')})

                    unitCollection = App.master.unit.where({unitType: unittypemodel.get( 'id' ) } )
                    max_coll = Array()
                    $.each(unitCollection, (index,value)->

                        variantmodel = App.master.unit_variant.findWhere({id: value.get( 'unitVariant' )} )
                        max_coll.push variantmodel.get 'sellablearea'


                    )
                    high_max_val = Math.max.apply( Math, max_coll )
                    high_min_val = Math.min.apply( Math, max_coll )
                )
                if App.defaults['unitType'] != 'All'
                    mainnewarr = []
                    hclassname = ""
                    mclassname = ""
                    lclassname = ""
                mainArray.push({count:highArray.length,low_max_val: high_max_val,low_min_val:high_min_val,range:'high',buildingid:buildingid,unittypes:hnewarr,classname:hclassname,rangetext:'HIGHRISE',rangeNo:hfloorvalue,disable:disablehigh})
                mainArray.push({count: mediumArray.length,low_max_val: medium_max_val,low_min_val:medium_min_val,range:'medium',buildingid:buildingid,unittypes:mnewarr,classname:mclassname,rangetext:'MIDRISE',rangeNo:mfloorvalue,disable:disablemedium})
                mainArray.push({count: lowArray.length,low_max_val: low_max_val,low_min_val:low_min_val,range:'low',buildingid:buildingid,unittypes:lnewarr,classname:lclassname,rangetext:'LOWRISE',rangeNo:lfloorvalue,disable:disablelow})

                itemCollection = new Backbone.Collection(mainArray)
                buildingModel = App.master.building.findWhere({id:value})
                unitColl.push {id:buildingModel.get('id'),buildingname: buildingModel.get('name') , units: itemCollection ,buildingid:buildingModel.get('id'),
                unittypes:newarr,availableunits:availableunits.length,totalunits:totalunits.length,totalfloors:uniqFloors.length,views:variantsDataValues}
                buildingArrayModel.push(buildingModel)

            )
            mainArray = []
            if buildingUnits.length == 2
                buildingUnits.push({id:100,count:0,name:'tower'+100})
                mainArray.push({count:'---',low_max_val: 0,low_min_val:0,range:'high',buildingid:100,unittypes:0,classname:"",rangetext:'HIGHRISE',rangeNo:'Floors --'})
                mainArray.push({count: '---',low_max_val: 0,low_min_val:0,range:'medium',buildingid:100,unittypes:0,classname:"",rangetext:'MIDRISE',rangeNo:'Floors --'})
                mainArray.push({count: '---',low_max_val: 0,low_min_val:0,range:'low',buildingid:100,unittypes:0,classname:"",rangetext:'LOWRISE',rangeNo:'Floors --'})
                itemCollection = new Backbone.Collection(mainArray)
                unitColl.push {id:100,buildingname: 'Random' , units: itemCollection ,buildingid:100,
                unittypes:0,availableunits:0,totalunits:0,totalfloors:0,views:0}
            


            buildingvalue = _.max(buildingUnits,  (model)->
                model.count
            )
            buildingUnits.sort( (a,b)->
                a.id - b.id

            )
            modelIdArr = []
            modelArr = []
            ModelActualArr = []
            $.each(buildingUnits, (index,value)->
                modelIdArr.push(value.id)

            )
            key =  _.isEmpty(paramid)
            if key == true
                index = _.indexOf(modelIdArr, buildingvalue.id)
                modelArr.push buildingvalue.id

            else
                keycheck = _.findWhere(buildingUnits, {name:paramid})
                index = _.indexOf(modelIdArr, keycheck.id)
                modelArr.push keycheck.id

            
            highLength = modelIdArr.length - index
            i = index + 1
            while(i<modelIdArr.length)
                modelArr.push(modelIdArr[i])
                i++
            j= 0
            while(j<index)
                modelArr.push(modelIdArr[j])
                j++
            
            if modelArr.length == 2
                arrayvalue = _.last(modelArr)
                modelArr.push(arrayvalue)
            
            buildingsactual = []
            unitsactual = []
            buildingCollection = new Backbone.Collection(buildingArrayModel)
            units = new Backbone.Collection(unitColl)
            $.each(modelArr , (index,value)->
                value = value
                buildingsactual.push(buildingCollection.get(value))
                unitsactual.push(units.get(value))
            )
            
            buildingCollection = new Backbone.Collection(buildingsactual)
            units = new Backbone.Collection(unitsactual)


            [buildingCollection ,units,templateString,Countunits.length,mainnewarr,hnewarr,mnewarr,lnewarr,unitVariantModels,unitVariantID,unitVariantID,viewModels,facingModels,viewID,facingID,terraceModels,terraceID]





    msgbus.registerController 'screen:two', ScreenTwoController