
jQuery(document).ready(function($) {
    var collections = [];
    //load unit variants 

    $('.fileupload').each(function(e,val) { 
         
        file_field =  val.id.replace(/fileupload/g,'');
        fileUploadByIndex(file_field);
    });

if($("#fileuploadposition_in_project").length>0){
 
    fileUploadById("position_in_project")
} 
if($("#fileuploadzoomed_in_image").length>0){
 
    fileUploadById("zoomed_in_image")
} 
if($("#floor_layout_basic").length>0){
 
    fileUploadById("floor_layout_basic")
}
if($("#floor_layout_detailed").length>0){
 
    fileUploadById("floor_layout_detailed")
}
if($("#exceptionfloor_layout_basic1").length>0){
 
    fileUploadById("exceptionfloor_layout_basic1")
} 
if($("#exceptionfloor_layout_detailed1").length>0){
 
    fileUploadById("exceptionfloor_layout_detailed1")
} 
if($("#svg_position_file_1").length>0){
 
    fileUploadById("svg_position_file_1")
}
if($("#svg_position_file_2").length>0){
 
    fileUploadById("svg_position_file_2")
}
if($("#svg_position_file_3").length>0){
 
    fileUploadById("svg_position_file_3")
}
if($("#svg_position_file_4").length>0){
 
    fileUploadById("svg_position_file_4")
}
 
    
if($("#slider").length!=0){
    displaySlider($("#no_of_floors").val())
}

$('.milestone-completion-date').datepicker({ dateFormat: 'dd/mm/yy' });

function updateSlider(){

       $("#lowrisefrom").val(0)

        $("#lowriseto").val(0)

        $("#midrisefrom").val(0)

        $("#midriseto").val(0)

        $("#highrisefrom").val(0)

        $("#highriseto").val(0)

         displaySlider($("#no_of_floors").val())
}

function displaySlider(floors){
  
    // the code belows assume the colors array is exactly one element bigger than the handlers array.
    var handlers = [ $("#lowriseto").val(), $("#midriseto").val()];
    var colors = ["#FFD700", "#FF8C00", "#FF6347" ];
    updateColors(handlers);
    
    $("#slider").slider({
        min: 0,
        max: parseInt(floors),
        values: handlers,
        slide: function (evt, ui) {
            updateColors(ui.values);
             console.log("0=>"+ui.values[0])
             console.log("1=>"+ui.values[1])
         
            lowrisefrom = (ui.values[0]>0)?1:0;

            $("#lowrisefrom").val(lowrisefrom)
            $("#lowriseto").val(ui.values[0])

            if(lowrisefrom==0){
                $("#lowrise-range").html("None")
           
            }else
            {

                $("#lowrise-range").html("Floors "+$("#lowrisefrom").val()+"-"+$("#lowriseto").val())
           
            }


            //midrise

            midrisefrom = (ui.values[1]>0)?parseInt(ui.values[0])+1:0;
            $("#midrisefrom").val(midrisefrom)
            $("#midriseto").val(ui.values[1])

              if(midrisefrom==0){
                $("#midrise-range").html("None")
           
            }else
            {

                $("#midrise-range").html("Floors "+$("#midrisefrom").val()+"-"+$("#midriseto").val())
            
            }

             highrisefrom = (ui.values[1]!=floors)?parseInt(ui.values[1])+1:0;
             highriseto =  (highrisefrom==0)?0:floors;
            $("#highrisefrom").val(highrisefrom)
            $("#highriseto").val(highriseto)
             if(highrisefrom==0){
                $("#highrise-range").html("None")
           
            }else
            {

                $("#highrise-range").html("Floors "+$("#highrisefrom").val()+"-"+$("#highriseto").val())
            
            }
             
        }
    });
    
    function updateColors(values) {

        var colorstops = colors[0] + ", "; // start left with the first color
            for (var i=0; i< values.length; i++) {
                value_one = (values[i]*100)/floors
                colorstops += colors[i] + " " + value_one + "%,";
                colorstops += colors[i+1] + " " + value_one + "%,";
            }
            // end with the last color to the right
            colorstops += colors[colors.length-1];
            
            /* Safari 5.1, Chrome 10+ */
            var css = '-webkit-linear-gradient(left,' + colorstops + ')';
            $('#slider').css('background-image', css);
    }
}
 

    $(document).on("change", "#no_of_floors", function(e) {

         loadExceptionsOption($(e.target).val());
        if($(e.target).val()!=""){
            $("#floorrise-container-main").show()
        }else{
            $("#floorrise-container-main").hide()
        }
        loadFloorRiseOption($(e.target).val());
 
        updateSlider()


    })

    $(document).on("click", "#addExceptions", function(e) {

         exception_no = parseInt($(e.target).attr("exception_count"))+1

        $(e.target).attr("exception_count",exception_no)

        $(".exception_container").append(addException(exception_no))


    });
 

function loadExceptionsOption(floors){

    if(parseInt(floors)>0){

        $("#exceptions").show()

        //display one exception option ...button option to add multiple disabled for now
       if($("#exceptions_count").val()!=1){
         
            $(".exception_container").html(addException(1))

            $("#exceptions_count").val(1)

            fileUploadById("exceptionfloor_layout_detailed")
          
          
       }
      

        getFloorOptions(floors,1) ;


    }
    else{

        $("#exceptions").hide()


        $("#exceptions_count").val(0)

    }
   

}

function loadFloorRiseOption(floors){

    
    prevCount = $('.floor_rise').length;

    editfloors = floors - prevCount;
 
    if(editfloors>0){
         for(floor=prevCount+1;floor<=floors;floor++){

            $("#floor_rise_container").append("<div class='floor_rise form-group' id='floor_rise_item"+floor+"'><label class='form-label  form-label-inline'> Floor "+floor+": </label> <label class='form-label form-label-prefix'> Rs.</label><input type='text' class='form-control  form-control-small' value='0' name='floor_rise_"+floor+"'> per sq ft</div>");
         }
                 
    }else{

 
        for(floor=prevCount;floor>floors;floor--){
         
            $("#floor_rise_item"+floor).remove();
        }
    }
   
}

function getFlatUi(flatNo,exception_no){

    html =  '<div class="form-group">'
        +'<div class="row"><div class="col-md-12"><label class="form-label">'
        +'Flat No:'+flatNo
        +'</label>' 
        +'<div class="row">'
        +'<div class="col-md-6">'; 
    html += getImageUploadUi(flatNo,exception_no,'basic')  
        +'</div><div class="col-md-6">'
    html += getImageUploadUi(flatNo,exception_no,'detailed')
        +'</div></div>'
        +'</div>'
        +'</div>' 
        +'</div>' 
    return html;
}

function getImageUploadUi(flatNo,exception_no,field){

    prefix = (exception_no!="")? field+'_exception_'+exception_no+'_':field+'_'+exception_no;
    
    html =  '<label class="form-label">'+toProperCase(field)+':</label> <span class="btn btn-success fileinput-button">'
            +'<i class="glyphicon glyphicon-plus"></i>'
            +'<span>Select files...</span>'
            +'<input type="hidden" id="fileupload'+prefix+''+flatNo+'_image_id" name="'+prefix+'image_id'+flatNo+'"><input id="fileupload'+prefix+''+flatNo+'" class="fileupload" type="file" name="files">'
            +'</span>'
            +'<br>'
            +'<br>'
            +'<div id="progress'+prefix+flatNo+'" class="progress">'
            +'<div class="progress-bar progress-bar-success"></div>'
            +'</div>'
            +'<div id="'+prefix+flatNo+'"files" class="files'+prefix+flatNo+'"></div>'
            +'<br><div class="row">'
            +'<div class="col-md-12">'
            +'<img src="" id="fileupload'+prefix+''+flatNo+'_image_display">'
            +'</div></div>';
                 
    return html;
}

function getImageUploadUi(flatNo,exception_no,field){

    prefix = (exception_no!="")? field+'_exception_'+exception_no+'_':field+'_'+exception_no;
    
    html =  '<label class="form-label">'+toProperCase(field)+':</label> <span class="btn btn-success fileinput-button">'
            +'<i class="glyphicon glyphicon-plus"></i>'
            +'<span>Select files...</span>'
            +'<input type="hidden" id="fileupload'+prefix+''+flatNo+'_image_id" name="'+prefix+'image_id'+flatNo+'"><input id="fileupload'+prefix+''+flatNo+'" class="fileupload" type="file" name="files">'
            +'</span>'
            +'<br>'
            +'<br>'
            +'<div id="progress'+prefix+flatNo+'" class="progress">'
            +'<div class="progress-bar progress-bar-success"></div>'
            +'</div>'
            +'<div id="'+prefix+flatNo+'"files" class="files'+prefix+flatNo+'"></div>'
            +'<br><div class="row">'
            +'<div class="col-md-12">'
            +'<img src="" id="fileupload'+prefix+''+flatNo+'_image_display">'
            +'</div></div>';
                 
    return html;
}

function getexceptionUploadUi( exception_no,postfix ){

       html =  '<div class="input-with-icon  right">'
            +'           <span class="btn btn-success fileinput-button">'
            +'               <span>Select file..</span>'
            +'                <input type="hidden" class="exceptionfloor_layout_'+exception_no+'_'+postfix+'" id="exceptionfloor_layout_'+exception_no+'_'+postfix+'" name="exceptionfloor_layout_'+exception_no+'_'+postfix+'" value=""><input id="fileuploadexceptionfloor_layout_'+exception_no+'_'+postfix+'" class="fileuploadexceptionfloor_layout_'+exception_no+'_'+postfix+'" type="file" name="files">'
            +'            </span> '
            +'            <div id="progressexceptionfloor_layout_'+exception_no+'_'+postfix+'" class="progress" >'
            +'                <div class="progress-bar progress-bar-success"></div>'
            +'            </div>'
            +'            <div id="filesexceptionfloor_layout_'+exception_no+'_'+postfix+'" class="files"></div>'
            +'           <br>'
            +'            <div class="row-fluid">'
            +'                <div class="col-md-12">'
            +'                    <img src="" id="image_displayexceptionfloor_layout_'+exception_no+'_'+postfix+'"  style="display:none" >'
            +'                </div>'
            +'            </div>'
            +'        </div>';
                 
    return html;
}

function getFloorOptions(floors,exception_no){


    prevCount = $('.exception_floor').length;

    editfloors = floors - prevCount;
 
    if(editfloors>0){
       
         for(floor=prevCount+1;floor<=floors;floor++){
 
            $("#exception_floors_container"+exception_no).append("<div class='col-md-4'><div class='exception_floor checkbox check-default' id='"+exception_no+"exception_floor_item"+floor+"'><input type='checkbox' class='exception_floors' name='exception_floors"+exception_no+"[]' id='"+floor+"exception_floors"+exception_no+"'  value='"+floor+"'><label for='"+floor+"exception_floors"+exception_no+"'>"+floor+"</label></li></div></div>");
                
          }
    }else{
 
        for(floor=prevCount;floor>floors;floor--){
          
            $("#"+exception_no+"exception_floor_item"+floor).remove();
        }
    }

     

}

function getFlatsDropdown(exception_no){
html = '<select name="no_of_flats'+exception_no+'"  class="no_of_flats"  id="no_of_flats'+exception_no+'" flats_container_id="flats_container'+exception_no+'" exception_no="'+exception_no+'">'
    +'<option value="">Please Select</option>'

    for(i=1;i<=$('#no_of_flats > option').length-1;i++){
     html +='<option value="'+i+'">'+i+'</option>' 
    }
   html +='</select>'; 
   return html
}
function addException(exception_no){


    html =  ' <div class="form-group">'
        +  '<div class="input-with-icon  right exception_floors"><br><br>' 
        +  '<div class="row-fluid" id="exception_floors_container'+exception_no+'"></div>'//
        +  '</div>'
        +  '</div><div style="clear:both"></div>'
        +' <div class="form-group" id="exception-flats-'+exception_no+'" style="display:none">'
        +'<label class="form-label">'
        +  'No Of Flats'
        + '</label>' 
        +  '<div class="input-with-icon  right">'
        +  '<i class="">'
        +  '</i>'
        +  getFlatsDropdown(exception_no)
        +  '</div>'
        +  '</div>'
        +  '<div class="well" id="exception-flats-images-'+exception_no+'" style="display:none">' 
        +  '<div class="row">'  
        +  '<div class="col-md-6">'
        +  '<label class="form-label">' 
        +  'Floor Layout Basic '
        +  '</label> '
        +getexceptionUploadUi(exception_no,'basic')
        +  '</div>'
        +  '<div class="col-md-6">'
        +  '<label class="form-label">' 
        +  'Floor Layout Detailed '
        +  '</label> '
        +getexceptionUploadUi(exception_no,'detailed')
        +  '</div>'
        +  '</div>'

        +  '</div>'
 
    return html
}




    $(document).on("click", ".exception_floors", function(e) {
        
        if($('.exception_floors:checked').length==0){
            $("#no_of_flats1").val("");
            $("#no_of_flats1").trigger("change");

            $('#exception-flats-1').hide();
            $('#exception-flats-images-1').hide();
        }else{

            $('#exception-flats-1').show();
            $('#exception-flats-images-1').show();
            fileUploadById("exceptionfloor_layout_detailed1")
            fileUploadById("exceptionfloor_layout_basic1")
        }
        });
//save building ajax call
    $(document).on("click", "#save_building", function(e) {
              
        clearAlerts();

        //validate form
        if($('form').valid()){
            var data, _e;

            var _e = e;

            data = $("#form_add_edit_building").serialize();

            $(e.target).hide().parent().append("<div class='loading-animator'></div>")


            $.post(AJAXURL+"?action=save_building", data, function(response) {

            resetForm(e,$('#building_id').val(),response);
        });
        }
        
    });




    //building listing 


  if($('.tablesorter').length){

        _collections = collections
        $.post(AJAXURL, {
            action: "get_list_view",
            list: "buildings", //the list required
            masters:["phases","views"] //the masters required for the list
        }, function(response) {

            _collections.list = response.list

            _collections.masters = response.masters

            //load the list view with rows
            loadListContents();


        });
    }

    function loadListContents(){
        $(".tablesorter tbody").empty();


        _.each(collections.list, function(listItems,listItemsValue){
            //add the row items
            $(".tablesorter tbody").append("<tr  >" +
                "<td class='edit-link' data-id='"+listItems.id+"'>"+listItems.name+"</td>" +
                 "<td class='edit-link' data-id='"+listItems.id+"'>"+getDisplayText(listItems.phase,collections.masters["phases"],"name")+"</td>" +
                "<td  style='text-align:center'><i  class='fa fa-trash-o delete_building'  data-id='"+listItems.id+"'></i></td>" +
                "</tr>")
        })


            $(".tablesorter").tablesorter({
                theme : 'jui',
                sortList: [[0,0]],
                     headerTemplate: '<span>{content}</span>' +
                        '<div class="arrows">' +
                            '<i class="tablesorter-headerAsc"></i>' +
                            '<i class="tablesorter-headerDesc"></i>' +
                        '</div>',
                // hidden filter input/selects will resize the columns, so try to minimize the change
                widthFixed : true,
                // initialize zebra striping and filter widgets
                widgets : ["zebra", "filter", "stickyHeaders", "uitheme"],
                widgetOptions : {
                    // Use the $.tablesorter.storage utility to save the most recent filters
                    filter_saveFilters : true,
                    // jQuery selector string of an element used to reset the filters
                    filter_reset : '.reset-filters',
                    // add custom selector elements to the filter row
                    filter_formatter : {


                        // Total (jQuery selector added v2.17.0)
                         '.floor' : function($cell, indx){
                            return $.tablesorter.filterFormatter.uiRange( $cell, indx, {
                                delayed : false,
                                valueToHeader : false,
                                // jQuery UI slider options
                                values : [1, Math.max.apply(Math, floors)],
                                min : 1,
                                max : Math.max.apply(Math, floors)
                            });
                        },




                    },


                }
            });

        $(".reset-filters").trigger('click');

    }



    $(document).on("click", ".edit-link", function(e) {

        window.location.href = SITEURL + "/add-edit-building/?id="+$(e.target) .attr('data-id');
    });

     $(document).on("click", ".delete_building", function(e) {
 
        var _e = e
        clearAlerts();
         building_name = $(e.target).parent().parent().children(':first-child').html() 
        confirmUserAction = confirm("Are you sure you want to delete building "+building_name+" and all the apartments assinged to it?")
        if(confirmUserAction){

            $.post(AJAXURL, {

            action: "delete_building", 

            id:$(e.target).attr('data-id')

        }, function(response) {

            $(_e.target).parent().parent().remove();

            $(".grid-body").prepend('<div class="text-success">'+response.msg+'</div>')
             
        });
        }
          
    });


    //validations 
    $('form').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    building_name: { 
                        required: true
                    },
                    building_phase: { 
                        required: true
                    },
                    no_of_floors: { 
                        required: true
                    },
                    no_of_flats: { 
                        required: true
                    },
                    building_payment_plan: { 
                        required: true
                    },
                    building_milestone: { 
                        required: true
                    },
                    
                },

                invalidHandler: function (event, validator) {
                    //display error alert on form submit    
                },

                errorPlacement: function (label, element) { // render error placement for each input type   
                    $('<span class="error"></span>').insertAfter(element).append(label)
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('success-control').addClass('error-control');  
                },

                highlight: function (element) { // hightlight error inputs
                    var parent = $(element).parent();
                    parent.removeClass('success-control').addClass('error-control'); 
                },

                unhighlight: function (element) { // revert the change done by hightlight
                    
                },

                success: function (label, element) {
                    var parent = $(element).parent('.input-with-icon');
                    parent.removeClass('error-control').addClass('success-control'); 
                },

                submitHandler: function (form) {
                
                }
            }); 

   $(document).on("change", "#building_payment_plan", function(e) {

        $("#building_milestone").empty();

        $("#building_milestone").append(new Option("Select", ""));
        if($(e.target).val()!=""){
 
        $.post(AJAXURL, {
            action: "get_payment_plan_milestones",

            payment_plan: $("option:selected", $(e.target)).val()
        }, function(response) {

        sortedresponse = _.sortBy(response, function (obj) { 
            
         return parseInt(obj.sort_index);
        });

            $.each(sortedresponse, function(i, val) {
                selected =  (i==0)?val.milestone:selected;
                $("#building_milestone").append(new Option(val.name, val.milestone));
            });
             $("#building_milestone").val(selected);
              milestoneCompletionUi(sortedresponse);
        });
        }

       
   });

   function milestoneCompletionUi(milestone){

    $("#milestone-completion-item-container").html("")
    html = "";
    $.each(sortedresponse, function(i, val) {
                selected =  (i==0)?val.milestone:selected;
               

                html +='<li >'
                html +='<div class="row">'
                html +='<div class="form-group">'
                html +='<div class="col-md-7"><label class="form-label form-label-inline-long">'
                html += val.name+'</label> '
                html +='</div>'
                html +='<div class="col-md-5">'
                html +='<input type="text" item="'+val.milestone+'"  name="milestone_completion_'+val.milestone+'" class="milestone-completion-date form-control-medium"  data-date-format="dd/mm/yyyy"   >'
                html +='</div>'
                html +='</div>'
                html +='</div>'
                html +='</li>'
            });
 $("#milestone-completion-item-container").html(html)
    $('.milestone-completion-date').datepicker({ dateFormat: 'dd/mm/yy' });

   }

    $(document).on("change", "#no_of_flats", function(e) {

        prevFlatCount = $(e.target).attr('prev_flat_count');

        flatCount = $(e.target).val();

       
       

        if(parseInt(prevFlatCount) > parseInt(flatCount) ){
            
            removeFloorpositions(flatCount,prevFlatCount);


        }else{
  
            addFloorpositions(flatCount,prevFlatCount);
        }

         $(e.target).attr('prev_flat_count',$(e.target).val())   ;
})




    function addFloorpositions(flat_count,prev_flat_count){
 
        for(i=1;i<=flat_count;i++){
        $('.flat-positions').each(function(e, obj) {
            console.log(obj)
            console.log(e)
            console.log("--------------")
            $(obj).append("<div class='col-md-4 flatposition"+i+"'><div class='checkbox check-default' ><input type='checkbox' name='flatpostion-"+$(obj).attr('item-id')+"[]' id='flatpostion"+i+"-"+e+"' value='"+i+"'> <label for='flatpostion"+i+"-"+e+"'>"+i+"</label></div></div>")
        });
            
        }
    }

    function removeFloorpositions(flat_count,prev_flat_count){
 
        for(i=parseInt(flat_count)+1;i<=prev_flat_count;i++){
            
            $(".flatposition"+i).remove()
        }
    }
 
})

