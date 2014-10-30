define [ 'extm'], ( Extm)->

    # Main controller
    view = []
    facing = []
    facingnames = []
    viewnames = []
    class MainController extends Extm.RegionController

        initialize : ->

            @layout = layout = @_getView()

            App.layout = @layout

            #listen to show event of layout to trigger sub apps
            @listenTo layout, 'show', @showRegionViews

            #show the layout
            @show layout

        showRegionViews: =>
            App.filter(params={})
            msgbus.showApp 'header'
            .insideRegion  App.headerRegion
                .withOptions()

            msgbus.showApp 'screen:one'
            .insideRegion  @layout.screenOneRegion
                .withOptions()

        _getView: =>
            new mainView
                templateHelpers:
                    SITEURL : SITEURL
                    VIEWS : VIEWS
                    FACINGS : FACINGS


    class mainView extends Marionette.LayoutView

        template: '
        <div id="notify" class="notifyBox" style="display:none;">
            You have clicked on a box!
        </div>
        <!--<div>dfsfsfs</div>-->
        <nav class="cbp-spmenu cbp-spmenu-vertical cbp-spmenu-right" id="cbp-spmenu-s2">
            <h3>My Menu</h3>
            <ul>
                <li><a href="#"><span class="glyphicon glyphicon-heart"></span> Wishlist</a>
                    <div id="comparetext" class="compareTxt">
                        Compare Apartments here!<br>You can compare up to 4 apartments.
                    </div>
                    <ul class="menuWishlist" id="showWishlist">
                    </ul>
                </li>
                <a href="#" id="compare" class="compareBtn">COMPARE</a>
            </ul>
            

        </nav>
        
        <div class="prntLoader hidden"></div>

        <div id="print-view" class="visible-print">
            <div class="print-header">
                <div class="row print-head">
                    <div class="col-sm-6 head">
                        <h1>Flat No: <strong><span id="flatno"></span></strong></h1>
                    </div>
                    <div class="col-sm-6 head">
                        <h1 id="towerno"></h1>
                    </div>
                </div>
                <div class="row print-sub-head">
                    <div class="col-sm-6 head">
                        <h2>Flat Type: <strong><span id="unittypename"></span></strong>(<span id="area"></span> sq. ft.)</h2>
                    </div>
                    <div class="col-sm-6 head">
                        <h2>Floor Range: <strong><span id="floorrise"></span></strong></h2>
                    </div>
                </div>
            </div>
            <div class="print-row">
                <div class="row">
                    <div class="col-sm-5">
                        <img src="" id="zoomedinimage" />
                    </div>
                    <div class="col-sm-7">
                        <div id="printmapplic1" class="towersMap center-block"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-5">
                        <div id="floorlayoutbasic" class="floorlayout"></div>
                    </div>
                    <div class="col-sm-7">
                        <div id="towerview" ></div>
                    </div>
                </div>
            </div>
            <div class="print-row areaInfo">
                <div class="row">
                    <div class="col-sm-12">
                        <div class="details room">
                            
                        </div>
                    </div>
                </div>
                <div class="row extra-details">
                    <div class="col-sm-4">
                        <h5>Terrace</h5>
                        <span id="terrace"></span>
                    </div>
                    <div class="col-sm-4">
                        <h5>Entrance</h5>
                        <span id="printfacing"></span>
                    </div>
                    <div class="col-sm-4">
                        <h5>Views</h5>
                        <span id="printview"></span>
                    </div>
                </div>
            </div>
            <div class="print-row areaInfo last">
                <div class="row">
                    <div class="col-sm-12">
                        <h4 class="layout-header">2D Layout</h4>
                        <div class="details ">
                            <img src="" id="twoDimage" />
                        </div>

                        <h4 class="layout-header">3D Layout</h4>
                        <div class="details ">

                            <img src="" id="threeDimage" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div id="screen-one-region" class="section">

        </div>
        <div id="screen-two-region" >

        </div>
        <div id="screen-three-region" >

        </div>
        <div id="screen-four-region" >

        </div>'

        events:
            'click .view':(e)->
                viewString = 'All'
                if $('#'+e.target.id).prop('checked') == true
                    view.push $('#'+e.target.id).val()
                    viewnames.push $('#'+e.target.id).attr('data-name')
                else
                    index = view.indexOf(($('#'+e.target.id).val()))
                    if index != -1
                        view.splice( index, 1 )
                        viewnames.splice( index, 1 )
                if view.length != 0
                    viewString = view.join(',')
                App.defaults['view'] = viewString
                $('#viewName' ).text  viewnames.join(',')
                #App.filter(params={})

            'click .facing':(e)->
                facingString = 'All'
                if $('#'+e.target.id).prop('checked') == true
                    facing.push $('#'+e.target.id).val()
                    facingnames.push $('#'+e.target.id).attr('data-name')
                else
                    index = facing.indexOf(($('#'+e.target.id).val()))
                    if index != -1
                        facing.splice( index, 1 )
                        facingnames.splice( index, 1 )
                if facing.length != 0
                    facingString = facing.join(',')
                App.defaults['facing'] = facingString
                $('#facingName' ).text facingnames.join(',')
                #App.filter(params={})



            'click #compare':(e)->
                win = window.open(SITEURL+"/wishlist/#wishList", '_blank')
                win.focus()
                menuRight = document.getElementById("cbp-spmenu-s2")
                menuTop = document.getElementById("cbp-spmenu-s3")
                showTop = document.getElementById("showTop")
                showRightPush = document.getElementById("showRightPush")
                body = document.body
                classie.toggle showRightPush, "active"
                classie.toggle body, "cbp-spmenu-push-toleft"
                classie.toggle menuRight, "cbp-spmenu-open"


            'click .del':(e)->
                App.cookieArray = App.cookieArray
                val = $('#'+e.target.id).attr('data-id')
                index = App.cookieArray.indexOf( parseInt(val) )
                App.cookieArray.splice( index, 1 )
                if App.cookieArray.length <= 1
                    $('#compare').hide()
                $.cookie('key',App.cookieArray)
                localStorage.setItem("cookievalue", App.cookieArray)
                $('#errormsg' ).text ""
                if App.cookieArray.length < 1
                    $("#showRightPushs").addClass "hidden"
                    menuRight = document.getElementById("cbp-spmenu-s2")
                    menuTop = document.getElementById("cbp-spmenu-s3")
                    showTop = document.getElementById("showTop")
                    showRightPush = document.getElementById("showRightPush")
                    body = document.body
                    classie.toggle showRightPush, "active"
                    classie.toggle body, "cbp-spmenu-push-toleft"
                    classie.toggle menuRight, "cbp-spmenu-open"
                      
                @showWishList()

            'click a':(e)->
                e.preventDefault()
            'click .selectedunit':(e)->
                menuRight = document.getElementById("cbp-spmenu-s2")
                menuTop = document.getElementById("cbp-spmenu-s3")
                showTop = document.getElementById("showTop")
                showRightPush = document.getElementById("showRightPush")
                body = document.body
                classie.toggle showRightPush, "active"
                classie.toggle body, "cbp-spmenu-push-toleft"
                classie.toggle menuRight, "cbp-spmenu-open"
                App.unit['name'] = $('#'+e.target.id ).attr('data-id')
                App.unit['flag'] = 1
                unitModel = App.master.unit.findWhere({id:parseInt($('#'+e.target.id ).attr('data-id'))})
                App.defaults['unitType'] = unitModel.get 'unitType'
                App.defaults['building'] =  unitModel.get 'building'
                rangeModel = App.master.range
                App.backFilter['screen3'].push("floor")
                App.backFilter['screen2'].push("floor","unitVariant")
                buildingModel = App.master.building.findWhere({id:unitModel.get 'building'})
                floorriserange = buildingModel.get 'floorriserange'
                #floorriserange = [{"name":"low","start":"1","end":"2"},{"name":"medium","start":"3","end":"4"},{"name":"high","start":"5","end":"6"}]
                object = @
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






                App.navigate "screen-four"
                msgbus.showApp 'header'
                .insideRegion  App.headerRegion
                    .withOptions()
                msgbus.showApp 'screen:four'
                .insideRegion  App.layout.screenFourRegion
                    .withOptions()






        regions:
            screenOneRegion: '#screen-one-region'
            screenTwoRegion: '#screen-two-region'
            screenThreeRegion: '#screen-three-region'
            screenFourRegion: '#screen-four-region'


        onShow:->

            # window.viewportUnitsBuggyfill

            $.reject
                # Specifies which browsers/versions will be blocked
                reject:
                    # all: true # Covers Everything (Nothing blocked)
                    msie: 8 # Covers MSIE <= 6 (Blocked by default)
                    # chrome: true

                #
                #         * Many possible combinations.
                #         * You can specify browser (msie, chrome, firefox)
                #         * You can specify rendering engine (geko, trident)
                #         * You can specify OS (Win, Mac, Linux, Solaris, iPhone, iPad)
                #         *
                #         * You can specify versions of each.
                #         * Examples: msie9: true, firefox8: true,
                #         *
                #         * You can specify the highest number to reject.
                #         * Example: msie: 9 (9 and lower are rejected.
                #         *
                #         * There is also "unknown" that covers what isn't detected
                #         * Example: unknown: true
                #         
                display: [] # What browsers to display and their order (default set below)
                browserShow: true # Should the browser options be shown?
                browserInfo: # Settings for which browsers to display
                    chrome:
                        
                        # Text below the icon
                        text: "Google Chrome"
                        
                        # URL For icon/text link
                        url: "http://www.google.com/chrome/"

                    
                    # (Optional) Use "allow" to customized when to show this option
                    # Example: to show chrome only for IE users
                    # allow: { all: false, msie: true }
                    firefox:
                        text: "Mozilla Firefox"
                        url: "http://www.mozilla.com/firefox/"
                        # allow: false

                    safari:
                        text: "Safari"
                        url: "http://www.apple.com/safari/download/"
                        # allow: false

                    opera:
                        text: "Opera"
                        url: "http://www.opera.com/download/"
                        # allow: false

                    msie:
                        text: "Internet Explorer"
                        url: "http://www.microsoft.com/windows/Internet-explorer/"
                        allow: false

                
                # Pop-up Window Text
                header: "<div class='skyiLogo'></div>Oops! Your browser isn't supported!"
                paragraph1: "Your browser is out of date, and is not compatible with " + "our website."
                paragraph2: "A list of the most popular web browsers can be found below. Just click on the icons to go to the download page."
                
                # Allow closing of window
                close: false
                
                # Message displayed below closing link
                closeMessage: "By closing this window you acknowledge that your experience " + "on this website may be degraded"
                closeLink: "Close This Window"
                closeURL: "#"
                
                # Allows closing of window with esc key
                closeESC: false
                
                # Use cookies to remmember if window was closed previously?
                closeCookie: false
                
                # Cookie settings are only used if closeCookie is true
                cookieSettings:
                    
                    # Path for the cookie to be saved on
                    # Should be root domain in most cases
                    path: "/"
                    
                    # Expiration Date (in seconds)
                    # 0 (default) means it ends with the current session
                    expires: 0

                
                # Path where images are located
                imagePath: "../wp-content/themes/apartmentselector/images/"
                
                # Background color for overlay
                overlayBgColor: "#fff"
                
                # Background transparency (0-1)
                overlayOpacity: 1
                
                # Fade in time on open ('slow','medium','fast' or integer in ms)
                fadeInTime: "1"
                
                # Fade out time on close ('slow','medium','fast' or integer in ms)
                fadeOutTime: "fast"
                
                # Google Analytics Link Tracking (Optional)
                # Set to true to enable
                # Note: Analytics tracking code must be added separately
                analytics: false

            #$("#main-region").fullpage
                #scrollOverflow: true
                #resize: false
                #verticalCentered: false
                #easing: 'easeInOutQuad'

            
            height = $(window).scrollTop()

            $(window).scroll( ()->
                height = $(window).scrollTop()
                if height < 300
                    $('.backBtn').addClass 'hidden'
                else
                    $('.backBtn').removeClass 'hidden'
                    







            )
            cookieOldValue = $.cookie("key")
            if cookieOldValue == undefined || $.cookie("key") == ""
                cookieOldValue = []
            else
                cookieOldValue = $.cookie("key" ).split(',' ).map( (item)->
                    parseInt(item)
                )
            if cookieOldValue.length <= 1
                $('#compare').hide()
                
            App.cookieArray = cookieOldValue
            localStorage.setItem("cookievalue" , App.cookieArray)
            @showWishList()
        showWishList:->
            table = ""
            if $.cookie("key")!= undefined && $.cookie("key") != ""
                selectedUnitsArray = $.cookie("key").split(",")
                table = ""
                for element in selectedUnitsArray
                    model = App.master.unit.findWhere(id:parseInt(element))
                    unitType = App.master.unit_type.findWhere(id:model.get('unitType'))
                    unitVariant = App.master.unit_variant.findWhere(id:model.get('unitVariant'))
                    building = App.master.building.findWhere(id:model.get('building'))
                    table +='
                                <li>
                                    <a href="#" id="unit'+element+'" data-id="'+element+'" class="selectedunit">'+model.get('name')+'</a>
                                    <a href="#" class="del" id="'+element+'" data-id="'+element+'"  ></a>
                                    <div class="clearfix"></div>
                                </li>
                            '

                # table += '</table>'
            $('#showWishlist').html table





    msgbus.registerController 'main:app', MainController