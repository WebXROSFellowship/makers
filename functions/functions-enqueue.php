<?php

    function enqueue_style() {

        //because without this, there is no site, at least not a coherent one.

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');
       /*      */
    //    wp_register_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css', null, '1.1', true);
    //    wp_enqueue_style('bootstrap');
       
        // wp_register_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css', null,'1.1', true); 
        // wp_enqueue_style('fontawesome');
    }

    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

    function theme_scripts() {

        wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
       wp_enqueue_script('vendor');
    
        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');


        wp_register_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js', array(), '5.3.0-alpha3', true);
        wp_enqueue_script('bootstrap');
    }
    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>