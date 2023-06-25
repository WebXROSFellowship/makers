<?php
 // Wordpress PHP variables to render into JS at outset.

  // function config_script() {

    $array = array(
      "SITE_URL" => get_site_url(),
      "HOME_URL" => get_home_url(),
      "SITE_TITLE" => get_bloginfo( 'name' ),
      "SITE_TAGLINE" => get_bloginfo( 'description' ),
      // "home_page" => get_option( 'page_on_front' ),
      // "uploads_path" =>  upload_dir['baseurl'],
      // "theme_path" => get_stylesheet_directory(),
      // "useWheelNav" => false,
      // "active_id" => $post->ID,
      // "active_object" => $post->post_type,
      // "slug" => $post->post_name,
      // "profile_template" => ''//hack
      );
  

    wp_register_script('config-script', get_template_directory_uri() . '/src/js/app/config/appConfig.js', array( 'jquery' ), '', true);
    wp_localize_script('config-script', 'configData', $array);
    wp_enqueue_script('config-script');

  // }
  // add_action( 'wp_enqueue_scripts', 'config_script' );


?>
