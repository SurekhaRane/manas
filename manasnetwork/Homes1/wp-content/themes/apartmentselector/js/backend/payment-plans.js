
jQuery(document).ready(function($) {
    var collections = [];  


  if($('.tablesorter').length){

        _collections = collections
        $.post(AJAXURL, {
            action: "get_list_view",
            list: "payment_plans", //the list required
            masters:"" //the masters required for the list
        }, function(response) {

            _collections.list = response.list

            _collections.masters = response.masters

            //load the list view with rows
            loadListContents();


        });
    }
     
   

    $(document).on("change", ".milestone", function(e) {
          
        if( $(this).val()=="+"){

          $('#milestone-form').modal('show')

          $('#milestone-form').attr("editing-element",$(this).attr("id"));
        }
      
    }); 


      $(document).on("click", "#save-milestone", function(e) {
 
            milestone_name = $("#milestone_name").val()
            if(milestone_name==""){
              alert("Please Enter Milestone")
              return
            }

            $("#milestone_name").val('')
            $.post(AJAXURL, {
                action: "save_milestone",
                milestone: milestone_name, 
              }, function(response) {
                  exists = false; 
                  $('#'+$('#milestone-form').attr("editing-element")+' option').each(function(e,val){
                     
                    if (val.value == response[0]) {
                        exists = true; 
                    }
                  }) 

                  if(exists==false){
                     $('.milestone ').each(function(e,val) {
                        $(val).append(new Option(milestone_name, response[0]));
                    }) 
                  }
                $('#milestone-form').modal('hide')

               
                $('#'+$('#milestone-form').attr("editing-element")).val(response[0]);
                
                $('#'+$('#milestone-form').attr("editing-element")).trigger('change')

                
              });
          });

$(document).on("click", "#add-more-milstones", function(e) {

    nextItem = parseInt($(e.target).attr("count")) +1;

    $(e.target).attr("count",nextItem);
   
    cloneElement = $('#milestone-list li:first').html() ;
 
    html = '<li class="sortable-items" id="sortable-items-'+nextItem+'">'+cloneElement.replace(/1/g,nextItem)+'</li>';

    $('#milestone-list').append(html);

    $( "#milestone-list" ).sortable();

    $( "#milestone-list" ).disableSelection();

    $("#payment_percentage_"+nextItem).val("");

    $("#milestone_"+nextItem).val("");

     $("#milestone_"+nextItem).trigger("change");
});

function clearMilestones(){

      cnt = 0
      $('#milestone-list li').each(function(e,val) {
        if(cnt==0){
        $(val).find('[name="milestone"]').val("")  
        $(val).find('[name="payment_percentage"]').val("")  
        $(val).find('[name="payment_percentage"]').trigger("change")  
        }else{
            $(val).remove();
        }
        cnt++
      });
}
$(document).on("click", "#save_payment_plan", function(e) {

        clearAlerts();

        //validate form
        if($('form').valid()){
            var data, _e;

            var _e = e;  

            removeCustomError();

            payment_plan_name = $("#payment_plan_name").val();
            
            payment_plan_id= $("#payment_plan_id").val();

            milestones = getSelectedMilstones();

            if(milestones.length==0 && milestones!=false){
                showCustomError($("#add-more-milstones"),"Add atleast one milestone");
                return;
            }
             if(milestones==false){
                showCustomError($("#add-more-milstones"),"Add all selected milestone percentages");
                return;
            } 

            if(sumMilstonePercentage(milestones)!=100){
                 showCustomError($("#add-more-milstones"),"Milestone percentages should add up to 100");
                return;
            }
  
 
            $(e.target).hide().parent().append("<div class='loading-animator'></div>")

            $.post(AJAXURL, {
                action: "save_payment_plan",
                payment_plan_name:  payment_plan_name, 
                milestones:  milestones,  
                payment_plan_id: payment_plan_id
              }, function(response)  {
            if(payment_plan_id ==""){

                clearMilestones();
            }
            
            resetForm(e,$('#payment_plan_id').val(),response);
        });
        }
    });


function showCustomError(element,label){
    $('<span class="error"></span>').insertBefore(element).append(label)
}
function removeCustomError(){
    $('.error').remove();
}
$(document).on("click", ".milestone-remove", function(e) {
 
 if($('#milestone-list li').length==1){

    alert("Deleting of all milestones not allowed!")
    return
 }
    item = $(e.target).attr("item")
    $( "#sortable-items-"+item  ).remove()
    });
function getSelectedMilstones(){

    sort = 0
    milestones = []
    $('#milestone-list li').each(function(e,val) {
         
        milestone =  $(val).find('[name="milestone"]').val()  
        payment_percentage =  $(val).find('[name="payment_percentage"]').val() 
        if(milestone!="" && milestone !="+" &&  payment_percentage!=''){
             sort_index = ++sort;
             milestones.push({sort_index:sort_index,milestone:milestone,payment_percentage:payment_percentage});

        }
        if(milestone!="" && milestone !="+" && (payment_percentage==''  )){
             
            milestones = false;
            return false;
        }
       
    });

    return milestones;

}


function sumMilstonePercentage(milestones){

    milestonePaymentPercentage = 0

     $.each(milestones, function(i, val) {
        console.log(val.payment_percentage)
        milestonePaymentPercentage += parseFloat(val.payment_percentage)
     });
 
     return milestonePaymentPercentage;
}
   //validations 
    $('form').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    payment_plan_name: { 
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

    function loadListContents(){
        $(".tablesorter tbody").empty();


        _.each(collections.list, function(listItems,listItemsValue){
            //add the row items
            $(".tablesorter tbody").append("<tr  >" +
                "<td class='edit-link' data-id='"+listItems.id+"'>"+listItems.name+"</td>" +
                 "<td style='text-align:center'><a href='javascript:void(0)' item='"+listItems.id+"' class='milestone-remove'><i  class='fa fa-trash-o delete_building'  data-id='"+listItems.id+"'></i></td>" +
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
                       5 : function($cell, indx){
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

        window.location.href = SITEURL + "/add-edit-payment-plan/?id="+$(e.target) .attr('data-id');
    });


     $(document).on("click", ".delete_building", function(e) {
 
        var _e = e
        clearAlerts();
        payment_plan_name = $(e.target).parent().parent().children(':first-child').html() 
        confirmUserAction = confirm("Are you sure you want to delete payment plan "+payment_plan_name+" ?")
        if(confirmUserAction){

            $.post(AJAXURL, {

            action: "delete_payment_plan", 

            id:$(e.target).attr('data-id')

        }, function(response) {

            $(_e.target).parent().parent().remove();

            $(".grid-body").prepend('<div class="text-success">'+response.msg+'</div>')
             
        });
        }
          
    });
    

})

