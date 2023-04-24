<?php
    /*Optimize page loads by rendering restapi queries to static json files and save them in app/json/*/
/*
  ===BEWARE OF REST API PAGINATION AND SORT ORDER!====
Pagination:
Keep in mind, the rest API has a default of 16 records, so you have to set the parameter
&per_page=, and the limit is 100. If you need to return more than 100 results from any of the queries below
you have to paginate the results
Otherwise, the results you want, may not be the results it returns.
Sort: For sanity's sake, it's best that you sort posts by ID, so when inspecting your endpoint, they are in order
Hence, the REST_post_filter variable below.
*/

$GLOBALS['REST_post_filter'] = "filter[orderby]=ID&order=asc&per_page=100";// handles order and pagination
$GLOBALS['REST_post_filter_name_sort'] = "filter[orderby]=post_title&order=asc&per_page=100";
$GLOBALS['REST_tax_filter'] = "filter[orderby]=name&order=asc&per_page=100";
function my_json_decode($s) {
    $s = str_replace(
        array('"',  "'"),
        array('\"', '"'),
        $s
    );
    $s = preg_replace('/(\w+):/i', '"\1":', $s);
    return json_decode(sprintf('{%s}', $s));
}

function iterateEndpoint($field,$name,$query){
        $endpoint_array = array();
       // print $iterations;
        global $wpdb;
        if($field == 'post_type'){

           $iterations = 2;
           $sql = "select id from wp_posts where post_status='publish' and $field='$name'";
           $q = $wpdb->get_results($sql);
          
          
        } else {

        }

            
        if((count($q)/100) > floor(count($q)/100)){
                        //print   $iterations = count($q);
              $iterations = floor((count($q)/100))+1;
            
            

        } else {
           $iterations = 1;
        }
       
       

        for($i=1;$i<=$iterations;$i++){
             
           array_push($endpoint_array,$query."&page=$i");
        }    
     
            return $endpoint_array;
        

}

$GLOBALS['REST_CONFIG'] =array(//An array of url arguments
            "posts"=>"fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            "pages"=>"fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&".$GLOBALS['REST_post_filter'],
            "profile"=>iterateEndpoint('post_type','profile',"fields=id,type,title,content,slug,excerpt,post_media,languages,meta,info,seo,featured_media,screen_images,featured_video,type,industry,support_hardware,feature,thumbnail_url,collaboration_type,platform,cats,tags&".$GLOBALS['REST_post_filter_name_sort']),
            "team"=>iterateEndpoint('post_type','team',"fields=id,type,title,content,slug,excerpt,post_media,languages,meta,info,seo,featured_media,screen_images,featured_video,type,industry,support_hardware,feature,thumbnail_url,collaboration_type,platform,cats,tags&".$GLOBALS['REST_post_filter_name_sort']),

           // "profile"=>iterateEndpoint('post_type','profile',"fields=id,type,title,content,slug,excerpt,post_media,languages,info,seo,featured_media,screen_images,featured_video,type,industry,support_hardware,feature,thumbnail_url,collaboration_type,platform,cats,tags&".$GLOBALS['REST_post_filter_name_sort']),
         //"profile"=>iterateEndpoint('post_type','profile',"fields=id,type,title,content,slug,excerpt,post_media,languages,info,seo,featured_media,screen_images,featured_video,type,industry,support_hardware,feature,thumbnail_url,collaboration_type,platform,cats,tags&".$GLOBALS['REST_post_filter_name_sort']),
           // "hardware"=>"fields=id,type,title,content,slug,excerpt,posts,post_media,languages,info,seo,profiles,featured_media,screen_images,featured_video,type,industry,feature,thumbnail_url,platform,cats,tags&".$GLOBALS['REST_post_filter'],
            "resource"=>"fields=id,type,title,content,slug,excerpt,languages,meta,info,related,featured_media,screen_images,post_media,related,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            //"event"=>"fields=id,type,title,content,slug,excerpt,languages,event_info,profiles,date_time,resources,featured_media,screen_images,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            "event"=>iterateEndpoint('post_type','event',"fields=id,type,title,content,slug,excerpt,languages,meta,event_info,profiles,date_time,resources,featured_media,screen_images,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter']),
            //"product"=>"fields=id,type,title,content,slug,excerpt,languages,project_info,featured_media,screen_images,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            //"person"=>"fields=id,type,title,content,slug,excerpt,languages,project_info,featured_media,screen_images,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            "sponsor"=>"fields=id,type,title,content,slug,excerpt,languages,project_info,featured_media,screen_images,featured_video,type,cats,tags&".$GLOBALS['REST_post_filter'],
            //"social"=>"fields=id,type,title,content,slug,excerpt,featured_media,social_url&".$GLOBALS['REST_post_filter'],
           // "feature"=>"fields=id,name,count,slug,description,posts,children&".$GLOBALS['REST_tax_filter'],
            //"collaboration_type"=>"fields=id,name,count,slug,description,posts,children&".$GLOBALS['REST_tax_filter'],
            //"platform"=>"fields=id,name,count,slug,description,posts,children&".$GLOBALS['REST_tax_filter'],
            //"industry"=>"fields=id,name,count,slug,description,posts,children&".$GLOBALS['REST_tax_filter'],
            "tags"=>"fields=id,name,slug,posts&".$GLOBALS['REST_tax_filter'],
            "categories"=>"fields=id,name,slug,posts&".$GLOBALS['REST_tax_filter'],
            
            "menus"=>"menus",
            "media"=>iterateEndpoint('post_type','media',"fields=id,data&".$GLOBALS['REST_post_filter']),
           // "collaborators"=>"fields=meta_value&".$GLOBALS['REST_post_filter'],
           
        );

// for WPML Comment this out if you aren't using it.
// require_once("functions-wpml-languages.php");

        
    function getEndpoints(){ // BUILDS URLS FOR REST API ENDPOINTS

       $content = array();

        $url_path = "https://".$_SERVER['HTTP_HOST']."/wp-json/wp/v2/";//pendpoint path
        $server_path = get_template_directory()."/data/";//destination folder for writing
 
        if(@$_GET['endpoints']){//header for list of endpoints
                print "<strong>ENDPOINTS:</strong>
               
                <ul>";
        }
      //  $url = $url_path.$key;
        foreach($GLOBALS['REST_CONFIG'] as $key => $value){//loops through the array of endpoints above
             if(is_array($value)){
           
              //  var_dump($value);
                $url = $url_path.$key."?".$value[0];
           } else {
               $url = $url_path.$key."?".$value; // default, value passes params in REST_CONFIG array


           } 
    
           
            if(function_exists('icl_object_id')){// if WPML is here. 
                if($value == 'language'){ //language = $key, will not work with arguments
                    //see path registrations in WPML Languages
                  print   $url = $url_path.$key;// this is the REST API url with the language last
                  die();
                }

            }
            
            
           $server = $server_path.$key.".json";
           if (@$_GET['publish']) {
            if (is_array($value)) {
                $content[$key] = save_individual_packets($key, $value, $url_path, $server_path);
            } else {
                $url = $url_path . $key . "?" . $value;
                $content[$key] = json_decode(getJSON($url));
            }
        }
           /*
           if(@$_GET['publish']){
            
            if(is_array($value)){
           //     var_dump($value);
         //  print   $url = $url_path.$key."?".$value; // default, value passes params in REST_CONFIG array
         //  die();  
           $result_array = array();
        
           
             foreach($value as $it => $qstring){
                 $url = $url_path.$key."?".$qstring;
                 
                 if($it == 0){
                    // print $url;die();
                    $api_json = getJSON($url);
                   //var_dump($api_json); 
                    $result_array = json_decode(getJSON($url),true);
                   
                   
                    

                   //  print $api_json;
                    //  $result_array = $api_data;
                     

                 } else {
                     $this_api_hit = json_decode(getJSON($url),true);
                     foreach($this_api_hit as $nextkey=>$value){
                     array_push($result_array,$value);
                       
                     } 
                   
                 }

               
             }
             


             $content[$key] = $result_array;
             
            
           } else {
                $url = $url_path.$key."?".$value; 
                $content[$key] = json_decode(getJSON($url));
                
           } 
           

           // writeJSON($server,)$content[$key];
           }*/

              if(@$_GET['endpoints']){//prints endpoing urls
                print "<li><a href='$url'>$key</a><br></li>";
              }

            
        }
        if(@$_GET['endpoints']){
            print "</ul>";
            die();//kills the page load so you can see the endpoint urls
        }
        if(@$_GET['publish']){
            header('Content-Type: application/json');
            $menus = json_encode($content['menus'],true);
            writeJSON($server_path."menus.json",$menus);

            $content = json_encode($content,true); // writes the whole shebang into a json packet
             
            writeJSON($server_path."content.json",$content);
            print $content;
            die();//kills the page load so you can see the endpoint urls
        }

      
      //writeJSON($posts_path,$file_path);

        

    }
    function save_individual_packets($key, $value, $url_path, $server_path) {
        $result_array = array();
    
        foreach ($value as $it => $qstring) {
            $url = $url_path . $key . "?" . $qstring;
            $this_api_hit = json_decode(getJSON($url), true);
    
            foreach ($this_api_hit as $record) {
                $record_slug = $record['slug'];
                $record_file_name = "{$key}-{$record_slug}.json";
                $server = $server_path . $key . "/" . $record_file_name;
                writeJSON($server, json_encode($record));
            }
        }
    
        return $result_array;
    }
    

    function get_web_page( $url )
    {
        $options = array(
            CURLOPT_RETURNTRANSFER => true,     // return web page
            CURLOPT_HEADER         => false,    // don't return headers
            CURLOPT_FOLLOWLOCATION => true,     // follow redirects
            CURLOPT_ENCODING       => "",       // handle all encodings
            CURLOPT_USERAGENT      => "spider", // who am i
            CURLOPT_AUTOREFERER    => true,     // set referer on redirect
            CURLOPT_CONNECTTIMEOUT => 120,      // timeout on connect
            CURLOPT_TIMEOUT        => 120,      // timeout on response
            CURLOPT_MAXREDIRS      => 10,       // stop after 10 redirects
            CURLOPT_SSL_VERIFYPEER => false     // Disabled SSL Cert checks
        );
    
        $ch      = curl_init( $url );
        curl_setopt_array( $ch, $options );
        $content = curl_exec( $ch );
        $err     = curl_errno( $ch );
        $errmsg  = curl_error( $ch );
        $header  = curl_getinfo( $ch );
        curl_close( $ch );
    
        $header['errno']   = $err;
        $header['errmsg']  = $errmsg;
        $header['content'] = $content;
        return $header;
    }

    function getJSON($data_path){
        return get_web_page($data_path)['content'];
        


    }

    function writeJSON($file_path,$data){
        //$data = file_get_contents($posts_path);
        $handle = fopen($file_path, 'w') or die('Cannot open file:  '.$file_path);
        fwrite($handle, $data);
        fclose($handle);
    }
    
    $user = wp_get_current_user();
    $allowed_roles = array('administrator');
    if( array_intersect($allowed_roles, $user->roles ) ) {  
       //stuff here for allowed roles
     
        
    
} 
if(@$_GET['publish'] || @$_GET['endpoints']){
   
    getEndpoints();
   
}
function slugify_tax($start,$end){
    global $wpdb;
    $sql = "select term_id, name from wp_terms where (term_id >= $start) and (term_id<=$end)";
    $q = $wpdb->get_results($sql);
  
    $terms_sql = "select * from wp_terms";
    $terms = $wpdb->get_results($terms_sql);
  
  
    foreach($q as $key=>$value){
//     string $slug, object $term ;

        print $value->name ."|".wp_unique_term_slug(sanitize_title($value->name),$terms)."<BR>";

    }
    die();
}
  if(@$_GET['slugify_tax']){
      slugify_tax($_GET['slugify_tax'],$_GET['end']);
}



    //add_action( 'save_post', 'refreshJSON');// this will run if you save a post. Too much overhead for every save so better to trigger manually
?>