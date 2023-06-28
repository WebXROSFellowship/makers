<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>

  <meta charset="<?php bloginfo('charset'); ?>" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="title" content="<?php bloginfo('name'); ?>" />
  <meta name="description" content="<?php bloginfo('description'); ?>" />
  <meta name="author" content="powersimple" />
  

  <?php wp_head(); ?>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css" integrity="sha512-KfkfwYDsLkIlwQp6LFnl8zNdLGxu9YAA1QvwINks4PhcElQSvqcyVLLD9aMhXd13uQjoXtEKNosOWaZqXgel0g==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">

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


<title><?php bloginfo('name'); ?> &raquo; <?php is_front_page() ? bloginfo('description') : wp_title(''); ?></title>

</head>
<body <?php body_class(); ?>>
