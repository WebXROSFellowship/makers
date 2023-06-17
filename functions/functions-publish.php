<?php
    function publishEvent($menu_array){
        

    }
    function publishThis($slug,$data){
        $decodedString = stripslashes($data);
        $json =json_encode($decodedString);
        $server_path = get_template_directory()."/data/";
        writeJSON($server_path."$slug.json",$json);

    
    }
    


?>