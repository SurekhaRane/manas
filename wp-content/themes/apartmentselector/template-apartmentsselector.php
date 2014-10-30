<?php
/**
 * Template Name: apartmentsselector-template
 *
 
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
    <!--<title><?php wp_title(); ?></title>-->
    <title>Apartment Selector - Manas Lake</title>
    <link rel="shortcut icon" href="../wp-content/themes/apartmentselector/images/favicon.png" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
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
<div id="wishlist-region"></div>

<!-- footer-region -->
<div id="footer-region">
<p style="text-align:center;" class="termsTxt"><a href="http://manaslake.com/terms-conditions/" target="_blank">Terms &amp; Conditions</a></p>

</div>



<div id="mapid"  >

    <?php //echo do_shortcode('[mapplic id="2"]'); ?>




</div>











<script>
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-54261289-1', 'auto');
    ga('require', 'displayfeatures');
    ga('send', 'pageview');
</script>

<?php wp_footer(); ?>
</body>
</html>