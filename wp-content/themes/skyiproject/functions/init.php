<?php


//load the custom-post-types
require_once (get_template_directory().'/functions/custom-post-types.php');

//create custom tables
require_once (get_template_directory().'/functions/custom-tables.php');



/*
function to register custom post types
*/

function register_custom_post_types(){

	register_post_type_unit();
}


function do_init_routines(){

	define('CUSTOMTBLPREFIX','sp_');

	register_custom_post_types();

	create_custom_tables();

	add_default_room_types();

}
add_action('init','do_init_routines');

