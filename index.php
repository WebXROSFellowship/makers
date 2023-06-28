<?php get_header(); ?>

<!-- root tag for react-app content -->
<div id="root" class="main"></div>


<div id="main-content">
  <?php
    if (have_posts()) :
      while (have_posts()) : the_post();
      ///  the_content();
      endwhile;
    endif;
  ?>
</div>



<?php get_footer(); ?>