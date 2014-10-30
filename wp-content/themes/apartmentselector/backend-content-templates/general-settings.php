<?php
if(!current_user_can('manage_settings') && !current_user_can('manage_options')){
echo "dddd";
    wp_redirect(site_url('no-access'));

    exit;
    
}   

$settings = get_apratment_selector_settings();

$vat = isset($settings["vat"])?$settings["vat"]:0; 
$sales_tax = isset($settings["sales_tax"])?$settings["sales_tax"]:0;  
$infrastructure_charges = isset($settings["infrastructure_charges"])?$settings["infrastructure_charges"]:array();  
$membership_fees = isset($settings["membership_fees"])?$settings["membership_fees"]:array();   
$stamp_duty = isset($settings["stamp_duty"])?$settings["stamp_duty"]:0;   
$registration_amount = isset($settings["registration_amount"])?$settings["registration_amount"]:0;   
 
?>
<div class="page-title">
    <h3>General Settings</h3>

</div>
<div class="row">
    <div class="col-md-6">
        <div class="grid simple">
            <div class="grid-title no-border">

            </div>
            <div class="grid-body no-border">
                <form id="form_edit_settings" action="" novalidate="novalidate">
                    <input type="hidden" name="action" id="action" value="save_settings" />
                    <?php echo wp_nonce_field( plugin_basename( __FILE__ ), 'custom_save_apartment',true,false);?>
                     <br/>
                    <div class="form-group">
                        
                        <div class="input-with-icon  right">
						<div class="row">
						<div class="col-md-4">
                            <label class="form-label form-label-inline" for="vat">VAT</label>
                        <span class="help"></span>
                            <label class="form-label form-label-prefix">  </label></div><div class="col-md-7"><input type="text" name="vat" id="vat" class="form-control" value="<?php echo @$vat;?>"></div><div class="col-md-1"><label class="form-label form-label-inline"> %</label></div>
							</div>
                        </div>
                    </div>
                    <div class="form-group">
                        
                        <div class="input-with-icon  right">
						<div class="row">
						<div class="col-md-4">
                            <label class="form-label form-label-inline">Sales tax</label>
                                <span class="help"></span>
                            <label class="form-label form-label-prefix"> </label></div><div class="col-md-7"><input type="text" name="sales_tax" id="sales_tax" class="form-control" value="<?php echo @$sales_tax;?>"></div><div class="col-md-1"><label class="form-label form-label-inline"> %</label></div>
							</div>
                        </div>
                    </div>
                    <div class="form-group">
                        
                        <div class="input-with-icon  right">
                        <div class="row">
                        <div class="col-md-4">
                            <label class="form-label form-label-inline">Stamp Duty</label>
                                <span class="help"></span>
                            <label class="form-label form-label-prefix"> </label></div><div class="col-md-7"><input type="text" name="stamp_duty" id="stamp_duty" class="form-control" value="<?php echo @$stamp_duty;?>"></div><div class="col-md-1"><label class="form-label form-label-inline"> %</label></div>
                            </div>
                        </div>
                    </div>
 
                     
                    <div class="form-group">
                       <div class="input-with-icon  right">
                       <div class="row">
                       <div class="col-md-3">
                             <label class="form-label form-label-inline">Registration Amount</label>
                        <span class="help"></span></div>
                        <div class="col-md-1">
                        <label class="form-label form-label-inline">
                            Rs.</label></div>
                            <div class="col-md-7">
                            <input type="text" name="registration_amount" id="registration_amount" class="form-control" value="<?php echo @$registration_amount;?>"></div>
                            </div>
                        </div>
                    </div>
                     

                       <div class="form-group">
                        
                        <div class="input-with-icon  right">
                        <div class="row">
                        <div class="col-md-12">
                            <!--<label class="form-label form-label-prefix-long">Infrastructure Charges</label>-->
							<h4>Infrastructure Charges</h>
                                 </div>
                                
                           
                        </div>
                    </div> 
                    <div class="well">
                     <div class="form-group">
                         <ul class="add-more-list full-width" id="infrastructure-list">
                         <?php
                            if(!count($infrastructure_charges)){
                                    ?>
                                    <li id="item-1">
                                        <div class="row">
										<div class="form-group">
                                            <div class="col-md-2"><label class="form-label form-label-inline">
                                                Rs.</label> 
                                                </div>
                                        <div class="col-md-8">
                                            <input type="text" name="infrastructure_charges[]" class="infrastructure_charges form-control" id="infrastructure_charges_1"   >
                                        </div>
                                        <div class="col-md-2">
										<div class="form-label-inline">
                                            <a href="javascript:void(0)" item="1" class="infrastructure-charges-remove"><i class="fa fa-trash-o thrash" item="1"></i></a></div>
                                        </div>
										</div>
                                    </li>
                                    <?php

                                    $count = 1;
                            }else{

                                foreach($infrastructure_charges as $key => $infrastructure_charge){
                                        ?><div class="form-group">
                                        <li id="item-<?php echo $key+1;?>" class="custli">
										<div class="form-group">
                                        <div class="row">
                                            <div class="col-md-2"><label class="form-label form-label-inline">
                                                Rs.</label> 
                                                </div>
                                        <div class="col-md-8">
                                            <input type="text" name="infrastructure_charges[]" class="infrastructure_charges form-control" id="infrastructure_charges_<?php echo $key+1;?>"  value="<?php echo $infrastructure_charge;?>"  >
                                        </div>
                                        <div class="col-md-2">
										<div class="form-label-inline">
                                            <a href="javascript:void(0)" item="<?php echo $key+1;?>" class="infrastructure-charges-remove"><i class="fa fa-trash-o thrash" item="<?php echo $key+1;?>"></i></a></div>
											</div>
                                        </div>
										</div>
										</div>
                                    </li>
                                        <?php
                                    }?>

                                <?php
                                $count = count($infrastructure_charges); 
                            }
                         ?>
                            
                         </ul>
                     </div></div>
                     <!--<a class="btn btn-default" href="javascript:void(0)" id="add-more-infrastructure-charges" count="<?php echo $count;?>">+Add More</a>-->
					 <button class="btn btn-primary" type="button" href="javascript:void(0)" id="add-more-infrastructure-charges" count="<?php echo $count;?>"><i class="fa fa-plus"></i>&nbsp;&nbsp;Add More</button>
                    </div>

                       <div class="form-group">
                        
                        <div class="input-with-icon  right">
                        <div class="row">
                        <div class="col-md-12">
                            <!--<label class="form-label form-label-prefix-long">Membership Fees</label>-->
							<h4>Membership Fees</h4>
                                 </div>
                                
                           
                        </div>
                    </div> 

                     <div class="well">
                     <div class="form-group">
                          
                         <?php
                           $unit_types = get_unit_types();

                            foreach ($unit_types as $unit_type_item){
                               $unit_variant  = array();
                                foreach($membership_fees as $membership_fee){
                                    if($membership_fee["unit_type"]==$unit_type_item['id']){

                                        $unit_type_membership_fees = $membership_fee["membership_fees"];
                                        $unit_variant = $membership_fee["unit_variant"];
                                        if(!is_array($unit_variant)){
                                             $unit_variant  = array();
                                        }
                                    }
                                }
                                ?>
								<div class="form-group">
                                <div class="row">
                                
                                    <!--<div class="col-md-1">
                                    <input type="radio" checked value="unit_type" unit-type="<?php echo  $unit_type_item['id'];?>"  class="membership_fee_options" name="unit_fees_<?php echo  $unit_type_item['id'];?>">
                                    </div>
                                    <div class="col-md-3">
                                        
                                            <label class="form-label form-label-inline"><?php echo  $unit_type_item['name'];?></label>
                                    </div>-->
									<div class="col-md-3">
										<div class="radio">
											<input type="radio" checked value="unit_type" unit-type="<?php echo  $unit_type_item['id'];?>"  class="membership_fee_options" name="unit_fees_<?php echo  $unit_type_item['id'];?>" id="unit_type<?php echo  $unit_type_item['id'];?>">
											<label class="form-label form-label-inline" for="unit_type<?php echo  $unit_type_item['id'];?>"><?php echo  $unit_type_item['name'];?></label>
										</div>
									</div>
									
                                    <div class="col-md-1">
                                        <label class="form-label form-label-inline">
                                        Rs.</label>
                                    </div>
                                    <div class="col-md-8"><input type="text" name="unit_type_membership_fees" class="unit_type_membership_fees form-control" id="unit_type_membership_fees_<?php echo  $unit_type_item['id'];?>" unit-type="<?php echo  $unit_type_item['id'];?>"   value="<?php echo @$unit_type_membership_fees;?>" <?php if(count($unit_variant)!=0){?> readonly <?php } ?>></div> 
                                   
                                     
                                    
                                </div>
							</div>								
                                <div class="row">
                                
                                     <!--<div class="col-md-1">
                                    <input type="radio" <?php if(count($unit_variant)!=0){?> checked <?php } ?> value="unit_variant" unit-type="<?php echo  $unit_type_item['id'];?>"  class="membership_fee_options" name="unit_fees_<?php echo  $unit_type_item['id'];?>">
                                    </div>
                                    <div class="col-md-11">
                                            <label class="form-label form-label-prefix-long">Add Fees For <?php echo  $unit_type_item['name'];?> Variants</label>
                                    </div>-->
									<div class="col-md-12">
										<div class="radio">
											<input type="radio" <?php if(count($unit_variant)!=0){?> checked <?php } ?> value="unit_variant" unit-type="<?php echo  $unit_type_item['id'];?>"  class="membership_fee_options" name="unit_fees_<?php echo  $unit_type_item['id'];?>" id="unit_variant<?php echo  $unit_type_item['id'];?>">
											<label class="form-label form-label-prefix-long" for="unit_variant<?php echo  $unit_type_item['id'];?>">Add Fees For <?php echo  $unit_type_item['name'];?> Variants</label>
										</div>
									</div>
                                      
                                </div> 
                                
                                 <div class="row" <?php if(count($unit_variant)==0){?> style="display:none" <?php } ?> id="unit-variants-<?php echo  $unit_type_item['id'];?>">
                                
                                    <!--<div class="col-md-1">
                                     </div>-->
                                    <div class="col-md-12">
                                        <?php
                                         $unit_variants = get_unit_variants_by_unit_type($unit_type_item['id']);
                                         foreach ($unit_variants as $unit_variant_item){
 
                                                        foreach($unit_variant as $unit_variant_data_item){

                                                            if($unit_variant_data_item["unit_variant"]==$unit_variant_item['variant_id']){

                                                                $unit_variant_membership_fees = $unit_variant_data_item["membership_fees"];
                                                            }

                                                        }
                                         ?>
										 <div class="form-group">
                                         <div class="row">
                                        <div class="col-md-3">
                                            <label class="form-label form-label-inline"><?php echo  $unit_variant_item['variant_name'];?></label>
                                           </div>
                                         <div class="col-md-1">
                                        <label class="form-label form-label-inline">
                                        Rs.</label>
                                    </div>
                                        <div class="col-md-8"><input type="text" name="unit_variants_membership_fees[]" id="unit_variants_membership_fees<?php echo  $unit_variant_item['variant_id'];?>" variant="<?php echo  $unit_variant_item['variant_id'];?>" class="unit_variants_membership_fees_<?php echo  $unit_type_item['id'];?> form-control" value="<?php echo @$unit_variant_membership_fees;?>"></div> 
                                       
                                        </div>
										</div>
                                          
                                        <?php }

                                        ?>
                                    </div>
                                      
                                </div> 

                                <hr>
                                <?php
                                  
                            
                            } ?> 
                            
                     </div>
                    </div>
                    <div class="form-actions">
                        <button type="button" class="btn btn-success btn-cons" name="save_settings"  id="save_settings"><i class="icon-ok"></i> Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>