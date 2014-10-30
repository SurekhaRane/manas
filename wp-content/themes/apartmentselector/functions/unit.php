<?php
/*
function get buiding exterior sides

if id is passed then get the buiding exterior sides by id
*/

function get_unit_status($id = 0){

    return get_default_data('unit-status',$id);

}

function get_terrace_options($id = 0){

    return get_default_data('terrace-options',$id);

}




function add_default_unit_status(){

    $default_unit_status = array();

    $default_unit_status[] = array("master_type"	=>"unit-status","value"=>"Sold","data"=>"");

    $default_unit_status[] = array("master_type"	=>"unit-status","value"=>"Available","data"=>"");
    
    $default_unit_status[] = array("master_type"    =>"unit-status","value"=>"Blocked","data"=>"");
    
    $default_unit_status[] = array("master_type"    =>"unit-status","value"=>"Not Released","data"=>"");

    $return = set_defaults_data($default_unit_status);

    return;
}

//add custom fields to unit post type


function add_unit_metaboxes() {

    add_meta_box('units_add_variant', 'Add Variant', 'add_variant', 'unit', 'normal', 'default');

}

add_action( 'add_meta_boxes', 'add_unit_metaboxes' );

// The Event Location Metabox
function add_variant() {
    global $post;
    // Noncename needed to verify where the data originated

    $unit_variant =   get_post_meta($post->ID, 'unit_variant', true);

    $unit_building =   get_post_meta($post->ID, 'building', true);

    $floor =   get_post_meta($post->ID, 'floor', true);

    $unit_variant =   get_post_meta($post->ID, 'unit_variant', true);

    $unit_status =   get_post_meta($post->ID, 'unit_status', true);

    $unit_type = get_unit_type_by_unit_variant($unit_variant);

    // Noncename needed to verify where the data originated
    echo '<input type="hidden" name="pagemeta_add_variant" id="pagemeta_add_variant" value="' .wp_create_nonce( plugin_basename(__FILE__) ) . '" />';
    ?>
     <table>
        <tr>
            <td>Select Unit Type</td>
            <td><select  name="unit_type" id="unit_type"  style="width:95%" >

                    <option value="">Select</option>
                    <?php

                    $unit_types = get_unit_types();

                    foreach ($unit_types as $unit_type_item){

                        ?>
                        <option value="<?php echo $unit_type_item['id']; ?>"  <?php if($unit_type==$unit_type_item['id']){ echo "selected"; }?>><?php echo  $unit_type_item['name']?></option>
                    <?php } ?>
                </select>
            </td>
        </tr>
         <tr>
             <td>Select Unit Variant</td>
             <td><select  name="unit_variant" id="unit_variant"  style="width:95%" >
                     <option value="">Select</option>
                     <?php
                         $unit_variants = get_unit_variants_by_unit_type($unit_type);
                         foreach ($unit_variants as $unit_variant_item){

                         ?>
                         <option value="<?php echo $unit_variant_item['variant_id']; ?>"  <?php if($unit_variant==$unit_variant_item['variant_id']){ echo "selected"; }?>><?php echo  $unit_variant_item['variant_name']?></option>
                        <?php }

                     ?>
                 </select>
             </td>
         </tr>
         <tr>
             <td>Select Floor</td>
             <td><select  name="floor" id="floor"  style="width:95%" >
                     <option value="">Select</option>
                     <?php
                     for($i=1;$i<=15;$i++){
                         ?>
                        <option value="<?php echo $i;?>" <?php if($floor==$i){ echo "selected"; }?>><?php echo $i;?></option>
                        <?php
                     }
                     ?>
                 </select>
             </td>
         </tr>
         <tr>
             <td>Select Building</td>
             <td><select  name="building" id="building"  style="width:95%" >
                     <option value="">Select</option>
                     <?php
                        $buildings = get_buildings();
                        foreach($buildings as $building){
                        ?>
                            <option value="<?php echo $building['id']; ?>" <?php if($unit_building==$building['id']){ echo "selected"; }?>><?php echo  $building['name']?></option>
                        <?php
                        }
                     ?>
                 </select>
             </td>
         </tr>
         <tr>
             <td>Select Status</td>
             <td><select  name="unit_status" id="unit_status"  style="width:95%" >

                     <option value="">Select</option>
                     <?php
                     $unit_statuses = get_unit_status();

                     foreach($unit_statuses as $unit_status_item){
                         ?>

                         <option value="<?php echo $unit_status_item["id"];?>" <?php if($unit_status==$unit_status_item["id"]){ echo "selected"; }?>><?php echo $unit_status_item["name"];?></option>

                         <?php
                     }

                     ?>
                 </select>
             </td>
         </tr>
     </table>
<?php
}

function unit_enqueue_scripts($hook) {

    wp_enqueue_script( 'backend_custom', get_template_directory_uri() . '/js/src/backend-custom.js' );
}
add_action( 'admin_enqueue_scripts', 'unit_enqueue_scripts' );

function save_unit($post_id, $post){



    if($post->post_type!="unit"){
        return $post->ID;
    }


    $unit_variant = $_REQUEST["unit_variant"];

    $floor = $_REQUEST["floor"];

    $building = $_REQUEST["building"];

    $facing = $_REQUEST["facing"];

    $unit_status = $_REQUEST["unit_status"];

    $unit_assigned = $_REQUEST["unit_assigned"];

    $views = $_REQUEST["views"];

    unit_status_update($post_id);

    update_post_meta($post->ID, 'unit_variant', $unit_variant);

    update_post_meta($post->ID, 'floor', $floor);

    update_post_meta($post->ID, 'building', $building);

    update_post_meta($post->ID, 'facing', $facing);

    update_post_meta($post->ID, 'unit_assigned', $unit_assigned);

    update_post_meta($post->ID, 'apartment_views', $views);

    

    return $post->ID;
}
add_action('save_post', 'save_unit', 1, 2);


function unit_status_update($unit){

    $blocked_by = $_REQUEST["blocked_by"];

    $for_customer = $_REQUEST["for_customer"];

    $blocked_on = $_REQUEST["blocked_on"];

    $blocked_till = $_REQUEST["blocked_till"];

    $block_status_comments = $_REQUEST["block_status_comments"];

    $unit_status = $_REQUEST["unit_status"];

    $prev_unit_status = get_post_meta($unit,"unit_status",true);

    if(is_blocked_status($unit_status)){

        update_post_meta($unit, 'blocked_by', $blocked_by);

        update_post_meta($unit, 'for_customer', $for_customer);

        if(!is_blocked_status($prev_unit_status)){
        
            update_post_meta($unit, 'blocked_on', convert_custom_to_mysql_date($blocked_on));

        }
        update_post_meta($unit, 'blocked_till', convert_custom_to_mysql_date($blocked_till));

        update_post_meta($unit, 'block_status_comments', $block_status_comments);
    }else{

        update_post_meta($unit, 'blocked_by', '');

        update_post_meta($unit, 'for_customer',  '');

        update_post_meta($unit, 'blocked_on',  '');

        update_post_meta($unit, 'blocked_till', '');

        update_post_meta($unit, 'block_status_comments',  '');

    }

    update_post_meta($unit, 'unit_status', $unit_status);
}


function is_blocked_status($status_id){


   $status = get_unit_status($status_id) ;

   if($status[0]["name"]=="Blocked"){
        return true;
   }else{
        return false;
   }


}
//delete building
function ajax_delete_unit(){

    $unit = $_REQUEST["id"];

    wp_delete_post( $unit, 1 );
 

$response = json_encode( array('msg'=> 'Successfully Deleted Apartment') );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_delete_unit','ajax_delete_unit'); 

function ajax_get_unit_variants(){

    $unit_type = $_REQUEST["unit_type"];

    $floor = $_REQUEST["floor"];

    $unit_variants = get_unit_variants_by_unit_type($unit_type,$floor);

    $response = json_encode( $unit_variants );

    header( "Content-Type: application/json" );

    echo $response;

    exit;

}
add_action('wp_ajax_get_unit_variants','ajax_get_unit_variants');
add_action('wp_ajax_nopriv_get_unit_variants','ajax_get_unit_variants');

/*get unit variants by unit type*/
function get_unit_variants_by_unit_type($unit_type=0,$floor=''){

    global $wpdb;

    $variant_type_where_clause = '';

    if($floor!=''){

        if ($floor % 2 == 0) {

            $variant_type_where_clause = " and ITEMMASTERVTYPE.meta_value = 'even'";

        }else{

            $variant_type_where_clause = " and ITEMMASTERVTYPE.meta_value = 'odd'";

        }
 
    }
    $query = "  SELECT ITEMMASTERVTYPE.meta_value as variant_type, ITEMMASTERNAME.meta_value as variant_name, ITEMMASTERNAME.item_id variant_id FROM ".$wpdb->prefix."frm_items ITEMS JOIN ".$wpdb->prefix."frm_item_metas ITEMMASTERUNITTYPE ON ITEMS.id = ITEMMASTERUNITTYPE.item_id AND ITEMMASTERUNITTYPE.meta_value = '".$unit_type."' AND ITEMMASTERUNITTYPE.field_id = (select id from ".$wpdb->prefix."frm_fields where `type` = 'unittype' and form_id = 24) AND ITEMS.form_id = 24 JOIN ".$wpdb->prefix."frm_item_metas ITEMMASTERNAME ON ITEMMASTERUNITTYPE.item_id = ITEMMASTERNAME.item_id AND ITEMMASTERNAME.field_id = (select id from ".$wpdb->prefix."frm_fields where `field_key` = 'name' and form_id = 24) JOIN ".$wpdb->prefix."frm_item_metas ITEMMASTERVTYPE ON ITEMMASTERUNITTYPE.item_id = ITEMMASTERVTYPE.item_id AND ITEMMASTERVTYPE.field_id = (select id from ".$wpdb->prefix."frm_fields where `field_key` = 'variant_type' and form_id = 24) ".$variant_type_where_clause;
 
    $unit_variants = $wpdb->get_results( $query,ARRAY_A);
 
    return $unit_variants;
}


function get_unit_type_by_unit_variant($unit_variant=0){

    global $wpdb;

    $query = "Select meta_value as unit_type from ".$wpdb->prefix."frm_item_metas where item_id = $unit_variant and field_id = (select ID from ".$wpdb->prefix."frm_fields where form_id = 24 and  type = 'unittype')";

    $unit_type = $wpdb->get_var( $query);

    return $unit_type;
}



/*get unit variants by unit type*/
function get_unit_variants($variant_id=0){

    global $frm_entry;


    if($variant_id==0){
     $results=   $frm_entry->getAll(array('it.form_id' => 24),'','',true);
    }else{
       $results=   $frm_entry->getAll(array('it.id' => $variant_id),'','',true);  
    }
   
 


    $unit_variants = array();
    foreach($results as $result){

        $persqftprice = is_null($result->metas['persqftprice'])?0:$result->metas['persqftprice'];
        
        $url2dlayout_image_id = $result->metas['2dlayout'];

        $url2dlayout_image = wp_get_attachment_image_src( $url2dlayout_image_id, 'large'    ); 
        
        $url3dlayout_image_id = $result->metas['3dlayout'];

        $url3dlayout_image = wp_get_attachment_image_src( $url3dlayout_image_id, 'large'    ); 

        $unit_variants[] = array(   'id'=>intval($result->id),
                                    'name'=>$result->metas['name'] ,
                                    'carpetarea'=>$result->metas['carpetarea'] ,
                                    'sellablearea'=>$result->metas['sellablearea'],
                                    'terracearea'=>$result->metas['terracearea'],  
                                    'premiumaddon'=>$result->metas['premiumaddon'],
                                    'url2dlayout_image'=>$url2dlayout_image[0],
                                    'url3dlayout_image'=>$url3dlayout_image[0],
                                    'roomsizes'=>get_room_type_for_sizes_name($result->metas['roomsizes']),
                                    'terraceoptions'=>intval($result->metas['terraceoptions'])
                                    );
    }

    return $unit_variants;
}
/*get unit variants by unit type*/
function get_unit_variants_property($variant_id,$property){

global $frm_entry;

    $results=   $frm_entry->getAll(array('it.id' => $variant_id),'','',true);  
    
    $property_value  =   $results[$variant_id]->metas[$property] ;
        
    return $property_value;
}

function get_unit_variants_persqftprice($variant_id=0){

    global $frm_entry;
    if($variant_id==0){
     $results=   $frm_entry->getAll(array('it.form_id' => 24),'','',true);
    }else{
       $results=   $frm_entry->getAll(array('it.id' => $variant_id),'','',true);  
    }
   
 $persqftprice = floatval($results[$variant_id]->metas['persqftprice']);

 return ($persqftprice=="")?0:$persqftprice;
 

}

function get_unit_variants_sellablearea($variant_id=0){

    global $frm_entry;
    if($variant_id==0){
     $results=   $frm_entry->getAll(array('it.form_id' => 24),'','',true);
    }else{
       $results=   $frm_entry->getAll(array('it.id' => $variant_id),'','',true);  
    }
   
 
   
 $sellablearea = floatval($results[$variant_id]->metas['sellablearea']);

 return ($sellablearea=="")?0:$sellablearea; 
 

}


//get_unit_variants_persqftprice
function ajax_get_unit_variants_persqftprice(){
 
$variant_id = $_REQUEST["variant_id"]; 

$response = json_encode( get_unit_variants_persqftprice($variant_id) );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_get_unit_variants_persqftprice','ajax_get_unit_variants_persqftprice'); 
add_action('wp_ajax_nopriv_get_unit_variants_persqftprice','ajax_get_unit_variants_persqftprice'); 


//function to get names of the room types for sizes 
function get_room_type_for_sizes_name($data){

    $updated_data = array();
 
    if(is_array($data)){
         foreach ($data as $key => $value) {

        $room_type_for_sizes = get_room_type_for_sizes($value["room_type"]);
     
        $value["room_type_id"] =  intval($value["room_type"]);

        $value["room_type"] =  $room_type_for_sizes[0]["name"];

         $updated_data[] = $value;
    }

    }
   
    return $updated_data;
}

/*get all units*/
function get_units(){

    $results = get_posts(array(

                'post_type'=>'unit',
                'posts_per_page' => -1

                )
    );

    $units = array();

    foreach($results as $result){

        $unit_variant =   get_post_meta($result->ID, 'unit_variant', true);

        $unit_building =   get_post_meta($result->ID, 'building', true);

        $unit_facing =   maybe_unserialize(get_post_meta($result->ID, 'facing', true));

        if(is_array($unit_facing)){
               $unit_facing = array_map ('intval', $unit_facing);
        }else{
            $unit_facing = array();
        }

        $floor =   get_post_meta($result->ID, 'floor', true);

        $unit_variant =   get_post_meta($result->ID, 'unit_variant', true);

        $unit_status =   get_post_meta($result->ID, 'unit_status', true);

        $unit_assigned =   get_post_meta($result->ID, 'unit_assigned', true);

        $views =   get_post_meta($result->ID, 'apartment_views', true);

        $unit_type = get_unit_type_by_unit_variant($unit_variant);

        $unitprice = get_unit_price($result->ID);//(parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
        
        $premiumunitprice = get_premium_unit_price($result->ID);//(parseInt( unitVariantmodel.get('persqftprice')) + parseInt(floorRiseValue)) * parseInt(unitVariantmodel.get 'sellablearea')
        
        $blocked_by =   get_post_meta($result->ID, 'blocked_by', true);

        $for_customer =   get_post_meta($result->ID, 'for_customer', true);

        $blocked_on =   get_post_meta($result->ID, 'blocked_on', true);

        $blocked_till =   get_post_meta($result->ID, 'blocked_till', true);
        
        $block_status_comments =   get_post_meta($result->ID, 'block_status_comments', true);
       
       $terrace = get_unit_variants_property($unit_variant,'terraceoptions');
       $single_unit = array(   'id'=>intval($result->ID),
                                    'name'=>$result->post_title,
                                    'unitType'=>intval($unit_type),
                                    'unitVariant'=>intval($unit_variant),
                                    'building'=>intval($unit_building),
                                    'floor'=>intval($floor), 
                                    'status'=>intval($unit_status),
                                    'unitAssigned'=>intval($unit_assigned),
                                    'unitPrice'=> ($unitprice),
                                    'premiumUnitPrice'=> ($premiumunitprice), 
                                    'blockedBy'=> ($blocked_by),
                                    'forCustomer'=> ($for_customer),
                                    'blockedOn'=> convert_mysql_to_custom_date($blocked_on),
                                    'blockedTill'=> convert_mysql_to_custom_date($blocked_till),
                                    'blockStatusComments'=> ($block_status_comments),
                                    'terrace'=>intval($terrace)
                                );
        if(current_user_can('does_sales')){


            $unit_facing =   maybe_unserialize(get_post_meta($result->ID, 'facing', true));

            if(is_array($unit_facing)){

                   $unit_facing = $unit_facing;
            }else{
                    $unit_facing = array();
            }

            $apartment_views =   get_post_meta($result->ID, 'apartment_views', true);
           
            $single_unit['apartment_views'] = $apartment_views;

            $single_unit['facing'] = $unit_facing;
        }

        $units[] =  $single_unit;



    }

    return $units;
}

/* get_unit_price*/

function get_unit_price($unit_id)
{
    $unit_variant =   get_post_meta($unit_id, 'unit_variant', true);
 
    $unit_building =   get_post_meta($unit_id, 'building', true);

    $floor =   get_post_meta($unit_id, 'floor', true);
 
    $persqftprice   = get_unit_variants_persqftprice($unit_variant);
     
    $sellablearea = get_unit_variants_sellablearea($unit_variant); 

    $floorrise = get_building_floorrise($unit_building,$floor);
 
    return  (intval($persqftprice)+intval($floorrise))* intval($sellablearea);
  
}

/*
get_premium_unit_price
*/
function get_premium_unit_price($unit_id){
    
    $unit_variant =   get_post_meta($unit_id, 'unit_variant', true);
 
    $unit_building =   get_post_meta($unit_id, 'building', true);

    $floor =   get_post_meta($unit_id, 'floor', true);

    $variant_data = (get_unit_variants($unit_variant));
     
    $persqftprice   = get_unit_variants_persqftprice($unit_variant);
     
    $sellablearea = get_unit_variants_sellablearea($unit_variant); 

    $floorrise = get_building_floorrise($unit_building,$floor);

    return  (intval($persqftprice)+intval($floorrise))* intval($sellablearea);
}
/*get unit by id*/
function get_unit_by_id($id){

    $result = get_post($id);

    $unit_variant =   get_post_meta($result->ID, 'unit_variant', true);

    $unit_building =   get_post_meta($result->ID, 'building', true);

    $unit_facing =   maybe_unserialize(get_post_meta($result->ID, 'facing', true));

        if(is_array($unit_facing)){
               $unit_facing = array_map ('intval', $unit_facing);
        }else{
            $unit_facing = array();
        }

    $floor =   get_post_meta($result->ID, 'floor', true);

    $unit_variant =   get_post_meta($result->ID, 'unit_variant', true);

    $unit_status =   get_post_meta($result->ID, 'unit_status', true);

    $unit_assigned =   get_post_meta($result->ID, 'unit_assigned', true);

    $apartment_views =   get_post_meta($result->ID, 'apartment_views', true);

    $blocked_by =   get_post_meta($result->ID, 'blocked_by', true);

    $for_customer =   get_post_meta($result->ID, 'for_customer', true);

    $blocked_on =   get_post_meta($result->ID, 'blocked_on', true);

    $blocked_till =   get_post_meta($result->ID, 'blocked_till', true);

    $block_till_limit = date('d/m/Y', strtotime($blocked_on. ' + 30 days'));

    $block_status_comments =   get_post_meta($result->ID, 'block_status_comments', true);

    $unit_type = get_unit_type_by_unit_variant($unit_variant);

    return array(   'id'=>$result->ID,
                    'name'=>$result->post_title,
                    'unit_type'=>$unit_type,
                    'unit_variant'=>$unit_variant,
                    'building'=>$unit_building,
                    'floor'=>$floor,
                    'unit_assigned'=>$unit_assigned,
                    'apartment_views'=>$apartment_views,
                    'status'=>$unit_status,
                    'facing'=>$unit_facing,
                    'blocked_by'=>$blocked_by,
                    'for_customer'=>$for_customer,
                    'blocked_on'=>convert_mysql_to_custom_date($blocked_on),
                    'blocked_till'=>convert_mysql_to_custom_date($blocked_till),
                    'block_status_comments'=>$block_status_comments,
                    'block_till_limit'=>$block_till_limit
                );
}


function ajax_save_apartment(){

    $msg = "";
    $data  = "";
    $error = false;

    $floor = $_REQUEST["floor"];

    $building = $_REQUEST["building"]; 

    $apartment_id = $_REQUEST["apartment_id"]==""?0:$_REQUEST["apartment_id"]; 

    $flats_info = get_flats_on_floor($building ,$floor,$apartment_id);

    if($flats_info["created_flats"]==count($flats_info["flats"]) && empty($_REQUEST['apartment_id'])){
         $msg = "Cannot add more apartments on the selected floor and building!";
         $error = true;
    }

    if(duplicate_apartment($_REQUEST)){

        $msg = "Apartment Already Exists!";
        $error = true;

    }
    if($error == false){

         if(empty($_REQUEST['apartment_id'])){

                 // Create post object
                 $unit = array(
                     'post_title'    => $_REQUEST["flat_no"],
                     'post_status'   => 'publish',
                     'post_type'   => 'unit',
                 );

// Insert the post into the database
                 $apartment_id = wp_insert_post( $unit );

                if(is_wp_error($apartment_id)) {

                    $error = true;

                    $msg = "Error Creating Apartment!";

                 }
                 $msg = "Apartment Created Successfully!";

             }
            else{
                $unit = array(
                    'ID'    => $_REQUEST['apartment_id'],
                    'post_title'    => $_REQUEST["flat_no"],
                    'post_status'   => 'publish',
                    'post_type'   => 'unit',
                );
// Insert the post into the database
                $apartment_id = wp_update_post( $unit );

                $msg = "Apartment Updated Successfully!";
            }

    }

            


$response = json_encode( array('msg'=>$msg,'error'=>$error,'data'=> array('apartment_id'=>$apartment_id)) );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_save_apartment','ajax_save_apartment'); 


function get_flats_on_floor($building ,$floor,$apartment_id){

    global $wpdb;

    $flats = array();

    $building_exceptions = maybe_unserialize(get_option('building_'.$building.'_exceptions'));
    
    //var to check if floor is found in exception
    $floor_in_exception = 0;
    foreach($building_exceptions as $building_exception){

        $building_exception["floors"] =  is_null($building_exception["floors"])?array():$building_exception["floors"];
            if(in_array($floor,$building_exception["floors"])){

                $flats = $building_exception["flats"];

                $floor_in_exception = 1;
            }
      
    }

    if($floor_in_exception ==0){
                
                $flats =  (get_option('building_'.$building.'_no_of_flats'));
 
     }
    $query = "select fd.meta_value as apartment_assigned, fd.post_id as apartment_id  from ".$wpdb->prefix."postmeta flat_floor join ".$wpdb->prefix."postmeta flat_building on flat_building.post_id = flat_floor.post_id   join ".$wpdb->prefix."postmeta fd on    fd.post_id = flat_floor.post_id where   fd.meta_key = 'unit_assigned' and   flat_building.meta_key = 'building' and flat_building.meta_value = $building and  flat_floor.meta_key = 'floor' and flat_floor.meta_value = $floor    ";
 
    $created_flats_results = $wpdb->get_results($query,ARRAY_A);
 
    $created_flats = array();
    foreach($created_flats_results as $created_flat){
        if($apartment_id != $created_flat['apartment_id']){
             $created_flats[$created_flat['apartment_assigned']] = $created_flat['apartment_id'];
        }
       
    }

    $apartment_building = get_post_meta($apartment_id,"building",true);

    $apartment_floor = get_post_meta($apartment_id,"floor",true);
 

    return (array("flats"=>($flats),"created_flats"=>$created_flats));
}
function ajax_get_flats_on_floor(){

    $building = $_REQUEST["building"];

    $floor = $_REQUEST["floor"];

    $apartment_id = $_REQUEST["apartment_id"]==""?0:$_REQUEST["apartment_id"]; 

    $flats = get_flats_on_floor($building ,$floor, $apartment_id);

    $response = json_encode( $flats );

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}
add_action('wp_ajax_get_flats_on_floor','ajax_get_flats_on_floor');
add_action('wp_ajax_nopriv_get_flats_on_floor','ajax_get_flats_on_floor');


//function to check for duplicate apartments


function duplicate_apartment($data){
  
    $args = array( 
    'exclude' => $data["apartment_id"],
    'post_type' => 'unit',
    'meta_query' => array(
        array(
            'key' => 'unit_variant',
            'value' =>  $data["unit_variant"],
        ),
        array(
            'key' => 'floor',
            'value' => $data["floor"],
        ),
        array(
            'key' => 'building',
            'value' => $data["building"],
        ),
        array(
            'key' => 'unit_status',
            'value' => $data["unit_status"],
        ),
        array(
            'key' => 'unit_assigned',
            'value' => $data["unit_assigned"],
        ),
    )
 );


$apartments = get_posts( $args );

$return = false;

foreach($apartments as $apartment){
 
        if($apartment->post_title==$data["flat_no"]){
            $return = true;
        }

}  

return $return;
    
}


function ajax_get_server_block_date(){

    $apartment_id = $_REQUEST["id"]; 

    $apartment_status = get_post_meta($apartment_id,'unit_status',true);

    if(is_blocked_status($apartment_status)){

        $apartment_block_date = get_post_meta($apartment_id,'blocked_on',true);

        
        $apartment_block_till_limit = date('d/m/Y', strtotime($apartment_block_date. ' +30 days'));
        $apartment_block_date = strtotime($apartment_block_date);
        $apartment_block_date = date('d/m/Y',$apartment_block_date);

    }else{

        $apartment_block_date = date('d/m/Y');
        $apartment_block_till_limit =   date("d/m/Y", strtotime(date("Y-m-d"). " +30 days"));

    }
     

    $response = json_encode( array('blocked_on_date'=>$apartment_block_date,'apartment_block_till_limit'=>$apartment_block_till_limit) );

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}
add_action('wp_ajax_get_server_block_date','ajax_get_server_block_date'); 



function get_unit_single_details($id){

    $result = get_post($id);

    $unit_variant =   get_post_meta($result->ID, 'unit_variant', true);
    
    $unit_facing =   maybe_unserialize(get_post_meta($result->ID, 'facing', true));

        if(is_array($unit_facing)){

               $unit_facing = array_map ('intval', $unit_facing);

        }else{

            $unit_facing = array();

        }

   
    $apartment_views =   get_post_meta($result->ID, 'apartment_views', true);

    $persqftprice    =   get_unit_variants_persqftprice($unit_variant);

    return array(
                'id' => $id,

                'views'=>$apartment_views,

                'facings'=>$unit_facing,

                'persqftprice'=>$persqftprice,

            );

}


function ajax_get_unit_single_details(){

    $id = $_REQUEST["id"];  

    $response = json_encode(get_unit_single_details($id));

    header( "Content-Type: application/json" );

    echo $response;

    exit;
}
add_action('wp_ajax_get_unit_single_details','ajax_get_unit_single_details'); 
add_action('wp_ajax_nopriv_get_unit_single_details','ajax_get_unit_single_details');

//function to the flats on each floor in a particular position
function get_building_unit_assigned_to_position($building,$flatposition){

        $flats_in_position = array();
        $args = array(
                        'post_type' => 'unit', 
                        'posts_per_page'=>-1 ,
                        'meta_query' => array(
                            'relation' => 'AND',

                            array(
                                'key'     => 'building',
                                'value'   => $building,
                                'compare' => '=',
                            ), 
                            array(
                                'key'     => 'unit_assigned',
                                'value'   => $flatposition,
                                'compare' => '=',
                            ), 
                        ), 
                        'orderby' => 'meta_value_num', 
                        'order'     => 'ASC',
                        'meta_key' => 'floor'
                );
        $query = new WP_Query( $args );
        $i = 1;
         foreach($query->posts as $unit){ 
            
            $flats_in_position[ $i ] = $unit->ID;
            $i++;
         } 
         return arrayToObject($flats_in_position);
   
} 