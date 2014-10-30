<?
//form heading

if(!current_user_can('manage_buildings') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
$heading = "Add";

$no_of_flats = 0;

$building_exceptions  =   $building_views = array();

if(isset($_REQUEST["id"])){

$heading = "Edit";

    $building_id = $_REQUEST["id"];

    $building = (get_building_by_id($building_id));

    $building_name = $building["name"];

    $building_phase = $building["phase"];

    $building_payment_plan = $building["payment_plan"];

    $building_milestone = $building["milestone"];

    $building_milestone_completion = $building["milestonecompletion"];

    $building_views = $building["buildingviews"];

    $position_in_project = $building["positioninproject"];

    $zoomed_in_image = $building["zoomedinimage"];

    $floor_layout_basic = $building["floor_layout_basic"];

    $floor_layout_detailed = $building["floor_layout_detailed"];
     

    $no_of_floors = $building["nooffloors"];

    $building_no_of_flats = $building["noofflats"];

    $no_of_flats = count($building_no_of_flats);

    $floorrise = $building["floorrise"];

    $building_exceptions = $building["exceptions"]; 
 
    $building_floorriserange = $building["floorriserange"]; 
 
    $building_svgdata = $building["svgdata"]; 
 
    if(is_array($building_floorriserange)){
 
       $building_lowrisefrom = $building_floorriserange["low"]["start"];
       $building_lowriseto = $building_floorriserange["low"]["end"];
       $building_lowrise_range = "Floors ".$building_lowrisefrom." - ".$building_lowriseto;
       $building_midrisefrom = $building_floorriserange["medium"]["start"];
       $building_midriseto = $building_floorriserange["medium"]["end"];
       $building_midrise_range = "Floors ".$building_midrisefrom." - ".$building_midriseto;
       $building_highrisefrom = $building_floorriserange["high"]["start"];
       $building_highriseto = $building_floorriserange["high"]["end"];
       $building_highrise_range = "Floors ".$building_highrisefrom." - ".$building_highriseto;
    }
}
?>
<div class="page-title">
 
    <h3>
        <?php echo $heading;?> Building
    </h3>

</div>
<form id="form_add_edit_building"  name = "form_add_edit_building" action="" novalidate="novalidate">
 
<div class="row">
<div class="col-md-6">
<div class="grid simple">
<div class="grid-title no-border">
    <h4>
        Enter Building Details
    </h4>
</div>
<div class="grid-body no-border">

<?php echo wp_nonce_field( plugin_basename( __FILE__ ), 'custom_save_building',true,false);?>
<input type="hidden" name="building_id" id="building_id" value="<?php echo @$building_id;?>" />
                    <br/>
<div class="form-group">
    <label class="form-label">
        Building Name
    </label>
                  <span class="help">
                    ex: Block A
                  </span>
    <div class="input-with-icon  right">

        <i class="">
        </i>
        <input type="text" name="building_name" id="building_name" value="<?php echo $building_name;?>"class="form-control">

    </div>
</div>
<div class="row">
    <div class="col-md-12">
        <div class="form-group">
            <label class="form-label">
                Phase
            </label>

            <div class="input-with-icon  right">

                <i class="">
                </i>
                <select  name="building_phase" id="building_phase"  >

                    <option value="">Select</option>
                    <?php

                    $phases = get_phases();

                    foreach ($phases as $phase){

                        ?>
                        <option value="<?php echo $phase['id']; ?>"  <?php if($building_phase==$phase['id']){ echo "selected"; }?>><?php echo  $phase['name']?></option>
                    <?php } ?>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label class="form-label">
                Position in project
                <?php var_dump($position_in_project);?>
            </label>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-with-icon  right">
                        <span class="btn btn-success fileinput-button">
                             
                            <span>Select file..</span>
                            <input id="fileuploadposition_in_project" class="fileuploadposition_in_project" type="file" name="files">
                        </span>
                        <input type="hidden" class="position_in_project" id="position_in_project" name="position_in_project" value="<?php echo @$position_in_project["id"];?>"> 
                        <div id="progressposition_in_project" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filesposition_in_project" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo @$position_in_project["thumbnail_url"];?>" id="image_displayposition_in_project" <?php if(@$position_in_project["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
             
            </div> 
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label class="form-label">
                Zoomed in image
            </label>
            <div class="row">
                <div class="col-md-6">
                    <div class="input-with-icon  right">
                        <span class="btn btn-success fileinput-button">
                             
                            <span>Select file..</span>
                            <input id="fileuploadzoomed_in_image" class="fileuploadzoomed_in_image" type="file" name="files">
                        </span> 
                        <input type="hidden" class="zoomed_in_image" id="zoomed_in_image" name="zoomed_in_image" value="<?php echo @$zoomed_in_image["id"];?>">
                        <div id="progresszoomed_in_image" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="fileszoomed_in_image" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo @$zoomed_in_image["thumbnail_url"];?>" id="image_displayzoomed_in_image" <?php if(@$zoomed_in_image["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
             
            </div> 
        </div>
    </div>
    <div style="clear:both"></div>
    <div class="col-md-12">
        <div class="form-group">
            <label class="form-label">
                Payment Plan
            </label>

            <div class="input-with-icon  right">

                <i class="">
                </i>
                <select class="form-control"  name="building_payment_plan" id="building_payment_plan"  >

                    <option value="">Select</option>
                    <?php

                    $payment_plans = get_payment_plans();

                    foreach ($payment_plans as $payment_plan){

                        ?>
                        <option value="<?php echo $payment_plan['id']; ?>"  <?php if($building_payment_plan==$payment_plan['id']){ echo "selected"; }?>><?php echo  $payment_plan['name']?></option>
                    <?php } ?>
                </select>
            </div>
        </div>
    </div>
    <div class="col-md-12">
        <div class="form-group">
            <label class="form-label">
                Milestone
            </label>

            <div class="input-with-icon  right">

                <i class="">
                </i>
                <select name="building_milestone" id="building_milestone"class="form-control"   >
                    <option value="">
                        Please Select
                    </option>
                    <?php
                    if(isset($building_payment_plan)){
 
                    $payment_plan_milestones = get_payment_plan_milestones($building_payment_plan);

                    foreach ($payment_plan_milestones as $payment_plan_milestone){

                        ?>
                        <option value="<?php echo $payment_plan_milestone['milestone']; ?>"  <?php if($building_milestone==$payment_plan_milestone['milestone']){ echo "selected"; }?>><?php echo  $payment_plan_milestone['name']?></option>
                    <?php }

                    }else{
                        ?>

                        <?php
                        } ?>

                </select>
            </div>
        </div>
    </div>
    <div id="milestone-completion" <?php if(!isset($building_payment_plan)){?>style="display:none"<?php }?>>
        <div class="col-md-12">
            <div class="form-group">
                <label class="form-label">
                    Milestone Completions
                </label>

                 
            </div>
        </div>

         <div class="well">
                         <div class="form-group">
                             <ul class="milestone-completion form-control-list" id="milestone-completion-item-container">
                                <?php
                                    $payment_plan_milestones = get_payment_plan_milestones($building_payment_plan);

                                    foreach ($payment_plan_milestones as $payment_plan_milestone){
                                
                                        if(is_array($building_milestone_completion)){
                                            $completion_date = $building_milestone_completion[$payment_plan_milestone['milestone']];
                                        }
                                ?>
                                        <li >
                                            <div class="row">
                                                <div class="form-group">
                                                    <div class="col-md-7"><label class="form-label form-label-inline-long">
                                                            <?php echo  $payment_plan_milestone['name']?></label> 
                                                    </div>
                                                    <div class="col-md-5">
                                                        <input type="text"  name="milestone_completion_<?php echo  $payment_plan_milestone['milestone']?>"  class="milestone-completion-date form-control-medium"  value="<?php echo $completion_date;?>"  >
                                                    </div>
                                                     
                                                </div>
                                            </div>
                                        </li>
                                <?php

                                }?>
                                       
                             </ul>
                         </div>
            </div>
              
    </div>
    <div class="col-md-12">
        <div class="form-group">
            <label class="form-label">
                View
            </label>

            <div class="input-with-icon  right">   <?php
                $views = get_views();
 
                foreach($views as $view){
                    ?>
                    <div class="col-md-6">
                        <div class='checkbox check-default' >
                            <input type="checkbox" name="views[]" id='views<?php echo $view["id"];?>' value="<?php echo $view["id"];?>" <?php if(in_array($view["id"],$building_views)){ echo "checked";}?>> <label for="views<?php echo($view["id"]);?>"><?php echo $view["name"];?></label>
                        </div>
                    </div>
                    <?php
                }
                ?> 
            </div> 
        </div>
    </div>
    <div style="clear:both"></div>
    <div class="col-md-6">
        <div class="form-group">
            <label class="form-label">
                No of Floors
            </label>

            <div class="input-with-icon  right">

                <i class="">
                </i>
                <select name="no_of_floors" id="no_of_floors">
                    <option value="">
                        Please Select
                    </option>
                    <?php
                    $max_no_of_floors = get_max_no_of_floors();

                         for($i=1;$i<=$max_no_of_floors;$i++){
                            ?>
                            <option value="<?php echo $i;?>" <?php if($i==$no_of_floors){ ?>selected <?php } ?>>
                                <?php echo $i;?>
                            </option>
                            <?php

                        }
                    ?>

                </select>
            </div>
        </div>
    </div>
    <div class="col-md-6">
        <div class="form-group">
            <label class="form-label">
                No of flats per floor
            </label>

            <div class="input-with-icon  right">

                <i class="">
                </i>
                <select name="no_of_flats" prev_flat_count="<?php echo $no_of_flats; ?>"  id="no_of_flats" class="no_of_flats" flats_container_id="flats_container" exception_no="">
                    <option value="">
                        Please Select
                    </option>
                    <?php
                    $max_no_of_flats = get_max_no_of_flats();

                    for($i=1;$i<=$max_no_of_flats;$i++){
                        ?>
                        <option value="<?php echo $i;?>" <?php if($i==$no_of_flats){ ?>selected <?php } ?>>
                            <?php echo $i;?>
                        </option>
                    <?php

                    }
                    ?>

                </select>
            </div>
        </div>
    </div>
</div>
<div class="form-group"   >
            <label class="form-label">
                SVG Positions
            </label>      
                <div class="row">
                <div class="col-md-12">
                
                    <div class="input-with-icon  right">
                       <label class="form-label">
                                1)
                            </label>  <span class="btn btn-success fileinput-button">
                            
                            <span>Select file..</span>
                            <input type="hidden" class="svg_position_file_1" id="svg_position_file_1" name="svg_position_file_1" value="<?php echo @$building_svgdata[0]["svgfile"]["id"];?>"><input id="fileuploadsvg_position_file_1" class="fileuploadsvg_position_file_1" type="file" name="files">
                        </span> 
                        <div id="progresssvg_position_file_1" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filessvg_position_file_1" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo  @$building_svgdata[0]["svgfile"]["thumbnail_url"];?>" id="image_displaysvg_position_file_1" <?php if(@$building_svgdata[0]["svgfile"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <div class="well input-with-icon  right" >
                           <div class="row-fluid" > 
                                <div class="row flat-positions" item-id="1">
                                <?php

                                    for ($flat=1;$flat<=$no_of_flats;$flat++){
                                        $checked="";

                                        if(isset($building_svgdata[0]['svgposition'])){

                                            if(in_array($flat,$building_svgdata[0]['svgposition'])){
                                                $checked="checked";
                                            }
                                        }
                                        ?>
                                        <div class='col-md-4 flatposition<?php echo $flat;?>'>
                                                <div class='checkbox check-default' >
                                                        <input type='checkbox' name='flatpostion-1[]' id='flatpostion<?php echo $flat;?>-1' value='<?php echo $flat;?>' <?php echo $checked;?>> <label for='flatpostion<?php echo $flat;?>-1'><?php echo $flat;?></label>
                                                </div>
                                        </div>
                                        <?php

                                    }
                                ?>
                                </div>
                          </div> 
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-md-12">
                
                    <div class="input-with-icon  right">
                       <label class="form-label">
                                2)
                            </label>  <span class="btn btn-success fileinput-button">
                            
                            <span>Select file..</span>
                            <input type="hidden" class="svg_position_file_2" id="svg_position_file_2" name="svg_position_file_2" value="<?php echo @$building_svgdata[1]["svgfile"]["id"];?>"><input id="fileuploadsvg_position_file_2" class="fileuploadsvg_position_file_2" type="file" name="files">
                        </span> 
                        <div id="progresssvg_position_file_2" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filessvg_position_file_2" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo  @$building_svgdata[1]["svgfile"]["thumbnail_url"];?>" id="image_displaysvg_position_file_2" <?php if(@$building_svgdata[1]["svgfile"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <div class="well input-with-icon  right" >
                           <div class="row-fluid" > 
                                <div class="row flat-positions" item-id="2">
                                <?php
                                    for ($flat=1;$flat<=$no_of_flats;$flat++){
                                         $checked="";

                                        if(isset($building_svgdata[1]['svgposition'])){

                                            if(in_array($flat,$building_svgdata[1]['svgposition'])){
                                                $checked="checked";
                                            }
                                        }
                                        ?>
                                        <div class='col-md-4 flatposition<?php echo $flat;?>'>
                                                <div class='checkbox check-default' >
                                                        <input type='checkbox' name='flatpostion-2[]' id='flatpostion<?php echo $flat;?>-2' value='<?php echo $flat;?>'  <?php echo $checked;?>> <label for='flatpostion<?php echo $flat;?>-2'><?php echo $flat;?></label>
                                                </div>
                                        </div>
                                        <?php

                                    }
                                ?>
                                </div>
                          </div> 
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-md-12">
                
                    <div class="input-with-icon  right">
                       <label class="form-label">
                                3)
                            </label>  <span class="btn btn-success fileinput-button">
                            
                            <span>Select file..</span>
                            <input type="hidden" class="svg_position_file_3" id="svg_position_file_3" name="svg_position_file_3" value="<?php echo @$building_svgdata[2]["svgfile"]["id"];?>"><input id="fileuploadsvg_position_file_3" class="fileuploadsvg_position_file_3" type="file" name="files">
                        </span> 
                        <div id="progresssvg_position_file_3" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filessvg_position_file_3" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo  @$building_svgdata[2]["svgfile"]["thumbnail_url"];?>" id="image_displaysvg_position_file_3" <?php if(@$building_svgdata[2]["svgfile"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <div class="well input-with-icon  right" >
                           <div class="row-fluid" > 
                                <div class="row flat-positions" item-id="3">
                                <?php
                                    for ($flat=1;$flat<=$no_of_flats;$flat++){
                                         $checked="";

                                        if(isset($building_svgdata[2]['svgposition'])){

                                            if(in_array($flat,$building_svgdata[2]['svgposition'])){
                                                $checked="checked";
                                            }
                                        }
                                        ?>
                                        <div class='col-md-4 flatposition<?php echo $flat;?>'>
                                                <div class='checkbox check-default' >
                                                        <input type='checkbox' name='flatpostion-3[]' id='flatpostion<?php echo $flat;?>-3' value='<?php echo $flat;?>'  <?php echo $checked;?>> <label for='flatpostion<?php echo $flat;?>-3'><?php echo $flat;?></label>
                                                </div>
                                        </div>
                                        <?php

                                    }
                                ?>
                                </div>
                          </div>  
                    </div>
                </div>
            </div> 

            <div class="row">
                <div class="col-md-12">
                
                    <div class="input-with-icon  right">
                       <label class="form-label">
                                4)
                            </label>  <span class="btn btn-success fileinput-button">
                            
                            <span>Select file..</span>
                            <input type="hidden" class="svg_position_file_4" id="svg_position_file_4" name="svg_position_file_4" value="<?php echo @$building_svgdata[3]["svgfile"]["id"];?>"><input id="fileuploadsvg_position_file_4" class="fileuploadsvg_position_file_4" type="file" name="files">
                        </span> 
                        <div id="progresssvg_position_file_4" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filessvg_position_file_4" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo  @$building_svgdata[3]["svgfile"]["thumbnail_url"];?>" id="image_displaysvg_position_file_4" <?php if(@$building_svgdata[3]["svgfile"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <div class="well input-with-icon  right" >
                           <div class="row-fluid" > 
                                <div class="row flat-positions" item-id="4">
                                <?php
                                    for ($flat=1;$flat<=$no_of_flats;$flat++){
                                                           $checked="";

                                        if(isset($building_svgdata[3]['svgposition'])){

                                            if(in_array($flat,$building_svgdata[3]['svgposition'])){
                                                $checked="checked";
                                            }
                                        }
                                        ?>
                                        <div class='col-md-4 flatposition<?php echo $flat;?>'>
                                                <div class='checkbox check-default' >
                                                        <input type='checkbox' name='flatpostion-4[]' id='flatpostion<?php echo $flat;?>-4' value='<?php echo $flat;?>'  <?php echo $checked;?>> <label for='flatpostion<?php echo $flat;?>-4'><?php echo $flat;?></label>
                                                </div>
                                        </div>
                                        <?php

                                    }
                                ?>
                                </div>
                          </div>  
                    </div>
                </div>
            </div> 
            </div> 
        <div class="form-group" id="floor-layout"   >
            <div class="row">
                <div class="col-md-6">
                    <label class="form-label">
                        Floor Layout Basic
                    </label>    
                    <div class="input-with-icon  right">
                        <span class="btn btn-success fileinput-button">
                             
                            <span>Select file..</span>
                            <input type="hidden" class="floor_layout_basic" id="floor_layout_basic" name="floor_layout_basic" value="<?php echo @$floor_layout_basic["id"];;?>"><input id="fileuploadfloor_layout_basic" class="fileuploadfloor_layout_basic" type="file" name="files">
                        </span> 
                        <div id="progressfloor_layout_basic" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filesfloor_layout_basic" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo  @$floor_layout_basic["thumbnail_url"];?>" id="image_displayfloor_layout_basic" <?php if(@$floor_layout_basic["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div> 
                <div class="col-md-6">
                    <label class="form-label">
                        Floor Layout Detailed
                    </label>  
                    <div class="input-with-icon  right">
                        <span class="btn btn-success fileinput-button">
                             
                            <span>Select file..</span>
                            <input type="hidden" class="floor_layout_detailed" id="floor_layout_detailed" name="floor_layout_detailed" value="<?php echo @$floor_layout_detailed["id"];?>"><input id="fileuploadfloor_layout_detailed" class="fileuploadfloor_layout_detailed" type="file" name="files">
                        </span> 
                        <div id="progressfloor_layout_detailed" class="progress" >
                            <div class="progress-bar progress-bar-success"></div>
                        </div>
                        <div id="filesfloor_layout_detailed" class="files"></div>
                        <br>
                        <div class="row-fluid">
                            <div class="col-md-12">
                                <img src="<?php echo $floor_layout_detailed["thumbnail_url"];?>" id="image_displayfloor_layout_detailed" <?php if(@$floor_layout_detailed["thumbnail_url"]==""){?>style="display:none"<?}?>>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
        </div> 
 
<?php
  //if exception data was not added set it to one
                if(count($building_exceptions)==0){
                    $building_exceptions[] = array("floors"=>0);
                } 
?> 
<div id="exceptions" <?php if(count($no_of_floors)==0){?>style="display:none"<?php } ?>>
    <b>Add Exceptions</b>  <button style="display:none" type="button" class="btn " id="add_exceptions"exception_count="0"> 
    <input type="hidden" name="exceptions_count" value="<?php echo count($building_exceptions);?>" id="exceptions_count">
    <i class="icon-ok"></i>
        +
    </button>
    <div class="exception_container well">
        <div class="form-group"> 
            <div class="input-with-icon  right exception_floors"> 
                <label class="form-label">
                    Select Exception Floors
                </label>
                <?php
                $exception_count = 1;
              
                foreach($building_exceptions as $building_exception){
                  $building_exception["floors"] =  is_array($building_exception["floors"])?$building_exception["floors"]:array();
                ?>
                 <div id="exception_floors_container<?php echo($exception_count);?>">
                   <?php 

                   $show_exception_options=false;
                    for($i=1;$i<=$no_of_floors;$i++){
                       ?><div class="col-md-4">
                        <div class='exception_floor checkbox check-default' id='<?php echo($exception_count);?>exception_floor_item<?php echo($i);?>'> <input type="checkbox" name="exception_floors<?php echo($exception_count);?>[]" id='<?php echo($exception_count);?>exception_floors<?php echo($i);?>' value="<?php echo $i;?>" <?php if(in_array($i,$building_exception["floors"])){ echo "checked"; $show_exception_options=true;}?> class="exception_floors"> <label for="<?php echo($exception_count);?>exception_floors<?php echo($i);?>"><?php echo $i;?></label></div></div>
                    <?php    
                    }
                     
                    $no_of_flats = count($building_exception["flats"]);
 
                    ?>
                </div>
                <div style="clear:both"></div>
                <div class="form-group" id="exception-flats1" <?php if($show_exception_options==false){?>style="display:none"<?php } ?> >
                    <label class="form-label">
                        No Of Flats
                    </label>
                    <div class="input-with-icon  right">
                        <i class="">
                        </i>
                        <select name="no_of_flats<?php echo($exception_count);?>"    id="no_of_flats<?php echo($exception_count);?>" flats_container_id="flats_container<?php echo($exception_count);?>" exception_no="<?php echo($exception_count);?>">'
                            <option value="">Please Select</option>'

                            <?php $max_no_of_flats = get_max_no_of_flats();

                            for($i=1;$i<=$max_no_of_flats;$i++){
                            ?><option value="<?php echo $i;?>" <?php if($i==$no_of_flats){ ?>selected <?php } ?>><?php echo $i;?></option>
                            <?php  
                            }?>
                        </select>
                    </div>
                </div>

                <div class="form-group" id="exception-flats-images1"  <?php if($show_exception_options==false){?>style="display:none"<?php } ?> >
                     
                    <div class="row">
                        <div class="col-md-6">
                            <label class="form-label">
                                Floor Layout Basic
                            </label> 
                            <div class="input-with-icon  right">
                                <span class="btn btn-success fileinput-button">
                                     
                                    <span>Select file..</span>
                                    <input id="fileuploadexceptionfloor_layout_basic1" class="fileuploadexceptionfloor_layout_basic1" type="file" name="files">
                                </span> 
                                <input type="hidden" class="exceptionfloor_layout_basic1" id="exceptionfloor_layout_basic1" name="exceptionfloor_layout_basic1" value="<?php echo @$building_exception["floor_layout_basic"]["id"];?>">
                                <div id="progressexceptionfloor_layout_basic1" class="progress" >
                                    <div class="progress-bar progress-bar-success"></div>
                                </div>
                                 
                                <div class="row-fluid">
                                    <div class="col-md-12">
                                        <img src="<?php echo $building_exception["floor_layout_basic"]["thumbnail_url"];?>" id="image_displayexceptionfloor_layout_basic1" <?php if(@$building_exception["floor_layout_basic"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                                    </div>
                                </div>
                            </div>
                        </div> 
                        <div class="col-md-6">
                            <label class="form-label">
                                Floor Layout Detailed
                            </label> 
                            <div class="input-with-icon  right">
                                <span class="btn btn-success fileinput-button">
                                     
                                    <span>Select file..</span>
                                    <input id="fileuploadexceptionfloor_layout_detailed1" class="fileuploadexceptionfloor_layout_detailed1" type="file" name="files">
                                </span> 
                                <input type="hidden" class="exceptionfloor_layout_detailed1" id="exceptionfloor_layout_detailed1" name="exceptionfloor_layout_detailed1" value="<?php echo @$building_exception["floor_layout_detailed"]["id"];?>">
                                <div id="progressexceptionfloor_layout_detailed1" class="progress" >
                                    <div class="progress-bar progress-bar-success"></div>
                                </div>
                                 
                                <div class="row-fluid">
                                    <div class="col-md-12">
                                        <img src="<?php echo $building_exception["floor_layout_detailed"]["thumbnail_url"];?>" id="image_displayexceptionfloor_layout_detailed1" <?php if(@$building_exception["floor_layout_detailed"]["thumbnail_url"]==""){?>style="display:none"<?}?>>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div> 
                
                <?}
                ?> 
            </div>
        </div>
    </div>
</div>   
 
    <div id="floorrise-container-main" <? if(@$no_of_floors==""){?>style="display:none"<?php } ?>>
        <div style="clear:both"></div>
        <b>Floor Rise</b>
        <div class="well" id="flats_container">
            <div id="floor_rise_container">
                 <?php
                    for($floor=1;$floor<=$no_of_floors;$floor++){

                        $floor_rise =  $floorrise[$floor] ==""?0:  $floorrise[$floor];
                        ?>
                    <div class='floor_rise form-group' id='floor_rise_item<?php echo $floor?>'><label class="form-label  form-label-inline"> Floor <?php  echo $floor;?> : </label> <label class="form-label form-label-prefix"> Rs.</label><input type='text' placeholder="0" class='form-control  form-control-small' value='<?php echo $floor_rise?>' name='floor_rise_<?php echo $floor?>'> per sq ft</div>
                        <?php
                    }
                 ?>
    			 

            </div>
        </div>
        </div>



<div class="form-actions">

    <button type="button" class="btn btn-success btn-cons" id="save_building">
        <i class="icon-ok">
        </i>
        Submit
    </button>
</div>
</div>
</div>
</div>

<div class="col-md-6">
<div class="grid simple">
<div class="grid-title no-border">

<div class="form-group">
    <label class="form-label">
        Floor rise
    </label>
                   
    <div class="input-with-icon  right">

        <div id="slider"></div>
        <br> 
        <table>
            <tr>
                <td><div class="fixed-size-square-lowrise"></div>
                </td>
                <td>Low rise
                <input type="hidden" id="lowrisefrom" name="lowrisefrom" value="<?php echo @$building_lowrisefrom;?>">
                <input type="hidden" id="lowriseto" name="lowriseto" value="<?php echo @$building_lowriseto;?>">
                </td>
                <td><div id="lowrise-range"><?php echo @$building_lowrise_range;?></div>
                </td>
            </tr>
            <tr>
                <td><div class="fixed-size-square-midrise"></div>
                </td>
                <td>Mid rise
                <input type="hidden" id="midrisefrom" name="midrisefrom" value="<?php echo @$building_midrisefrom;?>">
                <input type="hidden" id="midriseto" name="midriseto" value="<?php echo @$building_midriseto;?>">
                </td>
                <td><div id="midrise-range"><?php echo @$building_midrise_range;?></div>
                </td>
            </tr>
            <tr>
                <td><div class="fixed-size-square-highrise"></div>
                </td>
                <td>High rise
                <input type="hidden" id="highrisefrom" name="highrisefrom" value="<?php echo @$building_highrisefrom;?>">
                <input type="hidden" id="highriseto" name="highriseto" value="<?php echo @$building_highriseto;?>">
                </td>
                <td><div id="highrise-range"><?php echo @$building_highrise_range;?></div>
                </td>
            </tr>
        </table>
         
    </div>
</div>

</div>
</div>


         </div>
</form>
</div>
