import React, { useState, useEffect, useContext } from "react";

// Updated Inspector API data
import {AppConfig} from "../config/appConfig";
import assets from "./../../../../data/assets_demo.json";
// import data from "./../../../../data/dynamicContent_demo.json";
import { DataContext } from "../utils";

const Demo = () => {
  const PAGE_SLUG="webxros-a-frame-demo";
  const base_url = AppConfig.SITE_URL;
  const [loading, setLoading] = useState(true); // For asset loading
  const [scientistsData, setScientistsData] = useState([]);
  const [elementDetected, setElementDetected] = useState(false); // For inspector loaded
  const { lang, setLang } = useContext(DataContext);
  const [allLang, setAllLang] = useState([]);
  const [furnitureData, setFurnitureData] = useState([]);
  const [worldData, setWorldData] = useState([]);
  const [meshData, setMeshData] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
    getFromServer();
  }, [lang]);

  useEffect(() => {
    // Call the checkElement function initially
    checkElement();
    getLanguages();

    // Set up a MutationObserver to monitor changes in the DOM
    const observer = new MutationObserver(checkElement);
    observer.observe(document.body, {
      subtree: true,
      childList: true,
    });

    // Clean up the observer on component unmount
    return () => observer.disconnect();
  }, [elementDetected]);


  const getLanguages = async () => {
    const langFetchURL = `${base_url}/wp-json/wpml/v1/active_languages`;
    let langData = await fetch(langFetchURL);
    let jsonLangData = await langData.json();
    console.log("ALL  RESPONSE", langData);
    console.log("ALL LANG", jsonLangData);
    setAllLang(jsonLangData);
  };

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

  const getFromServer = async () => {
    // console.log("Inside get from staging");
    const url =`${base_url}/wp-json/wp/v2/pages?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;
    console.log(url);
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("!!!!!!!!!!!!!!!!!!!result", result);
        var pagecontents = [];
        var furniture=[];
        var world=[];
        var navmesh=[];
        result.map((item) => {
          if (item.slug === PAGE_SLUG) {  
           pagecontents = item.post_media.screen_image;
            furniture=item.properties_3D.furniture;
            console.log("furniture",furniture);
            world=item.properties_3D.world_model;
            console.log("world",world);
            navmesh=item.properties_3D.nav_mesh;
            console.log("navmesh",navmesh);
            setFurnitureData(furniture);
            setWorldData(world);
            setMeshData(navmesh);
            console.log("Page contents as in", pagecontents);
            setScientistsData(pagecontents);
            setLoading(false);    
          }
        });
        AddClickEvent(pagecontents);
      })
      .catch((error) => {
        console.log("Error from server...", error);
      });
  };

  const getData = async () => {
    const url = `${base_url}/wp-content/themes/makers/data/dynamicContent_demo.json`;
    await fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log("data result", result);
      setData(result);
    })
    .catch((error) => {
      console.log("Error in data", error);
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
      // children[1].setAttribute("visible", state);
      // children[2].setAttribute("visible", state);
      // children[3].setAttribute("visible", state);
      // children[4].setAttribute("visible", state);
      // children[5].setAttribute("visible", state);
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

  function updateClassData(json) {
    const { value, id, visible, src, ...newJson } = json;
    return newJson;
  }
  function updateApiData(jsonString) {
    // Usage: Updates the API data with the new JSON string
    // Functionality: Checks if the data exists in the API, if yes, updates the data, else adds the data to the API. Considers the "id" attribute to check if the data exists.
    const newData = JSON.parse(jsonString);
    var foundData = false;
    var foundClassData = false;
    const updatedData = data.map((item) => {
      if (
        item.class !== undefined &&
        newData.class !== undefined &&
        newData.class === item.class
      ) {
        console.log("Found Class Updation");
        foundClassData = true;
        var alteredClassData = updateClassData(newData);
        return alteredClassData;
      } else if (newData.id !== undefined && item.id === newData.id) {
        console.log(newData.id);
        console.log("Found the item to update");
        foundData = true;
        return newData;
      } else {
        console.log("Not the item to update");
        return item;
      }
    });

    if (!foundData && newData.id !== undefined && newData.class === undefined)
      updatedData.push(newData);
    if (newData.class !== undefined && !foundClassData) {
      console.log("New Class Data");
      var alteredClassData = updateClassData(newData);
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
        // window.location.reload();
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

  const handleButtonClick = (event) => {
    console.log("Lang changed");
    console.log("I'm clicked");
    const buttonText = event.target.getAttribute("value");

    if (buttonText === "English") {
      setLang("");
    } else if (buttonText === "Hindi") {
      setLang("hi");
    } else if (buttonText === "German") {
      setLang("de");
    }
  };

  return (
    <>
      <a-scene
        environment="preset: forest; groundTexture: walkernoise; groundColor: #2b291c; groundColor2: #312f20; dressingColor: #124017;"
        cursor="rayOrigin: mouse"
      >
        <a-entity
          id="rig"
          rotation-reader
          thumbstick-logging
          movement-controls="constrainToNavMesh: true; speed:1; controls: checkpoint, gamepad, trackpad, keyboard, touch;"
        >
          <a-entity
            camera=""
            position="0 1.6 0"
            rotation="-4.469070802020421 -84.91234523838803 0"
            look-controls="fly:true"
            raycaster="far: 5; objects: .clickable"
            super-hands="colliderEvent: raycaster-intersection; colliderEventProperty: els; colliderEndEvent:raycaster-intersection-cleared; colliderEndEventProperty: clearedEls;"
          >
            <a-entity
              id="crosshair"
              cursor="rayOrigin:mouse"
              position="0 0 -0.2"
              geometry="primitive: ring; radiusInner: 0.002; radiusOuter: 0.003"
              material="shader: flat"
              raycaster="far: 5; objects: .clickable"
              visible="false"
            ></a-entity>
          </a-entity>
          <a-entity
            mixin="hand"
            oculus-touch-controls="hand: left"
            hand-controls="hand: left; handModelStyle: highPoly; color: #0055ff"
          ></a-entity>
          <a-entity
            mixin="hand"
            oculus-touch-controls="hand: right"
            hand-controls="hand: right; handModelStyle: highPoly; color: #0055ff"
            blink-controls="cameraRig: #rig; teleportOrigin: #camera; collisionEntities: .collision; hitCylinderColor: #FF0; interval: 10; curveHitColor: #e9974c; curveNumberPoints: 40; curveShootingSpeed: 8;landingNormal:0 2 0"
          ></a-entity>
        </a-entity>

        {/* loaading assets in Aframe */}
        <a-assets>
          {assets.map((asset) => {
            return (
              <a-asset-item
                id={asset.id}
                src={asset.url}
                key={asset.id}
                crossOrigin={asset.crossOrigin}
              ></a-asset-item>
            );
          })}{" "}
        </a-assets>
        {loading ? (
          <div className="container">
            <h1 className="h1">Loading...</h1>
          </div>
        ) : (
          <>
            
             <a-entity 
                id={worldData.id}
                gltf-model={base_url +"/wp-content/uploads/"+ worldData.src} 
                key={worldData.id}
                position="4.537 0 3.468"
              >
             </a-entity>

              <a-entity
              nav-mesh=""
              id={meshData.id}
              gltf-model={base_url + "/wp-content/uploads/" + meshData.src}
              key={meshData.id}
              visible="false"
              position="4.762 0 3.739"
              ></a-entity>

              {
                furnitureData?.map((furniture) => {
                var Obj_id = furniture.id;
                var Data_from_Inspector = data.find((obj) => obj.id == Obj_id);
                  if (!Data_from_Inspector) {
                    Data_from_Inspector={
                      position: "0 0 0",
                    }
                  }
                  return (
                    <a-entity
                      id={furniture.id}
                      gltf-model={base_url + furniture.full_path}
                      key={furniture.id}
                      {...Data_from_Inspector}
                    ></a-entity>)
                })
              }
            {scientistsData?.map((scientist) => {
             
                var Obj_id = scientist.id;
                console.log(Obj_id);
                console.log(data);
                var Data_from_Inspector = data.find((obj) => obj.id == Obj_id);
                var desc_format = data.find((obj) => obj.class == "desc_wrapper");
                var cap_format = data.find(
                  (obj) => obj.class == "caption_wrapper"
                );
                var name_format = data.find((obj) => obj.class == "name_wrapper");
                var img_format = data.find((obj) => obj.class == "image_wrapper");
                // console.log("CHECK",scientist);
                  if (!Data_from_Inspector) {
                    Data_from_Inspector={
                      position: "0 0 0",
                    }
                  }
                  // console.log("position", Data_from_Inspector.position);
                  return (
                    <a-entity
                      id={scientist.id}
                      type="wrapper"
                      key={scientist.id}
                      {...Data_from_Inspector}
                      show-details-on-click=""
                    >
                      <a-image
                        src={base_url + scientist.full_path}
                        {...img_format}
                        type="wrapper"
                        class="image_wrapper"
                      ></a-image>
                      <a-troika-text
                        class="desc_wrapper"
                        type="wrapper"
                        value={scientist.alt}
                        font= {base_url + "/wp-content/uploads/2023/06/NotoSans-Medium.ttf"}
                        visible="false"
                        {...desc_format}
                      ></a-troika-text>
                      <a-troika-text
                        class="caption_wrapper"
                        type="wrapper"
                        value={scientist.caption}
                        font= {base_url + "/wp-content/uploads/2023/06/NotoSans-Medium.ttf"}
                       
                        {...cap_format}
                      ></a-troika-text>
                      <a-troika-text
                        class="name_wrapper"
                        type="wrapper"
                        value={scientist.title}
                        font= {base_url + "/wp-content/uploads/2023/06/NotoSans-Medium.ttf"}
                      
                        {...name_format}
                      ></a-troika-text>
                      {
                        Object.keys(scientist.trans).map((key)=>{
                          // console.log("key",scientist.trans[key]);
                          var classname="btn-wrapper-"+key;
                          var insData=data.find((obj) => obj.class == classname);
                          return (
                            <a-troika-text
                              class={classname}
                              type="wrapper"
                              visible="true"
                              key={classname}
                              value={key}
                              code={key}
                              onClick={(e)=>{
                                console.log("Lang changed");
                                let langCode = e.target.getAttribute("value");
                                langCode == "en" ? "" : langCode;
                                console.log("Setting lang as, ",langCode);
                                setLang(langCode);
                              }}
                              {...insData}
                            ></a-troika-text>
                          );
                        })
                      }
                      {/* {allLang?.map((lang) => {
                      var classname="btn-wrapper-"+lang.code;
                      var insData=data.find((obj) => obj.class == classname);
                      return (
                        <a-troika-text
                          class={classname}
                          type="wrapper"
                          visible="true"
                          key={classname}
                          value={lang.code}
                          code={lang.code}
                          onClick={handleButtonClick}
                          {...insData}
                        ></a-troika-text>
                      );
                    })} */}
                    </a-entity>
                  );
                
              }
            )}
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
};

export default Demo;
