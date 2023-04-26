<?php

    function enqueue_style() {

        //because without this, there is no site, at least not a coherent one.

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');
       /*      */
        wp_register_style('bootstrap', '//cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css', null,'1.1', true); 
        wp_enqueue_style('bootstrap');

        wp_register_style('fontawesome', 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css', null,'1.1', true); 
        wp_enqueue_style('fontawesome');
        wp_register_style('react', 'https://unpkg.com/react@18/umd/react.development.js', null, '1.1', true);
        wp_enqueue_style('react');
        wp_register_style('react-dom', 'https://unpkg.com/react-dom@18/umd/react-dom.development.js', null, '1.1', true);
        wp_enqueue_style('react-dom');
        wp_register_style('react-router-dom', 'https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/6.10.0/react-router-dom.production.min.js', null, '1.1', true);
        wp_enqueue_style('react-router-dom');
    }

    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

    function theme_scripts() {

       wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
       wp_enqueue_script('vendor');
    
        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');

    }



    

    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>