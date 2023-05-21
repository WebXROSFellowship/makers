<?php

    function enqueue_style() {

        //because without this, there is no site, at least not a coherent one.

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');

    }

    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

    function theme_scripts() {

        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');

        wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
        wp_enqueue_script('vendor');
    
        // wp_register_script('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js', array('jquery'),rand(100000,999999), true); 
        // wp_enqueue_script('bootstrap');

        
    }
    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>