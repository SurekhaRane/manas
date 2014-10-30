<?php
/**
 * Plugin Name: Mapplic
 * Plugin URI: http://codecanyon.net/item/mapplic-custom-interactive-map-wordpress-plugin/6800158
 * Description: A commercial plugin for creating custom interactive maps using image or vector maps. The plugin is available at CodeCanyon, check the plugin page for more information.
 * Version: 1.0
 * Author: Sekler
 * Author URI: http://www.codecanyon.net/user/sekler
 * License: GPL
 */

$pagehook = '';

include('admin/mapplic-database.php');

function mapplic_menu() {
	$pagehook = add_menu_page('Custom Interactive Maps', 'Custom Maps', 'edit_theme_options', 'mapplic_menu', 'mapplic_function', 'dashicons-location-alt', '26.1002');
	add_action('load-' . $pagehook, 'on_page_load');
	add_action('admin_enqueue_scripts', 'enqueue_mapplic_admin');
}
add_action('admin_menu', 'mapplic_menu');

function on_page_load() {
	wp_enqueue_script('common');
	wp_enqueue_script('wp-lists');
	wp_enqueue_script('postbox');
}

function enqueue_mapplic_admin($hook) {
	if ($hook === 'toplevel_page_mapplic_menu') {
		// Admin style
		wp_register_style('mapplic-admin-style', plugin_dir_url(__FILE__) . 'admin/css/admin-style.css');
		wp_enqueue_style('mapplic-admin-style');

		// Iris colorpicker
		wp_enqueue_style('wp-color-picker');

		// Admin script
		wp_register_script('mapplic-admin-script', plugin_dir_url(__FILE__) . 'admin/js/admin-script.js', array('jquery', 'wp-color-picker'));
		wp_enqueue_script('mapplic-admin-script');

		// Plugin styles
		wp_enqueue_style('mapplic-style', plugins_url('css/mapplic.css', __FILE__));
		wp_enqueue_style('mapplic-map-style', plugins_url('css/map.css', __FILE__));

		// Plugin scripts
		wp_enqueue_script('mousewheel', plugins_url('js/jquery.mousewheel.js', __FILE__), array('jquery'));
		wp_enqueue_script('easing', plugins_url('js/jquery.easing.js', __FILE__), array('jquery'));
		wp_enqueue_script('mapplic-admin', plugins_url('admin/js/mapplic-admin.js', __FILE__), array('jquery', 'mousewheel', 'easing'), '1.0', true);

		// Media uploader
		wp_enqueue_media();
	}
}

function enqueue_mapplic() {
	// Plugin styles
	wp_enqueue_style('mapplic-style', plugins_url('css/mapplic.css', __FILE__));
	wp_enqueue_style('mapplic-map-style', plugins_url('css/map.css', __FILE__));

	// Plugin scripts
	wp_enqueue_script('mousewheel', plugins_url('js/jquery.mousewheel.js', __FILE__), array('jquery'));
	wp_enqueue_script('easing', plugins_url('js/jquery.easing.js', __FILE__), array('jquery'));
	wp_enqueue_script('mapplic', plugins_url('js/mapplic.js', __FILE__), array('jquery', 'mousewheel', 'easing'), '1.0', true);
}

function mapplic_function() {
	// Load admin page
	include('admin/mapplic-admin.php');
}

// Ajax function to get map data from database
add_action('wp_ajax_mapdata', 'mapdata_callback');
add_action('wp_ajax_nopriv_mapdata', 'mapdata_callback');

function mapdata_callback() {
	global $wpdb;

	$id = intval($_REQUEST['map']);
	$table = $wpdb->prefix . 'custommaps';

	$map = $wpdb->get_row("SELECT * FROM $table WHERE id = $id", 'ARRAY_A');

	echo $map['data'];

	die();
}

// Add SVG Support to Media Uploader
function cc_mime_types($mimes) {
	$mimes['svg'] = 'image/svg+xml';
	return $mimes;
}
add_filter('upload_mimes', 'cc_mime_types');

// Mapplic shortcode
function mapplic_shortcode($atts) {
	extract(shortcode_atts(array(
		'id' => false,
		'w' => 0,
		'h' => 400
	), $atts, 'mapplic'));

	// Generate an unique id for every instance of the shortcode
	STATIC $i = 0;
	$i++;
	$instance = 'mapplic' . $i;

	enqueue_mapplic();
	wp_enqueue_script('mapplic-instance', plugins_url('js/mapplic.instance.js', __FILE__), array('mapplic'), null, true);
	wp_localize_script('mapplic-instance', $instance, array(
		'ajaxurl' => admin_url('admin-ajax.php'),
		'id' => $id,
		'width' => $w,
		'height' => $h
	));

	$output = '<div id="' . $instance . '"></div>';

	return $output;
}

add_shortcode('mapplic', 'mapplic_shortcode');