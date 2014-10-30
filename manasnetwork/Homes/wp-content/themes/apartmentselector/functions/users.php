<?php


function get_sales_users(){

	$sales_users = array();
	$users = get_users();

	foreach($users as $user){

			$user_chk = new WP_User( $user->ID );
			if ($user_chk->has_cap( 'does_sales') && !$user_chk->has_cap( 'manage_options')){

				$sales_users[] = array("id"=>$user->ID,"name"=>$user->display_name);
			}
	}

	return  $sales_users ;
}


function get_all_users(){

	$all_users = array();
	$users = get_users();

	global $wp_roles ;
	foreach($users as $user){

		$last_login = get_user_meta($user->data->ID,"last_login",true);

		$display_role= $wp_roles->role_names[key($user->caps)] ;

 		$all_users[] = array(	'id'=>$user->data->ID,
 								'displayName'=>$user->data->display_name,
 								'displayRole'=>$display_role,
 								'role'=>key($user->caps),
 								'lastLogin'=>convert_mysql_to_custom_date_time($last_login),
 								'email'=>$user->data->user_email,
 								'login'=>$user->data->user_login,

 								);
			 
	} 
	return  $all_users ;
}

//delete user
function ajax_delete_user(){

    $user = $_REQUEST["id"];
    if(current_user_can("manage_users")){
         wp_delete_user( $user );
         $msg = 'Successfully Deleted User';
         $error=false;
    }else{
         $msg = 'Error Deleting User , You do not have permissions to delete users!';

         $error=true;
    }
     
 
	$response = json_encode( array('msg'=> $msg,'error'=>$error) );

	header( "Content-Type: application/json" );

	echo $response;

	exit; 
}
add_action('wp_ajax_delete_user','ajax_delete_user');


function create_ap_user( $args ) {

    $user_id = wp_insert_user( array(

        'ID'              => $args[ 'ID' ],
        'user_login'      => $args[ 'user_login' ],
        'display_name'    => $args[ 'display_name' ],
        'role'            => sanitize_key( $args[ 'role' ] ),
        'user_email'      => $args[ 'user_email' ],
        'user_registered' => $args[ 'user_registered' ]
       

    ) );
    if($args[ 'user_pass' ] != "")
    {
    wp_set_password( $args[ 'user_pass' ], $user_id );
    }
    return $user_id;

}



//saving building

function ajax_save_user(){

    $msg = "";
    $data  = "";
    $error = false;

    $user_array = array( 
				        'user_login'      => $_REQUEST[ 'user_email' ],
				        'display_name'    => $_REQUEST[ 'display_name' ],
				        'role'            => $_REQUEST[ 'role' ],
				        'user_email'      => $_REQUEST[ 'user_email' ],
				        'user_pass'       => $_REQUEST[ 'password' ],
				        'user_registered' => date( 'Y-m-d H:i:s' )
				    );

    if(empty($_REQUEST['user_id'])){

        if(current_user_can('manage_users')){

                if ( !email_exists( $_REQUEST[ 'user_email' ] ) ) {

                    $user_id = create_ap_user( $user_array );

                    $msg = "User Created Successfully!";

                 }else{

                    $error = true;

                    $msg = "Error Creating User , Email Address Already Exists!";

                 }
        }else{
                $error = true;
                
                $msg = "Error Creating User , You do not have permissions to create users!";

             }
// Insert the term building
                 

    }
    else{ 

            if(current_user_can('manage_users')){
                
                $user_id = $_REQUEST['user_id'];

               if( email_exists( $_REQUEST[ 'user_email' ] )  == $user_id )  {

                    $user_array["ID"] = $user_id ;

            	   create_ap_user( $user_array );

                    $msg = "User Updated Successfully!";
                }else{

                    $user_array["ID"] = $user_id ;

            	   create_ap_user( $user_array );

                    $msg = "Error Creating User , Email Address Already Exists!";
            	}
            }else{
                 
                $error = true;
                $msg = "Error Creating User , You do not have permissions to edit users!";

            }


        }
$response = json_encode( array('msg'=>$msg,'error'=>$error,'data'=> array('user_id'=>$user_id)) );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_save_user','ajax_save_user'); 

function get_ap_user( $user_ID = 0 ) {

    $user_ID = (int) $user_ID;

    if ( $user_ID === 0 ) {
        $user_ID = get_current_user_id();
    }

    $single_user = get_userdata( $user_ID );

    $date_time  = explode( ' ', $single_user->user_registered );
    $date_value = date( "M d,Y", strtotime( $date_time[ 0 ] ) );

    $user_info = array(

        'ID'              => $single_user->ID,
        'display_name'    => $single_user->display_name,
        'role'            => get_user_role( $single_user->ID ), 
        'user_email'      => $single_user->user_email  

    );

    return $user_info;

}
function get_ap_roles() {
   global $wp_roles;
   $all_roles = array();
   $ignore = array("editor","subscriber","author");
     $roles = $wp_roles->get_names();
     foreach($roles as $role_key=>$role) {

     	if(!in_array($role_key,$ignore)){
     		$all_roles[] = array("role"=>$role_key,"role_name"=>$role);
     	}  
     }

     return $all_roles;
}

function get_ap_current_user(){


    global $user_ID,  $wp_roles ;

    $ap_current_user = array();
      $user_info = wp_get_current_user(); 

 
    if($user_info->ID!=0){

        
        $ap_current_user['id'] = $user_ID;

        $ap_current_user['user_login'] = $user_info->data->user_login;

        $ap_current_user['user_email'] = $user_info->data->user_email;

        $ap_current_user['display_name'] = $user_info->data->display_name; 

        $ap_current_user['role'] =  key($user_info->caps) ;

        $ap_current_user['display_role'] = $wp_roles->role_names[key($user_info->caps)] ;

        $all_caps = array();

        foreach($user_info->allcaps as $key=>$capability){

            $all_caps[] = $key;

        }
         $ap_current_user['all_caps'] =$all_caps ;
    }else{

         $ap_current_user['id'] = 0;

         $ap_current_user['user_login'] = '';

        $ap_current_user['user_email'] = '';

        $ap_current_user['display_name'] = ''; 

        $ap_current_user['role'] =  '' ;

        $ap_current_user['display_role'] = '' ;

        $ap_current_user['all_caps'] = array() ;

    }

    return  $ap_current_user ;
}