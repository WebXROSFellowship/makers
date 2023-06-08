<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <?php wp_head(); ?>

<script>
  <?php
      // post specific hacks
          if(function_exists('icl_object_id')){
              global $sitepress;
             print "let languages = ".json_encode(getLanguageList());
          // $thumbnail =getThumbnail(get_post_thumbnail_id($post->ID),"Full");
          }
       
  ?>

</script>


</head>
<body <?php body_class(); ?>>

