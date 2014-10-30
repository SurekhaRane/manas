define [ 'extm', 'src/apps/screen-one/screen-one-view' ], ( Extm, ScreenOneView )->

    # Screen one controller
    class ScreenOneController extends Extm.RegionController

        initialize : ->
            @unitTypeCollection = @_getUnitTypeCollection()

            @view = view = @_getUnitTypesView @unitTypeCollection[0]



            @listenTo view, "unit:type:clicked", @_unitTypeClicked

            @show view

        _getUnitTypesView:(unitTypeCollection)->
            new ScreenOneView
                collection :unitTypeCollection
                templateHelpers :
                    priceArray : @unitTypeCollection[1]


        _unitTypeClicked:=>

            App.navigate "screen-two" , trigger:true






        _getUnitTypeCollection:->
            Model = Backbone.Model.extend({})

            UnitsCollection = Backbone.Collection.extend(
                model: Model
            )
            modelArray = Array()
            collection = new UnitsCollection()
            status = App.currentStore.status.findWhere({'name':'Available'})

            units = App.currentStore.unit.where({'status':status.get('id')})
            priceUnits = App.currentStore.unit
            priceUnits.each ( item)->
                #calculating the price value
                buildingModel = App.currentStore.building.findWhere({'id':item.get 'building'})
                floorRise = buildingModel.get 'floorrise'
                floorRiseValue = floorRise[item.get 'floor']
                unitVariantmodel = App.currentStore.unit_variant.findWhere({'id':item.get 'unitVariant'})
                #unitPrice = (parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
                unitPrice = item.get 'unitPrice'
                item.set({'unitPrice' , unitPrice})
                #calculating the price value



            priceRange = ['10-35 lakhs ','35-45 lakhs ','45-55 lakhs ','55-65 lakhs ']
            priceArray = []
            rangeArray = []
            units = App.currentStore.unit.where({'status':status.get('id')})
            $.each(units , (index,value)->
                unitTypemodel = App.currentStore.unit_type.findWhere({'id':value.get 'unitType'})
                if unitTypemodel.get('id') != 14 && unitTypemodel.get('id') != 16
                    NewUnitCollection = App.currentStore.unit.where({ unitType : unitTypemodel.get( 'id' ) } )
                    max_coll = Array()
                    for element in priceRange
                        elementArray = element.split(' ')
                        budget_price = elementArray[0].split('-')
                        budget_price[0] = budget_price[0] + ('00000')
                        budget_price[1] = budget_price[1]+ ('00000')
                        if parseInt(value.get('unitPrice')) >= parseInt(budget_price[0]) && parseInt(value.get('unitPrice')) <= parseInt(budget_price[1])
                            priceArray.push(element)



                    $.each(NewUnitCollection , (index,value)->
                        Variant = App.currentStore.unit_variant.findWhere({ 'id' : value.get( 'unitVariant' ) } )
                        max_coll.push Variant.get 'sellablearea'




                    )

                    max_val = Math.max.apply( Math, max_coll )
                    min_val = Math.min.apply( Math, max_coll )
                    #set max and min attribute to the unit type model
                    unitTypemodel.set( { 'max_value' : max_val, 'min_value' : min_val } )
                    unitTypemodel.set 'sqft' , '(sq. ft.)'
                    unitTypemodel.set 'to' , 'to'
                    modelArray.push unitTypemodel










            )
            noPrefereceModel = new Backbone.Model
            noPrefereceModel.set 'id' , 'nopreferences'
            noPrefereceModel.set 'name' , 'BUDGET'
            modelArray.push noPrefereceModel
            priceArray.sort( (a,b) ->
                a = a.split(' ')
                budget_pricea = a[0].split('-')
                b = b.split(' ')
                budget_priceb = b[0].split('-')

                budget_pricea[0] - budget_priceb[0]
            )
            priceArray = _.uniq(priceArray)
            i = 0 
            
            for element in priceArray
                if i == 0
                    classname = 'selected' 
                else
                    classname = ""
                rangeArray.push({id:element,name:element,class:classname})
                i++


            collection.add modelArray

            newUnits = App.currentStore.unit.where()
            [collection,rangeArray]






    msgbus.registerController 'screen:one', ScreenOneController



