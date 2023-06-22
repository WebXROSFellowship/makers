import React, { useState, useEffect } from "react";

// Updated Inspector API data
import Config from "../config/config";
import assets from "./../../../../data/assets_demo.json";
import data from "./../../../../data/dynamicContent_demo.json";


function Demo() {
  const [loading, setLoading] = useState(true); // For asset loading
  const [sci_data, setSciData] = useState([]);
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
    GetFromStaging();
    setLoading(false); // Add assets to the scene
    
  }

  async function GetFromStaging() {
    console.log("Inside get from staging")
    const url = base_url+"/wp-json/wp/v2/media?fields=id,data&filter[orderby]=ID&order=asc&per_page=100&page=1";
    await fetch(url)
          .then((response) => response.json())
          .then((fetchdata) => {
            var final_data = [];
            fetchdata.map((oneImgData) => {
              if(oneImgData.data.desc) {
                final_data.push(oneImgData.data);
              }
              // console.log(oneImgData.data);
            })
            // var final_data = data;
            // console.log("Fetch from Staging");
            console.log("final data", final_data);
            setSciData(final_data);
            // AddImages(final_data);
            AddClickEvent(final_data);
      })
  }

  function ShowDescription(Obj, data) {
    console.log("ShowDescription");
    console.log(Obj);

    var children = Obj.querySelectorAll("a-troika-text");
    // console.log("childeern", children);
    if (children) {
      var state = !children[0].getAttribute("visible");
      children[0].setAttribute("visible", state);
      children[1].setAttribute("visible", state);
      children[2].setAttribute("visible", state);
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

  function updateClassData(json){
    const { value,id,visible,src, ...newJson } = json;
    return newJson;
  }
  function updateApiData(jsonString) {
    // Usage: Updates the API data with the new JSON string
    // Functionality: Checks if the data exists in the API, if yes, updates the data, else adds the data to the API. Considers the "id" attribute to check if the data exists.
    const newData = JSON.parse(jsonString);
    var foundData = false;
    var foundClassData=false;
    const updatedData = data.map((item) => {
      if (item.class !==undefined && newData.class!==undefined && newData.class===item.class) {
        console.log("Found Class Updation");
        foundClassData = true
        var alteredClassData=updateClassData(newData);
        return alteredClassData;
      }
      else if (newData.id !== undefined && item.id === newData.id) {
        console.log(newData.id);
        console.log("Found the item to update");
        foundData = true;
        return newData;
      } else{
        console.log("Not the item to update");
        return item;
      } 
    });

    if (!foundData && newData.id!==undefined && newData.class===undefined) updatedData.push(newData);
    if (newData.class !==undefined && !foundClassData){
      console.log("New Class Data");
      var alteredClassData=updateClassData(newData);
      updatedData.push(alteredClassData);
    }

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

  function AddClickEvent(fdata) {
    console.log("In add click event", fdata);
    AFRAME.registerComponent("show-details-on-click", {
      init: function () {
        var el = this.el;
        el.addEventListener("click", function () {
          ShowDescription(el, fdata);
          // UpdateProperties(data)
          // console.log("Click detected");
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
            src="https://cdn.glitch.me/239eb2c3-4dc3-495c-89b1-5c54ec14cbc8/Fmodel.glb"
            crossOrigin="anonymous"
            key="room"
          ></a-asset-item>
          <a-asset-item
            id="navmesh"
            src="https://cdn.glitch.global/239eb2c3-4dc3-495c-89b1-5c54ec14cbc8/Mesh0.glb"
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
              // position="-1.693 0 0.4"
              position="4.537 0 3.468"
            ></a-entity>
            {/* Finally toggle visibility */}
            {
              sci_data?.map((oneImg) => {
                var Obj_id = oneImg.file + "wrapper";
                // console.log(Obj_id);
                // console.log(data);
                var desc_props = data.find(obj => obj.type == "desc");
                if(desc_props) {
                  // console.log("color",desc_props);
                  desc_props = desc_props["troika-text"]
                  // console.log("troika",desc_props);
                }
                var Data_from_Inspector = data.find(obj => obj.id == Obj_id);
                var desc_format = data.find(obj => obj.class== "desc_wrapper");
                var cap_format = data.find(obj => obj.class== "caption_wrapper");
                var name_format = data.find(obj => obj.class== "name_wrapper");
                var img_format = data.find(obj => obj.class== "image_wrapper");
                if(Data_from_Inspector) {
                  console.log("position", Data_from_Inspector.position);
                  return (
                    <a-entity id={oneImg.file + "wrapper"} type= "wrapper" key={oneImg.id} {...Data_from_Inspector}  show-details-on-click="">
                      <a-image
                      src={base_url + oneImg.full_path}
                      {...img_format}
                      type= "wrapper"
                      class="image_wrapper"
                      >
                      </a-image>
                      <a-troika-text class="desc_wrapper" type= "wrapper" value={oneImg.alt} visible="false" {...desc_format} ></a-troika-text>
                      <a-troika-text class="caption_wrapper" type= "wrapper" value={oneImg.caption} visible="false" {...cap_format} ></a-troika-text>
                      <a-troika-text class="name_wrapper" type= "wrapper" value={oneImg.title} visible="false" {...name_format} ></a-troika-text>
                    </a-entity>
                  )
                }

              })
            }
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
              } else if (entity["type"] == "wrapper") {
                  console.log("Wrapper rendered");
              }
              else {
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
