<form id="cdn-form">
  <label for="slug">Slug:</label>
  <input type="text" id="slug" name="slug"><br><br>
  <label for="url">URL:</label>
  <input type="text" id="url" name="url"><br><br>
  <label for="content-type">Content Type:</label>
  <?php
// Get custom post type slugs and names
$custom_post_types = get_post_types(array('_builtin' => false), 'objects');
$options = '<option value="">Select a content type</option>';
foreach ($custom_post_types as $post_type) {
  $options .= sprintf('<option value="%s">%s</option>', $post_type->name, $post_type->label);
}

// Output select menu with onchange event
$current_page = $_SERVER["REQUEST_URI"];
echo '<form id="content-type-form" method="get" action="'.$current_page.'">';
echo '<select id="content-type" name="content_type">';
echo $options;
echo '</select>';
echo '<input type="submit" value="Submit">';
echo '</form>';

// Set up AJAX action to retrieve posts for selected content type
function get_custom_posts() {
  $post_type = $_GET['post_type'];
  $args = array(
    'post_type' => $post_type,
    'posts_per_page' => -1
  );
  $posts = get_posts($args);
  wp_send_json_success($posts);
}
add_action('wp_ajax_get_custom_posts', 'get_custom_posts');
add_action('wp_ajax_nopriv_get_custom_posts', 'get_custom_posts');
?>
  <label for="post-id">Post ID:</label>
  <select id="post-id" name="post-id">
    <option value="">Select a post</option>
    <!-- Options will be dynamically populated -->
  </select><br><br>
  <label for="frameworks">Frameworks:</label>
  <select id="frameworks" name="frameworks[]" multiple>
    <option value="aframe">AFrame</option>
    <option value="babylonjs">BabylonJS</option>
    <option value="threejs">ThreeJS</option>
    <option value="react-three-fiber">React Three Fiber</option>
    <option value="troika">Troika</option>
    <!-- Add more options as needed -->
  </select><br><br>
  <button type="submit" id="submit-cdn">Submit</button>
</form>

<script>
// Use jQuery to handle form submission
jQuery('#cdn-form').on('submit', function(e) {
  e.preventDefault();
  
  // Get form values
  var slug = jQuery('#slug').val();
  var url = jQuery('#url').val();
  var content_type = jQuery('#content-type').val();
  var post_id = jQuery('#post-id').val();
  var frameworks = jQuery('#frameworks').val();
  
  // Store CDN URL data in WordPress post meta
  var data = {
    'action': 'save_cdn_urls',
    'slug': slug,
    'url': url,
    'content_type': content_type,
    'post_id': post_id,
    'frameworks': frameworks
  };
  jQuery.post(ajaxurl, data, function(response) {
    // Handle success or error response
  });
});
// Use jQuery to populate post select menu when content type is selected
jQuery('#content-type-form').on('submit', function(e) {
  e.preventDefault();
  var post_type = jQuery('#content-type').val();
  var data = {
    'action': 'get_custom_posts',
    'post_type': post_type
  };
  jQuery.post(ajaxurl, data, function(response) {
    if (response.success) {
      var posts = response.data;
      var options = '<option value="">Select a post</option>';
      jQuery.each(posts, function(index, post) {
        options += sprintf('<option value="%d">%s</option>', post.ID, post.post_title);
      });
      jQuery('#post-id').html(options);
      jQuery('#post-id').prop('disabled', false);
    } else {
      jQuery('#post-id').html('');
      jQuery('#post-id').prop('disabled', true);
    }
  });
});
</script>