<?

if(!current_user_can('manage_apartments') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 

 
?>
<div class="page-title">  
    <h3>Import Apartment CSV</h3>

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
                    <div class="col-md-12">
        <div class="form-group">
            <label class="form-label">
                Select File To Import
            </label>

            <div class="input-with-icon  right">
                <span class="btn btn-success fileinput-button">
                     
                    <span>Select file..</span>
                    <input id="fileuploadimport" class="fileuploadimport" type="file" name="files">
                </span> 
                <div id="progressposition_in_project" class="progress" >
                    <div class="progress-bar progress-bar-success"></div>
                </div> 
                <br>
                
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