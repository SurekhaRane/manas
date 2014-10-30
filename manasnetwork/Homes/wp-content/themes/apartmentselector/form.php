<?php
/**
 * Template Name: Form
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages and that
 * other 'pages' on your WordPress site will use a different template.
 *
 * @package WordPress
 * @subpackage Twenty_Fourteen
 * @since Twenty Fourteen 1.0
 */
?>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width">
	<title><?php wp_title( '|', true, 'right' ); ?></title>
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<!--[if lt IE 9]>
	<script src="<?php echo get_template_directory_uri(); ?>/js/html5.js"></script>
	<![endif]-->
	<?php wp_head(); ?>
</head>

<div id="main-content" class="main-content">

 
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php
				// Start the Loop.
				while ( have_posts() ) : the_post();

					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					 

						<div class="entry-content" style="display:none" id="main-form-container">
							<?php

							if(isset($_REQUEST["form_id"])){

								$form_id = $_REQUEST["form_id"];
							}
							if(isset($_REQUEST["entry"])){

								$entry = $_REQUEST["entry"];

								global $frm_entry;

								$entry_data = ($frm_entry->getOne($entry, true));
 
								$form_id = $entry_data->form_id;
							}

								if(isset($form_id)){
								 
									//echo str_replace("</form>","</form>",str_replace("<form","<form-disable",FrmEntriesController::show_form($form_id, $key = '', $title=false, $description=true)));
									echo FrmEntriesController::show_form($form_id, $key = '', $title=false, $description=true  );
								 	echo '<input type="button" form-id = "'.$form_id.'" id="save-main-entry" value="Save">';
								  //	echo '<input type="button"  value="Back To List" onClick="location.href=\".site_url().'/room-variants/\"">';
								}
								else{

									echo "No form selected";
								}

								
								 
							?>
 
						</div><!-- .entry-content -->
					</article><!-- #post-## -->
					<?php
					 
				endwhile;
			?>

		</div><!-- #content -->
	</div><!-- #primary -->
 
</div><!-- #main-content -->
<?php wp_footer(); ?>
</body>
</html>