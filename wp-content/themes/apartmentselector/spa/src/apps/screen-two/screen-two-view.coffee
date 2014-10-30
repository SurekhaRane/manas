define [ 'extm', 'marionette' ], ( Extm, Marionette )->
    m = ""
    unitVariantArray = ''
    unitVariantIdArray = []
    unitVariantString = ''
    globalUnitArrayInt = []
    firstElement = ''
    rangeArray = []
    tagsArray = []
    count = 0
    unitVariants = []
    cloneunitVariantArrayColl = ""
    viewtagsArray = []
    entrancetagsArray = []
    terracetagsArray = []
    object = 'this'
    class ScreenTwoLayout extends Marionette.LayoutView

        template : '<div class="">
                        <h3 class="text-center light m-t-0 m-b-20 unittype hidden animated pulse">We found <span class="bold text-primary"> {{unitsCount }} </span> apartments that matched your selection</h3>
                        <h3 class="text-center light m-t-0 m-b-20 budget hidden animated pulse">We found <span class="bold text-primary"> {{unitsCount }} </span>  apartments in your budget of <strong>{{selection}}</strong></h3>
                        <h3 class="text-center light m-t-0 m-b-20 refresh hidden animated pulse">You are now seeing <span class="bold text-primary">All</span> apartments across all the towers.</h3>

                        <!--<div class="text-center introTxt m-b-10">These apartments are spread over different towers. Each tower has three floor blocks. The number in the boxes indicate the number of apartments of your selection. Select one for more details.</div>-->

                        <div class="introTxt text-center">You are seeing 
                            <div id="tagslist" class="taglist">
                              <ul></ul>
                            </div>
                            <span class="text-primary variantToggle1"> </span>variants of your apartment selection
                        </div>

                        <div class="variantBox1">

                            <div class="grid-container">

                                <div class="pull-left m-l-15">
                                    <input type="checkbox" name="selectall" id="selectall" class="checkbox" value="0" checked/>
                                    <label for="selectall">Select/Unselect All</label>
                                </div>
                                <div class="text-right m-b-20">
                                    <span class="variantClose1 glyphicon glyphicon-remove text-grey"></span>
                                </div>

                                {{#unitVariants}}
                                <div class="grid-block-3" >
                                    <a class="grid-link selected" href="#" id="grid{{id}}" data-id="{{id}}">
                                        {{sellablearea}} Sq.ft.<input type="hidden" name="check{{id}}"   id="check{{id}}"   value="1" />
                                    </a>
                                </div>
                                {{/unitVariants}}
                                <div class="variantAction m-t-5 m-b-20">
                                    <a class="btn btn-primary m-r-10 done">DONE</a>
                                    <a class="btn btn-default cancel">CANCEL</a>
                                </div>
                            </div>
                        </div>

                        <div class="special introTxt text-center hidden">
                            <div>
                                Click <a class="special bold hidden" id="filterModal">here</a> to set <span class="bold"> Additional Filters</span>
                            </div>

                            View:
                            <div id="viewtaglist" class="special taglist2 hidden">
                              <ul></ul>
                            </div>

                            Entrance:
                            <div id="entrancetaglist" class="special taglist2 hidden">
                              <ul></ul>
                            </div>

                            Terrace:
                            <div id="terracetaglist" class="special taglist2 hidden">
                              <ul></ul>
                            </div>
                        
                        </div>

                        
                    </div>

                    <div class="row m-l-0 m-r-0 m-t-20 bgClass">

                        <div class="col-md-5 col-lg-4">
                            
                    		<div class="legend text-center m-b-20">
                                {{#unittypes}}
                                <span class={{classname}}>.</span>{{name}}
                                {{/unittypes}}
                		    </div>

                            <div class="towerTable">
                                <div class="tableBody">
                    				<div id="vs-container2" class="vs-container vs-triplelayout">
                    				    <header class="vs-header" id="building-region"></header>
                    				    <div id="unit-region"></div>
                                    </div>
                                </div>
                            </div>

                            <div class="h-align-middle m-t-20 m-b-20">
                                <a href="#screen-three-region" class="btn btn-default btn-lg disabled" id="screen-two-button">Show Apartments</a>
                            </div>
                        </div>
                        
                        
                        <div class="col-md-7 col-lg-8 b-grey b-l visible-md visible-lg">
                            <div class="m-t-10 text-center">
                               <!--<h4 class="bold m-t-0">Where is this tower located in the project?</h4>
                                <p class="light">This is a map of the entire project that shows the location of the tower selected (on the left).</p>-->
                                <div id="loadmap"><div id="mapplic1" class="towersMap center-block"></div></div>
                            </div>
                        </div><input type="hidden" name="currency1" id="currency1" class="demo" data-a-sign="Rs. "  data-m-dec=""  data-d-group="2">
                    </div>

                    <div class="specialFilter">
                        <div class="bgClass">
                            <h3 class="text-center light">Choose from the options below to filter your selection</h3>
                            <div class="row m-l-0 m-r-0 filterBlock">

                                <div class="col-sm-5 b-r b-grey">
                                    <h4 class="bold blockTitle">View</h4>
                                    {{#views}}
                                    <div class="filterBox"> <input type="checkbox" name="view{{id}}" data-name="{{name}}" id="view{{id}}" checked class="checkbox viewname" value="{{id}}"> <label for="view{{id}}">{{name}}</label> </div>
                                    {{/views}}
                                    <div class="clearfix"></div>
                                </div>

                                <div class="col-sm-3 b-r b-grey">
                                    <h4 class="bold blockTitle">Entrance</h4>
                                        {{#facings}}
                                    <div class="filterBox"> <input type="checkbox" name="facing{{id}}" data-name="{{name}}" id="facing{{id}}" checked class="checkbox facing" value="{{id}}"> <label for="facing{{id}}">{{name}}</label> </div>
                                    {{/facings}}
                                    <div class="clearfix"></div>
                                </div>

                                <div class="col-sm-4">
                                    <h4 class="bold blockTitle">Terrace</h4>
                                     {{#terrace}}   
                                    <div class="filterBox"> <input type="checkbox" name="terrace{{id}}" data-name="{{name}}" id="terrace{{id}}" checked class="checkbox terrace" value="{{id}}"> <label for="terrace{{id}}">{{name}}</label> </div>
                                    {{/terrace}}  
                                </div>
                            </div>
                              <div id="filtermsg" class="alrtMsg animated pulse"></div>  

                            <h4 id="unittypecount" class="text-center"></h4>

                            <div class="text-center m-t-10 m-b-10">
                                <a id="donepopup" class="btn btn-primary btn-sm b-close">DONE</a>
                                <a id="cancelpopup" class="btn btn-primary btn-sm b-close">CANCEL</a>
                            </div>

                        </div>
                    </div>

                   '




        className : 'page-container row-fluid'




        regions :
            buildingRegion : '#building-region'
            unitRegion : '#unit-region'

        
                

             
    

               
    

        events:
            'click #filterModal':(e)->
                # $('.specialFilter').text ""
                $('.specialFilter').bPopup()

            'mouseout .im-pin':(e)->
                $('.im-tooltip').hide()
            'mouseout .tower-link':(e)->
                $('.im-tooltip').hide()
            'mouseover a.tower-link':(e)->
                id  = e.target.id
                str1 = id.replace( /[^\d.]/g, '' )
                floorUnitsArray = []
                myArray = []
                buildigmodel = App.master.building.findWhere({id:parseInt(str1)})
                if buildigmodel == undefined || buildigmodel == ""
                    return false
                # screenonearray = App.backFilter['screen1']
                # for element in screenonearray
                #     if App.defaults[element] != 'All'
                #         key = App.defaults.hasOwnProperty(element)
                #         if key == true
                #             console.log App.defaults[element]
                #             myArray.push({key:element,value:App.defaults[element]})
                # screentwoarray = App.backFilter['screen2']
                # for element in screentwoarray
                #     if App.defaults[element] != 'All'
                #         key = App.defaults.hasOwnProperty(element)
                #         if key == true
                #             console.log App.defaults[element]
                #             myArray.push({key:element,value:App.defaults[element]})

                $.map(App.defaults, (value, index)->
                    if value!='All'
                        myArray.push({key:index,value:value})

                    )
                status = App.master.status.findWhere({'name':'Available'})
                unitslen = App.master.unit.where({'status':status.get('id')})


                
                floorCollunits = []
                $.each(unitslen, (index,value1)->
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
                        else 
                            # if value.key == 'unittypeback'
                            #     value.key = 'unitVariant'
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
                mainnewarr =  []
                mainunique = {}
                floorarray = []
                if myArray.length == 0 
                    $.each(floorCollunits, (ind,val)->
                        if  val.get('unitType') != 14 && val.get('unitType') != 16
                            floorarray.push val


                    )
                    floorCollunits = floorarray
                units  = new Backbone.Collection floorCollunits
                mainunitTypeArray1 = []
                units1 = App.master.unit.where({'status':status.get('id')})
                $.each(units1, (index,value)->
                    unitTypemodel = App.master.unit_type.findWhere({id:value.get 'unitType'})
                    mainunitTypeArray1.push({id:unitTypemodel.get('id'),name: unitTypemodel.get('name')})
                )
                
                $.each(mainunitTypeArray1, (key,item)->
                    if (!mainunique[item.id])
                        if item.id != 14 && item.id != 16
                            status = App.master.status.findWhere({'name':'Available'})

                            count = units.where({unitType:item.id,'status':status.get('id'),'building':parseInt(str1)})

                            if parseInt(item.id) == 9
                                classname = 'twoBHK'
                            else
                                classname = 'threeBHK'

                            mainnewarr.push({id:item.id,name:item.name,classname:classname,count:count})
                            mainunique[item.id] = item;


                )
                countunits = units.where({building:parseInt(str1)})
                buildigmodel = App.master.building.findWhere({id:parseInt(str1)})
                unittypetext = ""
                if buildigmodel == undefined || buildigmodel == ""
                    text = "Not Launched"
                else
                
                    min = ""
                    text = "<span></span>"
                    if countunits.length > 0
                        minmodel = _.min(countunits, (model)->
                            if model.get('unitType') != 14 && model.get('unitType') != 16
                                return model.get('unitPrice')
                        )
                        $('#currency1').autoNumeric('init')
                        $('#currency1').autoNumeric('set', minmodel.get('unitPrice'));
                        currency = $('#currency1').val()
                        if App.defaults['unitType'] != 'All'
                            selectorname = App.defaults['unitType']
                            unittypemodel = App.master.unit_type.findWhere({id:parseInt(App.defaults['unitType'])})
                            selectorname = unittypemodel.get 'name'
                            text = selectorname+' apartments - </span>'+countunits.length+'<br/><span>Starting Price - </span>'+currency
                        else if App.defaults['budget'] != "All"
                            selectorname = App.defaults['budget']
                            $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span>'+value.count.length+'</span></br>'


                            )
                            text = '<span>Apartments within '+selectorname+' - </span>'+countunits.length+'<br/>'+unittypetext+'<br/><span>Starting Price - </span>'+currency
                        else if App.defaults['unitType'] == 'All' && App.defaults['budget'] == "All"
                            selectorname = ""
                            $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span>'+value.count.length+'</span></br>'


                            )
                            text = '<span>No. of '+selectorname+' apartments - </span>'+countunits.length+'<br/>'+unittypetext+'<br/><span>Starting Price - </span>'+currency
                    else
                        if App.defaults['unitType'] != 'All'
                            selectorname = App.defaults['unitType']
                            unittypemodel = App.master.unit_type.findWhere({id:parseInt(App.defaults['unitType'])})
                            selectorname = unittypemodel.get 'name'
                            text = selectorname+' apartments - </span>'+countunits.length+'<br/><span>'
                        else if App.defaults['budget'] != "All"
                            selectorname = App.defaults['budget']
                            
                            text = '<span>Apartments within '+selectorname+' - </span>'+countunits.length
                    
                locationData = m.getLocationData(id)
                m.showTooltip(locationData,text)

            'mouseover a.im-pin':(e)->
                id  = e.target.id
                locationData = m.getLocationData(id)
                m.showTooltip(locationData)


            'click a':(e)->
                e.preventDefault()
                id  = e.target.id
                #m.showLocation(id, 800)
                #locationData = m.getLocationData(id)
                #m.showTooltip(locationData)

            'click .tower-link':(e)->
                e.preventDefault()
                id  = e.target.id
                #location.href = "tower13"
                #m.showLocation(id, 800)
                #locationData = m.getLocationData(id)
                #m.showTooltip(locationData)




            'click .remodalcheck':(e)->
                #App.navigate "modal"
                e.preventDefault()


            'click .tower-link':(e)->
                id = e.target.id
                str1 = id.replace( /[^\d.]/g, '' )
                buildigmodel = App.master.building.findWhere({id:parseInt(str1)})
                if buildigmodel == undefined || buildigmodel == ""
                    return false
                floorUnitsArray = []
                myArray = []
                # screenonearray = App.backFilter['screen1']
                # for element in screenonearray
                #     if App.defaults[element] != 'All'
                #         key = App.defaults.hasOwnProperty(element)
                #         if key == true
                #             console.log App.defaults[element]
                #             myArray.push({key:element,value:App.defaults[element]})
                $.map(App.defaults, (value, index)->
                    if value!='All'
                        myArray.push({key:index,value:value})

                    )
                status = App.master.status.findWhere({'name':'Available'})
                unitslen = App.master.unit.where({'status':status.get('id')})


                
                floorCollunits = []
                $.each(unitslen, (index,value1)->
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
                        else 
                            # if value.key == 'unittypeback'
                            #     value.key = 'unitVariant'
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
                floorColl  = new Backbone.Collection floorCollunits
                
                units = floorColl.where({building:parseInt(str1)})
                
                if units.length != 0
                    App.layout.screenThreeRegion.el.innerHTML = ""
                    App.layout.screenFourRegion.el.innerHTML = ""
                    $('#screen-three-region').removeClass 'section'
                    $('#screen-four-region').removeClass 'section' 
                    screentwoArray  = App.backFilter['screen2']
                    for element in screentwoArray
                        key = App.defaults.hasOwnProperty(element)
                        if key == true
                            App.defaults[element] = 'All'
                    screenthreeArray  = App.backFilter['screen3']
                    for element in screenthreeArray
                        key = App.defaults.hasOwnProperty(element)
                        if key == true
                            App.defaults[element] = 'All'
                    # console.log App.defaults['unittypeback']
                    # App.defaults['unitVariant'] = App.defaults['unittypeback']
                    # App.navigate "screen-two"
                    App.currentStore.unit.reset UNITS
                    App.currentStore.building.reset BUILDINGS
                    App.currentStore.unit_type.reset UNITTYPES
                    App.currentStore.unit_variant.reset UNITVARIANTS
                    
                    App.filter(params={})
                    msgbus.showApp 'header'
                    .insideRegion  App.headerRegion
                        .withOptions()
                    #App.filter(params={})
                    @trigger 'show:updated:building' , $('#'+e.target.id ).attr('data-id')
                else
                    text = "This Tower does not contain any apartments as per your current selection"
                    locationData = m.getLocationData(id)
                    m.showTooltip(locationData,text)




            'click .grid-link':(e)->
                count = unitVariantArray.length
                id = $('#'+e.target.id).attr('data-id')
                track = 0
                if $('#check'+id).val() == '1'
                    index = unitVariantArray.indexOf(parseInt(id))
                    if index != -1
                        unitVariantArray.splice( index, 1 )
                        $('#check'+id).val '0'
                        track = 0
                        unitVariantIdArray.push(parseInt(id))
                else
                    track = 1
                    unitVariantArray.push(parseInt(id))
                    $('#check'+id).val '1'


                

                if globalUnitArrayInt.length != 0
                    if track == 0
                        unitVariantArray = _.intersection(unitVariantArray,globalUnitArrayInt)
                    else
                        globalUnitArrayInt.push(parseInt(id))
                        unitVariantArray = globalUnitArrayInt

                unitVariantArray = _.uniq(unitVariantArray)
                if unitVariantArray.length == 0
                    unitVariantString = firstElement.toString()

                else



                    if cloneunitVariantArrayColl.length == unitVariantArray.length
                        unitVariantString = 'All'

                    else
                        unitVariantString = unitVariantArray.join(',')
                
                if unitVariantString == "All"
                    $('#selectall' ).prop 'checked', true
                else
                    $('#selectall' ).prop 'checked', false




            'click .done':(e)->
                q = 1
                if unitVariantString == ""
                    unitVariantString = "All"
                $(".variantBox1").slideToggle()
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                App.defaults[element] = unitVariantString
                            else
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                    q++

                )
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                $('#screen-three-region').removeClass 'section'
                $('#screen-four-region').removeClass 'section'
                App.navigate "screen-two"
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                if unitVariantString == ""
                    unitVariantString = 'All'
                App.defaults['unitVariant'] = unitVariantString
                # App.defaults['unittypeback'] = unitVariantString
                #App.backFilter['screen2'].push 'unitVariant'
                App.filter(params={})
                $('.specialFilter').empty()
                $('.specialFilter').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                @trigger 'unit:variants:selected'

            'click .cancel':(e)->
                $('.specialFilter').empty()
                $('.specialFilter').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                unitVariantArray = _.union(unitVariantArray,unitVariantIdArray)
                $(".variantBox1").slideToggle()
                globalUnitVariants = App.defaults['unitVariant'].split(',')
                globalUnitArrayInt = []
                $.each(globalUnitVariants, (index,value)->
                    globalUnitArrayInt.push(parseInt(value))

                )

                if App.defaults['unitVariant'] != 'All'
                    $.each(unitVariantArray, (index,value)->
                        key = _.contains(globalUnitArrayInt,parseInt(value))
                        if key == true
                            $('#grid'+value).addClass 'selected'
                            $('#check'+value).val '1'
                        else
                            $('#grid'+value).removeClass 'selected'
                            $('#check'+value).val '0'








                    )

            'click #selectall':(e)->
                if $('#'+e.target.id).prop('checked') == true
                    cloneunitVariantArrayColl.each ( index)->
                        $('#grid'+index.get('id')).addClass 'selected'
                        $('#check'+index.get('id')).val '1'

                        unitVariantArray.push(index.get('id'))
                    unitVariantArray = _.uniq(unitVariantArray)
                    units = cloneunitVariantArrayColl.toArray()
                    units.sort(  (a,b)->
                        a.get('id') - b.get('id')
                    )
                    unitVariantString = 'All'
                else
                    tempArray = []
                    cloneunitVariantArrayColl.each ( value)->
                        tempArray.push(parseInt(value.get('id')))


                    value = _.first(tempArray)
                    remainainArray = _.rest(tempArray)
                    $.each(remainainArray, (index,value)->
                        $('#grid'+value).removeClass 'selected'
                        $('#check'+value).val '0'
                        index = unitVariantArray.indexOf(parseInt(value))
                        if index != -1
                            unitVariantArray.splice( index, 1 )


                    )
                    unitVariantString = value.toString()

            'click #screen-two-button':(e)->
                #rangeArray = []
                $('#screen-three-region').addClass 'section'
                @trigger 'unit:count:selected'

        showHighlightedTowers:()->
            building = Marionette.getOption( @, 'buildingColl' ).toArray()
            buidlingValue = _.first(building)
            masterbuilding = App.master.building
            masterbuilding.each ( index)->
                $("#highlighttower"+index.get('id')).attr('class','overlay')
            
        






















        onShow:->
            viewtagsArray = []
            entrancetagsArray = []
            terracetagsArray = []
            usermodel = new Backbone.Model USER
            object = @     
            capability = usermodel.get('all_caps')
            if usermodel.get('id') != "0" && $.inArray('see_special_filters',capability) >= 0
                # $('.special').removeClass 'hidden'
                originalviews  = Marionette.getOption( @, 'views' )
                originalOviews  = Marionette.getOption( @, 'Oviews' )
                originalfacings  = Marionette.getOption( @, 'facings' )
                originalOfacings  = Marionette.getOption( @, 'Ofacings' )
                originalterraces  = Marionette.getOption( @, 'terraceID' )
                originalOterraces  = Marionette.getOption( @, 'terrace' )
                object = @
                globalviews = []
                globalviewInt = []
                globalfacing = []
                globalfacingInt = []
                globalterrace = []
                globalterraceInt= []
                cloneviews = originalviews.slice(0)
                clonefacings = originalfacings.slice(0)
                cloneterraces = originalterraces.slice(0)
                view = []
                teraace = []
                entrance = []
                if App.defaults['view'] != 'All'
                    globalviews = App.defaults['view'].split(',')
                    $.each(globalviews, (index,value)->
                        globalviewInt.push(parseInt(value))

                    )
                if App.defaults['facing'] != 'All'
                    globalfacing = App.defaults['facing'].split(',')
                    $.each(globalfacing, (index,value)->
                        globalfacingInt.push(parseInt(value))

                    )
                if App.defaults['terrace'] != 'All'
                    globalterrace = App.defaults['terrace'].split(',')
                    $.each(globalterrace, (index,value)->
                        globalterraceInt.push(parseInt(value))

                    )
                if App.defaults['view'] != 'All'
                    $.each(originalOviews,(index,value)->
                        
                       
                            if $.inArray(parseInt(value.id),globalviewInt) >=0 
                                $('#view'+value.id).prop('checked',true)
                                view.push(value.id)
                            else
                                $('#view'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOviews,(index,value)->
                        $('#view'+value.id).prop('checked',true)
                        view.push(value.id)

                        )
                if App.defaults['facing'] != 'All'
                    $.each(originalOfacings,(index,value)->
                        
                       
                            if $.inArray(parseInt(value.id),globalfacingInt) >=0 
                                $('#facing'+value.id).prop('checked',true)
                                entrance.push(value.id)
                            else
                                $('#facing'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOfacings,(index,value)->
                        $('#facing'+value.id).prop('checked',true)
                        entrance.push(value.id)

                        )
                if App.defaults['terrace'] != 'All'
                    $.each(originalOterraces,(index,value)->
                        
                       
                            if $.inArray(parseInt(value.id),globalterraceInt) >=0 
                                $('#terrace'+value.id).prop('checked',true)
                                teraace.push(value.id)
                            else
                                $('#terrace'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOterraces,(index,value)->
                        $('#terrace'+value.id).prop('checked',true)
                        teraace.push(value.id)

                        )
                mainnewarr =  []
                mainunique = {}
                mainunitTypeArray1 = []
                status = App.master.status.findWhere({'name':'Available'})
                units1 = App.master.unit.where({'status':status.get('id')})
                $.each(units1, (index,value)->
                    unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                    mainunitTypeArray1.push({id:unitType.get('id'),name: unitType.get('name')})
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
                
                unittypetext = ""
                $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span class="text-primary bold m-r-20">'+value.count.length+'</span>'


                )
                $('#unittypecount').html unittypetext
                $('.viewname').on('click' , (e)->
                        App.layout.screenThreeRegion.el.innerHTML = ""
                        App.layout.screenFourRegion.el.innerHTML = ""
                        $('#screen-three-region').removeClass 'section'
                        $('#screen-four-region').removeClass 'section' 
                        screentwoArray  = App.backFilter['screen2']
                        for element in screentwoArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        screenthreeArray  = App.backFilter['screen3']
                        for element in screenthreeArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        App.navigate "screen-two"
                            
                        mainnewarr =  []
                        mainunique = {}
                        
                        viewnames = originalviews
                        viewString = 'All'
                        
                        
                        if $('#'+e.target.id).prop('checked') == true
                            view.push $('#'+e.target.id).val()
                            
                        else
                            if parseInt(view.length) == 1
                                object.showMsg()
                                return false
                            $('#'+e.target.id).prop('checked',false)
                            index = _.indexOf(view, parseInt($('#'+e.target.id).val()));
                            if index != -1
                                view.splice( index, 1 )
                                
                        
                        view = view.map((item)->
                            return parseInt(item))
                        view = _.uniq(view)

                        if view.length != 0
                            viewString = view.join(',')
                        App.defaults['view'] = viewString
                        #App.backFilter['screen2'].push 'view'
                        if cloneviews.length  == view.length
                            App.defaults['view'] = 'All'
                            # vew = originalviews
                            
                        App.currentStore.unit.reset UNITS
                        App.currentStore.building.reset BUILDINGS
                        App.currentStore.unit_type.reset UNITTYPES
                        App.currentStore.unit_variant.reset UNITVARIANTS   
                        App.filter()
                        teracetemp = []
                        floorCollection = App.currentStore.unit
                        
                        facingtemp = []
                        floorCollection.each ( item)->
                            if item.get('facing').length != 0
                                $.merge(facingtemp,item.get('facing'))
                            if item.get('terrace') != ""
                                teracetemp.push item.get('terrace')
                        facingtemp = facingtemp.map((item)->
                            return parseInt(item)

                            )
                        teracetemp = teracetemp.map((item)->
                            return parseInt(item)

                            )
                        uniqfacings = _.uniq(facingtemp)
                        uniqterrace = _.uniq(teracetemp)
                        $.each(uniqfacings, (index,value)->
                                $('#facing'+value).prop('checked',true)

                        )
                        if uniqfacings.length != clonefacings.length
                            App.defaults['facing'] = uniqfacings.join(',')
                            entrance = uniqfacings
                            #App.backFilter['screen2'].push 'facing'
                        else
                            App.defaults['facing'] = 'All'
                        if uniqterrace.length != cloneterraces.length
                            App.defaults['terrace'] = uniqterrace.join(',')
                            terrace = uniqterrace
                            #App.backFilter['screen2'].push 'terrace'
                        else
                            App.defaults['terrace'] = 'All'

                        unselected = _.difference(clonefacings, uniqfacings);
                        $.each(unselected, (index,value)->
                                $('#facing'+value).prop('checked',false)

                            )
                        $.each(uniqterrace, (index,value)->
                                $('#terrace'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneterraces, uniqterrace);
                        $.each(unselected1, (index,value)->
                                $('#terrace'+value).prop('checked',false)

                            )
                        mainunitTypeArray1 = []
                        status = App.master.status.findWhere({'name':'Available'})
                        units1 = App.master.unit.where({'status':status.get('id')})
                        $.each(units1, (index,value)->
                            unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                            mainunitTypeArray1.push({id:unitType.get('id'),name: unitType.get('name')})
                        )
                        $.each(mainunitTypeArray1, (key,item)->
                            if (!mainunique[item.id])
                                if item.id != 14 && item.id != 16
                                    status = App.master.status.findWhere({'name':'Available'})

                                    count = floorCollection.where({unitType:item.id,'status':status.get('id')})

                                    if parseInt(item.id) == 9
                                        classname = 'twoBHK'
                                    else
                                        classname = 'threeBHK'

                                    mainnewarr.push({id:item.id,name:item.name,classname:classname,count:count})
                                    mainunique[item.id] = item;


                        )
                        
                        unittypetext = ""
                        $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span class="text-primary bold m-r-20">'+value.count.length+'</span>'


                            )
                        $('#unittypecount').html unittypetext
                )
                $('.terrace').on('click' , (e)->
                        App.layout.screenThreeRegion.el.innerHTML = ""
                        App.layout.screenFourRegion.el.innerHTML = ""
                        $('#screen-three-region').removeClass 'section'
                        $('#screen-four-region').removeClass 'section' 
                        screentwoArray  = App.backFilter['screen2']
                        for element in screentwoArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        screenthreeArray  = App.backFilter['screen3']
                        for element in screenthreeArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        App.navigate "screen-two"
                        mainnewarr =  []
                        mainunique = {}
                        App.currentStore.unit.reset UNITS
                        App.currentStore.building.reset BUILDINGS
                        App.currentStore.unit_type.reset UNITTYPES
                        App.currentStore.unit_variant.reset UNITVARIANTS   
                        
                        if $('#'+e.target.id).prop('checked') == true
                            teraace.push $('#'+e.target.id).val()
                            
                        else
                            if parseInt(teraace.length) == 1
                                object.showMsg()
                                return false
                            index = _.indexOf(teraace, parseInt($('#'+e.target.id).val()));
                            if index != -1
                                teraace.splice( index, 1 )
                                
                        if teraace.length == 0
                            first = _.first(originalOterraces)
                            teraace.push first.id
                        teraace = teraace.map((item)->
                            return parseInt(item))
                        teraace = _.uniq(teraace)
                        App.defaults['terrace'] = teraace.join(',')
                        #App.backFilter['screen2'].push 'terrace'
                        if cloneterraces.length  == teraace.length
                            App.defaults['terrace'] = 'All'
                            # teraace = originalterraces
                            
                        App.filter()
                        units = App.currentStore.unit
                        viewtemp = []
                        facingtemp = []
                        
                        units.each (item)->
                            if item.get('apartment_views') != ""
                                $.merge(viewtemp,item.get('apartment_views'))
                            if item.get('facing').length != 0
                                $.merge(facingtemp,item.get('facing'))


                        viewtemp = viewtemp.map((item)->
                            return parseInt(item)
                            )
                        facingtemp = facingtemp.map((item)->
                            return parseInt(item)

                            )
                        
                        uniqviews = _.uniq(viewtemp)
                        uniqfacings = _.uniq(facingtemp)
                        if uniqviews.length != cloneviews.length
                            App.defaults['view'] = uniqviews.join(',')
                            view = uniqviews
                            #App.backFilter['screen2'].push 'view'
                        else
                            App.defaults['view'] = 'All'
                        if uniqfacings.length != clonefacings.length
                            App.defaults['facing'] = uniqfacings.join(',')
                            entrance = uniqfacings
                            #App.backFilter['screen2'].push 'facing'
                        else
                            App.defaults['facing'] = 'All'
                        $.each(uniqviews, (index,value)->
                                $('#view'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneviews, uniqviews);
                        $.each(unselected1, (index,value)->
                                $('#view'+value).prop('checked',false)

                        )
                        $.each(uniqfacings, (index,value)->
                                $('#facing'+value).prop('checked',true)

                        )
                        unselected = _.difference(clonefacings, uniqfacings);
                        $.each(unselected, (index,value)->
                                $('#facing'+value).prop('checked',false)

                        )
                        mainunitTypeArray1 = []
                        status = App.master.status.findWhere({'name':'Available'})
                        units1 = App.master.unit.where({'status':status.get('id')})
                        $.each(units1, (index,value)->
                            unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                            mainunitTypeArray1.push({id:unitType.get('id'),name: unitType.get('name')})
                        )
                        $.each(mainunitTypeArray1, (key,item)->
                            if (!mainunique[item.id])
                                if item.id != 14 && item.id != 16
                                    status = App.master.status.findWhere({'name':'Available'})

                                    count = units.where({unitType:item.id,'status':status.get('id')})

                                    if parseInt(item.id) == 9
                                        classname = 'twoBHK'
                                    else
                                        classname = 'threeBHK'

                                    mainnewarr.push({id:item.id,name:item.name,classname:classname,count:count})
                                    mainunique[item.id] = item;


                        )
                        
                        unittypetext = ""
                        $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span class="text-primary bold m-r-20">'+value.count.length+'</span>'


                            )
                        $('#unittypecount').html unittypetext

                        

                )
                $('.facing').on('click' , (e)->
                        App.layout.screenThreeRegion.el.innerHTML = ""
                        App.layout.screenFourRegion.el.innerHTML = ""
                        $('#screen-three-region').removeClass 'section'
                        $('#screen-four-region').removeClass 'section' 
                        screentwoArray  = App.backFilter['screen2']
                        for element in screentwoArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        screenthreeArray  = App.backFilter['screen3']
                        for element in screenthreeArray
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                        App.navigate "screen-two"
                        mainnewarr =  []
                        mainunique = {}
                        
                        
                        if $('#'+e.target.id).prop('checked') == true
                            entrance.push $('#'+e.target.id).val()
                            
                        else
                            if parseInt(entrance.length) == 1
                                object.showMsg()
                                return false
                            index = _.indexOf(entrance, parseInt($('#'+e.target.id).val()));
                            if index != -1
                                entrance.splice( index, 1 )
                                
                        if entrance.length == 0
                            first = _.first(originalOfacings)
                            entrance.push first.id
                        entrance = entrance.map((item)->
                            return parseInt(item))
                        entrance = _.uniq(entrance)
                        if entrance.length != 0
                            facingString = entrance.join(',')
                        App.defaults['facing'] = facingString
                        #App.backFilter['screen2'].push 'facing'
                        
                        if clonefacings.length  == entrance.length
                            App.defaults['facing'] = 'All'
                            # entrance = originalfacings
                            
                        App.currentStore.unit.reset UNITS
                        App.currentStore.building.reset BUILDINGS
                        App.currentStore.unit_type.reset UNITTYPES
                        App.currentStore.unit_variant.reset UNITVARIANTS   
                        App.filter()
                        teracetemp = []
                        floorCollection = App.currentStore.unit
                        
                        viewtemp = []
                        floorCollection.each ( item)->
                            if item.get('apartment_views').length != 0
                                $.merge(viewtemp,item.get('apartment_views'))
                            if item.get('terrace') != ""
                                teracetemp.push item.get('terrace')
                        viewtemp = viewtemp.map((item)->
                            return parseInt(item))
                        teracetemp = teracetemp.map((item)->
                            return parseInt(item)

                            )
                        uniqviews = _.uniq(viewtemp)
                        uniqterrace = _.uniq(teracetemp)
                        if uniqviews.length != cloneviews.length
                            App.defaults['view'] = uniqviews.join(',')
                            view = uniqviews
                            #App.backFilter['screen2'].push 'view'
                        else
                            App.defaults['view'] = 'All'
                        if uniqterrace.length != cloneterraces.length
                            App.defaults['terrace'] = uniqterrace.join(',')
                            terrace = uniqterrace
                            #App.backFilter['screen2'].push 'terrace'
                        else
                            App.defaults['terrace'] = 'All'
                        $.each(uniqviews, (index,value)->
                                $('#view'+value).prop('checked',true)

                        )
                        unselected = _.difference(cloneviews, uniqviews);
                        $.each(unselected, (index,value)->
                                $('#view'+value).prop('checked',false)

                            )
                        $.each(uniqterrace, (index,value)->
                                $('#terrace'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneterraces, uniqterrace);
                        $.each(unselected1, (index,value)->
                                $('#terrace'+value).prop('checked',false)

                            )
                        mainunitTypeArray1 = []
                        status = App.master.status.findWhere({'name':'Available'})
                        units1 = App.master.unit.where({'status':status.get('id')})
                        $.each(units1, (index,value)->
                            unitType = App.master.unit_type.findWhere({id:value.get 'unitType'})
                            mainunitTypeArray1.push({id:unitType.get('id'),name: unitType.get('name')})
                        )
                        $.each(mainunitTypeArray1, (key,item)->
                            if (!mainunique[item.id])
                                if item.id != 14 && item.id != 16
                                    status = App.master.status.findWhere({'name':'Available'})

                                    count = floorCollection.where({unitType:item.id,'status':status.get('id')})

                                    if parseInt(item.id) == 9
                                        classname = 'twoBHK'
                                    else
                                        classname = 'threeBHK'

                                    mainnewarr.push({id:item.id,name:item.name,classname:classname,count:count})
                                    mainunique[item.id] = item;


                        )
                        
                        unittypetext = ""
                        $.each(mainnewarr, (index,value)->
                                unittypetext  += '<span>'+value.name+' :</span><span class="text-primary bold m-r-20">'+value.count.length+'</span>'


                            )
                        $('#unittypecount').html unittypetext
                        
                        
                        

                )

                
                     
                $('#donepopup').on('click' , (e)->
                            $('.specialFilter').empty()
                            $('.specialFilter').addClass 'hidden'
                            $('.b-modal').addClass 'hidden'
                            console.log object
                            object.trigger 'unit:variants:selected'
                )
                $('#cancelpopup').on('click' , (e)->
                            $('.specialFilter').empty()
                            $('.specialFilter').addClass 'hidden'
                            $('.b-modal').addClass 'hidden'
                            view = []
                            entrance = []
                            terrace = []
                            $.each(cloneviews,(index,value)->
                                $('#view'+value.id).prop('checked',true)
                                view.push(value.id)

                            )
                            $.each(clonefacings,(index,value)->
                                $('#facings'+value.id).prop('checked',true)
                                entrance.push(value.id)

                            )
                            $.each(cloneterraces,(index,value)->
                                $('#terrace'+value.id).prop('checked',true)
                                terrace.push(value.id)

                            )
                            App.defaults['view'] = 'All'
                            App.defaults['facing'] = 'All'
                            App.defaults['terrace'] = 'All'
                            App.layout.screenThreeRegion.el.innerHTML = ""
                            App.layout.screenFourRegion.el.innerHTML = ""
                            $('#screen-three-region').removeClass 'section'
                            $('#screen-four-region').removeClass 'section' 
                            App.navigate "screen-two"
                            App.currentStore.unit.reset UNITS
                            App.currentStore.building.reset BUILDINGS
                            App.currentStore.unit_type.reset UNITTYPES
                            App.currentStore.unit_variant.reset UNITVARIANTS
                            App.filter()
                            object.trigger 'unit:variants:selected'

                )
                
                
            $("#flatno").text ""
            $("#towerno").text ""
            $("#unittypename").text ""
            $("#area").text ""
            $("#floorrise").text ""
            $('.room').html ""
            $('#terrace').text ""
            $('#printfacing').text ""
            $('#printview').text ""
            $("#twoDimage").attr('src' , "")
            $("#zoomedinimage").attr('src' , "")
            $("#floorlayoutbasic").text ""
            $('#printmapplic1').text ""
            $('#towerview').text ""
            $('#screen-two-button').on('click',  ()->
                new jBox('Notice', 
                    content: 'Finding available apartments that match your selection...',
                    autoClose: 2000
                    addClass: 'notifyBox'
                    position:
                        x: 'center'
                        y: 'top'
                    animation:
                        open: 'slide:top'
                        close: 'slide:top'
                    # fade: 1000
                )




            )
            rangeArray = []
            globalUnitArrayInt = []
            if App.defaults['unitVariant'] != 'All'
                globalUnitVariants = App.defaults['unitVariant'].split(',')
                $.each(globalUnitVariants, (index,value)->
                    globalUnitArrayInt.push(parseInt(value))

                )
            unitVariantString = ""
            if unitVariantString == "All" || App.defaults['unitVariant'] == "All"
                $('#selectall' ).prop 'checked', true
            else
                $('#selectall' ).prop 'checked', false
            if App.screenOneFilter['key'] == 'unitType'
                $('.unittype' ).removeClass 'hidden'
            else if App.screenOneFilter['key'] == 'budget'
                $('.budget' ).removeClass 'hidden'
            else if App.screenOneFilter['key'] == ""
                $('.refresh' ).removeClass 'hidden'


            unitVariantArray  = Marionette.getOption( @, 'uintVariantId' )
            unitVariantsArray  = Marionette.getOption( @, 'unitVariants' )
            unitVariantArrayColl = new Backbone.Collection unitVariantsArray
            cloneunitVariantArrayColl = unitVariantArrayColl.clone()
            unitVariants  = unitVariantArray

            firstElement = _.first(unitVariantArray)


            if App.defaults['unitVariant'] != 'All'
                unitVariantArray = _.union(unitVariantArray,unitVariantIdArray)
                $.each(unitVariantArray, (index,value)->
                    key = _.contains(globalUnitArrayInt,parseInt(value))
                    if key == true
                        $('#grid'+value).addClass 'selected'
                        $('#check'+value).val '1'
                    else
                        index = unitVariantArray.indexOf(parseInt(value))
                        $('#grid'+value).removeClass 'selected'
                        $('#check'+value).val '0'
                )
            else
                unitVariantArray = unitVariantArray
                $.each(unitVariantArray, (index,value)->
                    $('#grid'+value).addClass 'selected'
                    $('#check'+value).val '1'

                )


            $(".variantToggle1").click ->
                $(this).toggleClass("open")
                $(".variantBox1").slideToggle()
                return

            $(".variantClose1").click ->
                $(".variantBox1").slideToggle()
                $(".variantToggle1").toggleClass("open")
                return

            $(".grid-link").click  (e)->
                $(this).toggleClass("selected")
                return




            i = 1
            building = Marionette.getOption( @, 'buildingColl' ).toArray()
            buidlingValue = _.first(building)
            while (window['mapplic' + i] != undefined)
                params = window['mapplic' + i]
                selector = '#mapplic' + i
                ajaxurl = AJAXURL
                defer = $(selector).mapplic(
                    'id': 5,
                    'width': params.width,
                    'height': params.height,
                    'option':buidlingValue


                )
                



                i++;

            m  = $('#mapplic1').data('mapplic')
            @showHighlightedTowers()


            $('html, body').delay(600).animate({
                scrollTop: $('#screen-two-region').offset().top
            }, 'slow')


            tagsArray = []
            testtext = App.defaults['unitVariant']
            if testtext != 'All'
                unitVariantArrayText = testtext.split(',')
                $.each(unitVariantArrayText, (index,value)->
                    unitVariantModel = App.master.unit_variant.findWhere({id:parseInt(value)})
                    tagsArray.push({id:value , area : unitVariantModel.get('sellablearea')+'Sq.ft.'})


                )
            else
                unitVariantArrayText = testtext.split(',')
                tagsArray.push({id:'All' , area : 'All'})

            @doListing()
            usermodel = new Backbone.Model USER
            capability = usermodel.get('all_caps')
            if usermodel.get('id') != "0" && $.inArray('see_special_filters',capability) >= 0
                viewtagsArray = []
                testtext = App.defaults['view']
                if testtext != 'All'
                    viewArrayText = testtext.split(',')
                    $.each(viewArrayText, (index,value)->
                        viewModel = App.master.view.findWhere({id:parseInt(value)})
                        viewtagsArray.push({id:value , name : viewModel.get('name')})


                    )
                else
                    viewtagsArray.push({id:'All' , name : 'All'})

                @doViewListing()

                entrancetagsArray = []
                testtext = App.defaults['facing']
                if testtext != 'All'
                    entranceArrayText = testtext.split(',')
                    $.each(entranceArrayText, (index,value)->
                        facingModel = App.master.facings.findWhere({id:parseInt(value)})
                        entrancetagsArray.push({id:value , name : facingModel.get('name')})


                    )
                else
                    entrancetagsArray.push({id:'All' , name : 'All'})

                @doentranceListing()


                terracetagsArray = []
                testtext = App.defaults['terrace']
                if testtext != 'All'
                    terraceArrayText = testtext.split(',')
                    $.each(terraceArrayText, (index,value)->
                        terraceModel = App.master.terrace.findWhere({id:parseInt(value)})
                        terracetagsArray.push({id:value , name : terraceModel.get('name')})


                    )
                else
                    terracetagsArray.push({id:'All' , name : 'All'})

                @doterraceListing()

            object = @
            scr = document.createElement('script')
            scr.src = '../wp-content/themes/apartmentselector/js/src/preload/main2.js'

            document.body.appendChild(scr)
            

           
            

            object = @   
        $(document).on("click", ".closeButton",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   

                    object.delItem($('#' + theidtodel).attr('data-itemNum'))
        )
            
        $(document).on("click", ".closeButton2",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    
                    object.delViewItem($('#' + theidtodel).attr('data-itemNum'))
        )
        $(document).on("click", ".closeButton3",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    object.delEntranceItem($('#' + theidtodel).attr('data-itemNum'))
        )
        $(document).on("click", ".closeButton4",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    object.delTerraceItem($('#' + theidtodel).attr('data-itemNum'))
        )

        showMsg:->
            $('#filtermsg').show()
            $('#filtermsg').text(' Atleast one option in each category must be selected to proceed').delay(2000).fadeOut( (x)->$('filtermsg').text(""));
                                
        doListing:->
            $('#tagslist ul li').remove()
            $.each(tagsArray,  (index, value) ->
                $('#tagslist ul').append('<li id="li-item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.area + '</span><div class="closeButton"></div></li>')
            )
            if tagsArray.length == 1
                $('.closeButton').addClass 'hidden'

        doViewListing:->
            $('#viewtaglist ul li').remove()
            $.each(viewtagsArray,  (index, value) ->
                $('#viewtaglist ul').append('<li id="li-viewitem-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton2"></div></li>')
            )
            if viewtagsArray.length == 1
                $('.closeButton2').addClass 'hidden'

        doentranceListing:->
            $('#entrancetaglist ul li').remove()
            $.each(entrancetagsArray,  (index, value) ->
                $('#entrancetaglist ul').append('<li id="li-entranceitem-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton3"></div></li>')
            )
            if entrancetagsArray.length == 1
                $('.closeButton3').addClass 'hidden'

        doterraceListing:->
            $('#terracetaglist ul li').remove()
            $.each(terracetagsArray,  (index, value) ->
                $('#terracetaglist ul').append('<li id="li-terraceitem-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton4"></div></li>')
            )
            if terracetagsArray.length == 1
                $('.closeButton4').addClass 'hidden'

        delItem:(delnum)->
            removeItem = delnum
            i =0
            key = ""

            $.each(tagsArray, (index,val)->
                if val.id == delnum
                    key = i
                i++

            )
            index = key
            if (index >= 0)
                tagsArray.splice(index, 1)
                $('#li-item-' + delnum).remove()
                unitvariantarrayValues = []
                $.each(tagsArray , (index,value)->
                    unitvariantarrayValues.push(value.id)

                )
                q = 1
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                App.defaults[element] = unitVariantString
                            else
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                    q++

                )
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-two"
                App.defaults['unitVariant'] = unitvariantarrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                @trigger 'unit:variants:selected'

        delViewItem:(delnum)->
            removeItem = delnum
            i =0
            key = ""

            $.each(viewtagsArray, (index,val)->
                if val.id == delnum
                    key = i
                i++

            )
            index = key
            if (index >= 0)
                viewtagsArray.splice(index, 1)
                $('#li-viewitem-' + delnum).remove()
                
                viewarrayValues = []
                $.each(viewtagsArray , (index,value)->
                    viewarrayValues.push(value.id)

                )
                q = 1
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                App.defaults[element] = unitVariantString
                            else
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                    q++

                )
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-two"
                App.defaults['view'] = viewarrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter').empty()
                $('.specialFilter').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                @trigger 'unit:variants:selected'


        delEntranceItem:(delnum)->
            removeItem = delnum
            i =0
            key = ""

            $.each(entrancetagsArray, (index,val)->
                if val.id == delnum
                    key = i
                i++

            )
            index = key
            if (index >= 0)
                entrancetagsArray.splice(index, 1)
                $('#li-entranceitem-' + delnum).remove()
                entrancearrayValues = []
                $.each(entrancetagsArray , (index,value)->
                    entrancearrayValues.push(value.id)

                )
                q = 1
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                App.defaults[element] = unitVariantString
                            else
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                    q++

                )
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-two"
                App.defaults['facing'] = entrancearrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter').empty()
                $('.specialFilter').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                
                @trigger 'unit:variants:selected'

        delTerraceItem:(delnum)->
            removeItem = delnum
            i =0
            key = ""

            $.each(terracetagsArray, (index,val)->
                if val.id == delnum
                    key = i
                i++

            )
            index = key
            if (index >= 0)
                terracetagsArray.splice(index, 1)
                $('#li-terraceitem-' + delnum).remove()
                terracearrayValues = []
                $.each(terracetagsArray , (index,value)->
                    terracearrayValues.push(value.id)

                )
                q = 1
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                App.defaults[element] = unitVariantString
                            else
                                key = App.defaults.hasOwnProperty(element)
                                if key == true
                                    App.defaults[element] = 'All'
                    q++

                )
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-two"
                App.defaults['terrace'] = terracearrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter').empty()
                $('.specialFilter').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                
                @trigger 'unit:variants:selected'
























    class BuildingView extends Marionette.ItemView

        template : '<a  class="link" href="tower{{id}}">{{name}}</a>'

        tagName : 'li'

        className : 'vs-nav-current'

        events:
            'click .link':(e)->
                #m = mapplic()
                #m  = $('#mapplic1').data('mapplic')
                id = @model.get('id')

                i = 1
                params = window['mapplic' + i]
                selector = '#mapplic' + i
                if @model.get('id') == undefined
                    id = ""
                @showHighlightedBuildings(id)
                #m.initial($(selector),params)
                #m.showLocation(id, 800)
                #locationData = m.getLocationData(id);
                #m.showTooltip(locationData);
                #App.navigate "tower"+@model.get('id') , trigger:true

        showHighlightedBuildings:(id)->
            masterbuilding = App.master.building
            masterbuilding.each ( index)->
                $("#highlighttower"+index.get('id')).attr('class','overlay')
            if id != ""
                building = id
                $("#highlighttower"+building).attr('class','overlay highlight')


        initialize :->
            @$el.prop("id", 'towerlink'+@model.get("id"))














    class UnitTypeChildView extends Marionette.CompositeView

        tagName : 'ul'


        className : 'vs-nav'



        childView : BuildingView

        onShow:->
            model = @collection.at(0)

            id = 'tower'+model.get('id')
            #m.showLocation(id, 800)

            #App.navigate "tower"+model.get('id') , trigger:true

        






    class UnitViewChildView extends Marionette.ItemView

        template : '<div id="range{{range}}{{buildingid}}" class="boxBlank {{classname}} {{disable}}">
                        <div class="pull-left light text-center">
                            <h4 class="rangeName bold m-t-5">{{rangetext}}</h4>
                            <div class="small">{{rangeNo}}</div>
                        </div>
                        <div class="unitCount pull-right text-center">
                            <h4 class="bold m-b-5 m-t-0">{{count}}</h4>
                            <div class="small">FLATS</div>
                        </div>
                        <div class="clearfix"></div>
                    </div>                    

                    <input type="hidden" name="checkrange{{range}}{{buildingid}}"   id="checkrange{{range}}{{buildingid}}"       value="0" />                             </div>'

        className : 'towerSelect'






        events:

            'click ':(e)->

                q = 1
                $.map(App.backFilter, (value, index)->

                    if q!=1
                        screenArray  = App.backFilter[index]
                        for element in screenArray
                            if element == 'unitVariant'
                                if unitVariantString == ""
                                    unitVariantString = "All"
                                App.defaults[element] = unitVariantString
                            else
                               App.defaults[element] = 'All' 
                            
                    q++

                )
                App.navigate "screen-two"
                $('#screen-three-region').removeClass 'section'
                $('#screen-four-region').removeClass 'section'
                App.layout.screenThreeRegion.el.innerHTML = ""
                App.layout.screenFourRegion.el.innerHTML = ""
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                msgbus.showApp 'header'
                .insideRegion  App.headerRegion
                    .withOptions()
                
                if @model.get('count') !=0
                    for element , index in rangeArray
                        if element == @model.get('range')+@model.get('buildingid')
                            $("#checkrange"+@model.get('range')+@model.get('buildingid')).val '1'
                        else
                            $("#checkrange"+element).val '0'
                            $('#range'+element).removeClass 'selected'
                            rangeArray = []
                    
                    if  parseInt($("#checkrange"+@model.get('range')+@model.get('buildingid')).val()) == 0
                        rangeArray.push @model.get('range')+@model.get('buildingid')
                        $('#range'+@model.get('range')+@model.get('buildingid')).addClass 'selected'

                        $("#checkrange"+@model.get('range')+@model.get('buildingid')).val "1"
                        buildingModel = App.currentStore.building.findWhere({id:@model.get('buildingid')})
                        floorriserange = buildingModel.get 'floorriserange'
                        #floorriserange = [{"name":"low","start":"1","end":"2"},{"name":"medium","start":"3","end":"4"},{"name":"high","start":"5","end":"6"}]
                        obj = @
                        rangeArrayVal = []
                        i = 0
                        $.each(floorriserange, (index,value)->
                            if obj.model.get('range') == value.name
                                start = parseInt(value.start)
                                end = parseInt(value.end)
                                while parseInt(start) <= parseInt(end)
                                    rangeArrayVal[i] = start
                                    start = parseInt(start) + 1
                                    i++
                                rangeArrayVal



                        )


                        rangeString = rangeArrayVal.join(',')


                        App.defaults['floor'] = rangeString
                        App.backFilter['screen2'].push 'floor'
                        App.defaults['building'] = parseInt(@model.get 'buildingid')
                        App.backFilter['screen2'].push 'building'
                        $('#screen-two-button').removeClass 'disabled btn-default'
                        $("#screen-two-button").addClass 'btn-primary'
                        @trigger 'unit:count:selected'
                    else
                        rangeArray=[]
                        $("#checkrange"+@model.get('range')+@model.get('buildingid')).val "0"
                        $('#range'+@model.get('range')+@model.get('buildingid')).removeClass 'selected'
                if parseInt($("#checkrange"+@model.get('range')+@model.get('buildingid')).val()) == 0
                    $("#screen-two-button").addClass 'disabled btn-default'
                    $("#screen-two-button").removeClass 'btn-primary'
                    return false











    class UnitView extends Marionette.CompositeView

        template : '<div class="vs-content">
                            <div class="towerUnits">
                                <div class="subHeader ">
                                    <div class="row small light">
                                        <div class="col-xs-5">
                                            FLOOR<br>RANGE
                                        </div>
                                        <div class="col-xs-7 text-right">
                                            NO. OF UNITS OF<br>YOUR SELECTION
                                        </div>
                                    </div>
                                </div>
                            </div>
                                <!--<div class="towerDetails m-t-10">
                                    <div class="row">
                                        <div class="col-xs-4">
                                           <h4 class="m-t-0 m-b-0 bold">Total Apartments</h4>
                                           <h3 class="light m-t-0">{{totalunits}}</h3>
                                        </div>

                                        <div class="col-xs-4">
                                           <h4 class="m-t-0 m-b-0 bold">Available Apartments</h4>
                                           <h3 class="light m-t-0">{{availableunits}}</h3>
                                        </div>
                                        <div class="col-xs-4">
                                           <h4 class="m-t-0 m-b-0 bold">Number of Floors</h4>
                                           <h3 class="light m-t-0">{{totalfloors}}</h3>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-12 m-t-10">
                                            <div class="col">
                                                <p>Climb leg make muffins or sweet beast play time and hate dog or chew foot. Stretch climb leg. Play time give attitude for all of a sudden go crazy chase imaginary bugs lick butt. Claw drapes burrow under covers so hide when guests come over, inspect anything brought into the house hopped up on goofballs. Nap all day swat at dog and rub face on everything stick butt in face all of a sudden go crazy need to chase tail yet rub face on everything.</p>
                                            </div>
                                        </div>
                                    </div>

                                    <h4 class="m-t-0 m-b-5 text-primary"><span class="bold">VIEWS</span> for this tower</h4>
                                    <div class="row m-b-20">
                                        {{#views}}
                                        <div class="col-sm-6">
                                            {{#data}}<span class="glyphicon glyphicon-asterisk small text-grey"></span> {{name}}<br>{{/data}}
                                        </div>
                                        {{/views}}
                                    </div>
                                </div>-->
                    </div>'



        tagName : 'section'



        childView : UnitViewChildView


        childViewContainer : '.towerUnits'





        initialize :->
            @collection = @model.get 'units'
            @$el.prop("id", 'tower'+@model.get("buildingid"))

        onShow :->
            $("#unit-region section").addClass "vs-current" if $("#unit-region section").length < 2
            return






    class UnitTypeView extends Marionette.CompositeView




        childView : UnitView

        className : "vs-wrapper"






            




    ScreenTwoLayout : ScreenTwoLayout
    UnitTypeChildView : UnitTypeChildView
    UnitTypeView : UnitTypeView


















