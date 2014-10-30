define [ 'marionette' ], ( Mariontte )->


    class PopItemview extends Marionette.ItemView

        template : ' <ul>
        							<li class="unitName">
        								<div class="small"> Tower 1</div>{{name}}
        							</li>
        						</ul>

        						<!--BHK-->
        						<ul>
        							<li>
        								{{unitTypeName}}
        							</li>
        						</ul>

        						<!--Floor Info-->
        						<ul>
        							<li>
        								{{flooRange}}
        							</li>
        							<li>
        								{{floor}}
        							</li>
        						</ul>

        						<!--View Info-->
        						<ul>
        							<li>
        								{{facings}}
        							</li>
        							<li>
        								{{views}}
        							</li>
        						</ul>

                                <!--Area-->
                                <ul>
                                    <li>
                                        684
                                    </li>
                                    <li>
                                        {{sellablearea}}
                                    </li>
                                    <li>
                                        {{carpetarea}}
                                    </li>
                                </ul>

                                <!--Room Area-->
                                <ul class="areas">
                                {{#mainArr}}
                                    <li>

                                    <ul>
                                    {{#subarray}}

                                        <li>
                                        {{room_size}}
                                        </li>

                                     {{/subarray}}
                                    </ul>
                                   
                                    </li>
                                {{/mainArr}}    
                                </ul>

        						<!--Layouts-->
        						<ul class="layouts">
                                    <li>
                                        <a class="2dlayout" data-fancybox-group="2dlayout" title="2D Layout - {{name}}" href="{{TwoDimage}}"><img src="{{TwoDimage}}" alt=""></a>
                                    </li>
                                    <li>
                                        <a class="2dlayout" data-fancybox-group="3dlayout" title="3D Layout - {{name}}" href="{{ThreeDimage}}"><img src="{{ThreeDimage}}" alt=""></a>
                                    </li>
                                    <li>
                                        <a class="2dlayout" data-fancybox-group="floorlayout" title="Floor Layout - {{name}}" href="{{floorLayoutimage}}"><img src="{{floorLayoutimage}}" alt=""></a>
                                    </li>
        						</ul>'

        className : 'cd-table-column'



    class PopupView extends Marionette.CompositeView

        template : '<div id="cd-table" class="compareWishlist">
                       	<header class="cd-table-column">
            				<ul>
            					<li class="noBG unitName">

            					</li>
            				</ul>
            				<ul>
            					<li>
            						BHK
            					</li>
            				</ul>
            				<div class="compareHeader"><span class="sky-flag"></span> Floor Info </div>
            				<ul>
            					<li>
            						Floor Range
            					</li>
            					<li>
            						Floor
            					</li>
            				</ul>
            				<div class="compareHeader"><span class="sky-location"></span> View Info</div>
            				<ul>
            					<li>
            						Facing
            					</li>
            					<li>
            						Views
            					</li>
            				</ul>
                            <div class="compareHeader"><span class="sky-maximize"></span> Area <small>(Sq. Ft.)</small></div>
                            <ul>
                                <li>
                                    Total Area
                                </li>
                                <li>
                                    Chargeable Area
                                </li>
                                <li>
                                    Carpet Area
                                </li>
                            </ul>
                            <div class="compareHeader"><span class="sky-expand"></span> Room Area <small>(Sq. Ft.)</small></div>
                            <ul>
                                <li>
                                    Living/Dining 
                                </li>
                                <li>
                                    Bedroom
                                </li>
                                <li>
                                    Bathroom
                                </li>
                                <li>
                                    Terrace
                                </li>
                                <li>
                                    Lobby
                                </li>
                                
                            </ul>
            				<div class="compareHeader"><span class="glyphicon glyphicon-picture"></span> Layouts</div>
            				<ul>
                                <li>
                                    2D Layout
                                </li>
                                <li>
                                    3D Layout
                                </li>
                                <li>
                                    Floor Layout
                                </li>
            				</ul>
            			</header>
                		<div class="cd-table-container">
        				    <div class="cd-table-wrapper">
                            </div>
                        </div>
                    </div>

                    <em class="cd-scroll-right"></em>'

        childView  : PopItemview

        childViewContainer : '.cd-table-wrapper'

        className : 'page-container row-fluid'

        events:
            'click a':(e)->
                e.preventDefault()

        onShow:->
            $(".2dlayout").fancybox
                margin: 90




























