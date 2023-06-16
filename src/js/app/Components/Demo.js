import React, { useState, useEffect, useContext } from "react";
import assets from "../psudo_data/assets_demo.json";
import { DataContext } from "../Utils";
// Updated Inspector API data
import data from "./../../../../data/dynamicContent_demo.json";

import { Config } from "../config/config";

function Demo() {
  const [loading, setLoading] = useState(true); // For asset loading
  const base_url = Config.SITE_URL;
  const [elementDetected, setElementDetected] = useState(false); // For inspector loaded
  const {lang} = useContext(DataContext);

  useEffect(() => {
    
    // Call the checkElement function initially
    checkElement();

    // Set up a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, { subtree: true, childList: true });

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [elementDetected]);
  
  useEffect(() => {
    AddClickEvent();
    startLoadingAssets();
  }, []);

  const checkElement = () => {
    // Usage: Checks if the inspector has been opened for the first time
    const ele = document.querySelector("#scenegraph > div.outliner > div:nth-child(1)");
    if (ele !== null && !elementDetected) {
      console.log("Inspector has been opened for the first time");
      customManipulation();
      // Update the state to indicate that the element has been detected
      setElementDetected(true);
    }
  };

  async function startLoadingAssets() {
    // Usage: Loading of all assets and subsequent render
    setLoading(false); // Add assets to the scene
    await new Promise((resolve) => setTimeout(resolve, 10000)); // Wait for the assets to load
    console.log("Assets Loaded");
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
    }, 2500); // Adjust the delay as needed
  }

  function langBtnClicked(event) {

    var parentElement = event.target.closest(".parentElement");

    var titleElement = parentElement.querySelector(".title");

    var title = titleElement.textContent;
    
    //Lang I will already have with the context

    translateText(title, lang);

  }

  async function translateText(title, lang) {
    const translationLink = `https://staging.webxr.link/${lang}/wp-json/wp/v2/media?fields=id,data&filter[orderby]=ID&order=asc&per_page=100&page=1`;

    const data = await fetch(translationLink);

    const currData = data.filter((cd)=>cd.title == title);


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
    }, 1500); // Adjust the delay as needed
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
        window.location.reload();
      })
      .catch((error) => console.log("Error", error));
  };

  function AddDetails(Obj) {
    console.log("AddName");
    console.log(Obj);
    var sci_name = Obj.getAttribute("name");
    var sci_caption = Obj.getAttribute("caption");
    var sci_description = Obj.getAttribute("description");

    // If we have a name, we append it
    if (sci_name) {
      var id_img = Obj.getAttribute("id");
      var position = Obj.getAttribute("position");
      var rotation = Obj.getAttribute("rotation");
      // console.log(sci_name);

      if (document.querySelector(`#${id_img}_name`)) {
        // var El = document.querySelector(`#${id_img}_name`);
        console.log("Already found");
        // El.parentNode.removeChild(El);
      } else {
        var sceneEl = document.querySelector("a-scene");
        var el = document.createElement("a-entity");

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

      if (document.querySelector(`#${id_img}_desc`)) {
        var El = document.querySelector(`#${id_img}_desc`);
        console.log("Already found");
        El.parentNode.removeChild(El);
      } else {
        var caption_style =
          "strokeColor: #1fb0f2; font-size: 0.06; align: center; outlineWidth: 0.003, material:shader: ocean; color: blue; maxWidth: 0.7;";

        var sceneEl2 = document.querySelector("a-scene");
        var el2 = document.createElement("a-entity");

        el2.setAttribute("id", `${id_img}_desc`);
        el2.setAttribute("position", {
          x: position["x"],
          y: position["y"] - 0.6 * position["y"],
          z: position["z"],
        });
        el2.setAttribute(
          "troika-text",
          `value: ${sci_caption}; ${caption_style}`
        );
        el2.setAttribute("rotation", rotation);

        sceneEl2.appendChild(el2);
      }
    }

    if (sci_description) {
      var id_img = Obj.getAttribute("id");
      var position = Obj.getAttribute("position");
      var rotation = Obj.getAttribute("rotation");
      // console.log(sci_name);

      if (document.querySelector(`#${id_img}_description`)) {
        var El = document.querySelector(`#${id_img}_description`);
        console.log("Already found");
        El.parentNode.removeChild(El);
      } else {
        var sceneEl = document.querySelector("a-scene");
        var el = document.createElement("a-entity");

        var desc_style =
          "color: #b3dff2; font-size: 0.06; align: center; material: MeshNormalMaterial; maxWidth: 0.6;";

        el.setAttribute("id", `${id_img}_description`);
        el.setAttribute("position", {
          x: position["x"] + 0.7,
          y: position["y"],
          z: position["z"],
        });
        el.setAttribute(
          "troika-text",
          `value: ${sci_description}; ${desc_style}`
        );
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


  return (
    <>
      <a-scene environment="preset: forest; groundTexture: walkernoise; groundColor: #2b291c; groundColor2: #312f20; dressingColor: #124017;">
      <a-entity id="rig" movement-controls="constrainToNavMesh: true;controls: checkpoint, gamepad, trackpad, keyboard, touch;">
      <a-entity camera="" position="0 1.6 0"  rotation="-4.469070802020421 -84.91234523838803 0" look-controls="pointerLockEnabled: true" >
      <a-cursor id="cursor" color="#FF0000"></a-cursor>
      </a-entity>
      </a-entity>

        <a-assets>
          <a-asset-item
            id="room"
            src="https://cdn.glitch.global/239eb2c3-4dc3-495c-89b1-5c54ec14cbc8/igFinal1.glb"
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
              if (entity["gltf-model"]) {
                return <a-entity key={entity.id} {...entity} crossOrigin="anonymous"></a-entity>;
              } else if (entity["type"] == "img") {
                return <a-image key={entity.id} {...entity} crossOrigin="anonymous"></a-image>;
              } else {
                return <a-entity key={entity.id} {...entity} crossOrigin="anonymous"></a-entity>;
              }
            })}
          </>
        )}
       
        <a-light
          type="directional"
          color="#35227A"
          intensity="0.60"
          position="4.40664 0.98434 0.05053"
          light="type: point; angle: 180"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb"
        ></a-light>

        <a-light
          type="directional"
          color="#FFFFBC"
          intensity="0.50"
          position="3.94786 -1.28516 -0.54807"
          light="type: hemisphere; angle: 90"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-3"
        ></a-light>

        <a-light
          type="directional"
          color="#FF4400"
          intensity="2"
          position="20.45283 -2.62394 -5.68868"
          light="type: ambient; intensity: 0.3; angle: 180"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-4"
        ></a-light>

        <a-light
          type="directional"
          color="#FFFFBC"
          intensity="0.50"
          position="-0.21291 -0.99888 0.00254"
          light="type: hemisphere; color: #ffffff; angle: 90"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-5"
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
