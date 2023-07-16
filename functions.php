<?php
/**
 * Makers Theme Functions & Definations.
 * 
 * @package WordPress
 * @subpackage makers
 */


if( ! function_exists( 'makers_setup' ) ) {


  /**
   * Sets up makers theme defaults and registers theme supports for various WordPress features.
   * 
   * 
   */
  
  function makers_setup() {

	// initialize theme name
	  $theme_name = 'makers';


/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on Twenty Twenty-One, use a find and replace
		 * to change 'makers' to the name of your theme in all the template files.
		 */
		load_theme_textdomain( $theme_name, get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * This theme does not use a hard-coded <title> tag in the document head,
		 * WordPress will provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/**
		 * Add post-formats support.
		 */
		add_theme_support(
			'post-formats',
			array(
				'link',
				'aside',
				'gallery',
				'image',
				'quote',
				'status',
				'video',
				'audio',
				'chat',
			)
		);

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
		add_theme_support( 'post-thumbnails' );
		set_post_thumbnail_size( 1568, 9999 );

		register_nav_menus(
			array(
				'header' => esc_html__( 'Header Menu', $theme_name ),
				'footer'  => esc_html__( 'Footer Menu', $theme_name ),
				'social_media'  => esc_html__( 'Social Media Menu', $theme_name ),
			)
		);

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
			'navigation-widgets',
			)
		);

		/*
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support( 'custom-logo', array(
			'height'               => 100,
			'width'                => 400,
			'flex-height'          => true,
			'flex-width'           => true,
			'header-text'          => array( 'site-title', 'site-description' ),
			'unlink-homepage-logo' => true,
		) );

		/**
		 * Add support for custom theme header
		 */
		add_theme_support( 'custom-header', array(
			'default-image'          => '',
			'width'                  => 1000,
			'height'                 => 250,
			'flex-height'            => true,
			'flex-width'             => true,
			'uploads'                => true,
			'random-default'         => false,
			'header-text'            => true,
			'default-text-color'     => '000',
			'wp-head-callback'       => '',
			'admin-head-callback'    => '',
			'admin-preview-callback' => '',
		) );
		
		// Custom background color.
		add_theme_support( 'custom-background', array(
			'default-image'          => '',
			'default-preset'         => 'default',
			'default-position-x'     => 'left',
			'default-position-y'     => 'top',
			'default-size'           => 'auto',
			'default-repeat'         => 'repeat',
			'default-attachment'     => 'scroll',
			'default-color'          => '',
			'wp-head-callback'       => '_custom_background_cb',
			'admin-head-callback'    => '',
			'admin-preview-callback' => '',
		));

		// Add support for full and wide align images.
		add_theme_support( 'align-wide' );

		// Add support for editor styles.
		add_theme_support( 'editor-styles' );

	    // Add support for responsive embedded content.
		add_theme_support( 'responsive-embeds' );

		// Add support for custom line height controls.
		add_theme_support( 'custom-line-height' );

		// Add support for experimental link color control.
		add_theme_support( 'experimental-link-color' );

		// Add support for experimental cover block spacing.
		add_theme_support( 'custom-spacing' );

		// Remove feed icon link from legacy RSS widget.
		add_filter( 'rss_widget_feed_link', '__return_empty_string' );
		
		// Add theme support for selective refresh for widgets.
		add_theme_support( 'customize-selective-refresh-widgets' );

		// Add support for Block Editor.
		add_theme_support( 'widgets' );

		// // Add support for Block Styles.
		// add_theme_support( 'wp-block-styles' );

		// // Add support for Block Editor.
		// add_theme_support( 'widgets-block-editor' );

		// remove block widget support
		remove_theme_support( 'widgets-block-editor' );

  }

}
add_action( 'after_setup_theme', 'makers_setup' );

require_once ("functions/functions-enqueue.php");
require_once ("functions/functions-custom.php");
require_once ("functions/functions-media.php");
require_once ("functions/functions-metabox.php");
require_once ("functions/functions-wpml-languages.php");

require_once ("functions/functions-publish.php");
require_once ("functions/functions-rest-menus.php");
require_once ("functions/functions-rest-filter-fields.php");
require_once ("functions/functions-rest-endpoints.php");
require_once ("functions/functions-rest-register.php");


function my_custom_mime_types($mimes) {
    // Creating an array of allowed MIME types
    $mimes = array(
        'jpg|jpeg|jpe' => 'image/jpeg',
        'gif' => 'image/gif',
        'png' => 'image/png',
		'glb' => 'model/gltf-binary',
		'ttf' => 'font/ttf',
		'otf' => 'font/otf'
		
    );

    return $mimes;
}
add_filter('upload_mimes', 'my_custom_mime_types');

add_action( 'admin_footer-post-new.php', 'wpse16243_media_default_to_show_all' );
add_action( 'admin_footer-post.php', 'wpse16243_media_default_to_show_all' );

function wpse16243_media_default_to_show_all() {
    ?>
    <script type="text/javascript">
        jQuery(document).ready(function($){
            var called = 0;
            $('#wpcontent').ajaxStop(function() {
                if ( 0 === called ) {
                    $('[value="uploaded"]').attr( 'selected', true ).parent().trigger('change');
                    called = 1;
                }
            });
          var oldPost = wp.media.view.MediaFrame.Post;
          wp.media.view.MediaFrame.Post = oldPost.extend({
            browseRouter: function(routerView){
              oldPost.prototype.browseRouter.apply(this, arguments);
              routerView.set({
                upload: {
                  text:     l10n.uploadFilesTitle,
                  priority: 20
                },
                browse: {
                  text:     l10n.mediaLibraryTitle,
                  priority: 40
                }
              });
            },
          });
        });
    </script>
    <?php
}


?>