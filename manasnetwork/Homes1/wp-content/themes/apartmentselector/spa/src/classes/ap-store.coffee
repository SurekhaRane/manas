define [ 'underscore', 'extm', 'async' ], ( _, Extm, async ) ->
    _.extend Extm.Store::,


        getUnits : ( unittypeid)->
            unittypeid = parseInt unittypeid
            buildingArray = Array()
            unitColl = Array()
            Model = Backbone.Model.extend({})
            Collection = Backbone.Collection.extend(
                model: Model
            )

            #find units based on
            App.store.find('unit',{unitType:unittypeid,status:'Available'}).then( (result)->
                units = result
                itemcoll = result
                units.each ( item )->
                    maxcoll = Array()
                    if buildingArray.indexOf(item.get 'building') ==  -1
                        buildingArray.push item.get 'building'
                $.each(buildingArray, (index,value)->
                    itemCollection = new Collection()
                    buildingid = value
                    console.log value
                    newunits = units.where({'building':value})
                    console.log newunits
                    lowArray = Array()
                    mediumArray = Array()
                    highArray = Array()
                    mainArray = Array()
                    $.each(newunits, (index1,value1)->
                        App.store.find('low').then( (result)->
                            console.log result
                            lowcount = result.filter (x)->
                                if x.get('id') == value1.get 'floor'
                                    lowArray.push value1.get 'id'




                    )
                        App.store.find('medium').then( (result)->
                            console.log result
                            mediumcount = result.filter (x)->
                                if x.get('id') == value1.get 'floor'
                                    mediumArray.push value1.get 'id'




                    )
                        App.store.find('high').then( (result)->
                            console.log result
                            highcount = result.filter (x)->
                                if x.get('id') == value1.get 'floor'
                                    highArray.push value1.get 'id'




                    )







                    )
                    console.log lowArray.length
                    console.log mediumArray.length
                    console.log highArray.length
                    low_max_val = 0
                    low_min_val = 0
                    medium_max_val = 0
                    medium_min_val = 0
                    high_min_val = 0
                    high_max_val = 0
                    $.each(lowArray , (index2,value2)->

                        console.log value2
                        App.store.find( 'unit', value2 ).then( ( result )->

                            App.store.find( 'unit_type', result.get( 'unitType' ) ).then( ( result )->




                            # get all the units to which this unit type is assignd
                            App.store.find( 'unit', { unitType : result.get( 'id' ) ,status:'Available'} ).then( ( result )->
                                max_coll = Array()


                                #loop through New units Collection to get all unit variants
                                result.each ( unit )->

                                    #get unit varaint assignedto the unit type
                                    App.store.find( 'unit_variant', unit.get( 'unitVariant' ) ).then( ( result )->


                                        #find the sellablearea of the unit variant and add it
                                        max_coll.push result.get 'sellablearea'

                                    )

                                console.log low_max_val = Math.max.apply( Math, max_coll )
                                console.log low_min_val = Math.min.apply( Math, max_coll )


                            )

                            )



                        )
                    )

                    $.each(mediumArray , (index2,value2)->

                        console.log value2
                        App.store.find( 'unit', value2 ).then( ( result )->

                            App.store.find( 'unit_type', result.get( 'unitType' ) ).then( ( result )->




                                # get all the units to which this unit type is assignd
                                App.store.find( 'unit', { unitType : result.get( 'id' ),status:'Available' } ).then( ( result )->
                                    max_coll = Array()


                                    #loop through New units Collection to get all unit variants
                                    result.each ( unit )->

                                        #get unit varaint assignedto the unit type
                                        App.store.find( 'unit_variant', unit.get( 'unitVariant' ) ).then( ( result )->


                                            #find the sellablearea of the unit variant and add it
                                            max_coll.push result.get 'sellablearea'

                                        )

                                    console.log medium_max_val = Math.max.apply( Math, max_coll )
                                    console.log medium_min_val = Math.min.apply( Math, max_coll )


                                )

                            )



                        )
                    )

                    $.each(highArray , (index2,value2)->

                        console.log value2
                        App.store.find( 'unit', value2 ).then( ( result )->

                            App.store.find( 'unit_type', result.get( 'unitType' ) ).then( ( result )->




                                # get all the units to which this unit type is assignd
                                App.store.find( 'unit', { unitType : result.get( 'id' ),status:'Available' } ).then( ( result )->
                                    max_coll = Array()


                                    #loop through New units Collection to get all unit variants
                                    result.each ( unit )->

                                        #get unit varaint assignedto the unit type
                                        App.store.find( 'unit_variant', unit.get( 'unitVariant' ) ).then( ( result )->


                                            #find the sellablearea of the unit variant and add it
                                            max_coll.push result.get 'sellablearea'

                                        )

                                    console.log high_max_val = Math.max.apply( Math, max_coll )
                                    console.log high_min_val = Math.min.apply( Math, max_coll )


                                )

                            )



                        )
                    )
                    console.log buildingid
                    mainArray.push({name: lowArray.length,low_max_val: low_max_val,low_min_val:low_min_val,range:'low',unitType:unittypeid,buildingid:buildingid})
                    mainArray.push({name: mediumArray.length,low_max_val: medium_max_val,low_min_val:medium_min_val,range:'medium',unitType:unittypeid,buildingid:buildingid})
                    mainArray.push({name:highArray.length,low_max_val: high_max_val,low_min_val:high_min_val,range:'high',unitType:unittypeid,buildingid:buildingid})

                    itemCollection.reset mainArray
                    console.log itemCollection



                    App.store.find('building',value).then( (result)->
                        console.log {buildingname: result.get('name') , units: itemCollection ,unitType: unittypeid,buildingid:result.get('id') }
                        unitColl.push {buildingname: result.get('name') , units: itemCollection ,unitType: unittypeid,buildingid:result.get('id')}
                    )

                )
                units.reset()

                units.add unitColl







                console.log units
                units












            )

        getAllUnits:(buildingid,unittypeid,range)->
            console.log buildingid
            console.log unittypeid
            Model = Backbone.Model.extend({})
            Collection = Backbone.Collection.extend(
                model: Model
            )
            App.store.find('unit',{unitType:parseInt(unittypeid),building:parseInt(buildingid)}).then( (result)->
                unitcollection = result
                floorArray = Array()
                App.store.find(range).then( (result)->

                    result.each ( item)->
                        collection = new Collection()
                        unitArray = Array()
                        unitcollection.each (unit)->
                            console.log item.get('id')
                            console.log unit.get('floor')
                            if parseInt(item.get('id')) == parseInt(unit.get('floor'))
                                App.store.find('unit_variant',unit.get('unitVariant') ).then( (result)->
                                    unit.set 'size',result.get 'sellablearea'
                                    App.store.find('view',unit.get('view')).then( (result)->
                                        unit.set 'view_name',result.get '  '
                                        unit.set 'range',range



                                    )



                                )
                                unitArray.push(unit)

                        collection.add unitArray
                        floorArray.push({floorid:item.get('id'),units:collection})





                )
                console.log floorArray
                unitcollection.reset()
                console.log unitcollection
                unitcollection.add floorArray
                console.log unitcollection
                unitcollection
            )

        getSingleUnit:(unit)->
            App.store.find('unit',parseInt(unit)).then( (result)->
                unit = result
                App.store.find('unit_variant',unit.get('unitVariant')).then( (result)->
                    unit.set 'unit_variant_name' , result.get 'sellablearea'
                    App.store.find('unit_type',unit.get('unitType')).then( (result)->
                        unit.set 'unit_type_name' , result.get 'name'
                        App.store.find('view',unit.get('view')).then( (result)->
                            unit.set 'view_name' , result.get 'name'
                            unit

                        )


                    )

                )


            )

        getHeaderView:(opt= {})->
            console.log opt
            Model = Backbone.Model.extend({})
            modelnew = new Model()
            count = Object.keys(opt).length
            modelnew




























