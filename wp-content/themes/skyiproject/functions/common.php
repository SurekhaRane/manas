<?php
/*
funtion to insert data in the wp_defaults table
*/

function set_defaults_data($args){

	global $wpdb;

	$defaults_set = array();

	$defaults = array(

				"id"	=>"NULL",

				"master_type"	=>"",

				"value"			=>"",

				"data"			=>""
			);

	foreach($args as $arg){

		$arg = wp_parse_args( $arg, $defaults );

		extract( $arg, EXTR_OVERWRITE );

		if($id == 0){
		 	$query = "SELECT id FROM ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults  WHERE master_type = '$master_type' and value = '$value'";
 
		 	$defaults_id = $wpdb->get_var($query);
 
		  	if(empty($defaults_id)){

		  		$query = "INSERT INTO ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults (master_type, value, data)
						 VALUES
						( '$master_type', '$value', '$data')  ";

				$wpdb->query($query);

				$defaults_id = $wpdb->insert_id;

		 	}

			$defaults_set[] = $defaults_id;

		}else{

			$query = "	UPDATE ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults SET master_type = '$master_type', value = '$value', data = '$data' WHERE id = ".$id; 

			$wpdb->query($query);
		}

	}

	return ($defaults_set);

}


function get_default_data($master_type,$id=0){

	global $wpdb;

	$default_data = array();

	$where_clause = "";

	if($id !=0){

		$where_clause = " id = ".$id;

	}
	$query = "SELECT * FROM ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults WHERE master_type = '$master_type'".$where_cluse;

	$default_data = $wpdb->get_results($query,ARRAY_A);
 
 	return $default_data;


}