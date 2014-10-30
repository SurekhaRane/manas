<?php
/**
 * apartmentselector template for displaying Single-Posts
 *
 * @package    WordPress
 * @subpackage apartmentselector
 * @since      apartmentselector 0.0.1
 */

get_header(); ?>

    <section class="page-content primary" role="main">

        <?php
        if ( have_posts() ) : the_post();

            get_template_part( 'loop', get_post_format() ); ?>

            <aside class="post-aside">

            <div class="post-links">
                <?php previous_post_link( '%link', __( '&laquo; Previous post', 'apartmentselector' ) ) ?>
                <?php next_post_link( '%link', __( 'Next post &raquo;', 'apartmentselector' ) ); ?>
            </div>

            <?php
            if ( comments_open() || get_comments_number() > 0 ) :
                comments_template( '', TRUE );
            endif;
            ?>

            </aside><?php

        else :

            get_template_part( 'loop', 'empty' );

        endif;
        ?>

    </section>

<?php get_footer(); ?>