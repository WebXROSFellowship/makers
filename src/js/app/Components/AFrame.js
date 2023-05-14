import React, { useState, useEffect } from "react";
import model from "../assets/powersimple.glb";
import image from "../assets/bg.jpg";

function AFrame() {
  const [loading, setLoading] = useState(true);

  const color = new URLSearchParams(document.location.search).get("color");
  console.log(color);

  // Heavy models take time to load, hence wait for a while
  useEffect(() => {
    function append_red_sphere() {
      // select the scene
      var sceneEl = document.querySelector('a-scene');

      // printing the properties of the white sphere
      console.log("Printing the position of white sphere")
      console.log(sceneEl.querySelector('#whitesphere').getAttribute('position'));

      // registering a component
      AFRAME.registerComponent('do-something-once-loaded', {
        init: function () {
          // This will be called after the entity has properly attached and loaded.
          this.el.setAttribute('position', {x: 1, y: 2, z: -3});
          this.el.setAttribute('color', 'red');
        }
      });
      
      // creating a entity
      var entityEl = document.createElement('a-sphere');

      // set properties of the created entity
      entityEl.setAttribute('do-something-once-loaded', '');

      // append child to scene
      sceneEl.appendChild(entityEl);
    }

    setTimeout(() => setLoading(false), 1000); // Wait for 1 second before setting loading to false
    append_red_sphere();
    
  }, []);

  return (
<>
        <a-scene>
        <a-camera position="0 1.2 0" rotation="0 -45 0">
          <a-cursor id="cursor" color="#FF0000"></a-cursor>
        </a-camera>
         <a-assets>
          <a-asset-item
            id="modelID"
            src={model}
            preload
          ></a-asset-item>
        </a-assets> 

        {loading ? (
          <p>Loading...</p>
        ) : (
          <a-entity
            gltf-model="#modelID"
            position="0 0.75 -3"
            radius="0.5"
            height="1.5"
          ></a-entity>
        )}
        <a-sphere  id="whitesphere" position="0 0.7 -7" radius="2.25" color={color} /> 
        <a-sky src={image}/> 
      </a-scene>
    </>
  );
}

export default AFrame;
