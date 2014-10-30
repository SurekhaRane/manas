<?php
//add default room types


function add_default_room_types(){

	$default_room_types = array();

	$default_room_types[] = array("master_type"	=>"room-type","value"=>"Bedroom","data"=>"");
	
	$default_room_types[] = array("master_type"	=>"room-type","value"=>"Kitchen","data"=>"");
	
	$default_room_types[] = array("master_type"	=>"room-type","value"=>"Living","data"=>"");
	
	$return = set_defaults_data($default_room_types);
 	
 	return;
}


function add_default_room_type_for_sizes(){

	$default_room_type_for_sizes = array();

	//$default_room_type_for_sizes[] = array("master_type"	=>"room-type-for-sizes","value"=>"Bedroom","data"=>"");
	
	 $return = set_defaults_data($default_room_type_for_sizes);
 	
 	return;
}


/*
function get room types

if id is passed then get the room by id
*/

function get_room_types($id = 0){
 
	return get_default_data('room-type',$id);

}

/*
function get room types

if id is passed then get the room by id
*/

function get_room_type_for_sizes($id = 0){
 
	return get_default_data('room-type-for-sizes',$id);

}