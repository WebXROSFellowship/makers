<?php

    function enqueue_style() {

        //because without this, there is no site, at least not a coherent one.

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');

        function enqueue_aframe_library() {
            wp_enqueue_script( 'aframe', 'https://aframe.io/releases/1.2.0/aframe.min.js', array(), '1.2.0', true );
        }
        add_action( 'wp_enqueue_scripts', 'enqueue_aframe_library' );
        
        // Enqueue A-Frame Inspector
        function enqueue_aframe_inspector() {
            wp_enqueue_script( 'aframe-inspector', 'path/to/aframe-inspector.min.js', array( 'aframe' ), '1.0.0', true );
        }
        add_action( 'wp_enqueue_scripts', 'enqueue_aframe_inspector' );
        

        wp_register_script('aframe-troika-text', 'https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js', array(), '', true);
        wp_enqueue_script('aframe-troika-text');

        wp_register_script('aframe-environment', 'https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js', array(), '', true);
        wp_enqueue_script('aframe-environment');

        wp_register_script('aframe-physics', 'https://cdn.jsdelivr.net/gh/zach-capalbo/aframe-extras/dist/aframe-extras.min.js', array(), '', true);
        wp_enqueue_script('aframe-physics');

        wp_register_script('aframe-geometry', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r134/examples/js/deprecated/Geometry.js', array(), '', true);
        wp_enqueue_script('aframe-geometry');
        
        


    }

    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

    function theme_scripts() {

        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');

        wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
        wp_enqueue_script('vendor');
    
        wp_register_script('popperjs','https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('popperjs');

        wp_register_script('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('bootstrap');

        
    }
    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>