<?php

/*
funtion to add custom fields to formidable
*/

/*
function add_custom_fields() called on formidable hook frm_pro_available_fields to add custom fields to formidable form buider
*/
function add_custom_fields($fields){
 
	$fields['unittype']= __('Unit Type', 'formidable')  ;

	$fields['roomtype']= __('Room Type', 'formidable')  ;

	$fields['addrooms']= __('Add Rooms', 'formidable')  ;

	$fields['addrooms']= __('Add Rooms', 'formidable')  ;

	$fields['roomsizes']= __('Room Sizes', 'formidable')  ; 

	return $fields;

}
add_filter("frm_pro_available_fields","add_custom_fields",10,1);

/*
function frm_form_fields_customize() called on formidable hook frm_form_fields to generate html for custom fields
*/


function frm_form_fields_customize($field, $field_name){

 global $wpdb;

 $entry_id = isset($_REQUEST['entry'])?$_REQUEST['entry']:0;
 	switch($field['type']){

 		case "roomtype":
 					 
 							 
 							// echo FrmProEntriesController::get_field_value_shortcode(array('field_id' => $sub_entry_holder_field_id, 'entry_id' => $entry_id));
 						   ?>   
							<select name="<?php echo $field_name ?>" form-id="<?php echo $opt['data'];?>" field-id="<?php echo $field['id'];?>" id="room_type" <?php do_action('frm_field_input_html', $field) ?> store-entry-data="room_type_entry_id" selected-value = "<?php echo $field['value']?>"  >
							<option value="" form-id="">Select</option> 
							<?php    

							$room_types = get_room_types();
							    foreach ($room_types as $opt){ 
							 $option_value = $opt['data'];
							 if($room_type_form==$opt['data']){
							 	$option_value = $field['value'];
							 }
							 ?>        
							<option value="<?php echo $opt['data'] ?>" <?php
							if (FrmAppHelper::check_selected($field['value'], $opt['data'])) echo ' selected="selected"'; ?> form-id="<?php echo $opt['data'];?>"  ><?php echo ($opt['value'] == '') ? ' ' : $opt['value']; ?></option>
							    <?php } ?>
							</select>
							<br><br>
							 
							<?php 

							 
 		break;
 		case "unittype":
 						   ?>   
							<select form-id="25"  name="<?php echo $field_name ?>" id="field_<?php echo $field['field_key'] ?>" <?php do_action('frm_field_input_html', $field) ?> store-entry-data="unit_type_entry_id" selected-value = "<?php echo $field['value']?>" >
							      
							<option value="">Select</option>  <?php    

							$unit_types = get_unit_types();

							    foreach ($unit_types as $opt){ 
							 
							 ?>
							<option value="<?php echo $opt['id']; ?>" <?php
							if (FrmAppHelper::check_selected($field['value'], $opt['id'])) echo ' selected="selected"'; ?>   no-of-forms="<?php echo $opt['no_of_floors'];?>" form-id="25" ><?php echo ($opt['name'] == '') ? ' ' : $opt['name']; ?></option>
							    <?php } ?>
							</select>
							<?php 
 		break; 

 		case "addrooms": 
 		?>
 						<input type="button" name="add_rooms" class="add-rooms show_sub_form" value="+" form-id="23" store-entry-data="room_variant_entry_id"   count-of-rooms="0">
 						<?php


 		break;

 		case "roomsizes": 

 			$room_type_for_sizes = get_room_type_for_sizes();
 			$key = 0;
 			?>
 			<div id="room-type-for-size-container">
 			<?php
 		if($field['value']==""){
 			?>
			
	 			<div id="room-type-for-size-item-1">
	 				<select name="room_type_for_size[]" id="room_type_for_size_1"   class="room_type_for_size form-small-input">
	 					<option value="">Select</option>
	 					<option value="+" class="select-add-item"> + Add New Room Type..</option>
	 					<?php
	 					foreach($room_type_for_sizes as $room_type_for_size){
	 					?>
	 					<option value="<?php echo $room_type_for_size["id"]?>"><?php echo $room_type_for_size["name"]?></option>
	 					<?php
	 					}
	 					?>
	 				</select>
	 				<input type="text" id="room_type_size_1"  name="room_type_size_1"  class="amount-data form-small-input"> sq ft
	 				<input type="button" value="x" item-no="1" class="delete_room_type_size_item">
	 			</div>
	 		 
 			<?php

 		}else{
 			foreach($field['value'] as $key=>$field_value_item){

 				?>
 				
	 			<div id="room-type-for-size-item-<?php echo $key+1;?>">
	 				<select name="room_type_for_size[]" id="room_type_for_size_<?php echo $key+1;?>"   class="room_type_for_size form-small-input">
	 					<option value="">Select</option>
	 					<option value="+" class="select-add-item"> + Add New Room Type</option>
	 					<?php
	 					foreach($room_type_for_sizes as $room_type_for_size){
	 					?>
	 					<option value="<?php echo $room_type_for_size["id"]?>" <?php if($field_value_item["room_type"]==$room_type_for_size["id"]){ echo "selected";}?>><?php echo $room_type_for_size["name"]?></option>
	 					<?php
	 					}
	 					?>
	 				</select>
	 				<input type="text" id="room_type_size_<?php echo $key+1;?>"  name="room_type_size_<?php echo $key+1;?>"  class="amount-data form-small-input" value="<?php echo $field_value_item["room_size"];?>"> sq ft
	 				<input type="button" value="x" item-no="<?php echo $key+1;?>" class="delete_room_type_size_item">
	 			</div>
	 			
	 			
 			<?php
 				 
 			}
 		}
 		?>
 		<div>Add More <input last-sr-no="<?php echo $key+1; ?>" type="button" name="add_more_room_sizes" id="add_more_room_sizes"  value="+" field-name="<?php echo $field_name ?>" >
	 			</div>
 			</div>	


 			<!--dialog to add new room type for size-->
 			<div editing-element="" class="modal fade" id="room-type-form" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div class="modal-dialog">
			    <div class="modal-content">
			      <div class="modal-header">
			        <button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>
			        <h4 class="modal-title" id="myModalLabel">Create New Room Type</h4>
			      </div>
			      <div class="modal-body">
			        Room Type : <input type='text' id="new-room-type">
			      </div>
			      <div class="modal-footer">
			        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="button" class="btn btn-primary" id="save-room-type">Create</button>
			      </div>
			    </div>
			  </div>
			</div>		
 		<?php


 		break;
 

 		default:
 		break;
 	}
   return;
}

add_action('frm_form_fields', 'frm_form_fields_customize', 10, 2);



function frm_set_checked($values, $field){

 
	if($field->field_key == 'terraceoptions'){

		 
		$terrace_options = get_terrace_options();
	 
		foreach($terrace_options as $terrace_option){ 

			$values['options'][$terrace_option['id']] = $terrace_option['name'];
			$values['use_key'] = true;           
		 
		}
		
	}
	return $values;
	}


add_filter('frm_setup_new_fields_vars', 'frm_set_checked', 20, 2);
add_filter('frm_setup_edit_fields_vars', 'frm_set_checked', 20, 2);

function ajax_fetch_form_views(){

    global $wpdb;

	$entry_ids = $_REQUEST["entry_ids"];

	$form_id = $_REQUEST["form_id"];
 
 	$form_htmls = array();

 	$entry_ids = explode(",",$entry_ids);
 	 
	foreach($entry_ids as $entry_id){
 
		$form_htmls[] = array('entry_id'=>$entry_id, 'form_html'=>form_entry_view($entry_id,$form_id));

	}

	
	$response = json_encode( $form_htmls );

	header( "Content-Type: application/json" );

	echo $response;
	
	exit;
}
add_action('wp_ajax_fetch_form_views','ajax_fetch_form_views');
add_action('wp_ajax_nopriv_fetch_form_views','ajax_fetch_form_views');


//create new room type

function ajax_save_room_type(){

	$room_type_for_sizes = array();

	$room_type = $_REQUEST["room_type"];

    $room_type_for_sizes[] = array("master_type"=>"room-type-for-sizes","value"=>$room_type,"data"=>"");
	 
	$return = set_defaults_data($room_type_for_sizes);
	
	$response = json_encode( $return );

	header( "Content-Type: application/json" );

	echo $response;
	
	exit;
}
add_action('wp_ajax_save_room_type','ajax_save_room_type'); 
function ajax_fetch_form(){

if(isset($_REQUEST["entry"])){

								$entry = $_REQUEST["entry"];

								global $frm_entry;

								$entry_data = ($frm_entry->getOne($entry, true));
 
								$form_id = $entry_data->form_id;
 
							}
	$form = FrmEntriesController::show_form($_REQUEST["form_id"], $key = '', $title=false, $description=true);

	$form .= "<input type='button' value='save' class='save-form'>";

	$response = json_encode( $form );
	header( "Content-Type: application/json" );
	echo $response;
	exit;
}
add_action('wp_ajax_fetch_form','ajax_fetch_form');
add_action('wp_ajax_nopriv_fetch_form','ajax_fetch_form');


function ajax_save_entry(){

    $item_meta = array();
    $id =0;
    foreach($_REQUEST['data'] as $datavalue){

     if(strpos ( $datavalue["name"], "item_meta[")!==false){

        $datavalue["name"] = str_replace("item_meta[","",$datavalue["name"]);

        $datavalue["name"] = str_replace("]","",$datavalue["name"]);

        $item_meta[$datavalue["name"]] = $datavalue["value"];
     }
     else{
         $$datavalue["name"]  = $datavalue["value"];
     }


    }

    global $frm_entry, $user_ID;

    if($id==0){
        $entry_id = $frm_entry->create(array(
      'form_id' => $form_id, //change 5 to your form id
      'item_key' => $item_key, //change entry to a dynamic value if you would like
      'frm_user_id' => $user_ID, //change $user_ID to the id of the user of your choice (optional)
      'item_meta' => $item_meta,
    ));
    }else{

         $frm_entry->update($id,array(
      'form_id' => $form_id, //change 5 to your form id
      'item_key' => $item_key, //change entry to a dynamic value if you would like
      'frm_user_id' => $user_ID, //change $user_ID to the id of the user of your choice (optional)
      'item_meta' => $item_meta,
    ));
         $entry_id = $id;
    }

        $entry_html = form_entry_view($entry_id,$form_id);
        $response = json_encode( array('entry_html'=>$entry_html,'entry_id'=>$entry_id));
        header( "Content-Type: application/json" );
        echo $response;
        exit;
}
add_action('wp_ajax_save_entry','ajax_save_entry'); 


/*
function to display readonly form entry
*/

function form_entry_view($entry_id,$form_id){
	
	$entry_html = "";
	if($entry_id!=0){
			$entry_html  = FrmProEntriesController::show_entry_shortcode(array('id' => $entry_id, 'plain_text' => 0));
			$entry_html .= '<a href="javascript:void(0)" entry-id="'.$entry_id.'" form-id="'.$form_id.'" class="edit-entry">Edit</a>';
	
	}
	return $entry_html;
}

function add_input_class($classes, $field){
 
 switch($field['field_key']){

 
 	case "room_type_entry_id":
 		$classes .= ' room_type_entry_id sub_forms';
 	break;
 	case "unit_type_entry_id":
 		$classes .= ' unit_type_entry_id sub_forms';
 	break;
 	case "room_variant_entry_id":
 		$classes .= ' room_variant_entry_id sub_forms';
 	break;

 	default:
 	break;
 }
 
 switch($field['type']){

 
 	case "roomtype":
 		$classes .= ' room_type show_sub_form';
 	break;
    case "unittype":
 		$classes .= ' unit_type show_sub_form';
 	break;
  

 	default:
 	break;
 }
 
 
  
  return $classes;
}

add_filter('frm_field_classes', 'add_input_class', 10, 2);


//add_filter('frm_validate_field_entry', 'your_custom_validation', 20, 3);
function your_custom_validation($errors, $field, $value){
    formatted_echo($errors) ;
}


function edit_frm_display_value_custom($value, $field, $atts){

 switch( $field->field_key){

 	case "unittype":
 		$unit_type = get_unit_types(array($value));
 		$value= $unit_type[0]["name"]; 
 	break;
 	case "roomsizes":
 		 $value_edited = "";
 		 foreach($value as $value_item){
 		 	$room_type_for_sizes = get_room_type_for_sizes($value_item["room_type"]) ;
			$value_edited .= $room_type_for_sizes[0]["name"].": ".$value_item["room_size"]." sq ft <br>";
 		 }
 		$value = $value_edited;
 	break; 
 	default:
 	break;
 }
 return $value;
}
add_filter('frm_display_value_custom','edit_frm_display_value_custom',10,3);


function edit_frm_display_value($value, $field, $atts){

 switch( $field->field_key){

 
 	case "2dlayout":
 	  $value_edited = explode("</a>",$value);
 	  $value = $value_edited[0]."</a>" ;
 
 	break;
 		case "3dlayout":
 	  $value_edited = explode("</a>",$value);
 	  $value = $value_edited[0]."</a>" ;
 
 	break;
 	case "terraceoptions": 
 	  $terrace_option  = get_terrace_options($value) ;
      if(is_array($terrace_option)){
      	$value = $terrace_option[0]["name"] ;
      }else{
      	$value = "";
      }
 	  
 
 	break;
 	default:
 	break;
 }
 return $value;
}
add_filter('frm_display_value','edit_frm_display_value',10,3);