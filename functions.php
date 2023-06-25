<?php
add_theme_support('post-thumbnails');


require_once ("functions/functions-enqueue.php");
require_once ("functions/functions-custom.php");
require_once ("functions/functions-media.php");
require_once ("functions/functions-metabox.php");
require_once ("functions/functions-wpml-languages.php");

require_once ("functions/functions-publish.php");
require_once ("config.php");


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
		'glb' => 'model/gltf-binary'
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