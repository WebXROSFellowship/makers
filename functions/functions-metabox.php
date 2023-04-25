<?php 

/* AWARDS */
function awards_metabox( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'awards',
		'title' => esc_html__( 'Awards', 'metabox-online-generator' ),
		'post_types' => array( 'resource', 'event','profile' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => false,
		'fields' => array(
		
			array(
				'id' => '3Dlaurel_screenshots',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Laurel Screenshots', 'metabox-online-generator' ), 
				'desc' => esc_html__( '3D Laurel Screenshot', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => '3Dlaurel',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Laurel', 'metabox-online-generator' ), 
				'desc' => esc_html__( '3D Laurel GLB file', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => 'laurel',
				'type' => 'image_advanced',
				'name' => esc_html__( '2D Laurel', 'metabox-online-generator' ),
				'desc' => esc_html__( 'Image Laurel For Nominations', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
			
		),
	);

	return $meta_boxes;
	
}
add_filter( 'rwmb_mehttps://hyperfy.io/ta_boxes', 'awards_metabox' );

function section_class( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'section',
		'title' => esc_html__( 'SECTION', 'section_class' ),
		'post_types' => array( 'page','event','resource','profile' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => false,
		'fields' => array(
		   
			array(
				'id' => $prefix . 'section_class',
				'type' => 'text',
				'name' => esc_html__( 'section-class', 'ps-social' ),
			),
		
			[
                'type'       => 'taxonomy',
                'name'       => esc_html__( 'Taxonomy', 'online-generator' ),
                'id'         => 'section_menu',
                'taxonomy'   => 'nav_menu',
                'field_type' => 'select_advanced',
                'query_args' => [
                    '' => '',
                ],
			],
			
		),
	);

	return $meta_boxes;
}
function profile_info( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profile_info',
		'title' => esc_html__( 'Profile Info', 'metabox-online-generator' ),
		'post_types' => array('profile','resource' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => 'is_company',
				'type' => 'is_company',
				'name' => esc_html__( 'Is Company/Org', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_title',
				'type' => 'text',
				'name' => esc_html__( 'Title', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_company',
				'type' => 'text',
				'name' => esc_html__( 'Organization', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_website',
				'type' => 'url',
				'name' => esc_html__( 'Website', 'metabox-online-generator' ),
			),
			array(
				'id' => 'email',
				'type' => 'text',
				'name' => esc_html__( 'Email', 'metabox-online-generator' ),
			),
			array(
				'id' => 'sort_name',
				'type' => 'text',
				'name' => esc_html__( 'Sort Name As', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_wikipedia',
				'type' => 'url',
				'name' => esc_html__( 'Wikipedia URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_linkedin',
				'type' => 'url',
				'name' => esc_html__( 'LinkedIn URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_twitter',
				'type' => 'url',
				'name' => esc_html__( 'Twitter URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_facebook',
				'type' => 'url',
				'name' => esc_html__( 'Facebook URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_tiktok',
				'type' => 'url',
				'name' => esc_html__( 'Flickr URL', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_instagram',
				'type' => 'url',
				'name' => esc_html__( 'Instagram URL', 'metabox-online-generator' ),
			),
			
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'profile_info' );
function setProfileURL( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profile_info',
		'title' => esc_html__( 'PROFILE INFO', 'omniscience-profiler' ),
		'post_types' => array('profile','resource' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'true',
		'fields' => array(
			array(
                'type' => 'checkbox',
                'name' => esc_html__( 'SUPPRESS PROFILE PAGE', 'online-generator' ),
                'id'   => $prefix . 'suppress_profile_page',
			),
			array(
                'type' => 'checkbox',
                'name' => esc_html__( 'Ph.D.', 'online-generator' ),
                'id'   => $prefix . 'PhD',
			),
			array(
				'id' => 'is_company',
				'type' => 'checkbox',
				'name' => esc_html__( 'Is Company/Org', 'metabox-online-generator' ),
			),
			array(
				'id' => 'company',
				'type' => 'text',
				'name' => esc_html__( 'Company', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_title',
				'type' => 'text',
				'name' => esc_html__( 'Contact Title', 'metabox-online-generator' ),
			),
			array(
				'id' => 'sort_name',
				'type' => 'text',
				'name' => esc_html__( 'Sort Name As', 'metabox-online-generator' ),
			),
			array(
				'id' => 'email',
				'type' => 'text',
				'name' => esc_html__( 'email', 'metabox-online-generator' ),
			),
			array(
				'id' => $prefix . 'website',
				'type' => 'website',
				'name' => esc_html__( 'Website', 'omniscience-profiler' ),
				'desc' => esc_html__( 'Enter URL for the Resource to Profile', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'linkedin',
				'type' => 'url',
				'name' => esc_html__( 'LinkedIn URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'twitter',
				'type' => 'url',
				'name' => esc_html__( 'Twitter URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'github',
				'type' => 'url',
				'name' => esc_html__( 'Github', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'facebook',
				'type' => 'url',
				'name' => esc_html__( 'Facebook URL', 'omniscience-profiler' ),
			),
			
			array(
				'id' =>  'instagram',
				'type' => 'url',
				'name' => esc_html__( 'Instagram URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'discord',
				'type' => 'text',
				'name' => esc_html__( 'Discord Handle', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'youtube',
				'type' => 'url',
				'name' => esc_html__( 'YouTube Channel', 'omniscience-profiler' ),
			),
			[
                'type' => 'textarea',
                'name' => esc_html__( 'blurb', 'online-generator' ),
                'id'   => $prefix . 'blurb',
            ],
			[
                'type' => 'textarea',
                'name' => esc_html__( 'resources', 'online-generator' ),
                'id'   => $prefix . 'resources',
            ],
			[
                'type' => 'textarea',
                'name' => esc_html__( 'Talk Title', 'online-generator' ),
                'id'   => $prefix . 'talk_title',
            ],
			[
                'type' => 'textarea',
                'name' => esc_html__( 'Talk Description', 'online-generator' ),
                'id'   => $prefix . 'talk_description',
            ],

			array(
				'id' => $prefix . 'logo',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Logo', 'omniscience-profiler' ),
				//'desc' => esc_html__( 'Size to 1920x1280', 'metabox-online-generator' ),
			),

			array(
				'id' => $prefix . '3Dlogo',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Logo', 'omniscience-profiler' ),
				'desc' => esc_html__( '.glb format only', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),


			array(
				'id' => 'screenshot',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Screenshots', 'metabox-online-generator' ),
				'desc' => esc_html__( 'submitted with', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),

					array(
					'id' =>  'demo_video',
					'type' => 'url',
					'name' => esc_html__( 'Demo Video', 'omniscience-profiler' ),
				),



           				array(
					'id' =>  'wikipedia',
					'type' => 'url',
					'name' => esc_html__( 'Wikipedia URL', 'omniscience-profiler' ),
				),

				
				array(
					'id' =>  'flickr',
					'type' => 'url',
					'name' => esc_html__( 'Flickr URL', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'Tumblr',
					'type' => 'url',
					'name' => esc_html__( 'Tumblr', 'omniscience-profiler' ),
				),
			

				array(
					'id' =>  'pinterest',
					'type' => 'url',
					'name' => esc_html__( 'Pinterest', 'omniscience-profiler' ),
				),


				
				array(
					'id' =>  'medium',
					'type' => 'url',
					'name' => esc_html__( 'Medium', 'omniscience-profiler' ),
				),

				//comms
				array(
					'id' =>  'telegram',
					'type' => 'url',
					'name' => esc_html__( 'Telegram ', 'omniscience-profiler' ),
				),



				array(
					'id' =>  'slack',
					'type' => 'url',
					'name' => esc_html__( 'Slack', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'skype',
					'type' => 'url',
					'name' => esc_html__( 'Skype', 'omniscience-profiler' ),
				),

				//video
				array(
					'id' =>  'youtube',
					'type' => 'url',
					'name' => esc_html__( 'YouTube Channel', 'omniscience-profiler' ),
				),
				array(
					'id' =>  'vimeo',
					'type' => 'url',
					'name' => esc_html__( 'Vimeo', 'omniscience-profiler' ),
				),

			array(
				'id' =>  'crunchbase',
				'type' => 'url',
				'name' => esc_html__( 'crunchbase URL', 'omniscience-profiler' ),
			),
							array(
					'id' =>  'rss',
					'type' => 'url',
					'name' => esc_html__( 'RSS Feed URL', 'omniscience-profiler' ),
				),
		
				



// URLs
			array(
				'id' => 'logo_url',
				'type' => 'text',
				'name' => esc_html__( 'Logo URL', 'omniscience-profiler' ),
			),
			array(
				'id' => 'logo_svgtag',
				'type' => 'text',
				'name' => esc_html__( 'Logo SVG', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'contact_url',
				'type' => 'url',
				'name' => esc_html__( 'Contact URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'blog_url',
				'type' => 'url',
				'name' => esc_html__( 'Blog URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'apply_url',
				'type' => 'url',
				'name' => esc_html__( 'Apply URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'jobs_url',
				'type' => 'url',
				'name' => esc_html__( 'Jobs URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'events_url',
				'type' => 'url',
				'name' => esc_html__( 'Events URL', 'omniscience-profiler' ),
			),
			array(
				'id' =>  'conference_url',
				'type' => 'url',
				'name' => esc_html__( 'Conference URL', 'omniscience-profiler' ),
			),
				array(
				'id' =>  'developers_url',
				'type' => 'url',
				'name' => esc_html__( 'Developers URL', 'omniscience-profiler' ),
			),
			
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setProfileURL' );

add_filter( 'rwmb_meta_boxes', 'section_class' );
function selectLayoutTemplate( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'layout_template',
		'title' => esc_html__( 'Layout Template', 'metabox-online-generator' ),
		'post_types' => array('guide','hardware'),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
		array(
				'id' => $prefix . 'page_layout_template',
				'name' => esc_html__( 'Page Layout Template', 'metabox-online-generator' ),
				'type' => 'select',
				'placeholder' => esc_html__( 'Select an Item', 'metabox-online-generator' ),
				'options' => array(
					'default' => esc_html__( 'Default', 'metabox-online-generator' ),
                    'two_column' => esc_html__( 'Two Column', 'metabox-online-generator' ),
                    'front_page' => esc_html__( 'Front Page', 'metabox-online-generator' ),
				),
				'std' => 'default',
            ),
            	array(
				'id' => $prefix . 'full_bleed',
				'name' => esc_html__( 'Full Bleed', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Page has no margins', 'metabox-online-generator' ),
			),
			array(
				'id' => 'page_break_after',
				'name' => esc_html__( 'Checkbox', 'metabox-online-generator' ),
				'type' => 'checkbox',
				'desc' => esc_html__( 'Page Break After', 'metabox-online-generator' )
			)
                
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectLayoutTemplate' );

function selectHeroImage( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'hero',
		'title' => esc_html__( 'Hero Image', 'metabox-online-generator' ),
		'post_types' => array('post', 'page','resource','profile','guide' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'hero',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Hero Image', 'metabox-online-generator' ),
				'desc' => esc_html__( '', 'metabox-online-generator' ),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectHeroImage' );


    function video_meta( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'featured_video',
            'title' => esc_html__( 'Featured Video', 'ps-video' ),
            'post_types' => array( 'page','post','project' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
                array(
                    'id' => 'featured_video',
                    'type' => 'video',
                    'name' => esc_html__( 'Video', 'ps-video' ),
                    'max_file_uploads' => 4,
                ),
                array(
                    'id' => $prefix . 'featured_video_url',
                    'type' => 'url',
                    'name' => esc_html__( 'Featured Video URL', 'ps-video' ),
                ),
                array(
                    'id' => $prefix . 'video_aspect',
                    'name' => esc_html__( 'Video Aspect', 'ps-video' ),
                    'type' => 'select',
                    'placeholder' => esc_html__( 'Select an Item', 'ps-video' ),
                    'options' => array(
                        'hd' => '16:9',
                        'sd' => '4:3',
                    ),
                    'std' => 'hd',
                ),
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'video_meta' );





    function social_meta( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'social_url',
            'title' => esc_html__( 'Social', 'ps-social' ),
            'post_types' => array( 'social' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
               
                array(
                    'id' => $prefix . 'social_url',
                    'type' => 'url',
                    'name' => esc_html__( 'URL', 'ps-social' ),
                ),
                
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'social_meta' );



    function ps_metabox( $meta_boxes ) {
        $prefix = '';

        $meta_boxes[] = array(
            'id' => 'project_info',
            'title' => esc_html__( 'Project Info', 'ps_metabox' ),
            'post_types' => array( 'project' ),
            'context' => 'side',
            'priority' => 'default',
            'autosave' => false,
            'fields' => array(
                array(
                    'id' => $prefix . 'project_url',
                    'type' => 'url',
                    'name' => esc_html__( 'Project URL', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_title',
                    'type' => 'text',
                    'name' => esc_html__( 'Project Title', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_client',
                    'type' => 'text',
                    'name' => esc_html__( 'Client', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_agency',
                    'type' => 'text',
                    'name' => esc_html__( 'Agency', 'ps_metabox' ),
                ),
                array(
                    'id' => $prefix . 'project_era',
                    'type' => 'text',
                    'name' => esc_html__( 'Era', 'ps_metabox' ),
                ),
            
            ),
        );

        return $meta_boxes;
    }
    add_filter( 'rwmb_meta_boxes', 'ps_metabox' );
            
function selectScreenImage( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'screen_image',
		'title' => esc_html__( 'Screen Image', 'metabox-online-generator' ),
		'post_types' => array( 'post', 'page','project' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => false,
		'fields' => array(
			array(
				'id' => 'screen_image',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Screen Image', 'metabox-online-generator' ),
				'desc' => esc_html__( 'Appears in Screen', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '10',
				'options' => array(),
				'attributes' => array(),
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'selectScreenImage' );

function siteProperties3D( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'site_properties_3D',
		'title' => esc_html__( '3D Properties', 'metabox-online-generator' ),
		'post_types' => array( 'post', 'event','page','profile','resource' ),
		'context' => 'side',
		'priority' => 'default',
		'autosave' => false,
		'fields' => array(
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'Use A-Frame', 'online-generator' ),
                'id'   => $prefix . 'use_aframe',
            ],
			array(
				'id' => 'skybox',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Skybox', 'metabox-online-generator' ),
				'desc' => esc_html__( 'I got your reticulum right here.', 'metabox-online-generator' ),
				'force_delete' => false,
				'max_file_uploads' => '1',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => 'logo_3D',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Event Logo', 'metabox-online-generator' ), 
				'desc' => esc_html__( '3D Event Logo', 'metabox-online-generator' ),
				'force_delete' => true,
				'max_file_uploads' => '1',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => 'logo_wide_3D',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Event Logo - Wide', 'metabox-online-generator' ), 
				'desc' => esc_html__( '3D Event Logo - Wide', 'metabox-online-generator' ),
				'force_delete' => true,
				'max_file_uploads' => '1',
				'options' => array(),
				'attributes' => array(),
			),
			array(
				'id' => 'button_3D',
				'type' => 'image_advanced',
				'name' => esc_html__( '3D Trigger Model', 'metabox-online-generator' ), 
				'desc' => esc_html__( 'This is what you grab or click on to trigger this Page', 'metabox-online-generator' ),
				'force_delete' => true,
				'max_file_uploads' => '1',
				'options' => array(),
				'attributes' => array(),
			),





		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'siteProperties3D' );

function eventProperties( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_Properties',
		'title' => esc_html__( 'Event Properties', 'metabox-online-generator' ),
		'post_types' => array('event','resource'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [
			[
                'type'      => 'duration',
                'name'      => esc_html__( 'Session Duration', 'online-generator' ),
                'id'        => 'duration',
                'timestamp' => 'false',
            ],
			[
                'type'      => 'datetime',
                'name'      => esc_html__( 'Event Start Time UTC', 'online-generator' ),
                'id'        => 'utc_start',
                'timestamp' => 'false',
			],
			[
                'type' => 'url',
                'name' => esc_html__( 'Tickets URL', 'online-generator' ),
                'id'   => $prefix . 'tickets_url',
            ],
			[
                'type' => 'url',
                'name' => esc_html__( 'Embed Video URL', 'online-generator' ),
                'id'   => $prefix . 'embed_video_url',
			],
			[
                'type' => 'url',
                'name' => esc_html__( 'Video URL', 'online-generator' ),
                'id'   => $prefix . 'video_url',
			],
			[
                'type' => 'url',
                'name' => esc_html__( 'YouTube Playlist', 'online-generator' ),
                'id'   => $prefix . 'playslist_url',
			],
			[
                'type' => 'text',
                'name' => esc_html__( 'Event Style Class', 'online-generator' ),
                'id'   => $prefix . 'event_style_class',
			],

			
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'Suppress Speaker List', 'online-generator' ),
                'id'   => $prefix . 'suppress_speaker_list',
			],

			[
                'type'    => 'select',
                'name'    => esc_html__( 'Session Type', 'online-generator' ),
                'id'      => $prefix . 'session_type',
                'options' => [
                    'panel' => esc_html__( 'Panel', 'online-generator' ),				
                    'presenation'    => esc_html__( 'Presentation','online-generator' ),
                    'feature'        => esc_html__( 'Feature','online-generator' ),
                    'fireside_chat'  => esc_html__( 'Fireside Chat','online-generator' ),
                    'award_category' => esc_html__( 'Award Category','online-generator' ),
                    'honor_category' => esc_html__( 'Honor Category','online-generator' ),
					'welcome' => esc_html__( 'Welcome','online-generator' ),
					'keynote' => esc_html__( 'Keynote','online-generator' ),
					'summit' => esc_html__( 'Summit','online-generator' ),
					'town_hall' => esc_html__( 'Town Hall','online-generator' ),
                ],
            ],
		
			array(
				'id' => 'hero',
				'type' => 'image_advanced',
				'name' => esc_html__( 'Hero Image', 'metabox-online-generator' ),
				'desc' => esc_html__( '', 'metabox-online-generator' ),
			),

		
        ],
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'eventProperties' );

function eventResources( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_resources',
		'title' => esc_html__( 'Resources', 'metabox-online-generator' ),
		'post_types' => array('event'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [

			[
                'type'       => 'post',
                'name'       => esc_html__( '', 'online-generator' ),
                'id'         => 'event_resource',
                'post_type'  => 'resource',
                'field_type' => 'checkbox_tree',
                'query_args' => [
                    '' => '',
                ],
            ],
			
        ],
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'eventResources' );

function eventGuest( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'presenter',
		'title' => esc_html__( 'Guests | Nominees', 'metabox-online-generator' ),
		'post_types' => array('event'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [

			[
                'type'       => 'post',
                'name'       => esc_html__( '', 'online-generator' ),
                'id'         => 'event_guest',
                'post_type'  => 'profile',
                'field_type' => 'checkbox_tree',
                'query_args' => [
                    '' => '',
                ],
            ],
			
        ],
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'eventGuest' );
function eventModerator( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_moderator',
		'title' => esc_html__( 'Presenter | Panel Moderator', 'metabox-online-generator' ),
		'post_types' => array('event'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [

			[
                'type'       => 'post',
                'name'       => esc_html__( '', 'online-generator' ),
                'id'         => 'event_moderator',
                'post_type'  => 'profile',
                'field_type' => 'checkbox_tree',
				'parent' => 'true',
                'query_args' => [
                    '' => '',
                ],
            ],
			
        ],
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'eventModerator' );

function eventHonoree( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_honoree',
		'title' => esc_html__( 'Honorees or Winners', 'metabox-online-generator' ),
		'post_types' => array('event'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [

			[
                'type'       => 'post',
                'name'       => esc_html__( '', 'online-generator' ),
                'id'         => 'event_honoree',
                'post_type'  => 'profile',
                'field_type' => 'checkbox_tree',
                'query_args' => [
                    '' => '',
                ],
            ],
			
        ],
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'eventHonoree' );



function eventSponsor( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_sponsor',
		'title' => esc_html__( 'Sponsor', 'metabox-online-generator' ),
		'post_types' => array('event'),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [

			[
                'type'       => 'post',
                'name'       => esc_html__( '', 'online-generator' ),
                'id'         => 'event_sponsor',
                'post_type'  => 'sponsor',
                'field_type' => 'checkbox_tree',
                'query_args' => [
                    '' => '',
                ],
            ],
			
        ],
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'eventSponsor' );
function eventScripts( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_scripts',
		'title' => esc_html__( 'Event Scripts', 'metabox-online-generator' ),
		'post_types' => array('event'),
		
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [
			[
                'type' => 'url',
                'name' => esc_html__( 'Script URL', 'online-generator' ),
                'id'   => $prefix . 'script_url',
			],
			
		
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Host Script', 'online-generator' ),
                'id'   => $prefix . 'event_host_script',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Linked In Post', 'online-generator' ),
                'id'   => $prefix . 'linked_in_post',
            ],
			
			
			
        ],
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'eventScripts' );


function eventCalendar( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'event_invite_templates',
		'title' => esc_html__( 'Event Invite Templates', 'metabox-online-generator' ),
		'post_types' => array('event'),
		
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [
			[
                'type' => 'url',
                'name' => esc_html__( 'Green Room URL', 'online-generator' ),
                'id'   => $prefix . 'green_room_url',
			],
			
			[
                'type' => 'url',
                'name' => esc_html__( 'Release Form URL', 'online-generator' ),
                'id'   => $prefix . 'release_form_url',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Invitation Instructions', 'online-generator' ),
                'id'   => $prefix . 'event_invite_instructions',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Invitation Panel', 'online-generator' ),
                'id'   => $prefix . 'event_invite_panel',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Invitation Presentation', 'online-generator' ),
                'id'   => $prefix . 'event_invite_presentation',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Invitation Interview', 'online-generator' ),
                'id'   => $prefix . 'event_invite_interview',
            ],
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Release Reminder', 'online-generator' ),
                'id'   => $prefix . 'event_release_reminder',
            ],
			
			
        ],
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'eventCalendar' );


// PROFILE METABOXES
// PROFILE METABOXES

function setProfileContactInfo( $meta_boxes ) { // this shows the box were 
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'contact_info',
		'title' => esc_html__( 'CONTACT INFO', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'low',
		'autosave' => 'false',
		'fields' => array(
			
			array(
				'id' => 'solution_name',
				'type' => 'text',
				'name' => esc_html__( 'Solution Name', 'metabox-online-generator' ),
			),
			array(
				'id' => 'contact_name',
				'type' => 'text',
				'name' => esc_html__( 'Contact Name', 'metabox-online-generator' ),
			),	array(
				'id' => 'company',
				'type' => 'text',
				'name' => esc_html__( 'Company', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_title',
				'type' => 'text',
				'name' => esc_html__( 'Contact Title', 'metabox-online-generator' ),
			),
			array(
				'id' => 'contact_email',
				'type' => 'text',
				'name' => esc_html__( '(private) Contact Email', 'metabox-online-generator' ),
			),
			array(
				'id' => 'profile_email',
				'type' => 'email',
				'name' => esc_html__( '(public) Email Address', 'metabox-online-generator' ),
			),
			array(
				'id' => 'phone',
				'type' => 'text',
				'name' => esc_html__( 'Phone Number', 'metabox-online-generator' ),
			),
			array(
				'id' => 'address',
				'type' => 'text',
				'name' => esc_html__( 'Address', 'metabox-online-generator' ),
			),
			array(
				'id' => 'address2',
				'type' => 'text',
				'name' => esc_html__( 'Address 2', 'metabox-online-generator' ),
			),
			array(
				'id' => 'city',
				'type' => 'text',
				'name' => esc_html__( 'City', 'metabox-online-generator' ),
			),
			array(
				'id' => 'state',
				'type' => 'text',
				'name' => esc_html__( 'State / Province', 'metabox-online-generator' ),
			),
			array(
				'id' => 'postal_code',
				'type' => 'text',
				'name' => esc_html__( 'Postal Code', 'metabox-online-generator' ),
			),
			array(
				'id' => 'country',
				'type' => 'text',
				'name' => esc_html__( 'Country', 'metabox-online-generator' ),
			),
		
		),
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'setProfileContactInfo' );

function current_status( $meta_boxes ) {
    $prefix = '';

    $meta_boxes[] = [
		'title'   => esc_html__( 'Current Event Status', 'online-generator' ),
		'post_types' => array('profile' ),
        'id'      => 'untitled',
        'context' => 'side',
		'priority' => 'high',
		'autosave' => 'true',
        'fields'  => [
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'Registration Pending', 'online-generator' ),
                'id'   => $prefix . 'registration_pending',
            ],
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'Invitation Sent', 'online-generator' ),
                'id'   => $prefix . 'invitation_sent',
            ],
            [
                'type' => 'checkbox',
                'name' => esc_html__( 'Sent Calendar', 'online-generator' ),
                'id'   => $prefix . 'calendar_sent',
            ],
            [
                'type' => 'checkbox',
                'name' => esc_html__( 'Confirmed Calendar', 'online-generator' ),
                'id'   => $prefix . 'calendar_confirmed',
            ],
            [
                'type' => 'checkbox',
                'name' => esc_html__( 'Signed Release', 'online-generator' ),
                'id'   => $prefix . 'signed_release',
			],
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'Request Profile Update', 'online-generator' ),
                'id'   => $prefix . 'request_profile_update',
			],
			[
                'type' => 'checkbox',
                'name' => esc_html__( 'No Profile Link', 'online-generator' ),
                'id'   => $prefix . 'no_profile_link',
            ],
        ],
    ];

    return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'current_status' );



function setProfileEvents( $meta_boxes ) { // this shows the box where the scrape and search results
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profile_events',
		'title' => esc_html__( 'Profile Events', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'true',
		'fields' => array(
			[
                'type'       => 'post',
                'name'       => esc_html__( 'Events', 'online-generator' ),
                'id'         => 'profile_event',
                'post_type'  => 'event',
                'field_type' => 'checkbox_tree',
                'query_args' => [
                    '' => '',
                ],
            ],
          
		),
	);

	return $meta_boxes;
}
//add_filter( 'rwmb_meta_boxes', 'setProfileEvents' );

function setResourceProperties( $meta_boxes ) { // this shows the box where the scrape and search results
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'resource_properties',
		'title' => esc_html__( 'Resource Properties', 'omniscience-profiler' ),
		'post_types' => array('resource' ),
		'context' => 'side',
		'priority' => 'high',
		'autosave' => 'false',
		'fields' => [
            [
                'type' => 'url',
                'name' => esc_html__( 'Resource URL', 'online-generator' ),
                'id'   => $prefix . 'resource_url',
            ],
			[
                'type' => 'url',
                'name' => esc_html__( 'Private Resource URL', 'online-generator' ),
                'id'   => $prefix . 'private_resource_url',
            ],
        ],
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setResourceProperties' );

function timezoneList( $meta_boxes ) {
    $prefix = '';

    $meta_boxes[] = [
        'title'   => esc_html__( 'Physical Location at Next Event', 'online-generator' ),
        'id'      => 'timezone',
        'context' => 'side',
		'priority' => 'high',
				'post_types' => array('profile' ),
        'fields'  => [
			[
				'id' => 'location',
				'type' => 'text',
				'name' => esc_html__( 'City, State, Country', 'metabox-online-generator' ),
				'size' => 5,
			],
            [
                'type'       => 'select',
                'name'       => esc_html__( 'Time Zone at Next Evet', 'online-generator' ),
                'id'         => 'timezone',
				'std'     => '-7| PDT',
                'options' => [
					'1| A' => 'A| Alpha Time Zone | UTC +1',
					'-12| AoE' => 'AoE| Anywhere on Earth | UTC -12',
					'-12| Y' => 'Y| Yankee Time Zone | UTC -12',
					'-11| NUT' => 'NUT| Niue Time | UTC -11',
					'-11| SST' => 'SST| Samoa Standard Time | UTC -11',
					'-11| X' => 'X| X-ray Time Zone | UTC -11',
					'-10| CKT' => 'CKT| Cook Island Time | UTC -10',
					'-10| HST' => 'HST| Hawaii Standard Time | UTC -10',
					'-10| TAHT' => 'TAHT| Tahiti Time | UTC -10',
					'-10| W' => 'W| Whiskey Time Zone | UTC -10',
					'-9.5| MART' => 'MART| Marquesas Time | UTC -9:30',
					'-9| AKST' => 'AKST| Alaska Standard Time | UTC -9',
					'-9| GAMT' => 'GAMT| Gambier Time | UTC -9',
					'-9| HDT' => 'HDT| Hawaii-Aleutian Daylight Time | UTC -9',
					'-9| V' => 'V| Victor Time Zone | UTC -9',
					'-8| AKDT' => 'AKDT| Alaska Daylight Time | UTC -8',
					'-8| PST' => 'PST| Pacific Standard Time | UTC -8',
					'-8| PST' => 'PST| Pitcairn Standard Time | UTC -8',
					'-8| PT' => 'PT| Pacific Time | UTC -8:00 / -7:00',
					'-8| U' => 'U| Uniform Time Zone | UTC -8',
					'-7| MST' => 'MST| Mountain Standard Time | UTC -7',
					'-7| MT' => 'MT| Mountain Time | UTC -7:00 / -6:00',
					'-7| PDT' => 'PDT| Pacific Daylight Time | UTC -7',
					'-7| T' => 'T| Tango Time Zone | UTC -7',
					'-6| CST' => 'CST| Central Standard Time | UTC -6',
					'-6| CT' => 'CT| Central Time | UTC -6:00 / -5:00',
					'-6| EAST' => 'EAST| Easter Island Standard Time | UTC -6',
					'-6| GALT' => 'GALT| Galapagos Time | UTC -6',
					'-6| MDT' => 'MDT| Mountain Daylight Time | UTC -6',
					'-6| S' => 'S| Sierra Time Zone | UTC -6',
					'-5| ACT' => 'ACT| Acre Time | UTC -5',
					'-5| CDT' => 'CDT| Central Daylight Time | UTC -5',
					'-5| CIST' => 'CIST| Cayman Islands Standard Time | UTC -5',
					'-5| COT' => 'COT| Colombia Time | UTC -5',
					'-5| CST' => 'CST| Cuba Standard Time | UTC -5',
					'-5| EASST' => 'EASST| Easter Island Summer Time | UTC -5',
					'-5| ECT' => 'ECT| Ecuador Time | UTC -5',
					'-5| EST' => 'EST| Eastern Standard Time | UTC -5',
					'-5| ET' => 'ET| Eastern Time | UTC -5:00 / -4:00',
					'-5| PET' => 'PET| Peru Time | UTC -5',
					'-5| R' => 'R| Romeo Time Zone | UTC -5',
					'-4| AMT' => 'AMT| Amazon Time | UTC -4',
					'-4| AST' => 'AST| Atlantic Standard Time | UTC -4',
					'-4| AT' => 'AT| Atlantic Time | UTC -4:00 / -3:00',
					'-4| BOT' => 'BOT| Bolivia Time | UTC -4',
					'-4| CDT' => 'CDT| Cuba Daylight Time | UTC -4',
					'-4| CIDST' => 'CIDST| Cayman Islands Daylight Saving Time | UTC -4',
					'-4| CLT' => 'CLT| Chile Standard Time | UTC -4',
					'-4| EDT' => 'EDT| Eastern Daylight Time | UTC -4',
					'-4| FKT' => 'FKT| Falkland Island Time | UTC -4',
					'-4| GYT' => 'GYT| Guyana Time | UTC -4',
					'-4| PYT' => 'PYT| Paraguay Time | UTC -4',
					'-4| Q' => 'Q| Quebec Time Zone | UTC -4',
					'-4| VET' => 'VET| Venezuelan Standard Time | UTC -4',
					'-3.5| NST' => 'NST| Newfoundland Standard Time | UTC -3:30',
					'-3| ADT' => 'ADT| Atlantic Daylight Time | UTC -3',
					'-3| AMST' => 'AMST| Amazon Summer Time | UTC -3',
					'-3| ART' => 'ART| Argentina Time | UTC -3',
					'-3| BRT' => 'BRT| Brasília Time | UTC -3',
					'-3| CLST' => 'CLST| Chile Summer Time | UTC -3',
					'-3| FKST' => 'FKST| Falkland Islands Summer Time | UTC -3',
					'-3| GFT' => 'GFT| French Guiana Time | UTC -3',
					'-3| P' => 'P| Papa Time Zone | UTC -3',
					'-3| PMST' => 'PMST| Pierre & Miquelon Standard Time | UTC -3',
					'-3| PYST' => 'PYST| Paraguay Summer Time | UTC -3',
					'-3| ROTT' => 'ROTT| Rothera Time | UTC -3',
					'-3| SRT' => 'SRT| Suriname Time | UTC -3',
					'-3| UYT' => 'UYT| Uruguay Time | UTC -3',
					'-3| WARST' => 'WARST| Western Argentine Summer Time | UTC -3',
					'-3| WGT' => 'WGT| West Greenland Time | UTC -3',
					'-2.5| NDT' => 'NDT| Newfoundland Daylight Time | UTC -2:30',
					'-2| BRST' => 'BRST| Brasília Summer Time | UTC -2',
					'-2| FNT' => 'FNT| Fernando de Noronha Time | UTC -2',
					'-2| GST' => 'GST| South Georgia Time | UTC -2',
					'-2| O' => 'O| Oscar Time Zone | UTC -2',
					'-2| PMDT' => 'PMDT| Pierre & Miquelon Daylight Time | UTC -2',
					'-2| UYST' => 'UYST| Uruguay Summer Time | UTC -2',
					'-2| WGST' => 'WGST| Western Greenland Summer Time | UTC -2',
					'-1| AZOT' => 'AZOT| Azores Time | UTC -1',
					'-1| CVT' => 'CVT| Cape Verde Time | UTC -1',
					'-1| EGT' => 'EGT| East Greenland Time | UTC -1',
					'-1| N' => 'N| November Time Zone | UTC -1',
					'0| AZOST' => 'AZOST| Azores Summer Time | UTC +0',
					'0| EGST' => 'EGST| Eastern Greenland Summer Time | UTC +0',
					'0| GMT' => 'GMT| Greenwich Mean Time | UTC +0',
					'0| WET' => 'WET| Western European Time | UTC +0',
					'0| WT' => 'WT| Western Sahara Standard Time | UTC +0',
					'0| Z' => 'Z| Zulu Time Zone | UTC +0',
					'1| BST' => 'BST| British Summer Time | UTC +1',
					'1| CET' => 'CET| Central European Time | UTC +1',
					'1| IST' => 'IST| Irish Standard Time | UTC +1',
					'1| WAT' => 'WAT| West Africa Time | UTC +1',
					'1| WEST' => 'WEST| Western European Summer Time | UTC +1',
					'1| WST' => 'WST| Western Sahara Summer Time | UTC +1',
					'2| B' => 'B| Bravo Time Zone | UTC +2',
					'2| CAT' => 'CAT| Central Africa Time | UTC +2',
					'2| CEST' => 'CEST| Central European Summer Time | UTC +2',
					'2| EET' => 'EET| Eastern European Time | UTC +2',
					'2| IST' => 'IST| Israel Standard Time | UTC +2',
					'2| SAST' => 'SAST| South Africa Standard Time | UTC +2',
					'2| WAST' => 'WAST| West Africa Summer Time | UTC +2',
					'3| AST' => 'AST| Arabia Standard Time | UTC +3',
					'3| C' => 'C| Charlie Time Zone | UTC +3',
					'3| EAT' => 'EAT| Eastern Africa Time | UTC +3',
					'3| EEST' => 'EEST| Eastern European Summer Time | UTC +3',
					'3| FET' => 'FET| Further-Eastern European Time | UTC +3',
					'3| IDT' => 'IDT| Israel Daylight Time | UTC +3',
					'3| MSK' => 'MSK| Moscow Standard Time | UTC +3',
					'3| SYOT' => 'SYOT| Syowa Time | UTC +3',
					'3| TRT' => 'TRT| Turkey Time | UTC +3',
					'3.5| IRST' => 'IRST| Iran Standard Time | UTC +3:30',
					'4| ADT' => 'ADT| Arabia Daylight Time | UTC +4',
					'4| AMT' => 'AMT| Armenia Time | UTC +4',
					'4| AZT' => 'AZT| Azerbaijan Time | UTC +4',
					'4| D' => 'D| Delta Time Zone | UTC +4',
					'4| GET' => 'GET| Georgia Standard Time | UTC +4',
					'4| GST' => 'GST| Gulf Standard Time | UTC +4',
					'4| KUYT' => 'KUYT| Kuybyshev Time | UTC +4',
					'4| MSD' => 'MSD| Moscow Daylight Time | UTC +4',
					'4| MUT' => 'MUT| Mauritius Time | UTC +4',
					'4| RET' => 'RET| Reunion Time | UTC +4',
					'4| SAMT' => 'SAMT| Samara Time | UTC +4',
					'4| SCT' => 'SCT| Seychelles Time | UTC +4',
					'4.5| AFT' => 'AFT| Afghanistan Time | UTC +4:30',
					'4.5| IRDT' => 'IRDT| Iran Daylight Time | UTC +4:30',
					'5| AMST' => 'AMST| Armenia Summer Time | UTC +5',
					'5| AQTT' => 'AQTT| Aqtobe Time | UTC +5',
					'5| AZST' => 'AZST| Azerbaijan Summer Time | UTC +5',
					'5| E' => 'E| Echo Time Zone | UTC +5',
					'5| MAWT' => 'MAWT| Mawson Time | UTC +5',
					'5| MVT' => 'MVT| Maldives Time | UTC +5',
					'5| ORAT' => 'ORAT| Oral Time | UTC +5',
					'5| PKT' => 'PKT| Pakistan Standard Time | UTC +5',
					'5| TFT' => 'TFT| French Southern and Antarctic Time | UTC +5',
					'5| TJT' => 'TJT| Tajikistan Time | UTC +5',
					'5| TMT' => 'TMT| Turkmenistan Time | UTC +5',
					'5| UZT' => 'UZT| Uzbekistan Time | UTC +5',
					'5| YEKT' => 'YEKT| Yekaterinburg Time | UTC +5',
					'5.5| IST' => 'IST| India Standard Time | UTC +5:30',
					'5.75| NPT' => 'NPT| Nepal Time | UTC +5:45',
					'6| ALMT' => 'ALMT| Alma-Ata Time | UTC +6',
					'6| BST' => 'BST| Bangladesh Standard Time | UTC +6',
					'6| BTT' => 'BTT| Bhutan Time | UTC +6',
					'6| F' => 'F| Foxtrot Time Zone | UTC +6',
					'6| IOT' => 'IOT| Indian Chagos Time | UTC +6',
					'6| KGT' => 'KGT| Kyrgyzstan Time | UTC +6',
					'6| OMST' => 'OMST| Omsk Standard Time | UTC +6',
					'6| QYZT' => 'QYZT| Qyzylorda Time | UTC +6',
					'6| VOST' => 'VOST| Vostok Time | UTC +6',
					'6| YEKST' => 'YEKST| Yekaterinburg Summer Time | UTC +6',
					'6.5| CCT' => 'CCT| Cocos Islands Time | UTC +6:30',
					'6.5| MMT' => 'MMT| Myanmar Time | UTC +6:30',
					'7| CXT' => 'CXT| Christmas Island Time | UTC +7',
					'7| DAVT' => 'DAVT| Davis Time | UTC +7',
					'7| G' => 'G| Golf Time Zone | UTC +7',
					'7| HOVT' => 'HOVT| Hovd Time | UTC +7',
					'7| ICT' => 'ICT| Indochina Time | UTC +7',
					'7| KRAT' => 'KRAT| Krasnoyarsk Time | UTC +7',
					'7| NOVST' => 'NOVST| Novosibirsk Summer Time | UTC +7',
					'7| NOVT' => 'NOVT| Novosibirsk Time | UTC +7',
					'7| OMSST' => 'OMSST| Omsk Summer Time | UTC +7',
					'7| WIB' => 'WIB| Western Indonesian Time | UTC +7',
					'8| AWST' => 'AWST| Australian Western Standard Time | UTC +8',
					'8| BNT' => 'BNT| Brunei Darussalam Time | UTC +8',
					'8| CAST' => 'CAST| Casey Time | UTC +8',
					'8| CHOT' => 'CHOT| Choibalsan Time | UTC +8',
					'8| CST' => 'CST| China Standard Time | UTC +8',
					'8| H' => 'H| Hotel Time Zone | UTC +8',
					'8| HKT' => 'HKT| Hong Kong Time | UTC +8',
					'8| HOVST' => 'HOVST| Hovd Summer Time | UTC +8',
					'8| IRKT' => 'IRKT| Irkutsk Time | UTC +8',
					'8| KRAST' => 'KRAST| Krasnoyarsk Summer Time | UTC +8',
					'8| MYT' => 'MYT| Malaysia Time | UTC +8',
					'8| PHT' => 'PHT| Philippine Time | UTC +8',
					'8| SGT' => 'SGT| Singapore Time | UTC +8',
					'8| ULAT' => 'ULAT| Ulaanbaatar Time | UTC +8',
					'8| WITA' => 'WITA| Central Indonesian Time | UTC +8',
					'8.5| PYT' => 'PYT| Pyongyang Time | UTC +8:30',
					'8.75| ACWST' => 'ACWST| Australian Central Western Standard Time | UTC +8:45',
					'9| AWDT' => 'AWDT| Australian Western Daylight Time | UTC +9',
					'9| CHOST' => 'CHOST| Choibalsan Summer Time | UTC +9',
					'9| I' => 'I| India Time Zone | UTC +9',
					'9| IRKST' => 'IRKST| Irkutsk Summer Time | UTC +9',
					'9| JST' => 'JST| Japan Standard Time | UTC +9',
					'9| KST' => 'KST| Korea Standard Time | UTC +9',
					'9| PWT' => 'PWT| Palau Time | UTC +9',
					'9| TLT' => 'TLT| East Timor Time | UTC +9',
					'9| ULAST' => 'ULAST| Ulaanbaatar Summer Time | UTC +9',
					'9| WIT' => 'WIT| Eastern Indonesian Time | UTC +9',
					'9| YAKT' => 'YAKT| Yakutsk Time | UTC +9',
					'9.5| ACST' => 'ACST| Australian Central Standard Time | UTC +9:30',
					'9.5| ACT' => 'ACT| Australian Central Time | UTC +9:30 / +10:30',
					'10| AEST' => 'AEST| Australian Eastern Standard Time | UTC +10',
					'10| AET' => 'AET| Australian Eastern Time | UTC +10:00 / +11:00',
					'10| ChST' => 'ChST| Chamorro Standard Time | UTC +10',
					'10| CHUT' => 'CHUT| Chuuk Time | UTC +10',
					'10| DDUT' => 'DDUT| Dumont-d\'Urville Time | UTC +10',
					'10| K' => 'K| Kilo Time Zone | UTC +10',
					'10| PGT' => 'PGT| Papua New Guinea Time | UTC +10',
					'10| VLAT' => 'VLAT| Vladivostok Time | UTC +10',
					'10| YAKST' => 'YAKST| Yakutsk Summer Time | UTC +10',
					'10| YAPT' => 'YAPT| Yap Time | UTC +10',
					'10.5| ACDT' => 'ACDT| Australian Central Daylight Time | UTC +10:30',
					'10.5| LHST' => 'LHST| Lord Howe Standard Time | UTC +10:30',
					'11| AEDT' => 'AEDT| Australian Eastern Daylight Time | UTC +11',
					'11| BST' => 'BST| Bougainville Standard Time | UTC +11',
					'11| KOST' => 'KOST| Kosrae Time | UTC +11',
					'11| L' => 'L| Lima Time Zone | UTC +11',
					'11| LHDT' => 'LHDT| Lord Howe Daylight Time | UTC +11',
					'11| MAGT' => 'MAGT| Magadan Time | UTC +11',
					'11| NCT' => 'NCT| New Caledonia Time | UTC +11',
					'11| NFT' => 'NFT| Norfolk Time | UTC +11',
					'11| PONT' => 'PONT| Pohnpei Standard Time | UTC +11',
					'11| SAKT' => 'SAKT| Sakhalin Time | UTC +11',
					'11| SBT' => 'SBT| Solomon Islands Time | UTC +11',
					'11| SRET' => 'SRET| Srednekolymsk Time | UTC +11',
					'11| VLAST' => 'VLAST| Vladivostok Summer Time | UTC +11',
					'11| VUT' => 'VUT| Vanuatu Time | UTC +11',
					'12| ANAST' => 'ANAST| Anadyr Summer Time | UTC +12',
					'12| ANAT' => 'ANAT| Anadyr Time | UTC +12',
					'12| FJT' => 'FJT| Fiji Time | UTC +12',
					'12| GILT' => 'GILT| Gilbert Island Time | UTC +12',
					'12| M' => 'M| Mike Time Zone | UTC +12',
					'12| MAGST' => 'MAGST| Magadan Summer Time | UTC +12',
					'12| MHT' => 'MHT| Marshall Islands Time | UTC +12',
					'12| NFDT' => 'NFDT| Norfolk Daylight Time | UTC +12',
					'12| NRT' => 'NRT| Nauru Time | UTC +12',
					'12| NZST' => 'NZST| New Zealand Standard Time | UTC +12',
					'12| PETST' => 'PETST| Kamchatka Summer Time | UTC +12',
					'12| PETT' => 'PETT| Kamchatka Time | UTC +12',
					'12| TVT' => 'TVT| Tuvalu Time | UTC +12',
					'12| WAKT' => 'WAKT| Wake Time | UTC +12',
					'12| WFT' => 'WFT| Wallis and Futuna Time | UTC +12',
					'12.75| CHAST' => 'CHAST| Chatham Island Standard Time | UTC +12:45',
					'13| FJST' => 'FJST| Fiji Summer Time | UTC +13',
					'13| NZDT' => 'NZDT| New Zealand Daylight Time | UTC +13',
					'13| PHOT' => 'PHOT| Phoenix Island Time | UTC +13',
					'13| TKT' => 'TKT| Tokelau Time | UTC +13',
					'13| TOT' => 'TOT| Tonga Time | UTC +13',
					'13| WST' => 'WST| West Samoa Time | UTC +13',
					'13.75| CHADT' => 'CHADT| Chatham Island Daylight Time | UTC +13:45',
					'14| LINT' => 'LINT| Line Islands Time | UTC +14',
					'14| TOST' => 'TOST| Tonga Summer Time | UTC +14',
					
					
                ],
            ],
        ],
    ];

    return $meta_boxes;
}

add_filter( 'rwmb_meta_boxes', 'timezoneList' );




function setProfileResearch( $meta_boxes ) { // this shows the box where the scrape and search results
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'profiler',
		'title' => esc_html__( 'PROFILE RESEARCH', 'omniscience-profiler' ),
		'post_types' => array('profile' ),
		'context' => 'normal',
		'autosave' => 'false',
		'fields' => array(
			array(
				'id' => $prefix . 'card',
				'type' => 'custom_html',
				 //'std'  => '<div class="alert alert-warning">This is a custom HTML content</div>',
				 'callback' => 'profile_menu',
			),
            array(
				'id' => $prefix . 'profile_results',
				'type' => 'custom_html',
				 //'std'  => '<div class="alert alert-warning">This is a custom HTML content</div>',
				 'callback' => 'profiler',
			),
			array(
				'id' => 'search_content',
				'type' => 'textarea',
				'name' => esc_html__( 'Saved Search', 'metabox-online-generator' ),
			),
			array(
				'id' => 'scraped_content',
				'type' => 'textarea',
				'name' => esc_html__( 'Saved Scrape', 'metabox-online-generator' ),
			),
			array(
				'id' => 'lang',
				'type' => 'text',
				'name' => esc_html__( 'Language', 'metabox-online-generator' ),
				'size' => 5,
			),
		),
	);

	return $meta_boxes;
}
add_filter( 'rwmb_meta_boxes', 'setProfileResearch' );



/* AWARDS */
function team_metabox( $meta_boxes ) {
	$prefix = '';

	$meta_boxes[] = array(
		'id' => 'run-of-show',
		'title' => esc_html__( 'Team Stations', 'metabox-online-generator' ),
		'post_types' => array( 'resource', 'event','profile' ),
		
		'priority' => 'high',
		'autosave' => false,
		'fields' => array(
			[
                'type' => 'wysiwyg',
                'name' => esc_html__( 'Show Journal', 'online-generator' ),
                'id'   => $prefix . 'show_journal',
			
            ],
		
		
		
			
		),
	);

	return $meta_boxes;
	
}
//add_filter( 'rwmb_meta_boxes', 'team_metabox' );