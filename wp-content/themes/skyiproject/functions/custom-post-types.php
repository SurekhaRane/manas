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
					'supports' => array( 'title', 'editor', 'thumbnail','custom-fields')
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
}

/*
add custom fields to taxonomies
*/

function extra_unit_type_fields($tag){

	$term_id = $tag->term_id; 
    $no_of_floors_selected = get_option( "unit_type_$term_id",true); 
 
    if (is_null($term_id)){
    	?>
		<div class="form-field">
			<label for="tag-slug">No of floors</label>
			 <select name="no_of_floors" id="no_of_floors" class="postform">
			 <?php for($i=1;$i<=4;$i++){?>
						<option value="<?php echo $i;?>" <?php if($no_of_floors_selected==$no_of_room){ ?>selected<?php } ?>><?php echo $i;?></option>
			<?php
			}
			?>
			</select>
			<p><?php _e( 'no of floors in the unit' ); ?></p>
		</div>
    	<?php
    	}else{
    	?>
    	 <tr class="form-field textbook_fields" >
        <th scope="row" valign="top"><?php _e( 'No of rooms' ); ?></label></th>
        <td>
            <div class="row form-input">
             <select name="no_of_floors" id="no_of_floors" class="postform">
			 <?php for($no_of_room=1;$no_of_room<=4;$no_of_room++){?>
						<option value="<?php echo $no_of_room;?>" <?php if($no_of_floors_selected==$no_of_room){ ?>selected<?php } ?>><?php echo $no_of_room;?></option>
			<?php
			}
			?>
			</select>
			<br>
			<span class="description"><?php _e( 'no of rooms in the unit' ); ?></span>
            </div>
            </td>
            </tr>
    	<?php
    	} 
?>
 
    
    <?php
}

add_action( 'unit_type_add_form_fields', 'extra_unit_type_fields', 10, 2 );

add_action( 'unit_type_edit_form_fields', 'extra_unit_type_fields', 10, 2 );

// save extra unit type fields callback function
function save_extra_unit_type_fields( $term_id ) {

    if (isset($_REQUEST['no_of_floors'])) {
     
        $no_of_floors =  $_REQUEST['no_of_floors']  ;
         
        //save the option array
        update_option( "unit_type_$term_id", $no_of_floors );
        
    }
    return;
}
add_action( 'created_unit_type', 'save_extra_unit_type_fields', 10, 2 );
 
add_action( 'edited_unit_type', 'save_extra_unit_type_fields', 10, 2 );