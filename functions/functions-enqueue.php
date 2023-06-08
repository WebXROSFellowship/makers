<?php

// enqueue_styles in wordpress theme
    function enqueue_style() {
        // Register theme stylesheet.
		$theme_version = wp_get_theme()->get( 'Version' );
		$version_string = is_string( $theme_version ) ? $theme_version : false;
		
        wp_register_style('powersimple',get_template_directory_uri() . '/style.css',array(),$version_string);
		wp_enqueue_style( 'powersimple' );
        
        wp_register_style('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css',array(),'5.3.0');
		wp_enqueue_style( 'bootstrap' );
        
        wp_register_style('fontawesome','https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css',array(),'6.1.1');
		wp_enqueue_style( 'fontawesome' );

    
    }
    add_action( 'wp_enqueue_scripts', 'enqueue_style' );

// enqueue_scripts in wordpress theme
    function theme_scripts() {

        // Register theme stylesheet.
        wp_register_script('app',get_stylesheet_directory_uri() . '/app.js', array('jquery'),rand(100000,999999), true); 
        wp_enqueue_script('app');

        wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 
        wp_enqueue_script('vendor');
    
        wp_register_script('popperjs','https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.7/dist/umd/popper.min.js', array('jquery'),'2.11.7', true); 
        wp_enqueue_script('popperjs');

        wp_register_script('bootstrap','https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.min.js', array('jquery'),'5.3.0', true); 
        wp_enqueue_script('bootstrap');

        wp_register_script( 'aframe', 'https://aframe.io/releases/1.2.0/aframe.min.js', array('jquery'), '1.2.0' , false );
        wp_enqueue_script( 'aframe' );
        
        wp_register_script( 'aframe-inspector', 'https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js', array('jquery'),rand(100000,999999), true );
        wp_enqueue_script( 'aframe-inspector' );

        wp_register_script('aframe-troika-text', 'https://unpkg.com/aframe-troika-text/dist/aframe-troika-text.min.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-troika-text');

        wp_register_script('aframe-environment', 'https://unpkg.com/aframe-environment-component@1.1.0/dist/aframe-environment-component.min.js', array('jquery'),'1.1.0', true);
        wp_enqueue_script('aframe-environment');

        wp_register_script('aframe-physics', 'https://cdn.jsdelivr.net/gh/zach-capalbo/aframe-extras/dist/aframe-extras.min.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-physics');

        wp_register_script('aframe-geometry', 'https://cdn.jsdelivr.net/gh/mrdoob/three.js@r134/examples/js/deprecated/Geometry.js', array('jquery'),rand(100000,999999), true);
        wp_enqueue_script('aframe-geometry');
        

    }
    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>