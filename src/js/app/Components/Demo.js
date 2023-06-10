import React, { useState, useEffect } from "react";
import assets from "../psudo_data/assets_demo.json";
import data from "./dynamicContent_demo.json";
// have used native file system till endpoints unavailable

function Demo() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // loading inspector
    function loadAndGet() {
      var sceneEl = document.querySelector("a-scene");
      sceneEl.addEventListener("loaded", function () {
        sceneEl.components.inspector.openInspector();
      });
      console.log("Loaded Inspec");
    }
    // creating new button for getting all the data for the entity
    function addMani() {
      setTimeout(function () {
        var ele = document.querySelector(
          "#scenegraph > div.outliner > div:nth-child(1)"
        );

        console.log(ele);
        ele.click();
        console.log("Clicked");
        addElement();
      }, 5000); // Adjust the delay as needed
    }

    function addElement() {
      setTimeout(function () {
        // Create the <a> element
        var link = document.createElement("a");
        link.href = "#";
        link.title = "send data";
        link.setAttribute("data-action", "copy-entity-to-clipboard");
        link.classList.add("button", "fa", "fa-bookmark");

        // Append the <a> element to the specified location
        var parentElement = document.querySelector("#componentEntityHeader > div.static > div.collapsible-header > div");
        console.log("!!!!!!!!!!!!got the parent element");
        console.log(parentElement);
        parentElement.appendChild(link);
        dataToConsole();
      }, 2000); // Adjust the delay as needed
    }

    // getting data from the clipboard to console
    function dataToConsole() {
      var element = document.querySelector(
        "#componentEntityHeader > div.static > div.collapsible-header > div > a.button.fa.fa-bookmark"
      );

      // Add the onclick function
      element.onclick = function () {
        // Access the data from the clipboard
        navigator.clipboard.readText().then(function (clipboardData) {
          // Print the clipboard data to the console
          console.log(clipboardData);
          storeData(clipboardData);
        });
      };
    }

    function storeData(entityString) {
      // Create a temporary element to parse the string
      var tempElement = document.createElement("div");
      tempElement.innerHTML = entityString;

      // Get the attributes of the <a-entity> element
      var entityAttributes = tempElement.firstChild.attributes;

      // Convert the attributes into an object
      var entityObject = {};
      for (var i = 0; i < entityAttributes.length; i++) {
        var attr = entityAttributes[i];
        entityObject[attr.name] = attr.value;
      }

      // Convert the object to JSON string
      var jsonString = JSON.stringify(entityObject);
      console.log("!!!!!!!!!!!!!!!!!");
      console.log(jsonString);
      updateDataFile(jsonString);
    }

    function updateDataFile(jsonString) {
      const newData = JSON.parse(jsonString);
      var foundData = false;
      const updatedData = data.map((item) => {
        if (item.id === newData.id) {
          console.log("Found the item to update");
          foundData = true;
          return newData;
        } else {
          console.log("Not the item to update");
          return item;
        }
      });

      if (!foundData) updatedData.push(newData);
      const updatedJsonString = JSON.stringify(updatedData, null, 2);
      console.log("Updated data:", updatedData);
      const fileName = "dynamicContent_demo.json";
      // saveJsonAsBlob(updatedJsonString, fileName);
      updateInspectorAPI(updatedJsonString);
    }

     // Function to update inspector values via API
     async function updateInspectorAPI(jsonData) {
      const formData = new FormData();
      formData.append('file', new Blob([jsonData], { type: 'application/json' }));

      try {
        const response = await fetch('https://webxr.local/wp-json/myroutes/update_inspecter', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.text();
          console.log('Inspector values updated:', result);
        } else {
          console.log('Failed to update inspector values.');
        }
      } catch (error) {
        console.error('Error occurred while updating inspector values:', error);
      }
    }

    function saveJsonAsBlob(updatedData, fileName) {
      const blob = new Blob([updatedData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;

      // Append the link to the document body and click it programmatically
      document.body.appendChild(link);
      link.click();

      // Clean up by removing the link and revoking the URL
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    function AddClickEvent() {
      AFRAME.registerComponent("show-details-on-click", {
        init: function () {
          var el = this.el;
          el.addEventListener("click", function () {
            // el.setAttribute("material", "color", "blue");
            var position = el.getAttribute("position");
            
            if(el.getAttribute("id") == "#powersimple")
            {

              var entityEl = document.querySelector("#details_text") 

              if (entityEl.getAttribute('visible')) 
                entityEl.setAttribute('visible', 'false');
              
              else {
                // Do `.setAttribute()`s to initialize the entity.
                entityEl.setAttribute('position',{x:position['x'],y:position['y']+0.3*position['y'],z:position['z']});
                entityEl.setAttribute('troika-text',"value: Developing WebXR");
                entityEl.setAttribute('rotation', '0 90 0');
                entityEl.setAttribute('visible', 'true');

              }

            }
            else if(el.getAttribute("id") == "tesla-quote")
            {
              var entityEl = document.querySelector("#details_text_tesla_quote");
              
              if (entityEl.getAttribute('visible')) 
                entityEl.setAttribute('visible', 'false');
              
              else {
                // For a not visible asset, set properties
                entityEl.setAttribute('position',{x:position['x'],y:position['y']+0.45*position['y'],z:position['z']});
                entityEl.setAttribute('troika-text',"value: Famous quote by Nikola Tesla");
                entityEl.setAttribute('visible', 'true');

              }

            }
            
          });
        },
      });
    }

    // Heavy models take time to load, hence wait for a while
    async function startLoadingAndGetData() {
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      console.log('Starting loading');
      loadAndGet();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      addMani();
      AddClickEvent();

    }
    startLoadingAndGetData();
  }, []);

  return (
    <>
      <a-scene>
        <a-entity
          id="rig"
          movement-controls="constrainToNavMesh: true;
          controls: checkpoint, gamepad, trackpad, keyboard, touch;"
        >
          <a-entity
            camera
            id="camera"
            position="0 1.6 0"
            look-controls="pointerLockEnabled: true"
          ></a-entity>
        </a-entity>

        <a-assets>
        <a-asset-item
          id="room"
          src="https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/WEBXROS11.glb"
          crossOrigin="anonymous"
          key="room"
        ></a-asset-item>

        <a-asset-item
          id="navmesh"
          src="https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/Mesh4.glb"
          crossOrigin="anonymous"
          key="navmesh"
        ></a-asset-item>

          {assets.map((asset) => {
            if (asset.type === "model") {
              return (
                <a-asset-item
                  id={asset.id}
                  src={asset.url}
                  key={asset.id}
                  crossOrigin="anonymous"
                ></a-asset-item>
              );
            }
            return (
              <img
                id={asset.id}
                src={asset.url}
                key={asset.id}
                crossOrigin="anonymous"
              />
            );
          })}
        </a-assets>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <a-entity
              id="#room"
              gltf-model="#room"
              crossOrigin="anonymous"
              position="-1.693 0 0.4"
            ></a-entity>

            {/* Finally toggle visibility */}
            <a-entity
              nav-mesh
              id="#navmesh"
              gltf-model="#navmesh"
              crossOrigin="anonymous"
              visible="false"
            ></a-entity>

            {data.map((entity) => (
              <a-entity key={entity.id} {...entity} show-details-on-click ></a-entity>
            ))}
          </>
        )}

        <a-light
          type="directional"
          color="#ffffff"
          intensity="0.8"
          position="0.12062 1.52455 0.52977"
          light="type: point; angle: 180"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb"
          visible=""
        ></a-light>
        <a-light
          type="directional"
          color="#ffffff"
          intensity="0.8"
          position="3.94786 -1.28516 -0.54807"
          light="type: hemisphere; angle: 180"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-3"
        ></a-light>
        <a-light
          type="hemisphere"
          color="#ffffff"
          intensity="0.8"
          position="20.45283 -2.62394 -5.68868"
          light="type: hemisphere; angle: 180"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-4"
        ></a-light>

        <a-entity
        id="details_text"
        visible="false"
        >
        </a-entity>

        <a-image src="#tesla-quote"
          id="tesla-quote"
          key="tesla-quote"
          position="-2 1.426 -2.76"
          rotation="0 0 0"
          show-details-on-click></a-image>

        <a-entity
          id="details_text_tesla_quote"
          visible="false"
        >
        </a-entity>

        {/* floor collider */}
        <a-plane
          static-body="shape:  mesh"
          position="0 0 -4"
          visible="false"
          rotation="-90 0 0"
          width="4"
          height="4"
          color="#7BC8A4"
          scale="6 2 2"
        ></a-plane>
      </a-scene>
    </>
  );
}

export default Demo;
