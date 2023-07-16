<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="title" content="<?php bloginfo('name'); ?>" />
  <meta name="description" content="<?php bloginfo('description'); ?>" />
  <meta name="author" content="powersimple" />
  
  <?php wp_head(); ?>

<script>
  // <?php
  //     // post specific hacks
  //         if(function_exists('icl_object_id')){
  //             global $sitepress;
  //            print "let languages = ".json_encode(getLanguageList());
  //         // $thumbnail =getThumbnail(get_post_thumbnail_id($post->ID),"Full");
  //         }
       
  // ?>

</script>


<title><?php bloginfo('name'); ?> &raquo; <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>

</head>
<body <?php body_class(); ?>>
