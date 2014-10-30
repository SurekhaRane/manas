<?php

function get_payment_plan_milestones($payment_plan){
	global $wpdb;
	
	$query= "SELECT option_value FROM ".$wpdb->prefix ."options where   option_id  = '$payment_plan'";
 
   	$data = $wpdb->get_var($query);
 $data = unserialize($data) ;

   	return get_milestone_names( $data["milestones"]);
}


function get_milestone_names($milestones){

	$milestone_with_names = array();

	$all_milestones = get_milestones();
 
	foreach($milestones as $milestone){

		foreach($all_milestones as $all_milestone_item){
 
			if($all_milestone_item["id"]==$milestone["milestone"]){

				$milestone["name"] = $all_milestone_item["name"];
			}
		}

		$milestone_with_names[] = $milestone;
	}

	return $milestone_with_names;
}
function get_payment_plans(){

	$payment_plans = array();

	$payment_plans = maybe_unserialize(get_option('payment_plans'));

    $payment_plans = implode(", ",$payment_plans);

    global $wpdb;

    $query= "SELECT option_name as  name, option_id as id , option_value as  value  FROM ".$wpdb->prefix ."options where option_id in($payment_plans)  ";
 
   	$payment_plans = $wpdb->get_results($query,ARRAY_A);
 
 	 $payment_plans_data = array();
 	 $miles_stone_data = array();
   	foreach($payment_plans as $payment_plan){ 
   			$option_value= maybe_unserialize($payment_plan["value"]);
   			$miles_stones =  $option_value["milestones"] ;

   			$milestones = $option_value["milestones"] ;

			$milestones_data = array();
   			foreach($milestones as $milestone){

   					$milestones_data[] = array('sort_index'=>intval($milestone['sort_index']),'milestone'=>intval($milestone['milestone']),'payment_percentage'=>intval($milestone['payment_percentage']));
   			}
   			 
   			$payment_plans_data[] = array("id"=>$payment_plan["id"],
   										"name"=>$payment_plan["name"],
   										"milestones"=>$milestones_data ); 
   			}
   
	return $payment_plans_data; 
}

function get_payment_by_id($id){

	global $wpdb;
	
	$query= "SELECT * FROM ".$wpdb->prefix ."options where   option_id  = '$id'";
 
   	$data = $wpdb->get_results($query,ARRAY_A);

   	return $data[0];
}

function get_milestones($id=0){

	return get_default_data('milestones',$id);
}


//create new room type

function ajax_save_milestone(){
 
	$milestones = array();

	$milestone = $_REQUEST["milestone"];

    $milestones[] = array("master_type"=>"milestones","value"=>$milestone,"data"=>"");
	 
	$return = set_defaults_data($milestones);
	
	$response = json_encode( $return );

	header( "Content-Type: application/json" );

	echo $response;
	
	exit;
}
add_action('wp_ajax_save_milestone','ajax_save_milestone'); 

//create new room type

function ajax_save_payment_plan(){
 
	$milestones = array();

	$milestones = $_REQUEST["milestones"];

	$payment_plan_name = $_REQUEST["payment_plan_name"];

	$payment_plan_id = $_REQUEST["payment_plan_id"];

    if(payment_plan_exists($payment_plan_name,$payment_plan_id)){

    	$error = true;

    	$msg="Payment Plan Already Exists";

    }else{
    	$error = false;

    	if(empty($payment_plan_id)){
    		
    		add_option($payment_plan_name,array('milestones'=>$milestones));

	    	$payment_plan = get_option_id($payment_plan_name);

	    	$payment_plans = maybe_unserialize(get_option('payment_plans'));

	    	$payment_plans[] = $payment_plan;

	    	update_option('payment_plans',$payment_plans);

	    	$msg="Payment Plan Created Successfully!";
    	}else{

    		//update the option name
    		update_payment_plan($payment_plan_id,$payment_plan_name);

    		//update the option value
    		update_option($payment_plan_name,array('milestones'=>$milestones));

	    	 
	    	$msg="Payment Plan Updated Successfully!";
    	}
    	

    }
	$response = json_encode(  array('msg'=>$msg,'error'=>$error));

	header( "Content-Type: application/json" );

	echo $response;
	
	exit; 
}
add_action('wp_ajax_save_payment_plan','ajax_save_payment_plan'); 

 
function payment_plan_exists($payment_plan_name,$payment_plan_id=0){

	$return = false;

	$payment_plans = maybe_unserialize(get_option('payment_plans'));

    $payment_plan_id  = empty($payment_plan_id)?0:$payment_plan_id;

	$payment_plans = is_array($payment_plans)?$payment_plans:array();

    $payment_plans = implode(", ",$payment_plans);

    global $wpdb;

    $query= "SELECT * FROM ".$wpdb->prefix ."options where option_id in($payment_plans) AND option_id != $payment_plan_id";
 
   	$results = $wpdb->get_results($query,ARRAY_A);

   foreach($results as $result){

   		if($result["option_name"]==$payment_plan_name){

   			$return = true;
   		}
   }

   return $return;
}

//get the option id for a option name
function get_option_id($payment_plan_name){
	 global $wpdb;

    $query= "SELECT option_id FROM ".$wpdb->prefix ."options where   option_name  = '$payment_plan_name'";
 
   	return $wpdb->get_var($query);
}

//update the option name by id
function update_payment_plan($payment_plan_id,$payment_plan_name){
	 global $wpdb;

    $query= "UPDATE  ".$wpdb->prefix ."options set option_name  = '$payment_plan_name' WHERE option_id = $payment_plan_id";
 
   	return $wpdb->get_var($query);
}

//delete payment plan
function ajax_delete_payment_plan(){

    $payment_plan = $_REQUEST["id"];

delete_payment_plan($payment_plan);
	$response = json_encode( array('msg'=> 'Successfully Deleted Payment Plan') );

	header( "Content-Type: application/json" );

	echo $response;

	exit;
}
add_action('wp_ajax_delete_payment_plan','ajax_delete_payment_plan');


//update the option name by id
function delete_payment_plan($payment_plan_id){
	 global $wpdb;

    $query= "DELETE  FROM ".$wpdb->prefix ."options   WHERE option_id = $payment_plan_id";
 
   	return $wpdb->get_var($query);


	$payment_plans = maybe_unserialize(get_option('payment_plans'));

    if(($key = array_search($payment_plan_id, $payment_plans)) !== false) {
    	unset($payment_plans[$key]);
	}

	update_option('payment_plans',$payment_plans);
}

//delete payment plan
function ajax_get_payment_plan_milestones(){

    $payment_plan = $_REQUEST["payment_plan"];

	$payment_plan_milestones = get_payment_plan_milestones($payment_plan);
	$response = json_encode( $payment_plan_milestones );

	header( "Content-Type: application/json" );

	echo $response;

	exit;
}
add_action('wp_ajax_get_payment_plan_milestones','ajax_get_payment_plan_milestones');