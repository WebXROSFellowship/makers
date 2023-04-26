<?php

function makers_register_custom_post_types() {
  // Register the 'profile' custom post type
  register_post_type('profile', [
    'labels' => [
      'name' => 'Profiles',
      'singular_name' => 'Profile',
    ],
    'public' => true,
    'has_archive' => true,
    'hierarchical' => true, 
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'taxonomies' => ['category', 'post_tag'],
  ]);

  // Register the 'event' custom post type
  register_post_type('event', [
    'labels' => [
      'name' => 'Events',
      'singular_name' => 'Event',
    ],
    'public' => true,
    'has_archive' => true,
    'hierarchical' => true, 
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'taxonomies' => ['category', 'post_tag'],
  ]);

  // Register the 'resource' custom post type
  register_post_type('resource', [
    'labels' => [
      'name' => 'Resources',
      'singular_name' => 'Resource',
    ],
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'taxonomies' => ['category', 'post_tag'],
  ]);

  // Register the 'sponsor' custom post type
  register_post_type('sponsor', [
    'labels' => [
      'name' => 'Sponsors',
      'singular_name' => 'Sponsor',
    ],
    'public' => true,
    'has_archive' => true,
    'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
    'taxonomies' => ['category', 'post_tag'],
  ]);

    // Register the 'team' custom post type
    register_post_type('team', [
      'labels' => [
        'name' => 'Team',
        'singular_name' => 'Team',
      ],
      'public' => true,
      'has_archive' => true,
      'supports' => ['title', 'editor', 'thumbnail', 'excerpt'],
      'taxonomies' => ['category', 'post_tag'],
    ]);
  

}

add_action('init', 'makers_register_custom_post_types');