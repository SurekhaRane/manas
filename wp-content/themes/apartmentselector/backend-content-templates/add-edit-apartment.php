<?

if(!current_user_can('manage_apartments') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
$heading = "Add";
$apartment_views = $unit_facing = array();

if(isset($_REQUEST["id"])){

    $heading = "Edit";

    $apartment_id = $_REQUEST["id"];

    $unit = (get_unit_by_id($apartment_id));

    $flat_no = $unit["name"];

    $unit_type = $unit["unit_type"];

    $unit_variant = $unit["unit_variant"];

    $unit_building = $unit["building"];

    $unit_facing = $unit["facing"];

    $apartment_views = is_array($unit["apartment_views"])?$unit["apartment_views"]:array();

    $unit_assigned = $unit["unit_assigned"];

    $floor = $unit["floor"];

    $unit_status = $unit["status"];

    $blocked_by = $unit["blocked_by"];

    $for_customer = $unit["for_customer"];

    $blocked_on = $unit["blocked_on"];

    $blocked_till = $unit["blocked_till"];

    $blocked_till_limit = $unit["blocked_till"];

    $blocked_till_limit = $unit["blocked_till"];

    $block_status_comments = $unit["block_status_comments"];

    $block_till_limit =   $unit["block_till_limit"];
}
?>
<div class="page-title"> 
    <h3><?php echo $heading;?> Apartment</h3>

</div>
<div class="row">
    <div class="col-md-6">
        <div class="grid simple">
            <div class="grid-title no-border">

            </div>
            <div class="grid-body no-border">
                <form id="form_add_edit_apartment" action="" novalidate="novalidate">
                    <input type="hidden" name="action" id="action" value="save_apartment" />
                    <?php echo wp_nonce_field( plugin_basename( __FILE__ ), 'custom_save_apartment',true,false);?>
                    <input type="hidden" name="apartment_id" id="apartment_id" value="<?php echo @$apartment_id;?>" />
                    <br/>
                    <div class="form-group">
                        <label class="form-label">Flat No</label>
                        <span class="help">e.g:A-123</span>
                        <div class="input-with-icon  right">
                            <i class=""></i>
                            <input type="text" name="flat_no" id="flat_no" class="form-control" value="<?php echo @$flat_no;?>">
                        </div>
                    </div>
                     <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Building</label>

                                <div class="input-with-icon  right">
                                    <i class=""></i>
                                    <select  name="building" id="building" class="form-control">
                                        <option value="">Select</option>
                                        <?php
                                        $floors_option = 0;
                                        $buildings = get_buildings();
                                        foreach($buildings as $building){
                                            ?>m-control
                                            <option  floors = "<?php echo $building['nooffloors']; ?>" value="<?php echo $building['id']; ?>" <?php if($unit_building==$building['id']){ echo "selected";$floors_option=$building['nooffloors']; }?>><?php echo  $building['name']?></option>
                                        <?php
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Floor</label>

                                    <div class="input-with-icon  right">
                                        <i class=""></i>
                                        <select  name="floor" id="floor"  >
                                            <option value="">Select</option>
                                            <?php
                                            for($i=1;$i<=$floors_option;$i++){
                                                ?>
                                                <option value="<?php echo $i;?>" <?php if($floor==$i){ echo "selected"; }?>><?php echo $i;?></option>
                                            <?php
                                            }
                                            ?>
                                        </select>

                                    </div>
                            </div>
                        </div>
                    </div> 
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Unit Type</label>

                                <div class="input-with-icon  right">
                                    <i class=""></i>
                                    <select  name="unit_type" id="unit_type"    >

                                        <option value="">Select</option>
                                        <?php

                                        $unit_types = get_unit_types();

                                        foreach ($unit_types as $unit_type_item){

                                            ?>
                                            <option value="<?php echo $unit_type_item['id']; ?>"  <?php if($unit_type==$unit_type_item['id']){ echo "selected"; }?>><?php echo  $unit_type_item['name']?></option>
                                        <?php } ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label class="form-label">Unit Variant</label>

                                <div class="input-with-icon  right">
                                    <i class=""></i>
                                    <select  name="unit_variant" id="unit_variant"  >
                                        <option value="">Select</option>
                                        <?php
                                        $unit_variants = get_unit_variants_by_unit_type($unit_type,$floor);
                                        foreach ($unit_variants as $unit_variant_item){

                                            ?>
                                            <option value="<?php echo $unit_variant_item['variant_id']; ?>"  <?php if($unit_variant==$unit_variant_item['variant_id']){ echo "selected"; }?>><?php echo  $unit_variant_item['variant_name']?></option>
                                        <?php }

                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    
                    <div class="form-group">
                        <label class="form-label">Facings</label>

                        <div class="input-with-icon  right">
                            <i class=""></i>  
                                <?php 
                                $facings = get_facings();
                                foreach($facings as $facing){
                                    ?> 
                                     <div class="col-md-6">
                                        <div class='checkbox check-default' >
                                            <input type="checkbox" name="facing[]" id="facing-<?php echo $facing['id']; ?>"   value="<?php echo $facing['id']; ?>" <?php if(in_array($facing['id'], $unit_facing)){ echo "checked"; }?>><label for="facing-<?php echo $facing['id']; ?>"><?php echo  $facing['name']?></label>
                                        </div>
                                    </div>
                                <?php
                                }
                                ?>
                             
                        </div>
                    </div>
                    

                     <div class="form-group">
                        <label class="form-label">Views</label>
                        <div class="row-fluid" > <div class="row">
                        <div class="input-with-icon  right views-container">
                            <?php
                            if(isset($unit_building)){ 
                                $views = get_building_views($unit_building);
                                if(count($views)==0){
                                ?>
                                        <div class="col-md-6">
                                            No views found
                                        </div>
                                        <?php
                                }
                                foreach($views as $view){
                                    ?>
                                    <div class="col-md-6">
                                        <div class='checkbox check-default' >
                                            <input type="checkbox" name="views[]" id='views<?php echo $view["id"];?>' value="<?php echo $view["id"];?>" <?php if(in_array($view["id"],$apartment_views)){ echo "checked";}?>> <label for="views<?php echo($view["id"]);?>"><?php echo $view["name"];?></label>
                                        </div>
                                    </div>
                                    <?php
                                }  
                            }
                            else{
                               ?>
                                        <div class="col-md-6">
                                            select building to select views
                                        </div>
                                        <?php  
                            }
                            ?> 
                        </div>  </div>  </div>
                    </div>
                     <div class="well"><label class="form-label">Select Flat:</label>
                     <div id="flat_container">
                     <?php if(!empty($unit_building) && !empty($floor)){
                            $flats = get_flats_on_floor($unit_building ,$floor,$apartment_id);
                     
                            ?>
                                <div class="row-fluid" > <div class="row">
                            <?php
                            foreach($flats["flats"] as $flat){
                                $unit_assigned_highlight = "";

                                 if(isset($flats["created_flats"][$flat["flat_no"]])){
                                    $unit_assigned_highlight = '<i class="fa fa-check"></i>';
                                }
                                    ?>
                                        <div class="col-md-4 radio radio-default"><input type="radio" name="unit_assigned"  <?php if($unit_assigned==$flat["flat_no"]){ echo "checked";}?> value="<?php echo $flat["flat_no"]?>" id="unit_assigned<?php echo $flat["flat_no"]?>"><label for="unit_assigned<?php echo $flat["flat_no"]?>">Flat <?php echo $flat["flat_no"]." ".$unit_assigned_highlight;?> </label></div>
                                         
                                 <?php
                            }
                            ?>
                               </div></div><div align="right"><i class="fa fa-check"></i>Already Assigned </div>
                            <?php
                        }
                        else{
                        ?>
                                <i>select building and floor</i>
                        <?php
                        }
                        ?>
                     </div>
                     </div>
                    <div class="form-group">
                        <label class="form-label">Status</label>

                        <div class="input-with-icon  right">
                            <i class=""></i>
                            <select  name="unit_status" id="unit_status"   >

                                <option value="">Select</option>
                                <?php
                                $unit_statuses = get_unit_status();

                                foreach($unit_statuses as $unit_status_item){
                                    ?>

                                    <option value="<?php echo $unit_status_item["id"];?>" <?php if($unit_status==$unit_status_item["id"]){ echo "selected";$status_check=$unit_status_item["name"]; }?>><?php echo $unit_status_item["name"];?></option>

                                <?php
                                }

                                ?>
                            </select>
                        </div>
                    </div> 
                    <div class="well" id="block-status-details" <?php if( @$status_check !="Blocked"){?>style="display:none"<?php } ?>>
                        <div class="form-group">
                            <label class="form-label">Blocked by</label> 
                            <div class="input-with-icon  right">
                                <i class=""></i>
                                <select  name="blocked_by" id="blocked_by"  class="form-control" >

                                    <option value="">Select</option>
                                    <?php

                                    $sales_users = get_sales_users();

                                    foreach ($sales_users as $sales_user){

                                        ?>
                                        <option value="<?php echo $sales_user['id']; ?>"  <?php if($blocked_by==$sales_user['id']){ echo "selected"; }?>><?php echo  $sales_user['name']?></option>
                                    <?php } ?>
                                </select>
                            </div>
                        </div>
                         <div class="form-group">
                            <label class="form-label">For Customer</label> 
                            <div class="input-with-icon  right">
                                <i class=""></i>
                                <input type="text"  name="for_customer" id="for_customer" value="<?php echo $for_customer; ?>" class="form-control" >

                                     
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Blocked On</label> 
                            <div class="input-with-icon  right">
                                <i class=""></i>
                                 <input type="text" readonly name="blocked_on" id="blocked_on" value="<?php echo $blocked_on; ?>" class="form-control" >


                                     
                            </div> 
                    </div>
                    <div class="form-group">
                            <label class="form-label">Blocked Till</label> 
                            <div class="input-with-icon  right">
                                <i class=""></i>
                                <input type="text" block-till-limit ="<?php echo $block_till_limit;?>" data-date-format="dd/mm/yyyy"  value="<?php echo $blocked_till; ?>" name="blocked_till" id="blocked_till"  class="form-control" >
 
                                     
                            </div>
                    </div>
                    <div class="form-group">
                            <label class="form-label">Comments</label> 
                            <div class="input-with-icon  right">
                                <i class=""></i>
                                <textarea  name="block_status_comments" id="block_status_comments"  class="form-control" ><?php echo $block_status_comments; ?></textarea>

                                     
                            </div>
                    </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-success btn-cons" name="save_apartment"  id="save_apartment"><i class="icon-ok"></i> Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>