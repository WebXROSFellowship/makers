<?php get_header(); ?>

<div id="root"></div>
<div id="main-content">D'OH! This page doesn't exist (yet).
  <?php
    if (have_posts()) :
      while (have_posts()) : the_post();
      ///  the_content();
      endwhile;
    endif;
  ?>
</div>



<?php get_footer(); ?>