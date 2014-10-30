<?php


function add_default_flats_and_floors(){

    $default_facings = array();

    $default_facings[] = array("master_type"	=>"max-no-of-flats","value"=>"15","data"=>"");

    $default_facings[] = array("master_type"	=>"max-no-of-floors","value"=>"20","data"=>"");


    $return = set_defaults_data($default_facings);

}
function add_default_facings(){

    $default_facings = array();

    $default_facings[] = array("master_type"	=>"facings","value"=>"East","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"West","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"North","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"South","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"North-East","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"North-West","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"South-East","data"=>"");

    $default_facings[] = array("master_type"	=>"facings","value"=>"South-West","data"=>"");

    $return = set_defaults_data($default_facings);

    return;
}
function add_default_phases(){

    $default_phases = array();

    $default_phases[] = array("master_type"	=>"phases","value"=>"Phase 1","data"=>"");

    $default_phases[] = array("master_type"	=>"phases","value"=>"Phase 2","data"=>"");

    $default_phases[] = array("master_type"	=>"phases","value"=>"Phase 3","data"=>"");

    $default_phases[] = array("master_type"	=>"phases","value"=>"Phase 4","data"=>"");

    $return = set_defaults_data($default_phases);

    return;
}


function add_default_views(){

    $default_views = array();

    $default_views[] = array("master_type"	=>"views","value"=>"Sports Facility","data"=>"");

    $default_views[] = array("master_type"	=>"views","value"=>"Manas Lake","data"=>"");

    $default_views[] = array("master_type"	=>"views","value"=>"4 Lane Road","data"=>"");

    $default_views[] = array("master_type"	=>"views","value"=>"Courtyard","data"=>"");

    $default_views[] = array("master_type"	=>"views","value"=>"Central Park","data"=>"");
 
    $return = set_defaults_data($default_views);

    return;
}



//add custom fields for building taxonomy


function extra_building_fields($tag){

    $term_id = $tag->term_id;

    $building_facings_view = maybe_unserialize(get_option( "building_".$term_id."_facings_view",true));

    $building_phase = get_option( "building_".$term_id."_phase");


    if (is_null($term_id)){
        ?>
        <div class="form-field">
            <label for="tag-slug">Facings</label>
            <?php
                $buiding_facings = get_facings();

                $views =  get_views();

                $buiding_facing_ids = array();

                foreach($buiding_facings as $buiding_facing){

                    ?>
                    <div><?php echo ($buiding_facing['value']);?>:</div>

                    <table bgcolor="white" width="95%">
                            <?php
                                $c = 1;
                                foreach($views as $view){

                                    if($c==1){
                                        ?><tr><?php
                                    }

                                    ?>
                                    <td width="50%"><input style="width:5%" type="checkbox"  name="facing-views-<?php echo $buiding_facing['id'];?>[]" value="<?php echo $view["id"];?>"><?php echo $view["name"];?></td>
                                    <?php
                                    $c++;
                                    if($c==3){

                                    ?>
                                    </tr>
                                    <?php
                                        $c=1;
                                    }

                                }
                            if($c>1){
                                ?></tr><?php
                            }
                            ?>

                    </table>
                    <?php
                    $buiding_facing_ids[] = $buiding_facing['id'];
                }
            ?>
            <input type="hidden" name="buiding_facing_ids" id="buiding_facing_ids" value="<?php echo implode(",",$buiding_facing_ids);?>">
            <p><?php _e( 'select the views for each building facings' ); ?></p>
        </div>
        <div class="form-field">
        <label for="tag-slug">Phase</label>
            <select  name="building_phase" id="building_phase"  style="width:95%" >

                <option value="">Select</option>
                <?php

                $phases = get_phases();

                foreach ($phases as $phase){

                    ?>
                    <option value="<?php echo $phase['id']; ?>"  <?php if($building_phase==$phase['id']){ echo "selected"; }?>><?php echo  $phase['name']?></option>
                <?php } ?>
            </select>
        </div>
    <?php
    }else{
        ?>
        <tr class="form-field textbook_fields" >
            <th scope="row" valign="top"><?php _e( 'Facings' ); ?>
               </label></th>
            <td>
                <div class="row form-input">
                    <?php
                    $buiding_facings = get_facings();

                    $views =  get_views();

                    $buiding_facing_ids = array();

                    foreach($buiding_facings as $buiding_facing){

                        ?>
                        <div><?php echo ($buiding_facing['value']);?>:</div>

                        <table bgcolor="white" width="95%">
                            <?php
                            $c = 1;
                            foreach($views as $view){

                            if($c==1){
                            ?><tr><?php
                        }

                        ?>
                        <td width="25%"><input style="width:5%" type="checkbox"  name="facing-views-<?php echo $buiding_facing['id'];?>[]" value="<?php echo $view["id"];?>" <?php if(is_array($building_facings_view[$buiding_facing['id']])){ if(in_array($view["id"],$building_facings_view[$buiding_facing['id']])){ echo "checked"; }}?>><?php echo $view["name"];?></td>
                        <?php
                        $c++;
                        if($c==5){

                        ?>
                        </tr>
                            <?php
                            $c=1;
                            }

                            }
                            if($c>1){
                            ?></tr><?php
                        }
                        ?>

                        </table>
                        <?php
                        $buiding_facing_ids[] = $buiding_facing['id'];
                    }
                    ?>
                    <input type="hidden" name="buiding_facing_ids" id="buiding_facing_ids" value="<?php echo implode(",",$buiding_facing_ids);?>">

                    <br>
                    <span class="description"><?php _e( 'select the views for each building facings' ); ?></span>
                </div>
                <div class="form-field">
                    <label for="tag-slug">Phase</label>
                    <select  name="building_phase" id="building_phase"  style="width:95%" >

                        <option value="">Select</option>
                        <?php

                        $phases = get_phases();

                        foreach ($phases as $phase){

                            ?>
                            <option value="<?php echo $phase['id']; ?>"  <?php if($building_phase==$phase['id']){ echo "selected"; }?>><?php echo  $phase['name']?></option>
                        <?php } ?>
                    </select>
                </div>
            </td>
        </tr>
    <?php
    }
    ?>


<?php
}

add_action( 'building_add_form_fields', 'extra_building_fields', 10, 2 );

add_action( 'building_edit_form_fields', 'extra_building_fields', 10, 2 );


// save extra building taxonomy fields callback function
function save_extra_building_fields( $term_id ) {
 
    $no_of_floors = $_REQUEST["no_of_floors"];
    $no_of_flats_count = $_REQUEST["no_of_flats"]; 

    $no_of_flats = array();
    for($i=1;$i<=$no_of_flats_count;$i++){

        $basic_image_id = $_REQUEST["basic_image_id".$i];
        $detailed_image_id = $_REQUEST["detailed_image_id".$i];
        $no_of_flats[] = array("flat_no"=>$i);
    }

     $building_phase =  $_REQUEST['building_phase'];

     $building_payment_plan =  $_REQUEST['building_payment_plan'];

     $building_milestone =  $_REQUEST['building_milestone'];

     $building_phase =  $_REQUEST['building_phase'];

     $position_in_project =  $_REQUEST['position_in_project'];

     $zoomed_in_image =  $_REQUEST['zoomed_in_image'];

     $floor_layout_basic =  $_REQUEST['floor_layout_basic'];

     $floor_layout_detailed =  $_REQUEST['floor_layout_detailed'];
 

     $building_views =  $_REQUEST['views'];

     $lowrisefrom =  $_REQUEST['lowrisefrom'];

     $lowriseto =  $_REQUEST['lowriseto'];

     $midrisefrom =  $_REQUEST['midrisefrom'];

     $midriseto =  $_REQUEST['midriseto'];

     $highrisefrom =  $_REQUEST['highrisefrom'];

     $highriseto =  $_REQUEST['highriseto'];

    $floorrise_range = array( "low"     =>array("start"=> $lowrisefrom,"end"=>$lowriseto),
                              "medium"     =>array("start"=> $midrisefrom,"end"=>$midriseto),
                              "high"    =>array("start"=> $highrisefrom,"end"=>$highriseto)
                              );

    $exceptions = array();
     $exceptions_count =  $_REQUEST['exceptions_count'];

     for($e = 1;$e<=$exceptions_count;$e++){
        $exception_floors = $_REQUEST['exception_floors'.$e];
        $exception_flats_count = $_REQUEST['no_of_flats'.$e]; 
        if($exception_flats_count==""){

            $exception_flats_count = $no_of_flats_count;
        }
       $exceptionfloor_layout_basic = $_REQUEST['exceptionfloor_layout_basic'.$e];
       $exceptionfloor_layout_detailed = $_REQUEST['exceptionfloor_layout_detailed'.$e];
        $no_of_exception_flats = array();
        for($i=1;$i<=$exception_flats_count;$i++){

                 $no_of_exception_flats[] = array("flat_no"=>$i, 
                                        );
            }
        $exceptions[] = array(  'floors'=>$exception_floors,
                                'flats'=>$no_of_exception_flats, 
                                'floor_layout_basic'=>$exceptionfloor_layout_basic,
                                'floor_layout_detailed'=>$exceptionfloor_layout_detailed,
                            );


     }  
    $floor_rise = array();
     for($i=1;$i<=$no_of_floors;$i++){
        
        $floor_rise[$i] = $_REQUEST["floor_rise_".$i];

     }
 

 //milestone completion
    $milestone_completion = array();
    $payment_plan_milestones = get_payment_plan_milestones($building_payment_plan);
    foreach($payment_plan_milestones as $payment_plan_milestone){
        $milestone_completion[$payment_plan_milestone["milestone"]] =  $_REQUEST["milestone_completion_".$payment_plan_milestone["milestone"]] ;

    }

    //SVG Positions

    $svg_position_file_1 = $_REQUEST["svg_position_file_1"];

    $flat_position_1 = $_REQUEST["flatpostion-1"];

    $svg_position_file_2 = $_REQUEST["svg_position_file_2"];

    $flat_position_2 = $_REQUEST["flatpostion-2"];
    
    $svg_position_file_3 = $_REQUEST["svg_position_file_3"];

    $flat_position_3 = $_REQUEST["flatpostion-3"];
    
    $svg_position_file_4 = $_REQUEST["svg_position_file_4"];

    $flat_position_4 = $_REQUEST["flatpostion-4"];

    $svg_data = array(
                        array('svgposition'=>$flat_position_1,"svgfile"=>$svg_position_file_1 ),
                        array('svgposition'=>$flat_position_2,"svgfile"=>$svg_position_file_2 ),
                        array('svgposition'=>$flat_position_3,"svgfile"=>$svg_position_file_3 ),
                        array('svgposition'=>$flat_position_4,"svgfile"=>$svg_position_file_4 ),

                );


        //save the option array


    update_option( "building_".$term_id."_phase", $building_phase );

    update_option( "building_".$term_id."_payment_plan", $building_payment_plan );

    update_option( "building_".$term_id."_milestone", $building_milestone );

    update_option( "building_".$term_id."_milestone_completion", $milestone_completion );

    update_option( "building_".$term_id."_position_in_project", $position_in_project );
    
    update_option( "building_".$term_id."_zoomed_in_image", $zoomed_in_image );
   
    update_option( "building_".$term_id."_floor_layout_basic", $floor_layout_basic );
    
    update_option( "building_".$term_id."_floor_layout_detailed", $floor_layout_detailed );

     update_option( "building_".$term_id."_views", $building_views );

    update_option( "building_".$term_id."_no_of_floors", $no_of_floors );

    update_option( "building_".$term_id."_no_of_flats", $no_of_flats );
 
    update_option( "building_".$term_id."_exceptions", $exceptions ); 

    update_option( "building_".$term_id."_floor_rise", $floor_rise ); 

    update_option( "building_".$term_id."_floorrise_range", $floorrise_range ); 

    update_option( "building_".$term_id."_svg_data", $svg_data );

    return;
}
add_action( 'created_building', 'save_extra_building_fields', 10, 2 );

add_action( 'edited_building', 'save_extra_building_fields', 10, 2 );
/*
function get facings

if id is passed then get the bfacings sides by id
*/

function get_facings($id = 0){

    return get_default_data('facings',$id);

}

/*
function get phases

if id is passed then get the phases by id
*/

function get_phases($id = 0){

    return get_default_data('phases',$id);

}


/*
function get max no of floors

*/

function get_max_no_of_floors(){

    $max_no_of_floors = get_default_data('max-no-of-floors');

    return intval($max_no_of_floors[0]["name"]);

}

/*
function get max no of flats

*/

function get_max_no_of_flats(){

    $max_no_of_flats = get_default_data('max-no-of-flats');

    return intval($max_no_of_flats[0]["name"]);

}


/*
function get views

if id is passed then get the views by id
*/

function get_views($id = 0){

    return get_default_data('views',$id);

}

/* get building taxonomy items ,if by id then id should be passed*/

function get_buildings($ids=array())
{


    $categories = get_terms( 'building', array(
        'hide_empty' => 0,
        'include'	=> $ids
    ) );


    foreach($categories as $category){

        $building_no_of_floors = get_option( "building_".$category->term_id."_no_of_floors",true);
        
        $building_phase = get_option( "building_".$category->term_id."_phase",true);

        $building_payment_plan = get_option('building_'.$category->term_id.'_payment_plan');

        $building_milestone = get_option('building_'.$category->term_id.'_milestone');

        $building_milestone_completion = get_option('building_'.$category->term_id.'_milestone_completion');

        $position_in_project =get_image_paths(get_option( "building_".$category->term_id."_position_in_project",0));
        
        $zoomed_in_image =get_image_paths(get_option( "building_".$category->term_id."_zoomed_in_image",0));
       
        $floor_layout_basic = get_image_paths(get_option( "building_".$category->term_id."_floor_layout_basic",0));

        $floor_layout_detailed = get_image_paths(get_option( "building_".$category->term_id."_floor_layout_detailed",0));
          
        $building_floor_rise =  maybe_unserialize(get_option('building_'.$category->term_id.'_floor_rise')) ;
           
        $building_views = get_option('building_'.$category->term_id.'_views');  

        $building_views = is_array($building_views)?$building_views:array();
        
        $floor_positions = get_option( "building_".$category->term_id."_no_of_flats");
 

        $floor_exception_positions = get_option( "building_".$category->term_id."_exceptions");
 
        $svg_data = get_option( "building_".$category->term_id."_svg_data");

        $svg_data = get_svg_data_images($svg_data);

        $svg_data = get_svg_data_format($svg_data,$category->term_id);

 

       $building_exceptions_updated = array();
       
       foreach($floor_exception_positions as $building_exception){
     
            $building_exception["flats"] = $building_exception["flats"];
            if(count($building_exception["flats"])==0){

                $building_exception["flats"] = $floor_positions;
            }

            $building_exception["floor_layout_basic"] =   get_image_paths($building_exception["floor_layout_basic"]);
           
            $building_exception["floor_layout_detailed"] =   get_image_paths($building_exception["floor_layout_detailed"]);
          
            $building_exceptions_updated[] = $building_exception;
       }
       
       $floor_exception_positions = $building_exceptions_updated;
        $floor = array();

        //needs to be chnaged later with real data
        for ($i=1; $i<=$building_no_of_floors;$i++){

            $floor[$i] = $i;
        }

        $floorrise_range = format_floorrise_range(maybe_unserialize(get_option( "building_".$category->term_id."_floorrise_range")));
    
        $buildings[] = array('id'=>intval($category->term_id),"name"=>$category->name,"phase"=>intval($building_phase),"nooffloors"=>$building_no_of_floors,"floorrise"=> array_map('floatval', $building_floor_rise),'positioninproject'=> $position_in_project,"zoomedinimage"=>$zoomed_in_image,"floor_layout_basic"=>$floor_layout_basic,"floor_layout_detailed"=>$floor_layout_detailed,'floorpositions'=>$floor_positions,'floorexceptionpositions'=>$floor_exception_positions,'views'=>$building_views,'payment_plan'=>intval($building_payment_plan),'milestone'=>intval($building_milestone),'floorriserange'=>$floorrise_range,'milestonecompletion'=>$building_milestone_completion,'svgdata'=>$svg_data);

    }

    return $buildings;
}

function format_floorrise_range($floorrise_range){

    if(is_array($floorrise_range)){

        $floorrise_range_formatted = array();

        foreach($floorrise_range as $key =>$floorrise_range_item){

            $floorrise_range_formatted[] = array("name"=>$key,"start"=>$floorrise_range_item["start"],"end"=>$floorrise_range_item["end"]);
        }
        $floorrise_range =  $floorrise_range_formatted;
    }

    return $floorrise_range;
}
//saving building

function ajax_save_building(){

    $msg = "";
    $data  = "";
    $error = false;

             if(empty($_REQUEST['building_id'])){
 
 

// Insert the term building
                 $building_id = wp_insert_term( $_REQUEST["building_name"],
                                                'building',
                                                array('parent'=>0));

                 

                if(is_wp_error($building_id)) {

                    $error = true;

                    $msg = "Error Creating Building!";

                 }
                 $msg = "Building Created Successfully!";

             }
            else{ 
                $building_id = $_REQUEST['building_id'];
                
                wp_update_term($building_id, 'building', array(
                                  'name' =>  $_REQUEST["building_name"]  
                                )) ;

                $msg = "Building Updated Successfully!";
            }


$response = json_encode( array('msg'=>$msg,'error'=>$error,'data'=> array('building_id'=>$building_id)) );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_save_building','ajax_save_building');  

//delete building
function ajax_delete_building(){

    $building = $_REQUEST["id"];

    wp_delete_term( $_REQUEST["id"], 'building' );

    delete_option( "building_".$building."_phase" );

    delete_option( "building_".$building."_no_of_floors" );

    delete_option( "building_".$building."_no_of_flats" );

    delete_option( "building_".$building."_exceptions" ); 


     $args = array(
    'post_type'     =>  'unit',
    'posts_per_page'     =>  '-1',
    'meta_key'    =>   'building',
    'meta_value' =>  $building );
    $apartments =   get_posts( $args );

 foreach($apartments  as $apartment){

    if(!is_null($apartment->ID)){

        wp_delete_post($apartment->ID,true);

    }
 }

$response = json_encode( array('msg'=> 'Successfully Deleted Building') );

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_delete_building','ajax_delete_building');
 //get building data by id
function get_building_by_id($building_id){

    $building =  get_term_by('id', $building_id, 'building');

    $building_phase = get_option('building_'.$building_id.'_phase');

    $building_payment_plan = get_option('building_'.$building_id.'_payment_plan');

    $building_milestone = get_option('building_'.$building_id.'_milestone');

    $building_milestone_completion = get_option('building_'.$building_id.'_milestone_completion');

    $position_in_project =get_image_paths(get_option( "building_".$building_id."_position_in_project",0));
    
    $zoomed_in_image =get_image_paths(get_option( "building_".$building_id."_zoomed_in_image",0));
      
    $floor_layout_basic = get_image_paths(get_option( "building_".$building_id."_floor_layout_basic",0));

    $floor_layout_detailed = get_image_paths(get_option( "building_".$building_id."_floor_layout_detailed",0));
        
    $svg_data = maybe_unserialize(get_option( "building_".$building_id."_svg_data",0));
    
    $svg_data = get_svg_data_images($svg_data);

    $building_views = get_option('building_'.$building_id.'_views');  

    $building_views = is_array($building_views)?$building_views:array();

   $building_no_of_floors = get_option('building_'.$building_id.'_no_of_floors');
   
   $building_no_of_flats = maybe_unserialize(get_option('building_'.$building_id.'_no_of_flats'));
  
   $building_floor_rise =  maybe_unserialize(get_option('building_'.$building_id.'_floor_rise')) ;
   
   $building_floor_rise = is_array($building_floor_rise)?$building_floor_rise:array();
   
   $building_exceptions = maybe_unserialize(get_option('building_'.$building_id.'_exceptions'));
   
   $building_exceptions_updated = array();
   
   foreach($building_exceptions as $building_exception){
 
        $building_exception["flats"] =  $building_exception["flats"];
            
        $building_exception["floor_layout_basic"] =   get_image_paths($building_exception["floor_layout_basic"]);
        
        $building_exception["floor_layout_detailed"] =   get_image_paths($building_exception["floor_layout_detailed"]);

        $building_exceptions_updated[] = $building_exception;
   }
   
   $building_exceptions = $building_exceptions_updated;
   
    $floorrise_range =  (maybe_unserialize(get_option( "building_".$building_id."_floorrise_range")));
    
   $result = array('id'=>intval($building->term_id) ,'name'=>$building->name,'phase'=>$building_phase,'nooffloors'=>$building_no_of_floors,'noofflats'=>$building_no_of_flats,'exceptions'=>$building_exceptions,'floorrise'=>$building_floor_rise,'positioninproject'=> $position_in_project,'zoomedinimage'=> $zoomed_in_image,'floor_layout_basic'=>$floor_layout_basic ,'floor_layout_detailed'=>$floor_layout_detailed ,'buildingviews'=>$building_views,'payment_plan'=>$building_payment_plan,'milestone'=>$building_milestone,'floorriserange'=>$floorrise_range,'milestonecompletion'=>$building_milestone_completion,'svgdata'=>$svg_data);
 
   return ($result);
}



function get_svg_data_images($svg_data){

    $svg_data_return = array();
    if (is_array($svg_data)){

        foreach($svg_data as $svg_item){

        $svg_item["svgfile"] =  get_image_paths($svg_item["svgfile"]);

        $svg_data_return[] = $svg_item;

        }
    }
    

    return $svg_data_return;
}


function get_svg_data_format($svg_data,$building){

    $svg_data_return = array();

   if (is_array($svg_data)){

foreach($svg_data as $svg_item){

$units = array();
if($svg_item["svgposition"] !=NULL){
foreach($svg_item["svgposition"] as $svgposition){


$units[$svgposition] = get_building_unit_assigned_to_position($building,$svgposition);

}
}

$svg_item["units"] = $units;

if(is_array($svg_item["svgposition"])){
$svg_item["svgposition"] = array_map('intval', $svg_item["svgposition"]);
}else{
$svg_item["svgposition"] = $svg_item["svgposition"];
}


$svg_item["svgfile"] = $svg_item["svgfile"]["image_url"];

$svg_data_return[] = $svg_item;

}
}


    return $svg_data_return;
}


function get_building_floorrise($building_id,$floor){

    $floorrise = 0;

    $building_floor_rise =  maybe_unserialize(get_option('building_'.$building_id.'_floor_rise')) ;
   
    $building_floor_rise = is_array($building_floor_rise)?$building_floor_rise:array();
   
   foreach($building_floor_rise as $building_floor_rise_itemkey => $building_floor_rise_item){
        if($building_floor_rise_itemkey==$floor){

            $floorrise = $building_floor_rise_item;
        }
   }
   return $floorrise;
}
//get additional info of flats and pass to the flats array as additional attributes e.g. image path
function get_flats_details($flats,$args=array()){

    $flats_updated = array();

    extract( $args, EXTR_OVERWRITE );

    $no_image = isset($no_image)?$no_image:true;

    if($no_image==false){
        $no_image='';
        $no_image_big ='';
        }else{
        $no_image=get_no_image_150x150();
        $no_image_big =get_no_image_big();
    }

     foreach($flats as $flat){
//wp_get_attachment_image_src
            $flat['basic_thumbnail_image_url'] =  wp_get_attachment_thumb_url($flat["basic_image_id"]);
            
            $flat['basic_thumbnail_image_url']  = $flat['basic_thumbnail_image_url'] ==false?$no_image:$flat['basic_thumbnail_image_url']; 
            
            $flat['detailed_thumbnail_image_url'] =  wp_get_attachment_thumb_url($flat["detailed_image_id"]);
            
            $flat['detailed_thumbnail_image_url']  = $flat['detailed_thumbnail_image_url'] ==false?$no_image:$flat['detailed_thumbnail_image_url']; 
            
             $flat['basic_image_url'] =  wp_get_attachment_image_src($flat["basic_image_id"], 'large' );
            
            $flat['basic_image_url']  = $flat['basic_image_url'] ==false?$no_image_big:$flat['basic_image_url'][0]; 
            
            $flat['detailed_image_url'] =  wp_get_attachment_image_src($flat["detailed_image_id"], 'large' );
            
            $flat['detailed_image_url']  = $flat['detailed_image_url'] ==false?$no_image_big:$flat['detailed_image_url'][0]; 
            

            $flats_updated[]  =  $flat;
        }

    return $flats_updated;
}


function get_building_views($building_id){

    $building =  get_term_by('id', $building_id, 'building');

    $building_views = get_option('building_'.$building_id.'_views');

    $building_views = is_array($building_views)?$building_views:array();

    $building_views_data = array();

   foreach($building_views as $building_view){

        $view = get_views($building_view);

        $building_views_data[] = array("id"=>$view[0]["id"],"name"=>$view[0]["name"]);

   }

   return  $building_views_data; 
}

function ajax_get_building_views(){

$building_id = $_REQUEST["building"];

$response = json_encode( get_building_views($building_id));

header( "Content-Type: application/json" );

echo $response;

exit;
}
add_action('wp_ajax_get_building_views','ajax_get_building_views');
