<?php
/**
 * Mapplic Plugin
 *
 * New map page.
 */

// SUBMIT
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
	global $wpdb;
	$table = $wpdb->prefix . 'custommaps';

	$wpdb->insert(
		$table, 
		array(
			'title' => $_REQUEST['map-title'],
			'width' => $_REQUEST['map-width'],
			'height' => $_REQUEST['map-height']
		)
	);

	$id = $wpdb->insert_id;
	$data = $data = $_REQUEST['data'];

	$wpdb->query("UPDATE $table
		SET data = '$data'
		WHERE id = $id"
	);

	// Redirect to the edit page of the newly created map
	$editPage = remove_query_arg('noheader', add_query_arg(
		array(
			'action' => 'edit',
			'map' => $id
		)
	));

	wp_redirect($editPage);
	exit;
}

$data = array(
	'categories' => array(),
	'levels' => array()
);

add_meta_box('floors', __('Floors', 'mapplic'), 'floors_metabox', 'toplevel_page_mapplic_menu', 'side', 'core', $data);
add_meta_box('categories', __('Categories', 'mapplic'), 'categories_metabox', 'toplevel_page_mapplic_menu', 'side', 'core', $data);
add_meta_box('settings', __('Settings', 'mapplic'), 'settings_metabox', 'toplevel_page_mapplic_menu', 'normal', 'core', $data);
?>

<div class="wrap">

	<h2><?php _e('Add New Custom Map', 'mapplic'); ?></h2>
	
	<form method="post" action="<?php echo add_query_arg('noheader', 'true'); ?>">

		<input type="hidden" name="page" value="<?php echo $_REQUEST['page'] ?>">
		<input type="hidden" name="action" value="new">
		<input type="hidden" name="map" value="<?php echo $id; ?>">
		<input type="hidden" name="noheader" value="true">

		<input type="hidden" name="data" id="input-data">

		<?php
			wp_nonce_field($_REQUEST['page'] . '-nonce');
			wp_nonce_field('meta-box-order', 'meta-box-order-nonce', false);
			wp_nonce_field('closedpostboxes', 'closedpostboxesnonce', false);
		?>

		<div id="poststuff">
			<div id="post-body" class="metabox-holder columns-2">
				<div id="post-body-content">
					<div id="titlediv">
						<input type="text" name="map-title" id="title" autocomplete="off">
					</div>

					<p><?php _e('To create a new map, first add a floor. Once your map has at least one floor, save it and you can start placing the landmarks.', 'mapplic'); ?></p>

					<h4><?php _e('Container dimensions', 'mapplic'); ?></h4>
					<label>
						<?php _e('Width', 'mapplic'); ?><br>
						<input type="text" name="map-width" value="<?php echo $map['width']; ?>" autocomplete="off">
					</label>

					<label>
						<?php _e('Height', 'mapplic'); ?><br>
						<input type="text" name="map-height" value="<?php echo $map['height']; ?>" autocomplete="off">
					</label>
				</div>
				
				<div id="postbox-container-1" class="postbox-container">
					<?php do_meta_boxes('','side',null); ?>
				</div>
				
				<div id="postbox-container-2" class="postbox-container">
					<?php do_meta_boxes('','normal',null); ?>
				</div>
			</div>
		</div>
		<div class="clear"></div>
		<p class="submit">
			<input type="submit" name="submit" class="button button-primary form-submit" value="<?php _e('Create Map', 'mapplic'); ?>">
		</p>
	</form>
</div>