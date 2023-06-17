import React, { useState, useEffect } from "react";
import assets from "../psudo_data/assets_demo.json";

// Updated Inspector API data
import data from "./../../../../data/dynamicContent_demo.json";

import Config from "../config/config";
// have used native file system till endpoints unavailable

function Demo() {
  const [loading, setLoading] = useState(true); // For asset loading
  const [sci_data, setSciData] = useState([]);
  const [desc_data, setDescData] = useState(["Name", "Caption", "Description", "0 0 0", "0 0 0"]);
  const base_url = Config.SITE_URL;
  const [elementDetected, setElementDetected] = useState(false); // For inspector loaded

  useEffect(() => {
    // Call the checkElement function initially
    checkElement();

    // Set up a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [elementDetected]);

  useEffect(() => {
    AddClickEvent();
    startLoadingAssets();
  }, []);

  const checkElement = () => {
    // Usage: Checks if the inspector has been opened for the first time
    const ele = document.querySelector(
      "#scenegraph > div.outliner > div:nth-child(1)"
    );
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
    GetFromStaging();
  }

  function GetFromStaging() {
    const url = "https://staging.webxr.link/wp-json/wp/v2/pages?slug=webxros-a-frame-demo/";
    fetch(url)
          .then((response) => response.json())
          .then((data) => {
            var final_data = data[0]["post_media"]["screen_image"];
            console.log("Fetch from Staging");
            console.log(final_data);
            setSciData(final_data);
            // AddImages(final_data)
            AddClickEvent(final_data);
            // UpdateDescription(final_data);
            // AddClickEvent()
            console.log(sci_data);

          })

    console.log(sci_data);
    
  }
  
  function AddImages(data) {
    // var temp_data = data[0];
    // var sceneEl = document.querySelector("a-scene");
    // var el = document.createElement("a-image");

    // el.setAttribute("id", temp_data['id']);
    // var src_path = "https://staging.webxr.link"+temp_data['full_path'];
    // el.setAttribute("crossOrigin", "anonymous");
    // el.setAttribute("src", src_path);

    // sceneEl.appendChild(el);
  }

  // UpdateDescription();
  function SetDescription(data, position, rotation) {
    var ele_desc = document.querySelector("#sci_description");
    var ele_caption = document.querySelector("#sci_caption");
    var ele_name = document.querySelector("#sci_name");

    if(ele_desc.getAttribute("visible") & ele_name.getAttribute("value") == data["title"]) {
      ele_desc.setAttribute("visible",false);
      ele_caption.setAttribute("visible",false);
      ele_name.setAttribute("visible",false);
    }

    else {
      ele_desc.setAttribute("value",data["desc"]);
      ele_desc.object3D.position.set(position['x'] + 0.9, position['y'] - 0.3,position['z']);
      ele_desc.setAttribute("rotation",rotation);

      ele_caption.setAttribute("value",data["caption"]);
      ele_caption.object3D.position.set(position['x'], position['y'] - 0.8,position['z']);
      ele_caption.setAttribute("rotation",rotation);

      ele_name.setAttribute("value",data["title"]);
      ele_name.object3D.position.set(position['x'], position['y'] - 0.55,position['z']);
      ele_name.setAttribute("rotation",rotation);

      ele_desc.setAttribute("visible",true);
      ele_caption.setAttribute("visible",true);
      ele_name.setAttribute("visible",true);
    }
  }

  function UpdateDescription(Obj, data) {
  
    var sci_name = Obj.getAttribute("name");
    var position = Obj.getAttribute("position");
    var rotation = Obj.getAttribute("rotation");
    for (var i = 0; i < data.length; i++) {
      if (sci_name == data[i]["title"])
        {
          // console.log("FOund");
          // console.log(data[i])
          SetDescription(data[i], position, rotation);
        }
      // else {
      //   console.log(sci_name);
      // }
      //Do something
    }
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

  function AddClickEvent(data) {
    // console.log(data);
    AFRAME.registerComponent("show-details-on-click", {
      init: function () {
        var el = this.el;
        el.addEventListener("click", function () {
          // AddDetails(el);
          UpdateDescription(el, data);
        });
      },
    });
  }

  return (
    <>
      <a-scene environment="preset: forest; groundTexture: walkernoise; groundColor: #2b291c; groundColor2: #312f20; dressingColor: #124017;">
        <a-entity
          id="rig"
          movement-controls="constrainToNavMesh: true;controls: checkpoint, gamepad, trackpad, keyboard, touch;"
        >
          <a-entity
            camera=""
            position="0 1.6 0"
            rotation="-4.469070802020421 -84.91234523838803 0"
            look-controls="pointerLockEnabled: true"
          >
            <a-cursor id="cursor" color="#FF0000"></a-cursor>
          </a-entity>
        </a-entity>

        <a-assets>
          <a-asset-item
            id="room"
            src="https://cdn.glitch.global/239eb2c3-4dc3-495c-89b1-5c54ec14cbc8/model01.glb"
            crossOrigin="anonymous"
            key="room"
          ></a-asset-item>
          <img
            id="image"
            src="https://staging.webxr.link/wp-content/uploads/2023/05/Tim_Berners-Lee-1.jpeg"
            crossOrigin="anonymous"
            key="image"
          />
          <a-asset-item
            id="navmesh"
            src="https://cdn.glitch.global/239eb2c3-4dc3-495c-89b1-5c54ec14cbc8/fMesh.glb"
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
          })}{" "}
        </a-assets>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <a-entity
              id="#room"
              gltf-model="#room"
              crossOrigin="anonymous"
              // position="-1.693 0 0.4"
              position="4.537 0 3.468"
            ></a-entity>
            {/* Finally toggle visibility */}
            <a-entity
              nav-mesh=""
              id="#navmesh"
              gltf-model="#navmesh"
              crossOrigin="anonymous"
              visible="false"
              position="4.762 0 3.739"
            ></a-entity>
            {data.map((entity) => {
              if (entity["gltf-model"]) {
                return (
                  <a-entity
                    key={entity.id}
                    {...entity}
                    crossOrigin="anonymous"
                  ></a-entity>
                );
              } else if (entity["type"] == "img") {
                return (
                  <a-image
                    key={entity.id}
                    {...entity}
                    crossOrigin="anonymous"
                  ></a-image>
                );
              } else {
                return (
                  <a-entity
                    key={entity.id}
                    {...entity}
                    crossOrigin="anonymous"
                  ></a-entity>
                );
              }
            })}{" "}
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
          light="type: hemisphere; angle: 90; color: #8778bf"
          rotation="-0.3 50.509 147.30229250797848"
          id="bulb-3"
        ></a-light>

        <a-light
          type="directional"
          color="#FF4400"
          intensity="2"
          position="20.45283 -2.62394 -5.68868"
          light="type: ambient; intensity: 0.3; angle: 180; color: #7156d2"
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


        {/* <a-entity id="details_text_new" troika-text= "value:{desc_data}" /> */}
        <a-troika-text id="sci_description" color= "#b3dff2" font-size= "0.06" align= "center" max-width= "1"></a-troika-text>
        <a-troika-text id="sci_caption" font-size= "0.06" align= "center" outlineWidth= "0.003" color= "blue" max-width= "0.7"></a-troika-text>
        <a-troika-text id="sci_name" font-size="0.08"></a-troika-text>

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
