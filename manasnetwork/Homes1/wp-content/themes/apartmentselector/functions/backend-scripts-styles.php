<?php
//check if the current page called is a backend page and and load required css and js files


function apartmentselector_backend_enqueue_scripts(){

    global $post;

    $array_backend_pages = array(   'add-edit-user',
                                    'users',
                                    'add-edit-payment-plan',
                                    'payment-plans',
                                    'no-access',
                                    'general-settings',
                                    'apartments',
                                    'buildings',
                                    'add-edit-apartment',
                                    'add-edit-building',
                                    'form',
                                    'form-list',
                                    'import-apartment-csv');
 
    if(in_array(get_template_filename(),$array_backend_pages)){

        wp_enqueue_script( "jquery",
        get_template_directory_uri() . "/js/backend/jquery-1.8.3.min.js", array(), false, true
        );

        wp_enqueue_script( "jquery-ui",
        get_template_directory_uri() . "/js/backend/jquery-ui-1.10.1.custom.min.js",
        array( "jquery" ) , false, true);

        wp_enqueue_script( "jquery-bootstrap",
        get_template_directory_uri() . "/js/backend/bootstrap.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "breakpoints",
        get_template_directory_uri() . "/js/backend/breakpoints.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "jquery-unveil",
        get_template_directory_uri() . "/js/backend/jquery.unveil.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "jqueryblockui",
        get_template_directory_uri() . "/js/backend/jqueryblockui.js",
        array( "jquery" ) , false, true);

        wp_enqueue_script( "jquery-sidr",
        get_template_directory_uri() . "/js/backend/jquery.sidr.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "jquery-animateNumbers",
        get_template_directory_uri() . "/js/backend/jquery.animateNumbers.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "pace",
        get_template_directory_uri() . "/js/backend/pace.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "bootstrap-datepicker",
        get_template_directory_uri() . "/js/backend/bootstrap-datepicker.js",
        array( "jquery" ) , false, true);

        wp_enqueue_script( "select2",
        get_template_directory_uri() . "/js/backend/select2.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "jquery-slimscroll",
        get_template_directory_uri() . "/js/backend/jquery.slimscroll.min.js",
        array( "jquery" ) , false, true);

        wp_enqueue_script( "bootstrap-wizard",
        get_template_directory_uri() . "/js/backend/jquery.bootstrap.wizard.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "jquery-validate",
        get_template_directory_uri() . "/js/backend/jquery.validate.min.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "form_validations",
        get_template_directory_uri() . "/js/backend/form_validations.js",
        array( "jquery" ), false, true );

        wp_enqueue_script( "underscore",
        get_template_directory_uri() . "/js/backend/underscore.js",
        array( "jquery" ), false, true );

        //commonly used functions
        wp_enqueue_script( 'backend-common',
            get_template_directory_uri() . "/js/backend/common.js",
            array( "jquery" ), false, true );
    }

        ///load unit.js if any of the specifed is loaded
        if(in_array(get_template_filename(),array('apartments','add-edit-apartment'))){
        wp_enqueue_script( 'unit',
            get_template_directory_uri() . "/js/backend/unit.js",
            array( "jquery" ), false, true );
        }

    ///load unit.js if any of the specifed is loaded
        if(in_array(get_template_filename(),array('import-apartment-csv'))){
        wp_enqueue_script( 'unit',
            get_template_directory_uri() . "/js/backend/unit_import.js",
            array( "jquery" ), false, true );
        }
    ///load building.js if any of the specifed is loaded
    if(in_array(get_template_filename(),array('buildings','add-edit-building'))){
        wp_enqueue_script( 'unit',
            get_template_directory_uri() . "/js/backend/building.js",
            array( "jquery" ), false, true );
    }

    ///load settings.js if any of the specifed is loaded
    if(in_array(get_template_filename(),array('general-settings'))){
        wp_enqueue_script( 'ap-sl-settings',
            get_template_directory_uri() . "/js/backend/settings.js",
            array( "jquery" ), false, true );
    }


    ///load payment-plan.js if any of the specifed is loaded
    if(in_array(get_template_filename(),array('add-edit-payment-plan','payment-plans'))){
        wp_enqueue_script( 'ap-sl-settings',
            get_template_directory_uri() . "/js/backend/payment-plans.js",
            array( "jquery" ), false, true );
    }


    ///load unit.js if any of the specifed is loaded
    if(in_array(get_template_filename(),array('users','add-edit-user'))){
        wp_enqueue_script( 'user',
            get_template_directory_uri() . "/js/backend/user.js",
            array( "jquery" ), false, true );
        }
    ///load tablesorter js files
        if(in_array(get_template_filename(),array('users','apartments','buildings','payment-plans'))){
            wp_enqueue_script( 'tablesorter',
                get_template_directory_uri() . "/js/backend/jquery.tablesorter.min.js",
                array( "jquery" ), false, true );

            wp_enqueue_script( 'tablesorter-widgets',
                get_template_directory_uri() . "/js/backend/jquery.tablesorter.widgets.min.js",
                array( "jquery" ), false, true );

            wp_enqueue_script( 'tablesorter-widgets-filter',
                get_template_directory_uri() . "/js/backend/jquery.tablesorter.widgets-filter-formatter.min.js",
                array( "jquery" ), false, true );

    }

     if(in_array(get_template_filename(),array('form','form-list'))){
        wp_enqueue_script( 'formidable-form',
                get_template_directory_uri() . "/js/backend/formidable-form.js",
                array( "jquery" ), false, true );
         wp_enqueue_script( 'jquery-ui-widget',
            get_template_directory_uri() . "/js/backend/jquery.ui.widget.js",
            array( "jquery" ), false, true );
        wp_enqueue_script( 'fileuploadjs',
            get_template_directory_uri() . "/js/backend/jquery.fileupload.js",
            array( "jquery" ), false, true );

        }

    //laod file upload js file
    if(in_array(get_template_filename(),array('add-edit-building','import-apartment-csv'))){

        wp_enqueue_script( 'jquery-ui-widget',
            get_template_directory_uri() . "/js/backend/jquery.ui.widget.js",
            array( "jquery" ), false, true );
        wp_enqueue_script( 'fileuploadjs',
            get_template_directory_uri() . "/js/backend/jquery.fileupload.js",
            array( "jquery" ), false, true );

    }


wp_localize_script( "jquery", "SITEURL", site_url() );

wp_localize_script( "jquery", "AJAXURL", admin_url( "admin-ajax.php" ) );




}

add_action( 'wp_enqueue_scripts', 'apartmentselector_backend_enqueue_scripts' );



function apartmentselector_backend_enqueue_styles() {

    global $post;

    $array_backend_pages = array(   'add-edit-user',
                                    'users',
                                    'add-edit-payment-plan',
                                    'payment-plans',
                                    'no-access',
                                    'general-settings',
                                    'apartments',
                                    'buildings',
                                    'add-edit-apartment',
                                    'add-edit-building',
                                    'form',
                                    'import-apartment-csv' );

    if(in_array(get_template_filename(),$array_backend_pages)){
if(in_array(get_template_filename(),array(  'add-edit-user',
                                            'users',
                                            'add-edit-payment-plan',
                                            'payment-plans',
                                            'no-access',
                                            'general-settings',
                                            'apartments',
                                            'buildings',
                                            'add-edit-apartment',
                                            'add-edit-building',
                                            'import-apartment-csv'
                                            ))){

        wp_enqueue_style( "pace-theme-flash", get_template_directory_uri() . "/css/backend/css/pace-theme-flash.css" );
        wp_enqueue_style( "bootstrap-tagsinput", get_template_directory_uri() . "/css/backend/css/bootstrap-tagsinput.css" );
        wp_enqueue_style( "jquery.sidr.light", get_template_directory_uri() . "/css/backend/css/jquery.sidr.light.css" );
        wp_enqueue_style( "bootstrap.min", get_template_directory_uri() . "/css/backend/css/bootstrap.min.css" );
        wp_enqueue_style( "bootstrap-theme.min", get_template_directory_uri() . "/css/backend/css/bootstrap-theme.min.css" );
        wp_enqueue_style( "font-awesome", get_template_directory_uri() . "/css/backend/css/font-awesome.css" );
        wp_enqueue_style( "animate.min", get_template_directory_uri() . "/css/backend/css/animate.min.css" );
        wp_enqueue_style( "style", get_template_directory_uri() . "/css/backend/css/style.css" );
        wp_enqueue_style( "responsive", get_template_directory_uri() . "/css/backend/css/responsive.css" );
        wp_enqueue_style( "custom-icon-set", get_template_directory_uri() . "/css/backend/css/custom-icon-set.css" );
        wp_enqueue_style( "custom", get_template_directory_uri() . "/css/backend/css/custom.css" );
}
        //table sorter css
        if(in_array(get_template_filename(),array('users','apartments','buildings','payment-plans'))){

            wp_enqueue_style( "tablesorter-custom", get_template_directory_uri() . "/css/backend/css/tablesorter-custom.css" );
            wp_enqueue_style( "filter-formatter", get_template_directory_uri() . "/css/backend/css/filter.formatter.css" );

        }
        //file upload
        if(in_array(get_template_filename(),array('add-edit-building','form','import-apartment-csv' ))){
    wp_enqueue_style( "bootstrap.min", get_template_directory_uri() . "/css/backend/css/bootstrap.min.css" );
        wp_enqueue_style( "bootstrap-theme.min", get_template_directory_uri() . "/css/backend/css/bootstrap-theme.min.css" );
      
 wp_enqueue_style( "custom", get_template_directory_uri() . "/css/backend/css/custom.css" );
            wp_enqueue_style( "fileupload", get_template_directory_uri() . "/css/backend/css/jquery.fileupload.css" );

        }
    }

}

add_action( 'wp_enqueue_scripts', 'apartmentselector_backend_enqueue_styles'  );