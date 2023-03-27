<?php

    function enqueue_style() {

        //because without this, there is no site, at least not a coherent one.

        wp_enqueue_style( 'powersimple',get_stylesheet_directory_uri() . '/style.css');

       /*

          wp_register_style('bootstrap', '//cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/css/bootstrap.min.css', null,'1.1', true); 

        wp_enqueue_style('bootstrap');

       */

   

    }

    add_action( 'wp_enqueue_scripts', 'enqueue_style' );



    function theme_scripts() {

        wp_register_script('jqueryui', '//cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js',array('jquery')); 

        wp_enqueue_script('jqueryui');

        

       /*

        wp_register_script('scroll-magic', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/ScrollMagic.min.js', null,'1.1', true); 

        wp_enqueue_script('scroll-magic');

        wp_register_script('scroll-magic-debug', '//cdnjs.cloudflare.com/ajax/libs/ScrollMagic/2.0.5/plugins/debug.addIndicators.min.js', null,'1.1', true); 

        wp_enqueue_script('scroll-magic-debug');

       

       wp_enqueue_script( 'jquery' );





     



        wp_register_script('slick', '//cdn.jsdelivr.net/jquery.slick/1.5.9/slick.min.js',array('jquery')); 

        wp_enqueue_script('slick');

       

        wp_register_script('three', '//cdnjs.cloudflare.com/ajax/libs/three.js/r75/three.min.js'); 

        wp_enqueue_script('three');



    wp_register_script('d3', '//cdnjs.cloudflare.com/ajax/libs/d3/4.2.2/d3.min.js'); 

        wp_enqueue_script('d3');

        wp_register_script('d3-geo', '//d3js.org/d3-geo.v1.min.js'); 

        wp_enqueue_script('d3-geo');

        

        wp_register_script('topojson', '//d3js.org/topojson.v2.min.js'); 

        wp_enqueue_script('topojson');



        wp_register_script('tweenmax', '//cdnjs.cloudflare.com/ajax/libs/gsap/1.18.4/TweenMax.min.js'); 

        wp_enqueue_script('tweenmax');

           //vendor is the stylesheet rendered 

     */

       //vendor is the stylesheet rendered 

       wp_register_script('vendor',get_stylesheet_directory_uri() . '/vendor.min.js', array('jquery'),rand(100000,999999), false); 

       wp_enqueue_script('vendor');

       /*
           wp_register_script('xrapp',get_stylesheet_directory_uri() . '/xr-app.js', array('jquery'),rand(100000,999999), true); 

           wp_enqueue_script('xrapp');
        */


        

     



        wp_register_script('main',get_stylesheet_directory_uri() . '/main.js', array('jquery'),rand(100000,999999), true); 

      

        wp_enqueue_script('main');



    }



    

    add_action( 'wp_enqueue_scripts', 'theme_scripts' );  



?>