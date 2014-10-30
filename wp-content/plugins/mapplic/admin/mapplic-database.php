<?php
/**
 * Mapplic Plugin
 *
 * Creating a new database table called [pre]-custommaps.
 */

global $custommap_db_version;
$custommap_db_version = '1.02';

// Creating database
function custommap_install() {
	global $wpdb;
	global $custommap_db_version;

	$table = $wpdb->prefix . 'custommaps';

	$sql = "CREATE TABLE $table (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		title text NOT NULL,
		data mediumtext NOT NULL,
		width smallint DEFAULT '0',
		height smallint DEFAULT '0',
		status tinyint DEFAULT '1' NOT NULL,
		UNIQUE KEY id (id)
	);";
	
	require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
	dbDelta($sql);

	update_option('custommap_db_version', $custommap_db_version);
	update_option('custommap_activatted', time());

	custommap_install_data();
}

// Adding initial data
function custommap_install_data() {
	if (get_option('custommap_activatted')) {
		global $wpdb;
		$table = $wpdb->prefix . 'custommaps';

		// Image example
		$wpdb->insert(
			$table,
			array(
				'title' => '[JPG Map Example] Golf Course',
				'data' => '{"mapwidth":"2915","mapheight":"2132","minimap":"true","sidebar":"true","zoomlimit":"4","categories":[{"id":"buildings","title":"Buildings","color":"#b43ae3"},{"id":"holes","title":"Holes","color":"#fbb03b"}],"levels":[{"id":"gold","title":"Golf Course","map":"../wp-content/plugins/mapplic/images/examples/golf/golf.jpg","minimap":"../wp-content/plugins/mapplic/images/examples/golf/golf-small.jpg","locations":[{"id":"clubhouse","label":"Club House","description":"The main building.","category":"buildings","pin":"purple","zoom":"","x":"0.5653","y":"0.8167"},{"id":"proshop","label":"Pro Shop","description":"Pro Shop","category":"buildings","pin":"purple","zoom":"","x":"0.5019","y":"0.7041"},{"id":"hole16","label":"Hole 16","description":"Hole 16","category":"holes","pin":"","zoom":"","x":"0.3376","y":"0.3197"},{"id":"hole5","label":"Hole 5","description":"Hole 5","category":"holes","pin":"","zoom":"","x":"0.1399","y":"0.4041"}]}]}'
			)
		);

		// SVG example
		$wpdb->insert(
			$table,
			array(
				'title' => '[SVG Map Example] US States',
				'data' => '{"mapwidth":"959","mapheight":"593","categories":[],"levels":[{"id":"states","title":"States","map":"../wp-content/plugins/mapplic/images/examples/us/us-states.svg","minimap":"../wp-content/plugins/mapplic/images/examples/us/us-small.jpg","locations":[{"id":"ca","label":"California","description":"The golden state.","category":"false","pin":"hidden","zoom":"","x":"0.0718","y":"0.4551"},{"id":"wa","label":"Washington","description":"The Evergreen State","category":"false","pin":"hidden","zoom":"","x":"0.1331","y":"0.0971"},{"id":"nv","label":"Nevada","description":"Nevada is officially known as the \"Silver State\" due to the importance of silver to its history and economy","category":"false","pin":"hidden","zoom":"","x":"0.1484","y":"0.3981"},{"id":"il","label":"Illinoi","description":"Three U.S. presidents have been elected while living in Illinois","category":"false","pin":"hidden","zoom":"","x":"0.6207","y":"0.4324"},{"id":"ny","label":"New York","description":"New York is a state in the Northeastern and Mid-Atlantic regions of the United States.","category":"false","pin":"hidden","zoom":"","x":"0.8469","y":"0.2684"},{"id":"ma","label":"Massachusetts","description":"Officially the Commonwealth of Massachusetts, is a state in the New England region of the northeastern United States.","category":"false","pin":"hidden","zoom":"","x":"0.9046","y":"0.2627"},{"id":"ga","label":"Georgia","description":"Georgia is known as the Peach State and the Empire State of the South.","category":"false","pin":"hidden","zoom":"","x":"0.7515","y":"0.6893"},{"id":"fl","label":"Florida","description":"The state capital is Tallahassee, the largest city is Jacksonville, and the largest metropolitan area is the Miami metropolitan area.","category":"false","pin":"hidden","zoom":"","x":"0.7998","y":"0.8496"},{"id":"tx","label":"Texas","description":"The Lone Star State","category":"false","pin":"hidden","zoom":"","x":"0.4511","y":"0.7696"}]}],"minimap":"true","sidebar":false,"zoomlimit":"4"}'
			)
		);
	}
}

register_activation_hook(__FILE__, 'custommap_install');

function custommap_update_db_check() {
	global $custommap_db_version;
	if (get_site_option('custommap_db_version') != $custommap_db_version) {
		custommap_install();
	}
}
add_action('plugins_loaded', 'custommap_update_db_check');

?>