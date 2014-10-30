<?php

/*
function to get unit types
*/

function get_unit_types($ids=array())
{

	$unit_types = array();

	$categories = get_terms( 'unit_type', array( 
 	'hide_empty' => 0,
 	'include'	=> $ids
 ) );

	foreach($categories as $category){
 
		$no_of_floors= get_option( "unit_type_".$category->term_id,true);

		$unit_types[] = array('id'=>$category->term_id,"name"=>$category->name,"no_of_floors"=>$no_of_floors);

	}
	return $unit_types;
}