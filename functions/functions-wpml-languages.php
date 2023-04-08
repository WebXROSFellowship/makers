<?php

/* 
	WPML LANGUAGES
    This is included from functions.php
    This registers each language as its own API Route
    and adds the ID for each 


*/

 function register_languages() {

	register_rest_field( get_post_types() , 'languages', array(
        'get_callback' => 'getPostLanguages',// callback 
        'permission_callback' => '__return_true',
		'schema' => null,
		)
    );
  

}


add_action( 'rest_api_init', 'register_taxonomy_languages' );
 
function register_taxonomy_languages() {
 
	register_rest_field( 'category', 'languages', array(
        'get_callback' => 'getTaxomomyLanguages',
        'permission_callback' => '__return_true',
		'schema' => null,
		)
	);
}

function getTaxomomyLanguages($object){
    if(function_exists('icl_object_id')){
    global $sitepress;
    $language_list = icl_get_languages();// returns list of languages with the code as the key

    $codes = array(
        "default" => $sitepress->get_default_language(), // sets the default
       
    );
    return $codes;
  
   if(@$object['taxonomy']){
        foreach($language_list as $key => $value){//loops through list of languages
            if($key != $codes['default']){ // you don't need an object for the default language
                $translation_id = icl_object_id($object['id'], $object['taxomomy'], true, $key);
                if($translation_id != null){
                    $codes[$key] = $translation_id;//getLanguageData($translation_id,$object['taxomomy'],$key);
                }
                // makes an object for each language
            }
        }
    }
    }
    else{
        return null;
    }
}
 
function getPostLanguages( $object ) {
    global $sitepress;
    $language_list = icl_get_languages();// returns list of languages with the code as the key

    $codes = array(
        "default" => $sitepress->get_default_language() // sets the default
    );
    

    foreach($language_list as $key => $value){//loops through list of languages
        if($key != $codes['default']){ // you don't need an object for the default language
            $translation_id = getTranslationID($object['id'],$key);
            if($translation_id != null){
                $codes[$key] = getLanguageData($translation_id,$object['type'],$key);
            }
            // makes an object for each language
        }
    }


	return $codes;
}


function getPostTranslation($id){
    //global $wpdb;
    //$sql = "select * from wp_posts where ID = $id";
    //$post = $wpdb->get_row($sql);
  
    return array("id"=>intval($id)
    /*,
        'title'=>$post->post_title,
        'content'=>$post->post_content
        */
    );

}


function getLanguageData($id,$type,$code){

    if($type == 'page'){
        $result = getPostTranslation($id);
    }

    return @$result;
}


function getTranslationID($trid,$language_code){
    global $wpdb;

    $sql = "select element_id from wp_icl_translations where trid = $trid and language_code = '$language_code' ";

    return $wpdb->get_var($sql);
}
function getLanguageList(){
    global $sitepress;
    $language_list = icl_get_languages();// returns list of languages with the code as the key

    $codes = array(
        "default" => $sitepress->get_default_language() // sets the default
    );
    

    foreach($language_list as $key => $value){//loops through list of languages
      
          
            $codes[$key]=array(
                "native" => $value['native_name'],
                "locale" => $value['default_locale']
                
            );
            // makes an object for each language
        
    }


	return $codes;
}

   



 

function getLastAPIParam(){ // this find the end of the url and returns it as a var
    $parts=explode('/',$_SERVER['REQUEST_URI']); 
    $last_part=end($parts); 

    if(strpos($last_part,'.')!==FALSE) { 
        $last_part=explode('.',$last_part); 
        $last_part=$last_part[0]; 
    } 
    
    return $last_part; 
}

function getWPMLPosts($obj){ // this creates the object for translated posts.
    global $wpdb;
    $sql = "select ID, post_title, post_content, post_type, post_name from wp_posts where ID = $obj->element_id";
    $post = $wpdb->get_row($sql);
    $result = array($obj->element_id=>array("id"=>intval($obj->element_id),
            'title'=>$post->post_title,
            'content'=>$post->post_content,
            'type' => $post->post_type,
            'slug' => $post->post_name,
            'of'=>intval($obj->trid)
        ));
    
    return $result;
}
function getWPMLTaxonomy($obj){
    return array();

}

function getWPMLData(){ // callback used by initRestLanguages register_rest_route
    global $wpdb;
    $language_code = getLastAPIParam(); //gets code from last part of url which is language route
    $language_data = array();
    $sql = "select * from wp_icl_translations where language_code = '$language_code' order by trid";
    $lang_content = $wpdb->get_results($sql);//query for all translated content by that code.
    foreach($lang_content as $key => $value){//loop through 
  
        if(strpos($value->element_type,"post_") !== false){ // for handling posts

            return getWPMLPosts($value);
            
        } else if (strpos($value->element_type,"tax_") !== false){ // for handling taxomomies
            return getWPMLTaxonomy($value);
        }
    }


    return $language_data;  
    
}

    

    function initRESTLanguages(){ // ADDS Active Languages paths to REST API.

        $language_list = getLanguageList(); // returns a list of languages
    
        foreach($language_list as $language_code => $value){ //loops throug languages
            if($language_code != "default" && $language_code != $language_list['default']){ // removes defaults

                $GLOBALS['REST_CONFIG'][$language_code] = "language"; // this adds the endpoint to publishing
                
                
                $args = array("language_code"=>$language_code); 
                add_action( 'rest_api_init', function () use( $args ){ // adds to REST API Passing Arguments
                    register_rest_route( 'wp/v2', //api route
                    "/".$args['language_code']."/", //adds language code as last part of url ex: /wp-json/wp/v2/sv/
                        array(
                            'methods' => 'GET',
                            'callback' => 'getWPMLData',//fires this callback 
                    'permission_callback' => '__return_true',//which sorts content by type.
                        )
                    );//end register routes
                });//end add action
                
            }
        }
        
    }
     if(function_exists('icl_object_id')){
       // tests to make sure we're actually using WPML first
        initRESTLanguages(); //initializes languages in the REST API as a separate route for each language
        add_action( 'rest_api_init', 'register_languages' );// This registers the language object within each post_type
    }
?>