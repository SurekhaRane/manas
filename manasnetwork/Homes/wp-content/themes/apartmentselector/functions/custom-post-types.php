<?php
/*
function register post type "Units"
*/

function register_post_type_unit(){


		$labels = array(
						'name' => _x('Unit', 'post type general name'),
						'singular_name' => _x('Unit', 'post type singular name'),
						'add_new' => _x('Add New', 'unit'),
						'add_new_item' => __('Add New '),
						'edit_item' => __('Edit '),
						'new_item' => __('New '),
						'all_items' => __('All Units'),
						'view_item' => __('View Unit'),
						'search_items' => __('Search Units'),
						'not_found' =>  __('No Units found'),
						'not_found_in_trash' => __('No Units found in Trash'),
						'parent_item_colon' => '',
						'menu_name' => __('Unit'),
						'has_archive' => false

						);

	$args = array(
					'labels' => $labels,
					'public' => true,
					'publicly_queryable' => true,
					'show_ui' => true,
					'show_in_menu' => true,
					'query_var' => true,
					'rewrite' => true,
					'capability_type' => 'post',
					'has_archive' => true,
					'hierarchical' => false,
					'menu_position' => null, 
					'supports' => array( 'title', 'editor', 'thumbnail')
				);


	register_post_type( 'unit', $args);


		// Add new taxonomy, make it hierarchical (like categories)
	$labels = array(
					'name' => _x( 'Unit Type', 'taxonomy general name' ),
					'singular_name' => _x( 'Unit Type', 'taxonomy singular name' ),
					'search_items' =>  __( 'Search Unit Types' ),
					'all_items' => __( 'All Unit Types' ),
					'parent_item' => __( 'Parent Unit Type' ),
					'parent_item_colon' => __( 'Parent Unit Type:' ),
					'edit_item' => __( 'Edit Unit Type' ),
					'update_item' => __( 'Update Unit Type' ),
					'add_new_item' => __( 'Add New Unit Type' ),
					'new_item_name' => __( 'New Unit Type Name' ),
					'menu_name' => __( 'Unit Type' ),
					);

	register_taxonomy( 'unit_type',array('unit'), array(
					'hierarchical' => false,
					'labels' => $labels,
					'show_ui' => true,
					'query_var' => true,
					'rewrite' => array( 'slug' => 'unit'),
					));
    $labels = array(
        'name' => _x( 'Building', 'taxonomy general name' ),
        'singular_name' => _x( 'Building', 'taxonomy singular name' ),
        'search_items' =>  __( 'Search Unit Buildings' ),
        'all_items' => __( 'All Buildings' ),
        'parent_item' => __( 'Parent Building' ),
        'parent_item_colon' => __( 'Parent Building:' ),
        'edit_item' => __( 'Edit Building' ),
        'update_item' => __( 'Update Building' ),
        'add_new_item' => __( 'Add New Building' ),
        'new_item_name' => __( 'New Building Name' ),
        'menu_name' => __( 'Building' ),
                    );

    register_taxonomy( 'building',array('unit'), array(
        'hierarchical' => true,
        'labels' => $labels,
        'show_ui' => true,
        'query_var' => true,
        'rewrite' => array( 'slug' => 'unit'),
                    ));
}




