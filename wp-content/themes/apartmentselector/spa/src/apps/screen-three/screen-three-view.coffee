define [ 'marionette' ], ( Marionette )->

    flag_set = 0
    unitVariantArray = ''
    unitVariantIdArray = []
    unitVariantString = ''
    firstElement = ''
    tagsArray = []
    count = 0
    object1 = "this"
    unitVariants = []
    cloneunitVariantArrayColl = ""
    rangeunitArray =[]
    globalUnitArrayInt = []
    position = ""
    unitAssigedArray = []
    sudoSlider = ""
    viewtagsArray = []
    entrancetagsArray = []
    terracetagsArray = []
    object = "this"
    class ScreenThreeLayout extends Marionette.LayoutView

        template : '<h3 class="text-center light m-t-0 m-b-20 unittype hidden animated pulse">We found <span class="bold text-primary"> {{countUnits }} </span> apartments that matched your selection.</h3>
                    <h3 class="text-center light m-t-0 m-b-20 budget hidden animated pulse">We found <span class="bold text-primary"> {{countUnits }} </span>  apartments in your budget of <strong>{{selection}}</strong></h3>
                    <h3 class="text-center light m-t-0 m-b-20 refresh hidden animated pulse">You just refreshed the page. You are now seeing <span class="bold text-primary">All</span> apartments across all the towers.</h3>
                    <div class="text-center subTxt m-b-20 All hidden animated pulse">You are seeing <span class="bold text-primary">All</span> apartments in the selected floor range of the tower.</div>
                    <div class="introTxt text-center">These apartments are available in different size variations on different floors of the tower. Click on any available apartment for more details. <!--<br><em>(You can scroll between towers to see other options.)</em>--></div>
                    <div class="introTxt text-center light">
                        You are seeing 
                        <div id="tagslist1" class="taglist">
                          <ul></ul>
                        </div>
                        <span class="text-primary variantToggle"></span>variants of your apartment selection
                    </div>

                    <div class="variantBox">
                        <div class="pull-left m-l-15">
                            <input type="checkbox" name="unselectall" id="unselectall" class="checkbox" value="0" checked/>
                            <label for="unselectall">Select/Unselect All</label>
                        </div>
                        <div class="text-right"><span class="variantClose glyphicon glyphicon-remove text-grey"></span></div>
                        <div class="grid-container">

                            {{#unitVariants}}
                            <div class="grid-block-3" >
                                <a class="grid-link2 selected" href="#" id="gridlink{{id}}" data-id="{{id}}">
                                    {{sellablearea}} Sq.ft.<input type="hidden" name="checklink{{id}}"   id="checklink{{id}}"   value="1" />
                                </a>
                            </div>
                            {{/unitVariants}}

                            <div class="variantAction m-t-5 m-b-20">
                                <a class="btn btn-primary m-r-10 done">DONE</a>
                                <a class="btn btn-default cancel">CANCEL</a>
                            </div>
                        </div>
                    </div>

                    <div class="special introTxt text-center hidden ">
                        <div>
                            Click <a class="special bold hidden" id="filterModalscren3">here</a> to set <span class="bold"> Additional Filters</span>
                        </div>
                        
                        View:
                        <div id="viewtaglist2" class="taglist2">
                          <ul></ul>
                        </div>

                        Entrance:
                        <div id="entrancetaglist2" class="taglist2">
                          <ul></ul>
                        </div>

                        Terrace:
                        <div id="terracetaglist2" class="taglist2">
                          <ul></ul>
                        </div>
                    </div>

                    <div class="row m-l-0 m-r-0 m-t-20 bgClass">

                        <div class="col-md-5 col-lg-4">
                            <div id="vs-container" class="vs-container">
                                <header class="vs-header" id="building-region"></header>
                                <div id="floorsvg" class="floorSvg"></div>
                                <div  id="unit-region"></div>
                            </div>

                            <div class="h-align-middle m-t-20 m-b-20">
                                <a href="#screen-three-region" class="btn btn-default btn-lg disabled" id="screen-three-button">Show Unit</a>
                            </div>
                        </div>

                        <div class="col-md-7 col-lg-8 b-grey b-l visible-md visible-lg rightTowerSvg">
                            
                            <div class="svgLegend">
                                <div class="row">
                                    <div class="col-sm-6"><span class="legendBox available"></span> Available</div>
                                    <!--<div class="col-sm-4"><span class="legendBox sold"></span> Sold/Blocked</div>-->
                                    <div class="col-sm-6"><span class="legendBox na"></span> Not in Selection/Not Released</div>
                                </div>
                            </div>

                            <div id="positionsvg" class="positionSvg">
                                
                            </div>
                        </div>
                    <input type="hidden" name="currency2" id="currency2" class="demo" data-a-sign="Rs. "   data-m-dec="" data-d-group="2">
                    </div>
                    <div class="specialFilter1">
                        <div class="bgClass">
                            <h3 class="text-center light">Choose from the options below to filter your selection</h3>
                            <div class="row m-l-0 m-r-0 filterBlock">

                                <div class="col-sm-5 b-r b-grey">
                                    <h4 class="bold blockTitle">View</h4>
                                    {{#views}}
                                    <div class="filterBox"> <input type="checkbox" name="screenview{{id}}" data-name="{{name}}" id="screenview{{id}}" checked class="checkbox viewname" value="{{id}}"> <label for="screenview{{id}}">{{name}}</label> </div>
                                    {{/views}}
                                    <div class="clearfix"></div>
                                </div>
                                
                                <div class="col-sm-3 b-r b-grey">
                                    <h4 class="bold blockTitle">Entrance</h4>
                                        {{#facings}}
                                    <div class="filterBox"> <input type="checkbox" name="screenfacing{{id}}" data-name="{{name}}" id="screenfacing{{id}}" checked class="checkbox facing" value="{{id}}"> <label for="screenfacing{{id}}">{{name}}</label> </div>
                                    {{/facings}}
                                    <div class="clearfix"></div>
                                </div>

                                <div class="col-sm-4">
                                    <h4 class="bold blockTitle">Terrace</h4>
                                     {{#terrace}}   
                                    <div class="filterBox"> <input type="checkbox" name="screenterrace{{id}}" data-name="{{name}}" id="screenterrace{{id}}" checked class="checkbox terrace" value="{{id}}"> <label for="screenterrace{{id}}">{{name}}</label> </div>
                                    {{/terrace}}  
                                </div>
                            </div>
                            
                            <div id="filtermsg1" class="alrtMsg animated pulse"></div>

                            <h4 id="unittypecount1" class="text-center"></h4>

                            <div class="text-center m-t-10 m-b-10">
                                <a id="donepopupscreen" class="btn btn-primary btn-sm b-close">DONE</a>
                                <a id="cancelpopupscreen" class="btn btn-primary btn-sm b-close">CANCEL</a>
                            </div>

                        </div>
                    </div>'




        className : 'page-container row-fluid'





        regions :
            buildingRegion : '#building-region'
            unitRegion : '#unit-region'

        

        events:
            'click #filterModalscren3':(e)->
                $('.specialFilter1').bPopup()
            'click .customLink':(e)->
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
                id = parseInt(e.target.id)
                for element , index in unitAssigedArray
                    if element == parseInt(id)
                        $('#'+element).attr('class','floor-pos position')
                    else
                        $('#'+element).attr('class','floor-pos ')
                $('#'+id).attr('class','floor-pos position')        
                unitAssigedArray.push id
                @loadsvg(id)

            'click .unit-hover':(e)->
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
                buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
                buildinArray = buildingCollection.toArray()
                building  = _.first(buildinArray)
                buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
                svgdata = buildingModel.get 'svgdata'
                floorriserange = buildingModel.get 'floorriserange'
                #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                svgposition = ""
                unitvalues = ""
                indexvalue = ""
                temp = ['ff','f']
                temp1 = ['tt','t']
                temp2 = ['cc','cc']
                
                if  parseInt(building.get('id')) == 11
                        temp = ['f','ff']
                        temp1 = ['t','tt']
                        temp2 = ['c','cc']
                id = $('#'+e.target.id).attr('data-value')
                flatid = $('#'+e.target.id).attr('data-id')
                unitModel = App.master.unit.findWhere({id:parseInt(id)})
                position = unitModel.get('unitAssigned')
                rangeArrayVal = []
                $.each(floorriserange, (index,value)->
                                    rangeArrayVal = []
                                    i = 0

                                    start = parseInt(value.start)
                                    end = parseInt(value.end)
                                    while parseInt(start) <= parseInt(end)
                                        rangeArrayVal[i] = start
                                        start = parseInt(start) + 1
                                        i++
                                    if jQuery.inArray(parseInt(unitModel.get('floor')),rangeArrayVal) >= 0
                                        App.defaults['floor'] = rangeArrayVal.join(',')



                )
                $.each(svgdata, (index,value)->
                    if $.inArray(position,value.svgposition ) >= 0 && value.svgposition != null
                        ii = 0
                        $.each(value.svgposition, (index1,val1)->
                            if position == val1  
                                svgposition = value.svgfile
                                unitsarray = value.units
                                indexvalue = unitsarray[position]
                                indexvalue1 = unitsarray[val1]
                                
                                $.map(indexvalue1, (index,value)->
                                    $('#f'+value).attr('class', 'unselected-floor ')
                                    $('#ff'+value).attr('class', 'unselected-floor ')
                                    

                                )
                                $.map(indexvalue, (index,value)->
                                                    if App.defaults['floor'] != "All"
                                                        floorArr  = App.defaults['floor'].split(',')
                                                        $.each(floorArr, (ind,val)->
                                                            if parseInt(value) == parseInt(val)
                                                                $('#'+temp[ii]+value).attr('class', 'unit-hover range')
                                                                $('#'+temp1[ii]+value).attr('class', 'unit-hover range')
                                                               




                                                            )
                                                    else
                                                        $('#'+temp[ii]+value).attr('class', 'unit-hover range')
                                                        $('#'+temp1[ii]+value).attr('class', 'unit-hover range')


                                )
                                $("#"+e.target.id).attr('class','selected-flat')
                                $("#"+temp1[ii]+flatid).attr('class','selected-flat')
                                unit = indexvalue[parseInt(flatid)]
                                unitModel = App.master.unit.findWhere(id:parseInt(unit))
                                position = unitModel.get('unitAssigned')
                                for element , index in unitAssigedArray
                                                    if element == parseInt(unitModel.get('unitAssigned'))
                                                        $('#'+element).attr('class','floor-pos position')
                                                    else
                                                        $('#'+element).attr('class','floor-pos ')
                                                        
                                unitAssigedArray.push unitModel.get('unitAssigned')
                                $('#'+unitModel.get('unitAssigned')).attr('class','position')
                                sudoSlider.goToSlide(unitModel.get('unitAssigned'));
                                for element , index in rangeunitArray
                                                    if element == parseInt(unit)
                                                        $("#select"+unit).val '1'
                                                    else
                                                        $("#select"+element).val '0'
                                                        $('#check'+element).removeClass 'selected'
                                                        rangeunitArray = []
                                rangeunitArray.push parseInt(unit)
                                $('#check'+unit).addClass "selected"

                                $("#select"+unit).val "1"
                                $("#screen-three-button").removeClass 'disabled btn-default'
                                $("#screen-three-button").addClass 'btn-primary'
                                
                                
                                    

                            ii++
                        )
                        



                       



                )
                
                

                unitModel
                @trigger "load:range:data", unitModel
                

            'click .unselected-floor':(e)->
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
                buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
                buildinArray = buildingCollection.toArray()
                building  = _.first(buildinArray)
                buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
                svgdata = buildingModel.get 'svgdata'
                floorriserange = buildingModel.get 'floorriserange'
                #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                svgposition = ""
                unitvalues = ""
                indexvalue = ""
                temp = ['ff','f']
                temp1 = ['tt','t']
                temp2 = ['cc','cc']
                
                if  parseInt(building.get('id')) == 11
                        temp = ['f','ff']
                        temp1 = ['t','tt']
                        temp2 = ['c','cc']
                id = $('#'+e.target.id).attr('data-value')
                flatid = $('#'+e.target.id).attr('data-id')
                unitModel = App.master.unit.findWhere({id:parseInt(id)})
                position = unitModel.get('unitAssigned')
                rangeArrayVal = []
                $.each(floorriserange, (index,value)->
                                    rangeArrayVal = []
                                    i = 0

                                    start = parseInt(value.start)
                                    end = parseInt(value.end)
                                    while parseInt(start) <= parseInt(end)
                                        rangeArrayVal[i] = start
                                        start = parseInt(start) + 1
                                        i++
                                    if jQuery.inArray(parseInt(unitModel.get('floor')),rangeArrayVal) >= 0
                                        App.defaults['floor'] = rangeArrayVal.join(',')



                )
                $.each(svgdata, (index,value)->
                    if $.inArray(position,value.svgposition ) >= 0 && value.svgposition != null
                        ii = 0
                        $.each(value.svgposition, (index1,val1)->
                            
                        
                            if position == val1  
                                svgposition = value.svgfile
                                unitsarray = value.units
                                indexvalue = unitsarray[position]
                                indexvalue1 = unitsarray[val1]
                                flatid = $('#'+e.target.id).attr('data-id')
                                unit = indexvalue[parseInt(flatid)]
                                
                                $.map(indexvalue1, (index,value)->
                                    $('#f'+value).attr('class', 'unselected-floor ')
                                    $('#ff'+value).attr('class', 'unselected-floor ')
                                    

                                )
                                $.map(indexvalue, (index,value)->
                                                    if App.defaults['floor'] != "All"
                                                        floorArr  = App.defaults['floor'].split(',')
                                                        $.each(floorArr, (ind,val)->
                                                            if parseInt(value) == parseInt(val)
                                                                $('#'+temp[ii]+value).attr('class', 'unit-hover range')
                                                                $('#'+temp1[ii]+value).attr('class', 'unit-hover range')
                                                                




                                                            )
                                                    else
                                                        $('#'+temp[ii]+value).attr('class', 'unselected-floor ')
                                                        $('#'+temp1[ii]+value).attr('class', 'unselected-floor ')


                                )
                                $("#"+e.target.id).attr('class','selected-flat')
                                $("#"+temp1[ii]+flatid).attr('class','selected-flat')

                                    

                            ii++
                        )
                        



                       



                )
                 
                
                
                @trigger "load:range:data", unitModel
                

            'mouseover .unit-hover':(e)->
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
                buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
                buildinArray = buildingCollection.toArray()
                building  = _.first(buildinArray)
                buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
                svgdata = buildingModel.get 'svgdata'
                floorriserange = buildingModel.get 'floorriserange'
                #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                svgposition = ""
                unitvalues = ""
                indexvalue = ""
                temp = ['ff','f']
                temp1 = ['tt','t']
                temp2 = ['cc','cc']
                
                if  parseInt(building.get('id')) == 11
                        temp = ['f','ff']
                        temp1 = ['t','tt']
                        temp2 = ['c','cc']
                id = $('#'+e.target.id).attr('data-value')
                flatid = $('#'+e.target.id).attr('data-id')
                unitModel = App.master.unit.findWhere({id:parseInt(id)})
                pos = unitModel.get('unitAssigned')
                checktrack = @checkSelection(unitModel)
                $.each(svgdata, (index,value)->
                    if $.inArray(pos,value.svgposition ) >= 0 && value.svgposition != null
                        ii = 0
                        $.each(value.svgposition, (index1,val1)->
                            
                        
                            if pos == val1  
                                $('#currency2').autoNumeric('init')
                                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                                currency = $('#currency2').val()
                                unittpe = App.master.unit_type.findWhere({id:unitModel.get('unitType')})
                                if unittpe.get('id') != 14 && unittpe.get('id') != 16
                                    text = unitModel.get('name')+' | '+unittpe.get('name')
                                else
                                    text = 'Not Released'
                                $('#'+temp1[ii]+flatid).text text
                                $('#'+temp1[ii]+flatid).attr('x','-30')
                            ii++
                
                                
                                
                                
                        )
                )       
                if checktrack == 1 && parseInt(unitModel.get('status')) == 9
                    $("#"+e.target.id).attr('class','unit-hover aviable')
                else if checktrack == 1 && ( parseInt(unitModel.get('status')) == 8 || parseInt(unitModel.get('status')) == 47 )
                    $("#"+e.target.id).attr('class','sold')
                else
                    $("#"+e.target.id).attr('class','other')


            'mouseover .range':(e)->
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
                buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
                buildinArray = buildingCollection.toArray()
                building  = _.first(buildinArray)
                buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
                svgdata = buildingModel.get 'svgdata'
                floorriserange = buildingModel.get 'floorriserange'
                #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                svgposition = ""
                unitvalues = ""
                indexvalue = ""
                temp = ['ff','f']
                temp1 = ['tt','t']
                temp2 = ['cc','cc']
                
                if  parseInt(building.get('id')) == 11
                        temp = ['f','ff']
                        temp1 = ['t','tt']
                        temp2 = ['c','cc']
                id = $('#'+e.target.id).attr('data-value')
                flatid = $('#'+e.target.id).attr('data-id')
                unitModel = App.master.unit.findWhere({id:parseInt(id)})
                pos = unitModel.get('unitAssigned')
                checktrack = @checkSelection(unitModel)
                $.each(svgdata, (index,value)->
                    if $.inArray(pos,value.svgposition ) >= 0 && value.svgposition != null
                        ii = 0
                        $.each(value.svgposition, (index1,val1)->
                            
                        
                            if pos == val1  
                                $('#currency2').autoNumeric('init')
                                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                                currency = $('#currency2').val()
                                unittpe = App.master.unit_type.findWhere({id:unitModel.get('unitType')})
                                if unittpe.get('id') != 14 && unittpe.get('id') != 16
                                    text = unitModel.get('name')+' | '+unittpe.get('name')
                                else
                                    text = 'Not Released'
                                $('#'+temp1[ii]+flatid).text text
                                $('#'+temp1[ii]+flatid).attr('x','-30')
                            ii++
                
                                
                                
                                
                        )
                )       
                if checktrack == 1 && parseInt(unitModel.get('status')) == 9
                    $("#"+e.target.id).attr('class','unit-hover range aviable')
                else if checktrack == 1 &&  ( parseInt(unitModel.get('status')) == 8 || parseInt(unitModel.get('status')) == 47 )
                    $("#"+e.target.id).attr('class','sold range')
                else
                    $("#"+e.target.id).attr('class','other range')
                                    

                               
                                
                        



                       



                    
                
           
            'mouseover .unselected-floor':(e)->
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
                buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
                buildinArray = buildingCollection.toArray()
                building  = _.first(buildinArray)
                buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
                svgdata = buildingModel.get 'svgdata'
                floorriserange = buildingModel.get 'floorriserange'
                #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                svgposition = ""
                unitvalues = ""
                indexvalue = ""
                temp = ['ff','f']
                temp1 = ['tt','t']
                temp2 = ['cc','cc']
                
                if  parseInt(building.get('id')) == 11
                        temp = ['f','ff']
                        temp1 = ['t','tt']
                        temp2 = ['c','cc']
                id = $('#'+e.target.id).attr('data-value')
                flatid = $('#'+e.target.id).attr('data-id')
                unitModel = App.master.unit.findWhere({id:parseInt(id)})
                pos = unitModel.get('unitAssigned')
                checktrack = @checkSelection(unitModel)
                $.each(svgdata, (index,value)->
                    if $.inArray(pos,value.svgposition ) >= 0 && value.svgposition != null
                        ii = 0
                        $.each(value.svgposition, (index1,val1)->
                            
                            if parseInt(pos) == parseInt(val1)  
                                $('#currency2').autoNumeric('init')
                                $('#currency2').autoNumeric('set', unitModel.get('unitPrice'));
                                currency = $('#currency2').val()
                                unittpe = App.master.unit_type.findWhere({id:unitModel.get('unitType')})
                                if unittpe.get('id') != 14 && unittpe.get('id') != 16
                                    text = unitModel.get('name')+' | '+unittpe.get('name')
                                else
                                    text = 'Not Released'
                                $('#'+temp1[ii]+flatid).text text
                                $('#'+temp1[ii]+flatid).attr('x','-30')
                            ii++
                
                                
                                
                                
                        )

                )
                
                checktrack = @checkSelection(unitModel)
                if checktrack == 1 && parseInt(unitModel.get('status')) == 9
                    $("#"+e.target.id).attr('class','unselected-floor aviable')
                else if checktrack == 1 &&  ( parseInt(unitModel.get('status')) == 8 || parseInt(unitModel.get('status')) == 47 )
                    $("#"+e.target.id).attr('class','sold ')
                else
                    $("#"+e.target.id).attr('class','other ')
                                    

                               
                                                        



                       



                   
                



            'click #screen-three-button':(e)->
                $('#screen-four-region').addClass 'section'
                @trigger 'unit:item:selected'

            'click a':(e)->
                e.preventDefault()

            'click .grid-link2':(e)->
                count = unitVariantArray.length
                id = $('#'+e.target.id).attr('data-id')
                track = 0
                if $('#checklink'+id).val() == '1'
                    index = unitVariantArray.indexOf(parseInt(id))
                    if index != -1
                        unitVariantArray.splice( index, 1 )
                        $('#checklink'+id).val '0'
                        track = 0
                        unitVariantIdArray.push(parseInt(id))
                else
                    track = 1
                    unitVariantArray.push(parseInt(id))
                    $('#checklink'+id).val '1'


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
                    $('#unselectall' ).prop 'checked', true
                else
                    $('#unselectall' ).prop 'checked', false



            'click .done':(e)->
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-three"
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                if unitVariantString == "" || parseInt(cloneunitVariantArrayColl.length) == parseInt(unitVariantArray.length)
                    unitVariantString = "All"
                App.defaults['unitVariant'] = unitVariantString
                # App.backFilter['screen2'].push "unitVariant"
                App.filter(params={})
                $('.specialFilter1').empty()
                $('.specialFilter1').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                @trigger 'unit:variants:selected'

            'click .cancel':(e)->
                $('.specialFilter1').empty()
                $('.specialFilter1').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                unitVariantArray = _.union(unitVariantArray,unitVariantIdArray)
                $(".variantBox").slideToggle()
                globalUnitVariants = App.defaults['unitVariant'].split(',')
                globalUnitArrayInt = []
                $.each(globalUnitVariants, (index,value)->
                    globalUnitArrayInt.push(parseInt(value))
                )

                if App.defaults['unitVariant'] != 'All'
                    $.each(unitVariantArray, (index,value)->
                        key = _.contains(globalUnitArrayInt,parseInt(value))
                        if key == true
                            $('#gridlink'+value).addClass 'selected'
                            $('#checklink'+value).val '1'
                        else
                            $('#gridlink'+value).removeClass 'selected'
                            $('#checklink'+value).val '0'
                    )
            'click #unselectall':(e)->
                if $('#'+e.target.id).prop('checked') == true
                    cloneunitVariantArrayColl.each ( index)->
                        $('#gridlink'+index.get('id')).addClass 'selected'
                        $('#checklink'+index.get('id')).val '1'
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
                        $('#gridlink'+value).removeClass 'selected'
                        $('#checklink'+value).val '0'
                        index = unitVariantArray.indexOf(parseInt(value))
                        if index != -1
                            unitVariantArray.splice( index, 1 )


                    )
                    unitVariantString = value.toString()

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
                                $('#screenview'+value.id).prop('checked',true)
                                view.push(value.id)
                            else
                                $('#screenview'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOviews,(index,value)->
                        $('#screenview'+value.id).prop('checked',true)
                        view.push(value.id)

                        )
                if App.defaults['facing'] != 'All'
                    $.each(originalOfacings,(index,value)->
                        
                       
                            if $.inArray(parseInt(value.id),globalfacingInt) >=0 
                                $('#screenfacing'+value.id).prop('checked',true)
                                entrance.push(value.id)
                            else
                                $('#screenfacing'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOfacings,(index,value)->
                        $('#screenfacing'+value.id).prop('checked',true)
                        entrance.push(value.id)

                        )
                if App.defaults['terrace'] != 'All'
                    $.each(originalOterraces,(index,value)->
                        
                       
                            if $.inArray(parseInt(value.id),globalterraceInt) >=0 
                                $('#screenterrace'+value.id).prop('checked',true)
                                teraace.push(value.id)
                            else
                                $('#screenterrace'+value.id).prop('checked',false)

                            

                        )
                else
                    $.each(originalOterraces,(index,value)->
                        $('#screenterrace'+value.id).prop('checked',true)
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
                $('#unittypecount1').html unittypetext
                $('.viewname').on('click' , (e)->
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
                            # view = originalviews
                            
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
                                $('#screenfacing'+value).prop('checked',true)

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
                                $('#screenfacing'+value).prop('checked',false)

                            )
                        $.each(uniqterrace, (index,value)->
                                $('#screenterrace'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneterraces, uniqterrace);
                        $.each(unselected1, (index,value)->
                                $('#screenterrace'+value).prop('checked',false)

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
                        $('#unittypecount1').html unittypetext
                        
                        
                        

                )
                $('.terrace').on('click' , (e)->
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
                                $('#screenview'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneviews, uniqviews);
                        $.each(unselected1, (index,value)->
                                $('#screenview'+value).prop('checked',false)

                        )
                        $.each(uniqfacings, (index,value)->
                                $('#screenfacing'+value).prop('checked',true)

                        )
                        unselected = _.difference(clonefacings, uniqfacings);
                        $.each(unselected, (index,value)->
                                $('#screenfacing'+value).prop('checked',false)

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
                        $('#unittypecount1').html unittypetext

                        

                )
                $('.facing').on('click' , (e)->
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
                                $('#screenview'+value).prop('checked',true)

                        )
                        unselected = _.difference(cloneviews, uniqviews);
                        $.each(unselected, (index,value)->
                                $('#screenview'+value).prop('checked',false)

                            )
                        $.each(uniqterrace, (index,value)->
                                $('#screenterrace'+value).prop('checked',true)

                        )
                        unselected1 = _.difference(cloneterraces, uniqterrace);
                        $.each(unselected1, (index,value)->
                                $('#screenterrace'+value).prop('checked',false)

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
                        $('#unittypecount1').html unittypetext
                        
                        
                        

                )
                $('#donepopupscreen').on('click' , (e)->
                            $('.specialFilter1').empty()
                            $('.specialFilter1').addClass 'hidden'
                            $('.b-modal').addClass 'hidden'
                            App.layout.screenFourRegion.el.innerHTML = ""
                            $('#screen-four-region').removeClass 'section' 
                            App.navigate "screen-three"
                            
                            object.trigger 'unit:variants:selected'
                )
                $('#cancelpopupscreen').on('click' , (e)->
                            $('.specialFilter1').empty()
                            $('.specialFilter1').addClass 'hidden'
                            $('.b-modal').addClass 'hidden'
                            view = []
                            entrance = []
                            terrace = []
                            $.each(cloneviews,(index,value)->
                                $('#screenview'+value.id).prop('checked',true)
                                view.push(value.id)

                            )
                            $.each(clonefacings,(index,value)->
                                $('#screenfacings'+value.id).prop('checked',true)
                                entrance.push(value.id)

                            )
                            $.each(cloneterraces,(index,value)->
                                $('#screenterrace'+value.id).prop('checked',true)
                                terrace.push(value.id)

                            )
                            App.defaults['view'] = 'All'
                            App.defaults['facing'] = 'All'
                            App.defaults['terrace'] = 'All'
                            App.layout.screenFourRegion.el.innerHTML = ""
                            $('#screen-four-region').removeClass 'section' 
                            App.navigate "screen-three"
                            App.currentStore.unit.reset UNITS
                            App.currentStore.building.reset BUILDINGS
                            App.currentStore.unit_type.reset UNITTYPES
                            App.currentStore.unit_variant.reset UNITVARIANTS
                            App.filter()

                            object.trigger 'unit:variants:selected'

                )
                
                
            unitVariantString = ""
            $('#screen-three-button').on('click',  ()->
                new jBox('Notice', 
                    content: 'Loading your apartment...',
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
            
                
            $('#mainsvg' ).text ""
            
            rangeunitArray= []
            globalUnitArrayInt = []

            @loadbuildingsvg()
            
            $('#sliderplans').liquidSlider(
                slideEaseFunction: "fade",
                autoSlide: true,
                includeTitle:false,
                fadeOutDuration: 1000,
                minHeight: 500,
                forceAutoSlide: true,
                autoSlideInterval: 5000,
                dynamicArrows: false,
                fadeInDuration: 1000
            )
            if App.screenOneFilter['key'] == 'unitType'
                $('.unittype' ).removeClass 'hidden'
            else if App.screenOneFilter['key'] == 'budget'
                $('.budget' ).removeClass 'hidden'
            else if App.defaults['floor'] == 'All'
                $('.refresh' ).removeClass 'hidden'
            else
                $('.All' ).removeClass 'hidden'


            
            $columns_number = $('.unitTable .cd-table-container').find('.cd-block').length

            $('.cd-table-container').on('scroll', ()->
                $this = $(this)
                total_table_width = parseInt($('.cd-table-wrapper').css('width').replace('px', ''))
                table_viewport = parseInt($('.unitTable').css('width').replace('px', ''))
                if( $this.scrollLeft() >= total_table_width - table_viewport - $columns_number)
                    $('.unitTable').addClass('table-end');
                    $('.cd-scroll-right').hide()
                else
                    $('.unitTable').removeClass('table-end')
                    $('.cd-scroll-right').show()
            )
            $('.cd-scroll-right').on('click', ()->
                $this= $(this)
                column_width = $(this).siblings('.cd-table-container').find('.cd-block').eq(0).css('width').replace('px', '')
                new_left_scroll = parseInt($('.cd-table-container').scrollLeft()) + parseInt(column_width)
                $('.cd-table-container').animate( {scrollLeft: new_left_scroll}, 200 )
            )

            $(".variantToggle").click ->
                $(this).toggleClass("open")
                $(".variantBox").slideToggle()
                return

            $(".variantClose").click ->
                $(".variantBox").slideToggle()
                $(".variantToggle").toggleClass("open")
                return

            $(".grid-link2").click  (e)->
                $(this).toggleClass("selected")
                return

            console.log unitVariantArray  = Marionette.getOption( @, 'uintVariantId' )
            unitVariantsArray  = Marionette.getOption( @, 'unitVariants' )
            unitVariantArrayColl = new Backbone.Collection unitVariantsArray
            cloneunitVariantArrayColl = unitVariantArrayColl.clone()
            unitVariants  = unitVariantArray
            firstElement = _.first(unitVariantArray)
            globalUnitVariants = App.defaults['unitVariant'].split(',')


            if App.defaults['unitVariant'] != 'All'
                globalUnitVariants = App.defaults['unitVariant'].split(',')
                $.each(globalUnitVariants, (index,value)->
                    globalUnitArrayInt.push(parseInt(value))

                )
            selectedArray = []
            if App.defaults['unitVariant'] != 'All'
                unitVariantArray = _.union(unitVariantArray,unitVariantIdArray)
                $.each(unitVariantArray, (index,value)->
                    key = _.contains(globalUnitArrayInt,parseInt(value))
                    if key == true
                        $('#gridlink'+value).addClass 'selected'
                        $('#checklink'+value).val '1'
                        selectedArray.push value
                    else
                        index = unitVariantArray.indexOf(parseInt(value))
                        $('#gridlink'+value).removeClass 'selected'
                        $('#checklink'+value).val '0'

                )
            else
                unitVariantArray = unitVariantArray
                $.each(unitVariantArray, (index,value)->
                    $('#gridlink'+value).addClass 'selected'
                    $('#checklink'+value).val '1'
                    selectedArray.push value

                )
            App.defaults['unitVariant'] = selectedArray.join(',')
            # App.backFilter['screen2'].push "unitVariant"
            unitVariantString = ""
            if unitVariantString == "All" || App.defaults['unitVariant'] == "All" || selectedArray.length == unitVariantArray.length
                $('#unselectall' ).prop 'checked', true
            else
                $('#unselectall' ).prop 'checked', false











            $('html, body').delay(600).animate({
                scrollTop: $('#screen-three-region').offset().top
            }, 'slow');

            tagsArray = []
            testtext = App.defaults['unitVariant']
            if parseInt(selectedArray.length) != parseInt(unitVariantArray.length)
                unitVariantArrayText = selectedArray
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
            object1 = @

            
            
            
            
        $(document).on("click", ".closeButton1",  ()->
                theidtodel = $(this).parent('li').attr('id')
                object1.delItem($('#' + theidtodel).attr('data-itemNum'))
        )
        $(document).on("click", ".closeButton5",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    
                    object.delViewItem($('#' + theidtodel).attr('data-itemNum'))
        )
        $(document).on("click", ".closeButton6",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    object.delEntranceItem($('#' + theidtodel).attr('data-itemNum'))
        )
        $(document).on("click", ".closeButton7",  ()->
                    theidtodel = $(this).parent('li').attr('id')
                   
                    object.delTerraceItem($('#' + theidtodel).attr('data-itemNum'))
        )

        showMsg:->
            $('#filtermsg1').show()
            $('#filtermsg1').text(' Atleast one option in each category must be selected to proceed').delay(2000).fadeOut( (x)->$('filtermsg').text(""));
        
        loadbuildingsvg:->

            buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
            buildinArray = buildingCollection.toArray()
            console.log building  = _.first(buildinArray)
            console.log buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
            svgdata = buildingModel.get 'svgdata'

            floor_layout_Basic = buildingModel.get('floor_layout_basic').image_url
            maxvalue  = Marionette.getOption( @, 'maxvalue' )
            #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:[1:[1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152]]]]
            if floor_layout_Basic != ""
                path = floor_layout_Basic
                $('<div></div>').load(path,  (x)->$('#'+maxvalue.id).attr('class','floor-pos position');unitAssigedArray.push(maxvalue.id)).appendTo("#floorsvg")
            else
                path = ""
            floorid = maxvalue.id
            @loadsvg(floorid)

        loadsvg:(floorid)->
            buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
            buildinArray = buildingCollection.toArray()
            building  = _.first(buildinArray)
            buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
            floorange = buildingModel.get('floorriserange')
            lowrange = floorange[0]
            mediumrange = floorange[1]
            highrange = floorange[2]
            #svgpath = buildingModel.get 'svgfile'
            svgdata = buildingModel.get 'svgdata'

            #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
            if floorid == undefined
                floorid = 1
            
                
            
            
            svgposition = ""
            unitvalues = ""
            indexvalue = ""
            $('#positionsvg').text ""
            temp = ['ff','f']
            temp1 = ['tt','t']
            temp2 = ['cc','cc']
            
            if  parseInt(building.get('id')) == 11
                    temp = ['f','ff']
                    temp1 = ['t','tt']
                    temp2 = ['c','cc']
            $.each(svgdata, (index,value)->
                
                    
                if $.inArray(floorid,value.svgposition ) >= 0 && value.svgposition != null
                    ii = 0
                    if value.svgfile != ""
                        svgposition = value.svgfile
                        unitsarray = value.units
                        $('#positionsvg').load(svgposition,  (x)->
                            value.svgposition.sort( (a,b)->
                                b - a

                                )
                            $.each(value.svgposition, (index1,val1)->
                                indexvalue = unitsarray[val1]
                                
                                    
                                $.map(indexvalue, (index,value)->
                                            $('#'+temp[ii]+value).attr('class', 'unselected-floor')
                                            $('#'+temp[ii]+value).attr('data-value', index)
                                            $('#'+temp[ii]+value).attr('data-idvalue', temp[ii])
                                            
                                )
                                $.map(indexvalue, (index1,value1)->
                                            if App.defaults['floor'] != "All"
                                                floorArr  = App.defaults['floor'].split(',')
                                                if floorid == val1
                                                    $.each(floorArr, (ind,val)->
                                                        if parseInt(value1) == parseInt(val)
                                                            $('#'+temp[ii]+value1).attr('class', 'unit-hover range')
                                                            $('#'+temp1[ii]+value1).attr('class', 'unit-hover range')
                                                            





                                                     )
                                            else 
                                                $('#'+temp[ii]+value1).attr('class', 'unit-hover range')
                                                $('#'+temp1[ii]+value1).attr('class', 'unit-hover range')

                                )
                                rangClass = ['LOWRISE','MIDRISE','HIGHRISE']
                                i= 0
                                $.each(floorange, (index,value)->
                                                start = parseInt(value.start)
                                                end = parseInt(value.end)
                                                while parseInt(start) <= parseInt(end)
                                                    $('#'+temp2[ii]+start).attr('class',rangClass[i])
                                                    $('#'+temp2[ii]+start).text rangClass[i]
                                                    
                                                    start++

                                                i++
                                )

                                ii++
                                        
                                

                            )

                            )



                )
            
            position = floorid

        checkSelection:(model)->
            myArray = []
            $.map(App.defaults, (value, index)->
                if value!='All' && index != 'floor' 
                    myArray.push({key:index,value:value})

            )
            flag = 0
            object = @
            track = 0
            $.each(myArray, (index,value)->
                paramKey = {}
                if value.key == 'budget'
                    buildingModel = App.master.building.findWhere({'id':model.get 'building'})
                    floorRise = buildingModel.get 'floorrise'
                    floorRiseValue = floorRise[model.get 'floor']
                    unitVariantmodel = App.master.unit_variant.findWhere({'id':model.get 'unitVariant'})
                    #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
                    unitPrice = model.get 'unitPrice'
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
                            tempnew = model.get(value.key)
                            if tempnew != ""
                                tempnew = tempnew.map((item)->
                                    return parseInt(item))
                        else if value.key == 'facing'
                            tempnew = []
                            tempnew = model.get(value.key)
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
                                if model.get(value.key) == parseInt(element)
                                    flag++ 
                                else if $.inArray(parseInt(element),tempnew) >=0 
                                    flag++ 

                        else
                            if model.get(value.key) == parseInt(value.value)
                                flag++

                   


            )
            if flag >= myArray.length
                track =1



            if myArray.length == 0
                track = 1
            track
        
        onShowRangeData:(unitModel,collection)->
            $('#floorsvg').text ""
            

            position = unitModel.get('unitAssigned')
            object = @
            unitcoll = collection.toArray()
            $.each(unitcoll, (index,value)->
                units = value.get('units')
                units.each( (item)->
                    object.checkClassSelection(item)


                    )
                

                )
            
            buildingCollection  = Marionette.getOption( @, 'buildingCollection' )
            buildinArray = buildingCollection.toArray()
            building  = _.first(buildinArray)
            buildingModel = App.master.building.findWhere({id:parseInt(building.get('id'))})
            exceptionObject = buildingModel.get 'floorexceptionpositions'
            floorLayoutimage = ""
            $.each(exceptionObject, (index,value1)->
                    floorvalue = $.inArray( unitModel.get('floor'),value1.floors)
                    if floorvalue == -1
                        floorLayoutimage = building.get('floor_layout_basic').image_url
                    else
                        if value1.floor_layout_basic.image_url == ""
                            floorLayoutimage = building.get('floor_layout_basic').image_url
                        else
                            floorLayoutimage = value1.floor_layout_basic.image_url



            )
            if exceptionObject.legth == 0
                    floorLayoutimage = building.get('floor_layout_basic').image_url

            pos = unitModel.get('unitAssigned')
            $('<div></div>').load(floorLayoutimage,  (x)->$('#'+pos).attr('class','floor-pos position');unitAssigedArray.push(pos)).appendTo("#floorsvg")
           

            for element , index in unitAssigedArray
                    if element == parseInt(unitModel.get('unitAssigned'))
                        $('#'+element).attr('class','floor-pos position')
                    else
                        $('#'+element).attr('class','floor-pos ')
                        
            unitAssigedArray.push unitModel.get('unitAssigned')
            $('#'+unitModel.get('unitAssigned')).attr('class','position')
            sudoSlider.goToSlide(unitModel.get('unitAssigned'));
            for element , index in rangeunitArray
                if element == parseInt(unitModel.get('id'))
                    $("#select"+unitModel.get('id')).val '1'
                else
                    $("#select"+element).val '0'
                    $('#check'+element).removeClass 'selected'
                    rangeunitArray = []
            rangeunitArray.push parseInt(unitModel.get('id'))
            $('#check'+unitModel.get('id')).addClass "selected"

            $("#select"+unitModel.get('id')).val "1"
            $("#screen-three-button").removeClass 'disabled btn-default'
            $("#screen-three-button").addClass 'btn-primary'


        checkClassSelection:(model)->
            myArray = []
            $.map(App.defaults, (value, index)->
                if value!='All' && index != 'floor' 
                    myArray.push({key:index,value:value})

            )
            flag = 0
            object = @
            track = 0
            $.each(myArray, (index,value)->
                paramKey = {}
                if value.key == 'budget'
                    buildingModel = App.master.building.findWhere({'id':model.get 'building'})
                    floorRise = buildingModel.get 'floorrise'
                    floorRiseValue = floorRise[model.get 'floor']
                    unitVariantmodel = App.master.unit_variant.findWhere({'id':model.get 'unitVariant'})
                    #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
                    unitPrice = model.get 'unitPrice'
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
                            tempnew = model.get(value.key)
                            if tempnew != ""
                                tempnew = tempnew.map((item)->
                                    return parseInt(item))
                        else if value.key == 'facing'
                            tempnew = []
                            tempnew = model.get(value.key)
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
                                if model.get(value.key) == parseInt(element)
                                    flag++ 
                                else if $.inArray(parseInt(element),tempnew) >=0 
                                    flag++ 

                        else
                            if model.get(value.key) == parseInt(value.value)
                                flag++



            )
            if flag >= myArray.length
                track =1



            if myArray.length == 0
                track = 1
            
            if track==1 && model.get('status') == 9 && model.get('unitType') != 14 && model.get('unitType') != 16
                $('#check'+model.get("id")).addClass 'boxLong filtered'
                $('#flag'+model.get("id")).val '1'
            else if track==1 &&  model.get('status') == 8 && model.get('unitType') != 14 && model.get('unitType') != 16
                $('#check'+model.get("id")).addClass 'boxLong sold'
            else
                $('#check'+model.get("id")).addClass 'boxLong other'
                $('#check'+model.get("id")).text model.get 'unitTypeName'



            



        doListing:->
            $('#tagslist1 ul li').remove()
            $.each(tagsArray,  (index, value) ->
                $('#tagslist1 ul').append('<li id="uli-item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.area + '</span><div class="closeButton1"></div></li>')
            )
            if tagsArray.length == 1
                $('.closeButton1').addClass 'hidden'

        doViewListing:->
            $('#viewtaglist2 ul li').remove()
            $.each(viewtagsArray,  (index, value) ->
                $('#viewtaglist2 ul').append('<li id="li-view2item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton5"></div></li>')
            )
            if viewtagsArray.length == 1
                $('.closeButton5').addClass 'hidden'

        doentranceListing:->
            $('#entrancetaglist2 ul li').remove()
            $.each(entrancetagsArray,  (index, value) ->
                $('#entrancetaglist2 ul').append('<li id="li-entrance2item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton6"></div></li>')
            )
            if entrancetagsArray.length == 1
                $('.closeButton6').addClass 'hidden'

        doterraceListing:->
            $('#terracetaglist2 ul li').remove()
            $.each(terracetagsArray,  (index, value) ->
                $('#terracetaglist2 ul').append('<li id="li-terrace2item-' + value.id + '" data-itemNum="' + value.id + '"><span class="itemText">' + value.name + '</span><div class="closeButton7"></div></li>')
            )
            if terracetagsArray.length == 1
                $('.closeButton7').addClass 'hidden'

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
                $('#uli-item-' + delnum).remove()
                unitvariantarrayValues = []
                $.each(tagsArray , (index,value)->
                    unitvariantarrayValues.push(value.id)

                )
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-three"
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
                $('#li-view2item-' + delnum).remove()
                viewarrayValues = []
                $.each(viewtagsArray , (index,value)->
                    viewarrayValues.push(value.id)

                )
                
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-three"
                App.defaults['view'] = viewarrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter1').empty()
                $('.specialFilter1').addClass 'hidden'
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
                $('#li-entrance2item-' + delnum).remove()
                entrancearrayValues = []
                $.each(entrancetagsArray , (index,value)->
                    entrancearrayValues.push(value.id)

                )
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-three"
                App.defaults['facing'] = entrancearrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter1').empty()
                $('.specialFilter1').addClass 'hidden'
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
                $('#li-terrace2item-' + delnum).remove()
                terracearrayValues = []
                $.each(terracetagsArray , (index,value)->
                    terracearrayValues.push(value.id)

                )
                App.layout.screenFourRegion.el.innerHTML = ""
                App.navigate "screen-two"
                App.defaults['terrace'] = terracearrayValues.join(',')
                App.currentStore.unit.reset UNITS
                App.currentStore.building.reset BUILDINGS
                App.currentStore.unit_type.reset UNITTYPES
                App.currentStore.unit_variant.reset UNITVARIANTS
                App.filter(params={})
                $('.specialFilter1').empty()
                $('.specialFilter1').addClass 'hidden'
                $('.b-modal').addClass 'hidden'
                
                @trigger 'unit:variants:selected'







    class BuildingView extends Marionette.ItemView

        template : '<a class="link" >{{name}}</a>'

        tagName : 'li'

        events :
            'click a':(e)->
                e.preventDefault()
            'click .link' : ( e )->
                $( '#tower'+@model.get 'id' ).removeClass 'hidden'
                App.defaults['building'] = @model.get 'id'
                App.filter(params={})
                msgbus.showApp 'header'
                .insideRegion  App.headerRegion
                    .withOptions()

                @trigger 'building:link:selected'



    class UnitTypeChildView extends Marionette.CompositeView

        tagName : 'ul'


        className : 'vs-nav'



        childView : BuildingView













    class unitChildView extends Marionette.ItemView

        template : '
                    <div class="pull-left light">
                        <h5 class="rangeName bold m-t-5">Floor {{floor}}</h5>
                    </div>
                    <div class="pull-right text-center">
                        <div class="unitNo">{{name}}</div>
                        <div class="small">{{unittypename}} {{sellablearea}} Sq.ft.</div>
                    </div>
                    <input type="hidden" id="flag{{id}}" name="flag{{id}}" value="0"/>
                    <input type="hidden" id="select{{id}}" name="select{{id}}" value="0"/>
                    <div class="clearfix"></div>'



        className : 'check'

        initialize :->
            @$el.prop("id", 'check'+@model.get("id"))

        events:

            'click ':(e)->
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
                screenThreeLayout = new ScreenThreeLayout()
                check = screenThreeLayout.checkSelection(@model)
                if check == 1 && @model.get('status') == 9
                    buildingModel = App.master.building.findWhere({id:parseInt(@model.get('building'))})
                    svgdata = buildingModel.get('svgdata')
                    #svgdata = [[svposition:[1],svgfile:"../wp-content/uploads/2014/08/image/floor-pos-1.svg",units:{1:{1:49,2:55,3:61,4:67,5:73,6:80,7:85,8:90,9:98,10:113,11:142,12:152}}]]
                    svgposition = ""
                    unitvalues = ""
                    indexvalue = ""
                    temp = ['f','ff']
                    temp1 = ['t','tt']
                    temp2 = ['c','cc']
                    idValue = ""
                    $.each(svgdata, (index,value)->
                        if $.inArray(position,value.svgposition ) >= 0 && value.svgposition != null
                            $.each(value.svgposition, (index1,val1)->
                                    unitsarray1 = value.units
                                    indexvalue1 = unitsarray1[val1]
                                    if parseInt(position) == parseInt(val1)
                                        svgposition = value.svgfile
                                        unitsarray = value.units
                                        indexvalue = unitsarray[position]

                                    $.map(indexvalue1,  (index,value)->
                                        $('#f'+value).attr('class', 'unit-hover')
                                        $('#ff'+value).attr('class', 'unit-hover')

                                    )
                                        


                                    )
                                    
                                        



                           



                        )
                    obj = @
                    idvalue = ""
                    $.each(indexvalue, (index,value)->
                        if parseInt($('#f'+index).attr('data-value'))  == obj.model.get('id')
                           idvalue = $('#f'+index).attr('data-idvalue')
                        else if parseInt($('#ff'+index).attr('data-value'))  == obj.model.get('id')
                           idvalue = $('#ff'+index).attr('data-idvalue')

                        )
                    $('#screen-four-region').removeClass 'section'
                    App.layout.screenFourRegion.el.innerHTML = ""
                    App.navigate "screen-three"
                    App.currentStore.unit.reset UNITS
                    App.currentStore.building.reset BUILDINGS
                    App.currentStore.unit_type.reset UNITTYPES
                    App.currentStore.unit_variant.reset UNITVARIANTS
                    unitModel = App.master.unit.findWhere({id:@model.get("id")})
                    for element , index in rangeunitArray
                        if element == @model.get('id')
                            $("#select"+@model.get('id')).val '1'
                        else
                            $("#select"+element).val '0'
                            $('#check'+element).removeClass 'selected'
                            if unitModel.get('status') == 9
                                $("#"+element).attr('class','unit-hover aviable ')
                            else if unitModel.get('status') == 8
                                $("#"+element).attr('class','unit-hover sold ')
                            rangeunitArray = []
                    if  parseInt($("#select"+@model.get('id')).val()) == 0
                        rangeunitArray.push @model.get('id')
                        $('#check'+@model.get("id")).addClass "selected"

                        $("#select"+@model.get('id')).val "1"
                        # object = @
                        $.map(indexvalue,  (index,value)->

                            if App.defaults['floor'] != 'All'
                                floorArr  = App.defaults['floor'].split(',')
                                $.each(floorArr, (ind,val)->
                                    if parseInt(value) == parseInt(val)
                                        textid = ""
                                        $('#'+idvalue+value).attr('class', 'unit-hover range')
                                        if idvalue == 'f'
                                            textid = 't'
                                        else
                                            textid = 'tt'
                                        $('#'+textid+value).text ""
                                        




                                )
                            else
                                $('#f'+value).attr('class', 'unit-hover')
                                $('#t'+value).text ""
                                $('#ff'+value).attr('class', 'unit-hover')
                                $('#tt'+value).text ""

                        )
                        $.map(indexvalue,  (index,value)->
                            if parseInt(index) == obj.model.get("id")
                                positionassigend = value
                                $("#"+idvalue+value).attr('class','selected-flat')
                                if idvalue == 'f'
                                    textid = 't'
                                else
                                    textid = 'tt'
                                $("#"+textid+value).attr('class','selected-flat')
                                $('#currency2').autoNumeric('init')
                                $('#currency2').autoNumeric('set', obj.model.get('unitPrice'));
                                currency = $('#currency2').val()
                                unittpe = App.master.unit_type.findWhere({id:obj.model.get('unitType')})
                                text = obj.model.get('name')+' | '+unittpe.get('name')
                                $('#'+textid+value).html text
                                $("#"+textid+value).attr('x','-30')
                                


                            )
                        $('#'+@model.get("unitAssigned")).attr('class','floor-pos position')
                        App.unit['name'] = @model.get("id")
                        $("#screen-three-button").removeClass 'disabled btn-default'
                        $("#screen-three-button").addClass 'btn-primary'
                        #@trigger 'unit:item:selected'
                    else
                        rangeunitArray=[]
                        $("#select"+@model.get('id')).val "0"
                        $('#check'+@model.get('id')).removeClass 'selected'
                        if unitModel.get('status') == 9
                            $("#"+@model.get("id")).attr('class','unit-hover aviable ')
                        else if unitModel.get('status') == 8
                            $("#"+@model.get("id")).attr('class','unit-hover sold ')
                    if parseInt($("#select"+@model.get('id')).val()) == 0
                        $("#screen-three-button").addClass 'disabled btn-default'
                        $("#screen-three-button").removeClass 'btn-primary'
                        # object = @

                        $.map(indexvalue,  (index,value)->
                            if App.defaults['floor'] != 'All'
                                floorArr  = App.defaults['floor'].split(',')
                                $.each(floorArr, (ind,val)->
                                    if parseInt(value) == parseInt(val)
                                        $("#"+idvalue+val).attr('class','unit-hover range')
                                

                                )

                            )
                        $('#'+@model.get("unitAssigned")).attr('class','floor-pos ')
                        return false
                    

                    


        onShow :->
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
            myArray = []
            $.map(App.defaults, (value, index)->
                if value!='All' && index != 'floor' 
                    myArray.push({key:index,value:value})

            )
            flag = 0
            obj = @
            track = 0
            $.each(myArray, (index,value)->
                paramKey = {}
                if value.key == 'budget'
                    buildingModel = App.master.building.findWhere({'id':obj.model.get 'building'})
                    floorRise = buildingModel.get 'floorrise'
                    floorRiseValue = floorRise[obj.model.get 'floor']
                    unitVariantmodel = App.master.unit_variant.findWhere({'id':obj.model.get 'unitVariant'})
                    #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
                    unitPrice = obj.model.get 'unitPrice'
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
                            tempnew = obj.model.get(value.key)
                            if tempnew != ""
                                tempnew = tempnew.map((item)->
                                    return parseInt(item))
                        else if value.key == 'facing'
                            tempnew = []
                            tempnew = obj.model.get(value.key)
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
                                if obj.model.get(value.key) == parseInt(element)
                                    flag++ 
                                else if $.inArray(parseInt(element),tempnew) >=0 
                                    flag++ 

                        else
                            if obj.model.get(value.key) == parseInt(value.value)
                                flag++



            )
            if flag >= myArray.length
                track =1



            if myArray.length == 0
                track = 1
            
            if track==1 && @model.get('status') == 9 && @model.get('unitType') != 14 && @model.get('unitType') != 16
                $('#check'+@model.get("id")).addClass 'boxLong filtered'
                $('#flag'+@model.get("id")).val '1'
            else if track==1 &&  @model.get('status') == 8 && @model.get('unitType') != 14 && @model.get('unitType') != 16
                $('#check'+@model.get("id")).addClass 'boxLong sold'
            else
                $('#check'+@model.get("id")).addClass 'boxLong other'
                $('#check'+@model.get("id")).text @model.get 'unitTypeName'




















    class UnitView extends Marionette.CompositeView

        template : '<div class="unitContainer"></div>'




        childView : unitChildView

        childViewContainer : '.unitContainer'








        initialize :->
            @collection = @model.get 'units'
            @$el.prop("id", @model.get("id"))








    class UnitTypeView extends Marionette.CompositeView

        template : '<div class="unitTable">
                                <div id="unitsSlider" class="unitSlider">
                                    </div></div>'


        childView : UnitView

        childViewContainer : '.unitSlider'

        onShow:->
                container = $("#unitsSlider");
                height = container.height("auto").height();
                container.height("auto");
                sudoSlider = $("#unitsSlider").sudoSlider(
                    customLink: "a"
                    prevNext: false
                    responsive: true
                    speed: 800
                    # continuous:true
                )
                maxcoll = @collection.toArray()
                maxvalue = _.max(maxcoll,  (model)->
                    model.get('count')
                )
                sudoSlider.goToSlide(maxvalue.get('id'))


















    ScreenThreeLayout : ScreenThreeLayout
    UnitTypeChildView : UnitTypeChildView
    UnitTypeView : UnitTypeView


