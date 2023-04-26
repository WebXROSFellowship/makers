// loader for images and glb in webpack

import React, { useState, useEffect } from "react";

function AFrame() {
  const [loading, setLoading] = useState(true);

  const color = new URLSearchParams(document.location.search).get("color");
  console.log(color);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Wait for 5 seconds before setting loading to false
  }, []);

  return (
    <>
      <a-scene>
        <a-camera position="0 2 0" rotation="0 -45 0">
          <a-cursor id="cursor" color="#FF0000"></a-cursor>
        </a-camera>
         <a-assets>
          <a-asset-item
            id="modelID"
            //   Added to pubic folder
            // powersimple model does not work
            // src="../assets/ass.glb"
            src="https://cdn.glitch.com/ac5eecac-40b2-4897-8f67-28c497a19b47%2FAstronaut.glb"
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
         <a-box position="-1 0.5 -3" rotation="0 45 0" color="#4CC3D9" />
         <a-sphere position="0 1.25 -5" radius="1.25" color={color} /> 
         <a-cylinder
          position="1 0.75 -3"
          radius="0.5"
          height="1.5"
          color="#FFC65D"
          shadow
        ></a-cylinder>
        <a-plane
          position="0 0 -4"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
        /> 
         {/* <a-entity
            gltf-model="#modelID"
            position="0 0.75 -3"
            radius="0.5"
            height="1.5"
          ></a-entity>  */}
        {/* <a-sky src={require("../assets/textures/BirdOrange_LMB_baseColor.png")} />  */}
      </a-scene>
    </>
  );
}

export default AFrame;
