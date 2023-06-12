import React, { useState, useEffect } from "react";
import assets from "../psudo_data/assets_demo.json";
import data from "./../../../../data/dynamicContent_demo.json";

import Config from "../config/config";
// have used native file system till endpoints unavailable

function Demo() {
  const [loading, setLoading] = useState(true);
  const base_url = Config.SITE_URL;

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
        var parentElement = document.querySelector(
          "#componentEntityHeader > div.static > div.collapsible-header > div"
        );
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
      updateInspector(updatedJsonString);
    }

    // Function to update inspector values via API
    const updateInspector = async (data) => {
      console.log("DATA:", data);
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
          console.log(result);
          // success: true/false, message
          const dataResp = JSON.parse(result);
          alert(dataResp.message);
        })
        .catch((error) => console.log("error", error));
    };

    function AddDetails(Obj) {
      console.log("AddName");
      // console.log(Obj);
      var sci_name = Obj.getAttribute("name");
      var sci_caption = Obj.getAttribute("caption");
      var sci_description = Obj.getAttribute("description");

      // If we have a name, we append it
      if (sci_name) {
        var id_img = Obj.getAttribute("id");
        var position = Obj.getAttribute("position");
        var rotation = Obj.getAttribute("rotation");
        // console.log(sci_name);

        if(document.querySelector(`#${id_img}_name`))
        {
          // var El = document.querySelector(`#${id_img}_name`);
          console.log("Already found");
          // El.parentNode.removeChild(El);
        }
        else
        {
          var sceneEl = document.querySelector('a-scene');
          var el = document.createElement('a-entity');

          el.setAttribute("id", `${id_img}_name`);
          el.setAttribute("position", {
            x: position["x"],
            y: position["y"] - 0.42 * position["y"],
            z: position["z"],
          });
          el.setAttribute("troika-text", `value: ${sci_name}`);
          el.setAttribute("rotation", rotation);

          sceneEl.appendChild(el);
        }
      }

      // If we have a caption in data, we append it
      if (sci_caption) {
        var id_img = Obj.getAttribute("id");
        var position = Obj.getAttribute("position");
        var rotation = Obj.getAttribute("rotation");
        // console.log(sci_name);

        if(document.querySelector(`#${id_img}_desc`))
        {
          var El = document.querySelector(`#${id_img}_desc`);
          console.log("Already found");
          El.parentNode.removeChild(El);
        }
        else {
          var caption_style = "strokeColor: #1fb0f2; font-size: 0.06; align: center; outlineWidth: 0.003, material:shader: ocean; color: blue; maxWidth: 0.7;"

          var sceneEl2 = document.querySelector('a-scene');
          var el2 = document.createElement('a-entity');

          el2.setAttribute("id", `${id_img}_desc`);
          el2.setAttribute("position", {
            x: position["x"],
            y: position["y"] - 0.6 * position["y"],
            z: position["z"],
          });
          el2.setAttribute("troika-text", `value: ${sci_caption}; ${caption_style}`);
          el2.setAttribute("rotation", rotation);

          sceneEl2.appendChild(el2);
        }
      }
      
      if (sci_description) {
        var id_img = Obj.getAttribute("id");
        var position = Obj.getAttribute("position");
        var rotation = Obj.getAttribute("rotation");
        // console.log(sci_name);

        if(document.querySelector(`#${id_img}_description`))
        {
          var El = document.querySelector(`#${id_img}_description`);
          console.log("Already found");
          El.parentNode.removeChild(El);
        }
        else
        {
          var sceneEl = document.querySelector('a-scene');
          var el = document.createElement('a-entity');

          var desc_style = "color: #b3dff2; font-size: 0.06; align: center; material: MeshNormalMaterial; maxWidth: 0.6;";

          el.setAttribute("id", `${id_img}_description`);
          el.setAttribute("position", {
            x: position["x"] + 0.7,
            y: position["y"],
            z: position["z"],
          });
          el.setAttribute("troika-text", `value: ${sci_description}; ${desc_style}`);
          el.setAttribute("rotation", rotation);

          sceneEl.appendChild(el);
        }
      }
    }

    function AddClickEvent() {
      AFRAME.registerComponent("show-details-on-click", {
        init: function () {
          var el = this.el;
          el.addEventListener("click", function () {
            
            AddDetails(el);
          });
        },
      });
    }

    // Heavy models take time to load, hence wait for a while
    async function startLoadingAndGetData() {
      setLoading(false);
      await new Promise((resolve) => setTimeout(resolve, 10000));
      console.log("Starting loading");
      loadAndGet();
      await new Promise((resolve) => setTimeout(resolve, 5000));
      addMani();
    }
    AddClickEvent();
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

            {data.map((entity) => {
              if (entity["gltf-model"])
              { return (
                  <a-entity
                    key={entity.id}
                    {...entity}
                  ></a-entity>
                )
              }
              else if(entity["type"]=="img")
              {
                return (
                  <a-image
                    key={entity.id}
                    {...entity}
                  >
                  </a-image>
                )
              }
              else
              {
                console.log("In the else block, demo.js 293");
                console.log(entity);
                return (
                  <a-entity
                    key={entity.id}
                    {...entity}
                  ></a-entity>
                );
              }
            }
            )}
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
