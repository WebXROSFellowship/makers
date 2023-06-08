<?php
 // Wordpress PHP variables to render into JS at outset.

  $array = array(
    "SITE_URL" => get_site_url(),
    "HOME_URL" => get_home_url(),
    "SITE_TITLE" => get_bloginfo( 'name' ),
    "SITE_TAGLINE" => get_bloginfo( 'description' ),
    "active_id" => $post->ID,
    "active_object" => $post->post_type,
    "home_page" => get_option( 'page_on_front' ),
    "useWheelNav" => false,
    "uploads_path" =>  upload_dir['baseurl'],
    "theme_path" => get_stylesheet_directory(),
    "slug" => $post->post_name,
    "profile_template" => ''//hack
    );



  
  wp_enqueue_script('config-script', get_template_directory_uri() . '/src/js/app/config/config.js');
  wp_localize_script('config-script', 'configScriptData', $array);


?>

