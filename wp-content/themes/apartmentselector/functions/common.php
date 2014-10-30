<?php
/*
funtion to insert data in the wp_defaults table
*/

//get the current template php file name
function get_template_filename()
{

    global $post;
    $template_name = explode(".php",get_page_template_slug( $post->ID ));
    return $template_name[0];

}

function set_defaults_data($args){

	global $wpdb;

	$defaults_set = array();

	$defaults = array(

				"id"	=>"NULL",

				"master_type"	=>"",

				"value"			=>"",

				"data"			=>""
			);

	foreach($args as $arg){

		$arg = wp_parse_args( $arg, $defaults );

		extract( $arg, EXTR_OVERWRITE );

		if($id == 0){
		 	$query = "SELECT id FROM ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults  WHERE master_type = '$master_type' and value = '$value'";
 
		 	$defaults_id = $wpdb->get_var($query);
 
		  	if(empty($defaults_id)){

		  		$query = "INSERT INTO ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults (master_type, value, data)
						 VALUES
						( '$master_type', '$value', '$data')  ";

				$wpdb->query($query);

				$defaults_id = $wpdb->insert_id;

		 	}

			$defaults_set[] = $defaults_id;

		}else{

			$query = "	UPDATE ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults SET master_type = '$master_type', value = '$value', data = '$data' WHERE id = ".$id; 

			$wpdb->query($query);
		}

	}

	return ($defaults_set);

}


function get_default_data($master_type,$id=0){

	global $wpdb;

	$default_data = array();

	$where_clause = "";

	if($id !=0){

		$where_clause = "and id = ".$id;

	}
	$query = "SELECT id as id,value as name,master_type as master_type,data as data FROM ".$wpdb->prefix .CUSTOMTBLPREFIX. "defaults WHERE master_type = '$master_type'".$where_clause;
 
	$default_data = $wpdb->get_results($query,ARRAY_A);

	$data = array();
	
	foreach($default_data as  $data_item){
 
		 $data_item["id"] = intval($data_item["id"])  ;
		 $data[] = $data_item;
	}
 
 	return $data;


}
function get_list($list)
{
    $get_list = "get_".$list;

    return $get_list();
}

function get_masters($masters){

    $return_masters = array();

    if(is_array($masters)){
    	
	    foreach($masters as $master){

	        $get_master = "get_".$master;

	        $return_masters[$master] = $get_master();

	    }
    }

    return $return_masters;

}

function ajax_get_list_view(){


    //get the collection of the main list view required
    $list = get_list($_REQUEST["list"]);

    //get all the masters required
    $masters = get_masters($_REQUEST["masters"]);

    $response = json_encode( array('list'=>$list ,'masters'=>$masters) );

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}
add_action('wp_ajax_get_list_view','ajax_get_list_view');
add_action('wp_ajax_nopriv_get_list_view','ajax_get_list_view');


function check_backend_template(){
    //check to load js only if not backend templates
    $array_backend_pages = array(	'no-access',
    								'apartments',
    								'buildings',
    								'add-edit-apartment',
    								'add-edit-building',
    								'form',
    								'form-list',
    								'general-settings',
    								'add-edit-payment-plan',
    								'payment-plans',
    								'add-edit-user',
    								'users',
    								'import-apartment-csv');


    if(in_array(get_template_filename(),$array_backend_pages)){

        return true;
    }
    else{
    	 return false;
    }
}


//upload files

function ajax_upload_file(){

		 $targetFolder = '/uploads'; // Relative to the root

            global $user_ID;

            $files = $_FILES['files'];


            if ($files['name']) {
                $file = array(
                    'name' => $files['name'],
                    'type' => $files['type'],
                    'tmp_name' => $files['tmp_name'],
                    'error' => $files['error'],
                    'size' => $files['size']
                );

                $_FILES = array("upload_attachment" => $file);



                $attach_data = array();

 
                foreach ($_FILES as $file => $array) { 
                    $attach_id = upload_attachment($file, 0, true);
                    $attachment_id = $attach_id;
                    $attachment_url = wp_get_attachment_thumb_url($attach_id);
                }
            }

					
					
	  
  $response = json_encode(array('attachment_id' => $attachment_id, 'attachment_url' => $attachment_url));

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}
add_action('wp_ajax_upload_file','ajax_upload_file'); 



/**
 * Funtion upload_attachment()
 *
 * * Description: get all providers or for an ID.
 *
 * @param (int) ($file_handler) default = 0;
 * @param (int) ($post_id) the id of the post to assign the attachment to ;
 * @param (int) ($setthumb) default = false;
 * @return (int) ($attach_id) the attachment id
 *
 */
function upload_attachment($file_handler, $post_id, $setthumb = 'false') {

	// check to make sure its a successful upload
	if ($_FILES[$file_handler]['error'] !== UPLOAD_ERR_OK)
		__return_false();

	require_once(ABSPATH . "wp-admin" . '/includes/image.php');
	require_once(ABSPATH . "wp-admin" . '/includes/file.php');
	require_once(ABSPATH . "wp-admin" . '/includes/media.php');

	$attach_id = media_handle_upload($file_handler, $post_id);

	if ($setthumb)
		update_post_meta($post_id, '_thumbnail_id', $attach_id);
	return $attach_id;
}

//get no image of size 150 by 150

function get_no_image_150x150(){

 	$image_url = get_template_directory_uri()."/css/backend/img/no-image.jpg";
	
	return $image_url;
}
//get no image of size 150 by 150

function get_no_image_big(){

 	$image_url = get_template_directory_uri()."/css/backend/img/no-image-big.jpg";
	
	return $image_url;
}

function get_logged_in_user_info(){
 
	$user_data = array();
	$current_user = wp_get_current_user();

	global $wpdb,$wp_roles,$user_ID;
	$avatar = get_avatar( $current_user->ID, 150 );
	$current_user = wp_get_current_user();
	$roles = $current_user->roles;
	$roles = $current_user->roles;
	$role = array_shift($roles); 
 
	$display_role= $wp_roles->role_names[$role] ;
	 
	$user_data['display_name'] = $current_user->display_name;
	$user_data['role'] = $role;
	$user_data['display_role'] = $display_role;
	$user_data['avatar'] = $avatar;
	return $user_data;
}


//fetch user role based on User Id.
function get_user_role( $user_ID = 0 ) {

    $user_ID = (int) $user_ID;

    if ( $user_ID === 0 ) {
        $user_ID = get_current_user_id();
    }

    // GET USER ROLE

    $user = new WP_User( $user_ID );
   
    $user_role= $user->roles[0];


    return $user->roles[ 0 ];
}


function convert_custom_to_mysql_date($date){

	if(!empty($date)){

		$format_date = explode("/",$date);

		$date = $format_date[2]."-".$format_date[1]."-".$format_date[0];
	}

	return $date;
}


function convert_mysql_to_custom_date($date){

	if(!empty($date)){ 

		$date = date('d/m/Y',strtotime($date));
	}

	return $date;
}

function convert_mysql_to_custom_date_time($date){

	if(!empty($date)){

		 $date = date('d/m/Y H:i:s',strtotime($date));
	}

	return $date;
}

function get_image_paths($id){

	 
   	$image_url =   wp_get_attachment_image_src($id, 'large' );

   	$image_url = ( $image_url!=false)? $image_url[0]:'' ;
        
    $thumbnail_url =  wp_get_attachment_thumb_url($id);
            
    $thumbnail_url  = ($thumbnail_url ==false)?$no_image:$thumbnail_url; 

    return array('id'=>$id,'image_url'=>	$image_url ,'thumbnail_url'=>$thumbnail_url);
            
}

function arrayToObject($array) {
 if(!is_array($array)) {
 return $array;
 }

$object = new stdClass();
 if (is_array($array) && count($array) > 0) {
 foreach ($array as $name=>$value) {
 $name = strtolower(trim($name));
 if (!empty($name)) {
 $object->$name = arrayToObject($value);
 }
 }
 return $object;
 }
 else {
 return FALSE;
 }
 }
