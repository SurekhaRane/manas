
jQuery(document).ready(function($) {
    var collections = [];


     //building listing 


  if($('.tablesorter').length){

        _collections = collections
        $.post(AJAXURL, {
            action: "get_list_view",
            list: "all_users", //the list required
            masters:"" //the masters required for the list
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
                "<td class='edit-link' data-id='"+listItems.id+"'>"+listItems.displayName+"</td>" +
                "<td class='edit-link' data-id='"+listItems.id+"'>"+listItems.displayRole+"</td>" +
                
                "<td class='edit-link' data-id='"+listItems.id+"'>"+listItems.lastLogin+"</td>" +
                
                "<td  style='text-align:center'><i  class='fa fa-trash-o delete_user'  data-id='"+listItems.id+"'></i></td>" +
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


                   



                    },


                }
            });

        $(".reset-filters").trigger('click');

    }



    $(document).on("click", ".edit-link", function(e) {

        window.location.href = SITEURL + "/add-edit-user/?id="+$(e.target) .attr('data-id');
    });

     $(document).on("click", ".delete_user", function(e) {
 
        var _e = e
        clearAlerts();
         user_name = $(e.target).parent().parent().children(':first-child').html() 
        confirmUserAction = confirm("Are you sure you want to delete user "+user_name+" ?")
        if(confirmUserAction){

            $.post(AJAXURL, {

            action: "delete_user", 

            id:$(e.target).attr('data-id')

        }, function(response) {


            if(response.error==true){
                $(".grid-body").prepend('<div class="text-error">'+response.msg+'</div>')
            }else{
                $(".grid-body").prepend('<div class="text-success">'+response.msg+'</div>')
                $(_e.target).parent().parent().remove();
            }
            
             
        });
        }
          
    });


     //save apartment ajax call
    $(document).on("click", "#save_user", function(e) {
 
        clearAlerts();

        if($('form').valid()){

            var data, _e;

            var _e = e;

            data = $("#form_add_edit_user").serialize();

            $(e.target).hide().parent().append("<div class='loading-animator'></div>")


            $.post(AJAXURL, data, function(response) {

                resetForm(e,$('#user_id').val(),response);
       
            });
        }
    });

       //validations 
    $('form').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    display_name: { 
                        required: true
                    },
                    user_email: { 
                        required: true
                    },
                    role: { 
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
});