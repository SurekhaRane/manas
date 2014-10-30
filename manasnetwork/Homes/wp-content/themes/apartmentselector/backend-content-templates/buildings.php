<?php
if(!current_user_can('manage_buildings') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
?>
<div class="page-title">
                <h3>List Of Buildings</h3>

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
                                          <th style="width:10%">Name</th>
                                            <th style="width:20%" class="filter-select filter-onlyAvail" data-placeholder="All" >Phase</th>
                                            
                                            <th style="width:10%" class="filter-false sorter-false">Action</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                         <tr><td>loading..............</td></tr>
                                        </tbody>
                                    </table> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>