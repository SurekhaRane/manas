<?php

  


function create_custom_tables(){

global $wpdb; 
	//create defaults table to store various master data

$table_name = $wpdb->prefix .CUSTOMTBLPREFIX. "defaults";
 
if( $wpdb->get_var("SHOW TABLES LIKE '$table_name'") !== $table_name )
{
	$table_create = "CREATE TABLE $table_name (
	id INT(100) NOT NULL AUTO_INCREMENT,
	master_type TEXT,
	value TEXT,
	data TEXT,
	PRIMARY KEY (id)
	);"; 

	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	dbDelta($table_create);
}
}



