<?php
    function publishEvent($menu_array){
        

    }
    function publishThis($slug,$data){
        
        $json = json_encode($data,true);
        $server_path = get_template_directory()."/data/";
        writeJSON($server_path."$slug.json",$json);

    
    }
    


?>