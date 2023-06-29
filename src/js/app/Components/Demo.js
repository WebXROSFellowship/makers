import React, { useState, useEffect, useRef } from "react";
import { AppConfig } from "../config/appConfig";
import { AppLoader } from "./index";

const Demo = () => {
  const base_url = AppConfig.SITE_URL;
  const [loading, setLoading] = useState(true); // For asset loading
  const [scientistsData, setScientistsData] = useState([]);
  const [elementDetected, setElementDetected] = useState(false); // For inspector loaded
  const langRef = useRef(null);
  const [allLang, setAllLang] = useState([]);
  const [furnitureData, setFurnitureData] = useState([]);
  const [worldData, setWorldData] = useState([]);
  const [meshData, setMeshData] = useState([]);
  const data = useRef([{}]);

  const PAGE_SLUG = new URLSearchParams(document.location.search).get("wordpress_slug");
  useEffect(() => {
    fetchLatestData();
  }, []);

  useEffect(() => {
    getFromServer();
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
    setAllLang(jsonLangData);
  };

  const handleButtonClick = (event) => {
    const buttonText = event.target.getAttribute("value");
    langRef.current = buttonText;
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
    const url = `${base_url}/wp-json/wp/v2/pages?fields=id,type,title,content,slug,excerpt,languages,post_media,featured_media,screen_images,properties_3D,featured_video,cats,tags,type&filter[orderby]=ID&order=asc&per_page=100`;

    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        var pagecontents = [];
        var furniture = [];
        var world = [];
        var navmesh = [];
        console.log("result", result);
        result.map((item) => {
          if (item.slug === PAGE_SLUG) {
            langRef.current = item.languages.default;
            pagecontents = item.post_media.screen_image;
            furniture = item.properties_3D.furniture;

            world = item.properties_3D.world_model;

            navmesh = item.properties_3D.nav_mesh;
            setFurnitureData(furniture);
            setWorldData(world);
            setMeshData(navmesh);
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

  function ShowDescription(Obj) {
    var children_lang = Obj.querySelectorAll("a-entity");

    for (var i = 0; i < children_lang.length; i += 2) {
      if (children_lang[i].getAttribute("id") === langRef.current) {
        children_lang[i].setAttribute("visible", "true");
        var state = !children_lang[i + 1].getAttribute("visible");
        children_lang[i + 1].setAttribute("visible", state);
      } else {
        children_lang[i].setAttribute("visible", "false");
        var state = !children_lang[i + 1].getAttribute("visible");
        children_lang[i + 1].setAttribute("visible", state);
      }
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

  async function fetchLatestData() {
    const url = `${base_url}/wp-content/themes/makers/data/${PAGE_SLUG}.json`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        data.current = result;
      })
      .catch((error) => {
        console.log("Failed to fetch dynamic content", error);
      });
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
    delete newData['gltf-model'];
    delete newData["show-details-on-click"];
    if (
      Array.isArray(data.current) &&
      data.current.length === 1 &&
      Object.keys(data.current[0]).length === 0
    ) {
      console.log("!!!!!No data found, adding new data");
      const updatedJsonString = JSON.stringify([newData], null, 2);
      sendApiRequest(updatedJsonString);
      return;
    }
    var foundData = false;
    var foundClassData = false;
    const updatedData = data.current.map((item) => {
      if (
        item.class !== undefined &&
        newData.class !== undefined &&
        newData.class === item.class
      ) {
        foundClassData = true;
        var alteredClassData = updateClassData(newData);
        return alteredClassData;
      } else if (newData.id !== undefined && item.id === newData.id) {
        foundData = true;
        return newData;
      } else {
        return item;
      }
    });

    if (!foundData && newData.id !== undefined && newData.class === undefined)
      updatedData.push(newData);

    if (newData.class !== undefined && !foundClassData) {
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
    const file_name = PAGE_SLUG + ".json";
    formdata.append("page", file_name);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    await fetch(url, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        // Result : {success: true/false, message: "..."}
        console.log("API Response: ", result);
        const dataResp = JSON.parse(result);
        alert(dataResp.message);
      })
      .catch((error) => console.log("Error", error));
    fetchLatestData();
  };

  function AddClickEvent() {
    AFRAME.registerComponent("show-details-on-click", {
      init: function () {
        var el = this.el;
        el.addEventListener("click", function () {
          ShowDescription(el);
          console.log("Click detected", el);
        });
      },
    });
  }

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <div style={{ height: "100vh", width: "100%" }}>
          <a-scene
            embedded
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
            <a-entity
              id={worldData.id}
              gltf-model={base_url + "/wp-content/uploads/" + worldData.src}
              key={worldData.id}
              position="4.537 0 3.468"
            ></a-entity>
            <a-entity
              nav-mesh=""
              id={meshData.id}
              gltf-model={base_url + "/wp-content/uploads/" + meshData.src}
              key={meshData.id}
              visible="false"
              position="4.762 0 3.739"
            ></a-entity>
            {furnitureData?.map((furniture) => {
              var Obj_id = furniture.slug;
              var Data_from_Inspector = data.current.find(
                (obj) => obj.id == Obj_id
              );
              if (!Data_from_Inspector) {
                Data_from_Inspector = {
                  position: "0 1.6 0",
                };
              }
              return (
                <a-entity
                  id={furniture.slug}
                  gltf-model={base_url + furniture.full_path}
                  key={furniture.id}
                  {...Data_from_Inspector}
                ></a-entity>
              );
            })}
            {scientistsData?.map((scientist) => {
              var Obj_id = scientist.slug;
              var Data_from_Inspector = data.current.find(
                (obj) => obj.id == Obj_id
              );
              var desc_format = data.current.find(
                (obj) => obj.class == "desc_wrapper"
              );
              var cap_format = data.current.find(
                (obj) => obj.class == "caption_wrapper"
              );
              var name_format = data.current.find(
                (obj) => obj.class == "name_wrapper"
              );
              var img_format = data.current.find(
                (obj) => obj.class == "image_wrapper"
              );

              if (!Data_from_Inspector) {
                Data_from_Inspector = {
                  position: "0 1.6 0",
                };
              }
              

              return (
                <a-entity
                  id={scientist.slug}
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
                  {allLang?.map((lang) => {
                    var font =
                      base_url +
                      "/wp-content/uploads/2023/06/NotoSans-Medium.ttf";
                    if (lang.code == "zh-hans") {
                      font =
                        base_url +
                        "/wp-content/uploads/2023/06/NotoSansSC-Medium.otf";
                    }
                    return (
                      <a-entity key={lang.code} id={lang.code} visible="false">
                        <a-entity id="toggle" visible="false">
                          <a-troika-text
                            class="desc_wrapper"
                            type="wrapper"
                            value={scientist.trans[lang.code].desc}
                            font={font}
                            visible="true"
                            {...desc_format}
                          ></a-troika-text>
                          <a-troika-text
                            class="caption_wrapper"
                            type="wrapper"
                            value={scientist.trans[lang.code].caption}
                            font={font}
                            visible="true"
                            {...cap_format}
                          ></a-troika-text>
                          <a-troika-text
                            class="name_wrapper"
                            type="wrapper"
                            value={scientist.trans[lang.code].title}
                            font={font}
                            visible="true"
                            {...name_format}
                          ></a-troika-text>
                          {Object.keys(scientist.trans).map((key) => {
                            var classname = "btn-wrapper-" + key;
                            var insData = data.current.find(
                              (obj) => obj.class == classname
                            );
                            return (
                              <a-troika-text
                                class={classname}
                                type="wrapper"
                                visible="true"
                                key={classname}
                                value={key}
                                code={key}
                                onClick={handleButtonClick}
                                {...insData}
                              ></a-troika-text>
                            );
                          })}
                        </a-entity>
                      </a-entity>
                    );
                  })}
                </a-entity>
              );
            })}
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
        </div>
      )}
    </>
  );
};

export default Demo;
