`<?php
    get_header();
    require_once "functions/functions-awards.php";
      $pedestals = get_pedestals('polys3');
    //    var_dump($pedestals);
      $assets = [];
     

   if(@$_GET['dump'] == 'awards'){
     
?>

<div id="dump" style="position:absolute;top:0px; height:100vh;width:20%;background-color:rgba(10,10,10,0.4);color:#fff;z-index:100;overflow-y:scroll;">
    <?php 
    

    
    
    
    ?>
   </div>
<?php
}

$menu = get_menu_array("polys3-credits");
$credits = getCreditsArray($menu);
$assets3D = get3DAssets("logo3D_src",$credits);
$asset_list = getAssetList($assets3D);
//print("<pre>".print_r($credits,true)."</pre>"); die();
//print("<pre>".print_r($asset_list,true)."</pre>");die();
 //  include "webxr/polys3/drawer-experiences.php";
 //   include "webxr/polys2/drawer-nominations.php";



?>

   

<a-scene  renderer="antialias: true;
                   colorManagement: true;
                   sortObjects: true;
                   maxCanvasWidth: 5600;
                   maxCanvasHeight: 2750;"" gltf-model="dracoDecoderPath: assets/draco/;" grab-panels item-grab device-set nomination-link anti-drop
    device-orientation-permission-ui physics="iterations: 30;"
    inspector="https://cdn.jsdelivr.net/gh/aframevr/aframe-inspector@master/dist/aframe-inspector.min.js"
    loading-screen="backgroundColor: #12171a" renderer="colorManagement: true; foveationLevel: 0;maxCanvasWidth:5600;
                   maxCanvasHeight: 3200;"
    background="color: #000000">

    <a-assets timeout="80000">
        <!-- Loads assets -->
        <?php
            include "webxr/polys3/assets.php";
            include "webxr/polys3/mixins.php";
            
        ?>

    </a-assets>
    <a-sky src="#sky" animation="property: object3D.rotation.y; to: -360; easing: linear; dur: 1200000; loop: true;"></a-sky>

    <?php
            include "webxr/polys3/credits-rigging.php";
            //include "webxr/polys3/lights.php";
    $showplatform="true";        
    if(@$_GET['showplatform']){
        $showplatform = "false";
     
    }




?>
    <a-entity id="trophy" class="clickable center-obj-zone" static-body="shape: box; mass: 2" position="0 -200 -400" mixin="obj" rotation="0 75 0" scale="200 200 200" gltf-model="#trophy">

        <a-light id="trophy-light-front"  color="#ffffff"  position="0 0 0" rotation="0 0 0"  light="type: directional; intensity: 4; angle: 75; distance:30; shadowRadius: -3.72" visible=""></a-light>
        
        <a-light id="trophy-light-left"  color="#ffffff"  position="-2 3 0" rotation="0 -80 0" light="type: directional; intensity: 30;distance:20; angle: 60; shadowRadius: -3.72" visible=""></a-light>
        <a-light id="trophy-light-right"  color="#ffffff"  position="-1 0 3" rotation="0 60 0"  light="type: directional; intensity: 30; angle: 45;distance:45; shadowRadius: -3.72" visible=""></a-light>
        

    </a-entity>

<a-entity id="outer-wrap" position="0.05 3.5
 800" rotation="0 0 0" scale="1 1 1" visible="true">
    <a-entity id="credits-wrap" visible="true" scale="2 2 2" position="0 -2 0"  rotation="0 0 0">
<?php
 
        $z_offset = 0;
        foreach($credits as $key => $credit){
           
             getCredit($credit,$z_offset,0);
          
            $z_offset = ($z_offset-(15*-1));
        }
    


?>

</a-entity><!-- credits-->












</a-scene>
<script>
AFRAME.registerComponent('qz-keyboard-controls', {
  // ...

  getVelocityDelta: function () {
    var data = this.data,
        keys = this.getKeys();

    this.dVelocity.set(0, 0, 0);
    if (data.enabled) {
      if (keys.KeyW || keys.ArrowUp)    { this.dVelocity.z -= 1; }
      if (keys.KeyA || keys.ArrowLeft)  { this.dVelocity.x -= 1; }
      if (keys.KeyS || keys.ArrowDown)  { this.dVelocity.z += 1; }
      if (keys.KeyD || keys.ArrowRight) { this.dVelocity.x += 1; }

      // NEW STUFF HERE
      if (keys.KeyQ)  { this.dVelocity.y += 1; }
      if (keys.KeyZ) { this.dVelocity.y -= 1; }
    }

    return this.dVelocity.clone();
  },

  // ...
});
</script>
<?php
     get_footer();
?>`