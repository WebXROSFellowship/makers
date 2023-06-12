import React, { useState, useEffect } from "react";
import assets from "../psudo_data/assets_demo.json";

// Updated Inspector API data
import data from "./../../../../data/dynamicContent_demo.json";

import { Config } from "../config/config";

function Demo() {
  const [loading, setLoading] = useState(true); // For asset loading
  const base_url = Config.SITE_URL;

  useEffect(() => {
    function loadInspector() {
      // Usage: Loads the inspector on application start
      var sceneEl = document.querySelector("a-scene");
      sceneEl.addEventListener("loaded", function () {
        sceneEl.components.inspector.openInspector();
      });
      console.log("Inspector Loaded");
    }

    function customManipulation() {
      setTimeout(function RightPaneOpen() {
        // Usage: Opens the Right Pane to add custom button
        var ele = document.querySelector(
          "#scenegraph > div.outliner > div:nth-child(1)"
        );
        ele.click();
        console.log("Right Pane Opened");
        addSaveButton();
      }, 5000); // Adjust the delay as needed
    }

    function addSaveButton() {
      setTimeout(function () {
        // Usage: Create an <a> element that is appended to the specified location in the inspector.
        // Properties: "copy-entity-to-clipboard" consolidates element attributes into string and copies to clipboard.
        var link = document.createElement("a");
        link.href = "#";
        link.title = "Send Element Data";
        link.setAttribute("data-action", "copy-entity-to-clipboard");
        link.classList.add("button", "fa", "fa-floppy-disk");
        var parentElement = document.querySelector(
          "#componentEntityHeader > div.static > div.collapsible-header > div"
        );
        parentElement.appendChild(link);
        console.log("Save Button Added");
        fetchDataClipboard();
      }, 2000); // Adjust the delay as needed
    }

    function fetchDataClipboard() {
      // Usage: Fetches the data from the clipboard and stores it in a variable
      var element = document.querySelector(
        "#componentEntityHeader > div.static > div.collapsible-header > div > a.button.fa.fa-floppy-disk"
      );
      element.onclick = function () {
        // Usage: Access the data from the clipboard and store it in a variable "clipboardData"
        navigator.clipboard.readText().then(function (clipboardData) {
          console.log("Clipboard Data as fetched : ", clipboardData);
          createJsonSting(clipboardData);
        });
      };
    }

    function createJsonSting(entityString) {
      // Usage: Creates a JSON string from the data fetched from the clipboard.
      var tempElement = document.createElement("div"); // Create a temporary element to parse the string
      tempElement.innerHTML = entityString;
      var entityAttributes = tempElement.firstChild.attributes;
      // Convert the attributes into an object
      var entityObject = {};
      for (var i = 0; i < entityAttributes.length; i++) {
        var attr = entityAttributes[i];
        entityObject[attr.name] = attr.value;
      }
      // Convert the object to JSON string
      var jsonString = JSON.stringify(entityObject);
      console.log("JSON element: ", jsonString);
      updateApiData(jsonString);
    }

    function updateApiData(jsonString) {
      // Usage: Updates the API data with the new JSON string
      // Functionality: Checks if the data exists in the API, if yes, updates the data, else adds the data to the API. Considers the "id" attribute to check if the data exists.
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
      sendApiRequest(updatedJsonString);
    }

    const sendApiRequest = async (data) => {
      // Usage: Sends the updated data to the API
      const url = `${base_url}/wp-json/myroutes/update_inspecter`;
      var formdata = new FormData();
      formdata.append("file", new Blob([data]));

      var requestOptions = {
        method: "POST",
        body: formdata,
        redirect: "follow",
      };

      await fetch(url, requestOptions)
        .then((response) => response.text())
        .then((result) => {
          // Result : {success: true/false, message: "..."}
          const dataResp = JSON.parse(result);
          alert(dataResp.message);
        })
        .catch((error) => console.log("Error", error));
    };

    // TODO: Add comments to this function.
    function AddClickEvent() {
      AFRAME.registerComponent("show-details-on-click", {
        init: function () {
          var el = this.el;
          el.addEventListener("click", function () {
            // el.setAttribute("material", "color", "blue");
            var position = el.getAttribute("position");

            if (el.getAttribute("id") == "#powersimple") {
              var entityEl = document.querySelector("#details_text");

              if (entityEl.getAttribute("visible"))
                entityEl.setAttribute("visible", "false");
              else {
                // Do `.setAttribute()`s to initialize the entity.
                entityEl.setAttribute("position", {
                  x: position["x"],
                  y: position["y"] + 0.3 * position["y"],
                  z: position["z"],
                });
                entityEl.setAttribute("troika-text", "value: Developing WebXR");
                entityEl.setAttribute("rotation", "0 90 0");
                entityEl.setAttribute("visible", "true");
              }
            } else if (el.getAttribute("id") == "tesla-quote") {
              var entityEl = document.querySelector(
                "#details_text_tesla_quote"
              );

              if (entityEl.getAttribute("visible"))
                entityEl.setAttribute("visible", "false");
              else {
                // For a not visible asset, set properties
                entityEl.setAttribute("position", {
                  x: position["x"],
                  y: position["y"] + 0.45 * position["y"],
                  z: position["z"],
                });
                entityEl.setAttribute(
                  "troika-text",
                  "value: Famous quote by Nikola Tesla"
                );
                entityEl.setAttribute("visible", "true");
              }
            }
          });
        },
      });
    }

    async function startLoadingAndGetData() {
      // Usage: Sequence of functions to be called on page load

      setLoading(false); // Add assets to the scene
      await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for the assets to load
      loadInspector();
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for the inspector to load
      customManipulation();
      AddClickEvent();
    }

    startLoadingAndGetData();
  }, []);

  return (
    <>
      <a-scene>
        <a-entity
          id="rig"
          movement-controls="constrainToNavMesh: true;controls: checkpoint, gamepad, trackpad, keyboard, touch;"
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
              <a-entity
                key={entity.id}
                {...entity}
                show-details-on-click
              ></a-entity>
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

        <a-entity id="details_text" visible="false"></a-entity>

        <a-image
          src="#tesla-quote"
          id="tesla-quote"
          key="tesla-quote"
          position="-2 1.426 -2.76"
          rotation="0 0 0"
          show-details-on-click
        ></a-image>

        <a-entity id="details_text_tesla_quote" visible="false"></a-entity>

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
