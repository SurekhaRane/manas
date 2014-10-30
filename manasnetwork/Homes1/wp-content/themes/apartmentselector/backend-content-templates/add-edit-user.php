<?
//form heading

if(!current_user_can('manage_users') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
$heading = "Add"; 

$payment_milestones = array();

if(isset($_REQUEST["id"])){

$heading = "Edit";

    $user_id = $_REQUEST["id"];

    $user_data = (get_ap_user($user_id));
 
    $display_name = $user_data["display_name"];
 
    $user_email = $user_data["user_email"];
 
    $user_role = $user_data["role"];



 
}
?>
<div class="page-title">

     
    <h3>
        <?php echo $heading;?> User
    </h3>

</div>

<div class="row">
<div class="col-md-6">
<div class="grid simple">
<div class="grid-title no-border">
   
</div>
<div class="grid-body no-border">
<form id="form_add_edit_user"  name = "form_add_edit_user" action="" novalidate="novalidate">
 <input type="hidden" name="action" id="action" value="save_user" />
                   
<?php echo wp_nonce_field( plugin_basename( __FILE__ ), 'custom_save_user',true,false);?>
<input type="hidden" name="user_id" id="user_id" value="<?php echo @$user_id;?>" />
                    <br/>
                          
                      <div class="form-group">
                        <label class="form-label">Name</label>
                        <span class="help">e.g. "Arvind Shah"</span>
            <div class="input-with-icon  right">                                       
              <i class=""></i>
              <input type="text" name="display_name" required="" id="display_name" class="form-control" value="<?php echo $display_name;?>">                                 
            </div>
                      </div>
                      <div class="form-group">
                        <label class="form-label">Email Address</label>
                        <div class="input-with-icon  right">                                       
              <i class=""></i>
              <input type="email" remote="http://localhost/skyi/wp-admin/admin-ajax.php?action=check_email" name="user_email" required="" id="user_email" class="form-control" value="<?php echo $user_email;?>">                                 
            </div>
                      </div>
             <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label class="form-label">Role</label>
                  
                    <div class="input-with-icon  right">                                       
                      <i class=""></i>
                      <select name="role" id="role" required="">
                        <option value="">Select a Role</option>
                        <?php 
                          $roles = get_ap_roles();
                          foreach($roles  as $role ){

                            ?><option value="<?php echo $role["role"]; ?>" <?php if($role["role"]==$user_role){ echo "selected";}?>><?php echo $role["role_name"]; ?></option><?php
                          }
                        ?>
                       
                      </select>
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                
              </div>
             </div>
             <div class="form-group">
                        <label class="form-label">Password</label>
                        <div class="input-with-icon  right">                                       
              <i class=""></i>
              <input type="password" name="password"  id="password" class="form-control">                                 
            </div>
                      </div>
        
 



<div class="form-actions">

    <button type="button" class="btn btn-success btn-cons" id="save_user">
        <i class="icon-ok">
        </i>
        Submit
    </button>
</div>
</form>
</div>
</div>
</div>
</div>