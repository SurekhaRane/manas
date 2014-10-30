<?php
show_admin_bar( false );

//load the common file having commonly containing funtions
require_once (get_template_directory().'/functions/common.php');

//load the init file
require_once (get_template_directory().'/functions/init.php');

//load the functions for formidable plugin hooks
require_once (get_template_directory().'/functions/formidable.php');

//load the functions related to rooms
require_once (get_template_directory().'/functions/rooms.php');

//load the functions related to unit
require_once (get_template_directory().'/functions/unit.php');
 
//formatted echo using pre tags can be used to echo out data for testing purpose

function formatted_echo($data){

    echo "<pre>";

    print_r($data);

    echo "</pre>";

}

function load_project_scripts(){
 
	wp_register_script('jquery', get_template_directory_uri() . '/js/jquery.min.js', false, null, true);
	
	wp_enqueue_script('jquery');
	wp_register_script('bootstrap', get_template_directory_uri() . '/js/bootstrap.min.js', false, null, true);
	
	wp_enqueue_script('bootstrap');
	wp_register_script('custom', get_template_directory_uri() . '/js/custom.js', false, null, true);
	
	wp_enqueue_script('custom');

	wp_localize_script('jquery', 'AJAXURL', admin_url( 'admin-ajax.php' ));
	wp_localize_script('jquery', 'SITEURL', site_url());

	wp_enqueue_style('bootstrap-css', get_template_directory_uri() . '/css/bootstrap.min.css'.$bust, array(), null);

	wp_enqueue_style('style-css', get_template_directory_uri() . '/css/style.css'.$bust, array(), null);
}

add_action('wp_enqueue_scripts', 'load_project_scripts', 100);
