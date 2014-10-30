

jQuery(document).ready(function($) {
  

//save apartment ajax call
    $(document).on("click", "#save_settings", function(e) {

        clearAlerts();

        if($('form').valid()){

            var data=[],infrastructure_charges=[],membership_fees=[],  _e;

            var _e = e;
 
        $('.infrastructure_charges').each(function(e,val) {
 
            infrastructure_charges.push($("#"+val.id).val());
        });

        $('.unit_type_membership_fees').each(function(e,val) {
            var unit_variant=[];
 
            if($('input[name="unit_fees_'+$("#"+val.id).attr('unit-type')+'"]:checked').val()=="unit_variant"){
                 $('.unit_variants_membership_fees_'+$("#"+val.id).attr('unit-type')).each(function(v_e,v_val) {
               
                          
                   unit_variant.push({'unit_variant':$("#"+v_val.id).attr('variant'),
                                        'membership_fees':$("#"+v_val.id).val()})
            });

            } 
            membership_fees.push({      'membership_fees':$("#"+val.id).val(),
                                        'unit_type':$("#"+val.id).attr('unit-type') ,
                                        'unit_variant':unit_variant
                                    });

            
            if($('input[name="unit_fees_'+$("#"+val.id).attr('unit-type')+'"]:checked').val()){
                
            }
        });


            data  = {   "vat":$("#vat").val(),
                        "sales_tax":$("#sales_tax").val(),
                        "stamp_duty":$("#stamp_duty").val(),
                        "registration_amount":$("#registration_amount").val(),
                        "infrastructure_charges":infrastructure_charges,
                        "membership_fees":membership_fees,
                        "action":$("#action").val(),

                        }
          

            $(e.target).hide().parent().append("<div class='loading-animator'></div>")

            $.post(AJAXURL, data, function(response)  { 

                resetForm(e,'1',response);
       
            });
        }
    });

    
 
 

     //validations 
    $('form').validate({
                focusInvalid: false, 
                ignore: "",
                rules: {
                    vat: { 
                        required: true,
                        number: true
                    },
                    sales_tax: { 
                        required: true,
                        number: true
                    },
                    infrastructure_charges: {
                        required: true,
                        number: true
                    },
                    membership_fees: {
                        required: true,
                        number: true
                    },
                    
                },

                invalidHandler: function (event, validator) {
                    //display error alert on form submit    
                },

                errorPlacement: function (label, element) { // render error placement for each input type   
                    $(element).parent().append('<span class="error"></span>').append(label)
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

 

$(document).on("click", "#add-more-infrastructure-charges", function(e) {

    nextItem = parseInt($(e.target).attr("count")) +1;

    $(e.target).attr("count",nextItem);
   
    cloneElement = $('#infrastructure-list li:first').html() ;
 
    html = '<li   id="item-'+nextItem+'">'+cloneElement.replace(/1/g,nextItem)+'</li>';

    $('#infrastructure-list').append(html);
  

    $("#infrastructure_charges_"+nextItem).val("");
 
});




$(document).on("click", ".infrastructure-charges-remove", function(e) {
 
 if($('#infrastructure-list li').length==1){

    alert("Deleting of all infrastructure charges not allowed!")
    return
 }
    item = $(e.target).attr("item")
    $( "#item-"+item  ).remove()
    });


$(document).on("click", ".membership_fee_options", function(e) {
 
    if($(e.target).val()=="unit_variant"){
         $("#unit-variants-"+$(e.target).attr("unit-type")).show();
         $("#unit_type_membership_fees_"+$(e.target).attr("unit-type")).attr('readonly',true)
         $("#unit_type_membership_fees_"+$(e.target).attr("unit-type")).val('')
         $(".unit_variants_membership_fees_"+$(e.target).attr("unit-type")).val('0')
     }else{
        $("#unit-variants-"+$(e.target).attr("unit-type")).hide();
         $("#unit_type_membership_fees_"+$(e.target).attr("unit-type")).attr('readonly',false)
         $("#unit_type_membership_fees_"+$(e.target).attr("unit-type")).val('0')
         $(".unit_variants_membership_fees_"+$(e.target).attr("unit-type")).val('')

     }
   
    

    });

});