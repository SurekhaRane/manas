define [ 'marionette' ], ( Mariontte )->


    class HeaderView extends Marionette.ItemView

        template : '<div class="backBtn {{textClass}}">
                        <a  class="back text-white"><span class="glyphicon glyphicon-chevron-left "></span></a>
        		    </div>

                    <div class="rightBtns  {{btnClass}}">
                        <a  id="showTop" class="text-white hidden"><span class="glyphicon glyphicon-filter"></span></a>
                        <a id="showRightPush" class="text-white hidden "><span class="glyphicon glyphicon-user"></span></a>
                    </div>

                    <div class="text-center">
                        <h3 class="m-t-15 light"><span class="slctnTxt">Your selection</span> <span id="textstring"></span> </h3>
                    </div>

                    '

        className : "header navbar navbar-inverse"



        events:
            'click .back':(e)->
                if window.location.href.indexOf('screen-three') > -1
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
                    key = App.defaults.hasOwnProperty(App.screenOneFilter['key'])
                    if key == true
                        App.defaults[App.screenOneFilter['key']] = App.screenOneFilter['value']



                    e.preventDefault()
                    App.filter(params={})
                    App.layout.screenThreeRegion.el.innerHTML = ""
                    $('#screen-three-region').removeClass 'section'
                    App.navigate "screen-two" , trigger:true
                    
                else if window.location.href.indexOf('screen-four') > -1
                    screenthreeArray  = App.backFilter['screen3']
                    for element in screenthreeArray
                        key = App.defaults.hasOwnProperty(element)
                        if key == true
                            App.defaults[element] = App.defaults['floor']
                    App.currentStore.unit.reset UNITS
                    App.currentStore.building.reset BUILDINGS
                    App.currentStore.unit_type.reset UNITTYPES
                    App.currentStore.unit_variant.reset UNITVARIANTS
                    e.preventDefault()
                    App.filter(params={})
                    App.layout.screenFourRegion.el.innerHTML = ""
                    $('#screen-four-region').removeClass 'section'
                    App.navigate "screen-three" , trigger:true
                    





                else
                    App.backFilter['screen2'] = []
                    screenoneArray  = App.backFilter['screen1']
                    myArray = []
                    $.map(App.defaults, (value, index)->
                        if value!='All'
                            myArray.push({key:index,value:value})

                    )
                    for element in myArray
                            App.defaults[element.key] = 'All'



                    App.currentStore.unit.reset UNITS
                    App.currentStore.building.reset BUILDINGS
                    App.currentStore.unit_type.reset UNITTYPES
                    App.currentStore.unit_variant.reset UNITVARIANTS
                    

                    
                    e.preventDefault()
                    App.filter(params={})
                    App.layout.screenTwoRegion.el.innerHTML = ""
                    $('#screen-two-region').removeClass 'section'
                    App.navigate "screen-one" , trigger:true
                    App.navigate "" 
                    

            




        onShow:->
            # usermodel = new Backbone.Model USER
            # capability = usermodel.get('all_caps')
            # if usermodel.get('id') != "0" && $.inArray('see_special_filters',capability) >= 0
            #     console.log "222"
            #     $('#showTop').removeClass 'hidden'
            # else
            #     $('#showTop').hide()
                #@trigger "get:perSqft:price"
            textString  = Marionette.getOption( @, 'textString' )
            $('#textstring').html textString
            flag = 0
            if window.location.href.indexOf('wishList') > -1
                flag = 1
            $(window).scroll( ()->
                    flag = 0
                    height = $(window).scrollTop()
                    if height == 0 && flag == 0
                        $('.backBtn').addClass 'hidden'
                        $('h3').addClass 'step1'





            )

            disableOther = (button) ->
              # classie.toggle showTop, "disabled"  if button isnt "showTop"
              classie.toggle showRightPush, "disabled"  if button isnt "showRightPush"
              return
            menuRight = document.getElementById("cbp-spmenu-s2")
            menuTop = document.getElementById("cbp-spmenu-s3")
            # showTop = document.getElementById("showTop")
            showRightPush = document.getElementById("showRightPush")
            body = document.body
            showTop.onclick = ->
              classie.toggle this, "active"
              classie.toggle menuTop, "cbp-spmenu-open"
              disableOther "showTop"
              return

            showRightPush.onclick = ->
              classie.toggle this, "active"
              classie.toggle body, "cbp-spmenu-push-toleft"
              classie.toggle menuRight, "cbp-spmenu-open"
              disableOther "showRightPush"
              return


            if  window.location.href.indexOf('screen-two') > -1 || window.location.href.indexOf('screen-three') > -1 || window.location.href.indexOf('screen-four') > -1
                true

            else if  window.location.href.indexOf('wishList') > -1
                $('#showRightPush').addClass 'hidden'
                $('.backBtn').addClass 'hidden'
                $('.slctnTxt').addClass 'hidden'
                $('h3').addClass 'step1'

            else
                $('.backBtn').addClass 'hidden'
                $('.slctnTxt').addClass 'hidden'
                $('h3').addClass 'step1'

            cookieOldValue = localStorage.getItem("cookievalue" )
            if cookieOldValue == undefined || cookieOldValue == ""
                cookieOldValue = []
            else
                cookieOldValue = cookieOldValue.split(',' ).map( (item)->
                    parseInt(item)
                )


            if cookieOldValue.length >= 1
                $("#showRightPush").removeClass "hidden"
            

                



