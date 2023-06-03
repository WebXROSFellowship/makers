<?php
    function getCreditsArray($credits_menu){
        /*
            Called to get the complete array of all credits
        */
        $credits = [];
        foreach($credits_menu as $key => $credit){
            array_push($credits,getCreditItem($credit));
        }

     //   var_dump($credits);
        return $credits;
    }


    function getCreditItem($credit){
        extract($credit);
        /*
            RECURSIVE LOOP TO GET NESTED CREDITS FOR getCreditsArray()
        */
       
        $credit = [
            
            
            'title'=>$title,
            'slug'=>$slug,
            'menu_type'=>$credit['menu_type'],
            'attr'=>@$attr_title,
            'classes'=>@$classes,
            'type'=>@$classes,
            'coordinates'=>@$coords,
            'offset'=>@$offset,
            'logo'=>@$meta['logo'],
            'logo3D'=>@$meta['logo_3D'],
            'logo3D_src'=>getGLB(@$meta['logo_3D']),
            
           'children'=>[],
            
        ];
        
        if(count($children)){
            foreach($children as $key =>$child){
                array_push($credit['children'],getCreditItem($child));
                
            }
        }
        return $credit;

      

    }




   
    function itemCoords($coords,$offsets){
        $defaultCoords = [
            "position"=>["x"=>0,"y"=>0,"z"=>0],
            "rotation"=>["x"=>0,"y"=>0,"z"=>0],
            "scale"=>["x"=>1,"y"=>1,"z"=>1]
            ];
        $coords = explode(" ",$coords);
        $offsets = explode(" ",$offsets);
        

        foreach($coords as $c => $coord){
//            var_dump($coord);
          $defaultCoords = setCoord($defaultCoords,$coord);
        }
        foreach($offsets as $o => $offset){
            $defaultCoords = offsetCoord($defaultCoords,$offset);
        }
     
        return coordString($defaultCoords);


    }


    function getCoordValue($param,$coords){
        $coords = explode(" ",$coords);
        foreach($coords as $c =>$coord){
            $p = explode("_",$coord);
            if($p[0] == $param){
                return $p[1];
            }
        }

    }

 function getCredit($credit,$z_offset,$counter){
        /*
            Called from template
        */
        extract($credit);
      //  var_dump($credit);
        ?>

            <!-- <?=$credit['slug'] ?> 
            <?php
            //var_dump($credit['children']);
            ?>
            -->

            <?php // THIS STARTS AT Y ZERO ?>
<a-entity id="<?=$slug?>-wrap" visible="true"
    position="0 0 -<?=$z_offset?>"rotation="0 0 0" scale="1 1 1">
        


            
            <?php
            $y_offset = 0;

            if(is_array(@$credit['children'])){
                if(count($credit['children'])){
                $y_offset = count($credit['children'])*.9;
                } 
            } 
            // OUTER LOOP OF NESTED CREDITS
            $y_offset = getCreditListing($credit,$counter,$y_offset);
    
            if(is_array(@$credit['children'])){
                
                $counter++;
            
                foreach($credit['children'] as $c =>$subcredit){
                   //RECURSIVE LOOP OF NESTED CREDITS
                    $y_offset = getCreditListing($subcredit,$counter,$y_offset);
                    //print  $y_offset;

                    //var_dump($subcredit);
                  $counter++;
                }
                $counter--;
            }
            ?>
</a-entity>





            <?php
    }
   

    function getOffsets($offset){
        $offsets = []; //container to return
        if(@$offset){ //not empty
            $offset = explode(" ",$offset); // makes into array based on spaces
            foreach($offset as $key =>$value){
                $offset_vars = explode("_",$value); // parses at underscore for name value pair
                $offsets[$offset_vars[0]] = $offset_vars[1]; //sets vars
            }
        }   
        return $offsets;
       }
    
     
    function getCreditListing($credit,$counter,$y_offset){
        extract($credit);
        
           
          $y = getCoordValue("py",$coordinates);
            if($y){
                 //setting the y position overrides automatic adjustment.
               $y_offset = $y;//=$y_offset+$y;
               
            } 
           $offset = getOffsets($offset);
           
          if(@$offset['y']){
           // print $y_offset;
            $y_offset += $offset['y'];
            //print "|".$y_offset;

            }
      $wrapper_coords = itemCoords($coordinates,"py_$y_offset");


            
            ?>
    <!--wrapper-->
    <a-entity id="w-<?=$slug?>" <?=$wrapper_coords?>>      
<?php
    if(@$attr != ''){
        $attr_y = 1.3;
    
        if(in_array("label-bottom",@$classes)){
            $attr_y = -1;
            
        }
 
    

?>

<!-- context Label Y =<?=$y_offset ?> -->
    <a-entity id="label-<?=$slug?>"troika-text='value:<?=$attr?>; color:#f5f5f5; align:center; color:#fff; fontSize:.5;align:center;maxWidth:10; strokeColor:#000;strokeWidth:.008;font:/wp-content/themes/webxrsummits/fonts/AGENCYB.ttf' material="shader: standard; metalness: 0.8;" position="0 <?=$attr_y?> 0" rotation="0 0 0"></a-entity>
  

    <?php 
     
     
     
      $y_offset -= 1.3;
    
    } else { // attr_y is ''
      
        $y_offset -= .5;
     
    }   
    if(@$logo3D_src){
        // IF THERE IS A 3D Logo Display it.
            ?>
            <!-- <?=$slug?> Model -->
        <a-entity id="model-<?=$slug?>" class="clickable center-obj-zone" static-body 
        position="0 0 0" mixin="obj" rotation="0 0 0" scale="1 1 1" gltf-model="#<?=$slug?>-logo3D"></a-entity>
            <?php
      $y_offset -= 1;

    } else {
    // defaults for labels
    $font_size = .5;
    $y_position   = 0;
     if($menu_type != "custom"){
        $font_size = 1.2;
        $y_position = 0.5;
     }
        ?>

        <!-- <?=$slug?> Text -->
        <a-entity id="text-<?=$slug?>"troika-text='value:<?=$title?>; color:#f5f5f5; align:center; color:#fff; fontSize:<?=$font_size?>;align:center;maxWidth:10; strokeColor:#000;strokeWidth:.008;font:/wp-content/themes/webxrsummits/fonts/AGENCYB.ttf' material="shader: standard; metalness: 0.8;" position="0 <?=$y_position?> 0" rotation="0 0 0"></a-entity>
      
        <?php
      $y_offset -= .5;  

    }
        print "</a-entity>
        
        ";//wrap
       

       

       return $y_offset;
    }

    function menu3DAssets($var,$menu){
        $assets = [];
       
       
        foreach($menu as $key => $menu_item){
            if(@$menu_item[$var]){
          
                array_push($assets,
                               ['slug'=>@$menu_item['slug'],
                               'asset'=>@$menu_item[$var]]); 
               } 
               $child_array = [];
               if(@$menu_item['children']){
                    $child_array = get3DAssets($var,$menu_item['children']); 
                    foreach($child_array as $key =>$value){
                        array_push($assets,['slug'=>$value['slug'],'asset'=>$value['asset']]);
                    }
                }

        //    array_push($assets,get3DAssets($var,$menu_item));
            //  var_dump($menu_item);
          
        }
      

        
        //var_dump($assets);
        return $assets;


    }
    function getAssetList($assets){
        $asset_list=[];
        foreach($assets as $slug => $asset){
          $asset_list[$asset['slug']] = $asset['asset'];
        }
        return $asset_list;
    }

    function get3DAssets($var,$array){
        $assets = [];
       
        foreach($array as $key => $item){

            if(@$item[$var]){
                array_push($assets,
                        ['slug'=>@$item['slug'],
                        'asset'=>@$item[$var]]);        
            }
            $child_array = [];
            if(@$item['children']){
                 $child_array = get3DAssets($var,$item['children']); 
                 foreach($child_array as $key =>$value){
                     array_push($assets,['slug'=>$value['slug'],'asset'=>$value['asset']]);
                 }
             }
            

        }
     

        return $assets;



    }




/*
    function getCoords($coords,$counter=0){
    
    
    
        //defaults
        $coordinates = [
                   "position"=>["x"=>0,"y"=>0,"z"=>0],
                   "rotation"=>["x"=>0,"y"=>0,"z"=>0],
                   "scale"=>["x"=>1,"y"=>1,"z"=>1]
                   ];
   
                   //$classes is already an array
     
      if(is_array($coords)){
       foreach($coords as $key => $class){
           
           $coordinates = setCoord($coordinates,$class);
         
        }
       }
        $position =  $coordinates['position']['x']." ".$coordinates['position']['y']." ".$coordinates['position']['z'];
        $rotation =  $coordinates['rotation']['x'] ." ". $coordinates['rotation']['y'] ." ". $coordinates['rotation']['z'];
        $scale =  $coordinates['scale']['x'] ." ". $coordinates['scale']['y'] ." ". $coordinates['scale']['z'];
   
   
   
   
        return " position='$position' rotation='$rotation' scale='$scale'";
   
   
   
   
    }


    function setCoord($coords,$class){
       $class = explode("_",$class);//single class parsed with _
     
       switch($class[0]){//sets coord
           case "px":
               $coords['position']['x'] = $class[1];
               break;
           case "py":
               $coords['position']['y'] = $class[1];
               break;
           case "pz":
               $coords['position']['z'] = $class[1];
               break;
            case "rx":
               $coords['rotation']['x'] = $class[1];
               break;
           case "ry":
               $coords['rotation']['y'] = $class[1];
               break;
           case "rz":
               $coords['rotation']['z'] = $class[1];
               break;
           case "sx":
               $coords['scale']['x'] = $class[1];
               break;
           case "sy":
               $coords['scale']['y'] = $class[1];
               break;
           case "sz":
               $coords['scale']['z'] = $class[1];
               break;
   
           }
       return $coords;
    }
    
   function setCardCoords($count){
       $coords = [];
       if($count){
          // print $count."SHOWCOUNT";
           if($count == 4){
               $offset = 1.25;
           } else if($count == 4){
               $offset = 2;
            } else {
               $offset = 3;
           }
   
           $x=(0-(($count/2)*2));
               for($i=0;$i<$count;$i++){
                   $coords[$i] = $x;
                $x=$x+3;   
               }
   
           
           
   
       }
       return $coords;
   
   }
   */



?>