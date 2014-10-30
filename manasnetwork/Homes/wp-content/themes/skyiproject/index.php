<html>
	<head>
		<?php wp_head(); ?>
	</head>
	<body><div id="main-content" class="main-content">

<?php
	if ( is_front_page() && twentyfourteen_has_featured_posts() ) {
		// Include the featured content template.
		get_template_part( 'featured-content' );
	}
?>
	<div id="primary" class="content-area">
		<div id="content" class="site-content" role="main">

			<?php
				// Start the Loop.
				while ( have_posts() ) : the_post();

					// Include the page content template.
					get_template_part( 'content', 'page' );

					// If comments are open or we have at least one comment, load up the comment template.
					 
				endwhile;
			?>

		</div><!-- #content -->
	</div><!-- #primary -->
 
</div><!-- #main-content -->

<?php wp_footer(); ?>
	</body>
</html>