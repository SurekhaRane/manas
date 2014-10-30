define [ 'extm', 'src/apps/header/header-view' ], ( Extm, HeaderView )->

    class HeaderController extends Extm.RegionController

        initialize :(opt = {})->

            @model = @_getHeader()

            @view = view = @_getHeaderView @model

            @show view


        _getHeaderView:(model)->
            new HeaderView
                textString : model[0]
                templateHelpers :
                    textString : model[0]
                    textClass : model[1]


        _getHeader:->
            templateArr = []
            flag = 0
            myArray = []
            param = {}
            paramkey = {}
            flag = 0
            track = 0
            f = 1
            trackArray = []
            units = App.master.unit
            $.map(App.defaults, (value, index)->
                if value!='All'
                    myArray.push({key:index,value:value})

            )
            $.each(myArray, (index,value)->
                if(value.value !='All')
                    param[value.key] = value.value
                    string_val = _.isString(value.value)
                    valuearr = ""
                    if string_val == true
                        valuearr = value.value.split(',')
                    if valuearr.length > 1
                        for element  in valuearr
                            if value.key == 'unitType'
                                key = App.master.unit_type.findWhere({id:parseInt(element)})
                                templateArr.push '<span>'+key.get('name')+'</span>'
                            if value.key == 'budget'
                                budget_Val = value+'lakhs'
                                templateArr.push '<span>'+budget_Val+'</span>'

                            if value.key == 'building'
                                key = App.master.building.findWhere({id:parseInt(element)})
                                templateArr.push '<span>'+key.get('name')+'</span>'
                            if value.key == 'floor'
                                if track == 0
                                    trackArray.push value.value
                                flag = 1
                                track = 1
                    else
                        if value.key == 'unitType'
                            key = App.master.unit_type.findWhere({id:parseInt(value.value)})
                            templateArr.push '<span>'+key.get('name')+'</span>'
                        if value.key == 'budget'
                            budget_Val = value.value
                            templateArr.push '<span>'+budget_Val+'</span>'

                        if value.key == 'building'
                            key = App.master.building.findWhere({id:parseInt(value.value)})
                            templateArr.push '<span>'+key.get('name')+'</span>'
                        if value.key == 'floor'
                            if track == 0
                                trackArray.push value.value
                            flag = 1
                            track = 1




            )
            if templateArr.length == 0 
                templateArr.push '<span>All</span>'
            if(flag==1)
                buildingModel = App.master.building.findWhere({id:App.defaults['building']})
                floorriserange = buildingModel.get 'floorriserange'
                #floorriserange = [{"name":"low","start":"1","end":"2"},{"name":"medium","start":"3","end":"4"},{"name":"high","start":"5","end":"6"}]

                first = _.first(trackArray)
                if parseInt(first) >= parseInt(floorriserange[0].start) &&  parseInt(first) <= parseInt(floorriserange[0].end)
                    range = 'Lowrise'
                    templateArr.push '<span>'+range+'</span>'



                if parseInt(first) >= parseInt(floorriserange[1].start) &&  parseInt(first) <= parseInt(floorriserange[1].end)
                    range = 'Midrise'
                    templateArr.push '<span>'+range+'</span>'


                if parseInt(first) >= parseInt(floorriserange[2].start) &&  parseInt(first) <= parseInt(floorriserange[2].end)
                    range = 'Highrise'
                    templateArr.push '<span>'+range+'</span>'
                templateString  = templateArr

            else
                templateString  = templateArr

            textClass = "hidden"
            btnClass = ""
            if  window.location.href.indexOf('screen-two') > -1 || window.location.href.indexOf('screen-three') > -1 || window.location.href.indexOf('screen-four') > -1
                textClass = ""
            else if window.location.href.indexOf('wishList') > -1
                templateString = "<span>WishList Comparison</span>"
                textClass = ""
                btnClass = "hidden"
            else
                templateString = "<span>Apartment Selector</span>"

            $('#textstring').text ""
            [templateString,textClass]



    msgbus.registerController 'header', HeaderController