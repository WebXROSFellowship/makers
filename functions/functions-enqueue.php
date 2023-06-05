<?php

// enqueue_styles in wordpress theme
    function enqueue_style() {

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');
    
        wp_register_script( 'aframe', 'https://aframe.io/releases/1.2.0/aframe.min.js', array('jquery'), '1.2.0' , false );
        wp_enqueue_script( 'aframe' );
   
    }
    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

// enqueue_scripts in wordpress theme
    function theme_scripts() {

        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');

        wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
        wp_enqueue_script('vendor');
    
        wp_register_script('popperjs','https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js', array('jquery'),'2.11.7', true); 
        wp_enqueue_script('popperjs');

        wp_register_script('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js', array('jquery'),'5.3.0', true); 
        wp_enqueue_script('bootstrap');

        wp_register_script('aframe-troika-text', 'https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-troika-text');

        wp_register_script('aframe-physics', 'https://cdn.jsdelivr.net/gh/zach-capalbo/aframe-extras/dist/aframe-extras.min.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-physics');

        wp_register_script('aframe-geometry', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r134/examples/js/deprecated/Geometry.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-geometry');

        
    }
    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>