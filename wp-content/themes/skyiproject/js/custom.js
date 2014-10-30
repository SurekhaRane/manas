jQuery(document).ready(function($){

$(".frm_submit").remove() 

$(".add-rooms").live('click', function(e) {


		form_id = $(this).attr('form-id') 

		count = parseInt($(this).attr('count-of-rooms'))

		count++;

		$(this).attr('count-of-rooms',count);

		field_store_entry_data = $(this).attr('store-entry-data') ;   

		$(e.target).parent().append("<div class='form-container bordered' store-entry-data='"+field_store_entry_data+"'   ><a href='javascript:void(0)'form-id='"+form_id+"' class='show-add-form' room-no="+count+">Add Details</a></div>") 
		


});

$( ".show_sub_form" ).each(function( e ) {
 
	var _this = this

	get_form_id = $('option:selected', $(this)).attr('form-id');
 
	form_id =  (get_form_id==""|| get_form_id == undefined)? $(this).attr('form-id') :get_form_id;

	sort_order_key = ($(this).attr('sort-on-key')==undefined || "") ?"":$(this).attr('sort-on-key') ;

	field_store_entry_data = $(this).attr('store-entry-data') ;

	entry_ids =  $(this).parent().parent().find( "."+field_store_entry_data).val();
  
 	if(entry_ids!="" &&  entry_ids !=undefined ){ 
	   
   		display_form_view(form_id,entry_ids,_this,sort_order_key);
 
 	}
	
 });

function display_form_view(form_id,entry_ids,element){

		$.post(AJAXURL,{

			action : 'fetch_form_views',

			form_id :  form_id,  

			entry_ids :  entry_ids,

			sort_order_key :sort_order_key, 

			async:   false
		},
		function(response){   
		 	
		 	store_entry_data = $(element).attr('store-entry-data'); 

		 	for (i = 0; i < response.length; ++i) {
 
				   $(element).parent().append("<div class='form-container bordered' store-entry-data='"+store_entry_data+"' >"+response[i]+"</div>") 

				}					
		
		});	
}

	$("#room_type").live('change', function(e) {

		form_id = ($('option:selected', $("#room_type")).attr('form-id')) 

		field_store_entry_data = $(this).attr('store-entry-data') ;

		selected_value = $(this).attr('selected-value') ;

		entry_id = $("#"+field_store_entry_data).val();

		field_id =   $("#room_type").attr('field-id') 
 
		if( form_id=="" ){

			$(e.target).parent().find('.form-container').remove()

			return;
		}

		if(form_id==selected_value){

			display_form_view(form_id,entry_id,$(e.target));
		}
		else{

			$(e.target).parent().find('.form-container').remove();

			$(e.target).parent().append("<div class='form-container bordered' store-entry-data='"+field_store_entry_data+"'  ><a href='javascript:void(0)'form-id='"+form_id+"' class='show-add-form' >Add Details</a></div>") 
		

		}
		 

	});

$(".unit_type").live('change', function(e) {

		form_id = ($('option:selected', $(e.target)).attr('form-id')) 

		field_store_entry_data = $(this).attr('store-entry-data') ;

		selected_value = $(this).attr('selected-value') ;

		entry_id = $("#"+field_store_entry_data).val();

		field_id =   $(e.target).attr('field-id');


		no_of_floors =  $('option:selected', $(e.target)).attr('no-of-floors')   ;
 
		if( form_id=="" ){

			$(e.target).parent().find('.form-container').remove()

			return;
		}

		if(no_of_floors!="" && no_of_floors !=undefined){

			$(e.target).parent().find('.form-container').remove();

			 for(i=1;i<=no_of_floors;i++){

			 	

				$(e.target).parent().append("<div class='form-container bordered' store-entry-data='"+field_store_entry_data+"' selected_value = "+selected_value+" form_id = "+form_id+"><a href='javascript:void(0)'form-id='"+form_id+"' class='show-add-form'  floor-no="+i+"  >Add Details</a></div>") 
		
			 }
		}
		


 
		 

	});


	$(".save-form").live('click', function(e) {
 

 		var _e = e

		var data =$("#"+$(e.target).prev().attr('id')+"  :input").serializeArray();

  
		$.post(AJAXURL,{
			action : 'save_entry',
			data :data
		},
		function(response){ 

			prev_selected_value = $('#'+$(_e.target).parent().attr('selected_value')).val()
			
			form_id = $('#'+$(_e.target).parent().attr('form_id')).val()

if($(_e.target).parent().find("input[name='id']").length==0){
	if(form_id != prev_selected_value ){

			$(_e.target).parent().parent().parent().find("."+$(_e.target).parent().attr('store-entry-data')).val("")

			}
			else{

					entries = $(_e.target).parent().parent().parent().find("."+$(_e.target).parent().attr('store-entry-data')).val();

					if(entries!="" && entries!=undefined){
						entries = entries.split(",")
					}
					else{
						entries = [];
					}
					

					entries.push(response.entry_id);

					entries.join(",")
			}
 
 			$(_e.target).parent().parent().parent().find("."+$(_e.target).parent().attr('store-entry-data')).val(entries)
		 

}
			
		

		
			  $(_e.target).parent().html(response.entry_html)
			  
			  

		});	
	})

	$("#save-main-entry").on('click', function(e) {
 		 
		var data = $("#frm_form_"+$("#save-main-entry").attr("form-id")+"_container form").serializeArray();

 
		$.post(AJAXURL,{
			action : 'save_entry',
			data :data
		},
		function(response){   
			 
		window.location.href = SITEURL+"/listing/" 

		});	
	})


$(".show-add-form").live('click', function(e) {

	var _e = e

	form_id =  $(e.target).attr('form-id') 

	entry =  $(e.target).attr('entry-id')   

	floor_no =  $(e.target).attr('floor-no') 
 

	room_no =  $(e.target).attr('room-no') 

	console.log(room_no)

	$.post(AJAXURL,{
		action : 'fetch_form',
		form_id :  form_id,   
		async:   false
	},
	function(response){   
		 
		 parent = $(_e.target).parent();
		$(_e.target).parent().html(response)

		$(".frm_submit").remove();
 
		if(floor_no!="" && floor_no!=undefined){
			 
			parent.find(".floor_no").val(floor_no)
		}
			if(room_no!="" && room_no!=undefined){
			 
			parent.find(".room_no").val(room_no)
		}
			  

	});
});


$(".edit-entry").live('click', function(e) {
 
 		var _e = e

		form_id =  $(e.target).attr('form-id') 

		entry =  $(e.target).attr('entry-id')   
 

		$.post(AJAXURL,{
			action : 'fetch_form',
			form_id :  form_id,  
			entry :  entry, 
			frm_action:'edit', 
			async:   false
		},
		function(response){   
		 
			$(_e.target).parent().html(response)

			$(".frm_submit").remove();
			  

		});
		});
});

