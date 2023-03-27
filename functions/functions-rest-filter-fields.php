<?php
function makers_filter_rest_fields($response, $post, $context) {
    $fields = isset($_GET['fields']) ? $_GET['fields'] : '';
    if (!$fields) {
        return $response;
    }

    $field_list = explode(',', $fields);
    $data = $response->get_data();
    $filtered_data = array();

    foreach ($field_list as $field) {
        if (isset($data[$field])) {
            $filtered_data[$field] = $data[$field];
        }
    }

    $response->set_data($filtered_data);
    return $response;
}

function makers_register_rest_field_filters() {
    $post_types = array('post', 'page', 'profile', 'event', 'resource', 'sponsor');

    foreach ($post_types as $post_type) {
        add_filter("rest_prepare_{$post_type}", 'makers_filter_rest_fields', 10, 3);
    }
}

add_action('rest_api_init', 'makers_register_rest_field_filters');
?>
