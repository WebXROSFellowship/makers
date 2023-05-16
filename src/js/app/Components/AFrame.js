import React, { useState, useEffect } from "react";
// import model from "../assets/powersimple.glb";
import image from "../assets/bg.jpg";
import assets from "./../data/assets.json";

function AFrame() {
  const [loading, setLoading] = useState(true);

  const color = new URLSearchParams(document.location.search).get("color");
  // Default Black color for the plane
  var gcolor="#000000";

  // Check if the color is passed as a query parameter, facilitate both hex and string
  if (color) {
    if (/^[a-zA-Z]+$/.test(color)) {
      gcolor = color.toLowerCase()
    } else {
      gcolor="#"+color;
    }
  }
  // Heavy models take time to load, hence wait for a while
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000); // Wait for 1 second before setting loading to false
  }, []);

 

  return (
    <>
      <a-scene>
        <a-camera position="0 1.2 0" rotation="0 -45 0">
          <a-cursor id="cursor" color="#FF0000"></a-cursor>
        </a-camera>

        <a-assets>
          {assets.map((asset) => (
         <a-asset-item id={asset.id} src={asset.url} key= {asset.id} ></a-asset-item>
      ))}
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
        <a-sphere
          position="0 0.7 -7"
          radius="2.25"
          change-color-on-hover="color:#FFFFFF"
        />
             <a-plane
            rotation="-90 0 0"
            position="0 -2 -10"
            width="10"
            height="10"
            color={gcolor}
            shadow
          ></a-plane>
        <a-sky src={image} />
      </a-scene>
    </>
  );
}

export default AFrame;
