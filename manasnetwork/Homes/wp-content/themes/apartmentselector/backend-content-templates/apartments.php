<?php
if(!current_user_can('manage_apartments') && !current_user_can('manage_options')){

    wp_redirect(site_url('no-access'));

    exit;
    
} 
?>
<div class="page-title">  
                <h3>List Of Apartments</h3>

            </div>

            <div class="row">
                <div class="col-md-12">
                    <div class="row-fluid">
                        <div class="span12">
                            <div class="grid simple ">

                                <div class="grid-body ">
                                    <table class="table table-hover table-condensed tablesorter" id="example" >
                                    
                                        <thead>
                                      
                                        <tr>
                                          <th style="width:10%">Flat No</th>
                                            <th style="width:20%" class="filter-select filter-onlyAvail" data-placeholder="All" >Status</th>
                                            <th style="width:20%"  class="filter-select filter-onlyAvail" data-placeholder="All">Unit Type</th>
                                            <th style="width:20%"  class="filter-select filter-onlyAvail" data-placeholder="All">Unit Variant</th>
                                            <th style="width:20" class="filter-select filter-onlyAvail"  data-placeholder="All" >Building</th>
                                            <th style="width:10%" class="filter-onlyAvail" >Floor</th>
                                            <th style="width:10%" class="filter-false sorter-false">Actions</th>
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