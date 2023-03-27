<?php



		/* OLD RELIABLE!
        HASN'T CHANGED IN YEARS
            RETURNS URL BY ID, AND OPTIONAL SIZE */
		function getThumbnail($id,$use="full"){
			global $post;
			
			
			$img = wp__image_src(  $id, $use);
			if($img[0] !=""){
			} 
			return $img;//$img[0];
			
		}
	
	
	
	
	
		function getThumbnailVersions($id){
			global $post;
			$thumbnail_versions = array(); //creates the array of size by url
			foreach(get_intermediate_image_sizes() as $key => $size){//loop through sizes
				$img = wp_get_attachment_image_src($id,$size);//get the url 
				
				if(@$img[0] !=""){
					$version = str_replace('https://'.$_SERVER['HTTP_HOST'],'',$img[0]);
					$version = str_replace('https://'.$_SERVER['HTTP_HOST'],'',$img[0]);
					
					$thumbnail_versions[$size]=$version;//sets size by url
				} 
			}
			return $thumbnail_versions;
		
	}
	
	
		//Embed Video  Shortcode
	
		function video_shortcode( $atts, $content = null ) {
			//set default attributes and values
			$values = shortcode_atts( array(
				'url'   	=> '#',
				'className'	=> 'video-embed',
				'aspect' => '56.25%'
			), $atts );
			
			ob_start();
			?>
			<div class="video-wrapper">
				<iframe src="<?=$values['url']?>" class="<?=$values['className']?>"></iframe>
			</div> 
			<?php
			return ob_get_clean();
			//return '<a href="'. esc_attr($values['url']) .'"  target="'. esc_attr($values['target']) .'" class="btn btn-green">'. $content .'</a>';
		
		}
		add_shortcode( 'embed_video', 'video_shortcode' );

		function add_category_to_page() {  
			// Add tag metabox to page
			register_taxonomy_for_object_type('post_tag', 'page'); 
			// Add category metabox to page
			register_taxonomy_for_object_type('category', 'page');  
		}
		 // Add to the admin_init hook of your theme functions.php file 
		add_action( 'init', 'add_category_to_page' );

function buttonLink($id){
	ob_start();
	?>
		<div id="button-container">
			<div id="button_card" class="shadow">
				<div class="front face">
					<img src="/wp-content/uploads/2018/05/powersimple-emblem-01.svg"/>
				</div>
				<div class="back face">
					<h2>Home</h2>
					<p style="font-weight: 100; margin-top: -40px;">This isn't my logo, but it's a nice one to feature and show off this CSS!</p>
				</div>
			</div>
		</div>

	<?php
	return ob_get_clean();	

}


add_action( 'rest_api_init', 'register_video_meta' );
function register_video_meta() {
    register_rest_field( 'page',
        'video',
        array(
            'get_callback'    => 'get_featured_video',
            'update_callback' => null,
            'schema'          => null,
        )
    );
}






function display_videos($videos){
		ob_start();
	$default_video = $videos[0]['video_url'];
	$default_video_title = $videos[0]['post_title'];
	
	?>
	<div id="videos">
			<div id="video-player">
			
				<iframe src="<?=$default_video?>?rel=0&fs=1" scrolling="no" frameborder="0" id="video"  allowfullscreen></iframe>
			</div>
		<p id="video-title-display"><?=$default_video_title?></p>
			<ul id="video-playlist">
		<?php
		foreach($videos as $key => $value){
			extract($value);
				$title_clean = str_replace('"','',$post_title);
				$title_clean = str_replace("'","\'",$title_clean);
				
			?>
              <li><a href="#" onMouseover="displayTitle('Watch: <?=$title_clean?>');" onMouseOut="" onClick="play('<?=$video_url?>?rel=0', '<?=$title_clean ?>'); return false;" title="<?=$title_clean ?>"><img src="<?=$src?>" alt="<?=$title_clean?>"></a><span class="video-label"><?=$post_title?></span></li>
		<?php
		}
		?>
		</ul>
	</div>
	<?php
	
	return ob_get_clean();	
}




?>
