<?php
/**
 * Template Name: apartmentselector-template
 *
 * @author     suraj@ajency.in
 * @package    WordPress
 */
?>

<!DOCTYPE html>
<!--[if lt IE 7]>
<html class="ie ie-no-support" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 9]>
<html class="ie ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 9]><!-->
<html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
    <script type="text/javascript"  src="../wp-content/themes/apartmentselector/js/src/preload/modernizr.custom.js"></script>
    <script type="text/javascript"  src="../wp-content/themes/apartmentselector/js/src/preload/classie.js"></script>

    <meta charset="<?php bloginfo( 'charset' ); ?>"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title><?php wp_title(); ?></title>
    <meta name="viewport" content="width=device-width"/>
    <!--[if lt IE 9]>
    <script src="<?php echo get_template_directory_uri(); ?>/js/html5shiv.js"></script>

    <![endif]-->
    <script>

    </script>
    <?php wp_head(); ?>
    </head>
<body class="booking cbp-spmenu-push">

<!-- #header-region -->
<div id="header-region"></div>

<!-- filter-region -->
<div id="filter-region"></div>

<!-- main-region -->
<div id="main-region"></div>

<!-- footer-region -->
<div id="footer-region"></div>



<div id="mapid"  >

    <?php //echo do_shortcode('[mapplic id="2"]'); ?>




</div>












<?php wp_footer(); ?>
</body>
</html>