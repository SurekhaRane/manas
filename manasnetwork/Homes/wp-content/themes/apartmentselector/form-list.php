<?php
/**
 * Template Name: Form List
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

$form_id = $_REQUEST["form_id"];
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
		<div align="left"><a href="<?php echo site_url(); ?>/add-edit-details/?form_id=<?php echo $form_id;?>">Add</a></div>
		<br><br>
		
			<?php
				// Start the Loop.
				while ( have_posts() ) : the_post();

					?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					 

						<div class="entry-content">
						 

							<?php 
 							$page = get_page_by_title( 'Add Edit Details' );
     						$fields = '';
							if($form_id ==24){
								$fields = 'name,unittype,carpetarea,terracearea,sellablearea,persqftprice,premiumaddon,2dlayout,3dlayout,roomsizes,terraceoptions';
							}
							echo FrmProEntriesController::get_form_results(array('id' => $form_id,'edit_link'=>"Edit",'page_id'=>$page->ID,'fields'=>$fields));
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