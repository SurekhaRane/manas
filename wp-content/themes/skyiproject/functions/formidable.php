<?php

/*
funtion to add custom fields to formidable
*/

function add_custom_fields($fields){
 
	$fields['unittype']= __('Unit Type', 'formidable')  ;

	$fields['roomtype']= __('Room Type', 'formidable')  ;

	$fields['addrooms']= __('Add Rooms', 'formidable')  ;

	return $fields;

}
add_filter("frm_pro_available_fields","add_custom_fields",10,1);



function frm_form_fields_customize($field, $field_name){

 global $wpdb;

 $entry_id = isset($_REQUEST['entry'])?$_REQUEST['entry']:0;
 	switch($field['type']){

 		case "roomtype":
 					 
 							 
 							// echo FrmProEntriesController::get_field_value_shortcode(array('field_id' => $sub_entry_holder_field_id, 'entry_id' => $entry_id));
 						   ?>   
							<select name="<?php echo $field_name ?>" form-id="<?php echo $opt['data'];?>" field-id="<?php echo $field['id'];?>" id="room_type" <?php do_action('frm_field_input_html', $field) ?> store-entry-data="room_type_entry_id" selected-value = "<?php echo $field['value']?>" class="show_sub_form">
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
							<select form-id="25" class="unit_type show_sub_form" name="<?php echo $field_name ?>" id="field_<?php echo $field['field_key'] ?>" <?php do_action('frm_field_input_html', $field) ?> store-entry-data="unit_type_entry_id" selected-value = "<?php echo $field['value']?>"  sort-on-key="floor_no">
							      
							<option value="">Select</option>  <?php    

							$unit_types = get_unit_types();

							    foreach ($unit_types as $opt){ 
							 
							 ?>
							<option value="<?php echo $opt['id']; ?>" <?php
							if (FrmAppHelper::check_selected($field['value'], $opt['id'])) echo ' selected="selected"'; ?>   no-of-floors="<?php echo $opt['no_of_floors'];?>" form-id="25" ><?php echo ($opt['name'] == '') ? ' ' : $opt['name']; ?></option>
							    <?php } ?>
							</select>
							<?php 
 		break; 

 		case "addrooms": 
 		?>
 						<input type="button" name="add_rooms" class="add-rooms show_sub_form" value="+" form-id="23" store-entry-data="room_variant_entry_id" sort-on-key="room_no" count-of-rooms="0">
 						<?php


 		break;

 		default:
 		break;
 	}
   return;
}

add_action('frm_form_fields', 'frm_form_fields_customize', 10, 2);

function ajax_fetch_form_views(){

    global $wpdb;

	$entry_ids = $_REQUEST["entry_ids"];

	$sort_order_key = $_REQUEST["sort_order_key"];

	$form_id = $_REQUEST["form_id"];
 
 	$form_htmls = array();

 	if($sort_order_key !=""){

		$query = "select item_id from ".$wpdb->prefix."frm_item_metas where field_id = (select id from ".$wpdb->prefix."frm_fields where field_key = '".$sort_order_key."' ) and meta_value in (".$entry_ids.") order by meta_value";
	
echo $query;
		$results = $wpdb->get_results($query,ARRAY_A);
	 
		$entry_ids = array();
		
		foreach($results as $result){
		
			$entry_ids[] = $result["item_id"];
		
		}
 	
 	}
 	else{
 		
 		$entry_ids = explode(",",$entry_ids);
 	
 	}
 	 
	foreach($entry_ids as $entry_id){
var_dump($entry_id);
		$form_htmls[] = form_entry_view($entry_id,$form_id);

	}

	
	$response = json_encode( $form_htmls );

	header( "Content-Type: application/json" );

	echo $response;
	
	exit;
}
add_action('wp_ajax_fetch_form_views','ajax_fetch_form_views');


function ajax_fetch_form(){

if(isset($_REQUEST["entry"])){

								$entry = $_REQUEST["entry"];

								global $frm_entry;

								$entry_data = ($frm_entry->getOne($entry, true));
 
								$form_id = $entry_data->form_id;
 
							}
	$form = FrmEntriesController::show_form($_REQUEST["form_id"], $key = '', $title=false, $description=true,$entry=$entry);

	$form .= "<input type='button' value='save' class='save-form'>";

	$response = json_encode( $form );
	header( "Content-Type: application/json" );
	echo $response;
	exit;
}
add_action('wp_ajax_fetch_form','ajax_fetch_form');


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

 	case "floor_no":
 		$classes .= ' floor_no';
 	break;
 	case "room_no":
 		$classes .= ' room_no';
 	break;
 	case "room_type_entry_id":
 		$classes .= ' room_type_entry_id';
 	break;
 	case "unit_type_entry_id":
 		$classes .= ' unit_type_entry_id';
 	break;
 	case "room_variant_entry_id":
 		$classes .= ' room_variant_entry_id';
 	break;

 	default:
 	break;
 }

 
  
  return $classes;
}

add_filter('frm_field_classes', 'add_input_class', 10, 2);



