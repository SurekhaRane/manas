<?php
if(!current_user_can('manage_settings') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
?>
<div class="page-title">
                <h3>List Of Payment Plans</h3>

            </div>
            <div class="row">
                <div class="col-md-12">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="grid simple ">

                                <div class="grid-body ">
                                    <table class="table table-hover table-condensed tablesorter" id="example">
                                        <thead>
                                        <tr>
                                          <th style="visibility:hidden"> </th>
                                        </tr>
                                           <tr> 
                                           <tr>
                                          <th style="visibility:hidden"> </th>
                                        </tr> 
                                        <tr>
                                          <th  >Payment Plan</th>
                                            
                                            
                                            <th  width="100"  class="filter-false sorter-false">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                         <tr><td>loading..............</td></tr>
                                        </tbody>
                                    </table>
                                    <br>
                                    <br>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>