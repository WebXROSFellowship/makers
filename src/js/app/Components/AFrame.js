import React, { useState, useEffect } from "react";
import assets from "./../psudo_data/assets.json";
import data from "./dynamicContent.json";
// have used native file system till endpoints unavailable


function AFrame() {
  const [loading, setLoading] = useState(true);
  
  const color = new URLSearchParams(document.location.search).get("color");
  // Default Black color for the plane
  var gcolor = "#000000";
  // Check if the color is passed as a query parameter, facilitate both hex and string
  if (color) {
    if (/^[a-zA-Z]+$/.test(color)) {
      gcolor = color.toLowerCase();
    } else {
      gcolor = "#" + color;
    }
  }
  useEffect(() => {
    // loading inspector
    function loadAndGet() {
      var sceneEl = document.querySelector("a-scene");
      sceneEl.addEventListener("loaded", function () {
        sceneEl.components.inspector.openInspector();
      });
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
      }, 10000); // Adjust the delay as needed
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
      var foundData=false;
      const updatedData = data.map((item) => {
        if (item.id === newData.id) {
          console.log("Found the item to update");
          foundData=true;
          return newData;
        } else {
          console.log("Not the item to update");
          return item;
        }
      });

      if(!foundData)
        updatedData.push(newData);
      const updatedJsonString = JSON.stringify(updatedData, null, 2);
      console.log('Updated data:', updatedData);
      const fileName = 'dynamicContent.json';
      saveJsonAsBlob(updatedJsonString, fileName);

    }

    function saveJsonAsBlob(updatedData, fileName)
    {
        const blob = new Blob([updatedData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        // Create a temporary link element
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        
        // Append the link to the document body and click it programmatically
        document.body.appendChild(link);
        link.click();
        
        // Clean up by removing the link and revoking the URL
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    }

    // Event listener for color change
    function changeColor() {
      AFRAME.registerComponent("change-color-on-hover", {
        schema: {
          color: { default: "red" },
        },
        init: function () {
          var data = this.data;
          var el = this.el;
          el.addEventListener("mouseenter", function () {
            el.setAttribute("material", "color", data.color);
          });
          el.addEventListener("mouseleave", function () {
            el.setAttribute("material", "color", "pink");
          });
        },
      });
    }

    // Below mentioned event gets activated after click
    function AddClickEvent() {
      AFRAME.registerComponent("show-details-on-click", {
        init: function () {
          var el = this.el;
          el.addEventListener("click", function () {
            el.setAttribute("material", "color", "lightblue");
            var details_box = document.querySelector('#details-box');
            var current_state = details_box.getAttribute('visible');
            if (current_state == false)
            details_box.setAttribute("visible","true");
            else
            details_box.setAttribute("visible","false");
          });
        },
      });
    }

    // Heavy models take time to load, hence wait for a while
    setTimeout(() => setLoading(false), 1000); // Wait for 1 second before setting loading to false

    AddClickEvent();
    changeColor();
    loadAndGet();
    addMani();
  }, []);

  return (
<>
        <a-scene>
        <a-camera position="0 1.2 0" rotation="0 -45 0">
          <a-cursor id="cursor" color="#FF0000"></a-cursor>
        </a-camera>
        <a-assets>
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
              id="#powersimple"
              gltf-model="#powersimple"
              position="0 0.75 -3"
              radius="0.5"
              height="1.5"
              crossOrigin="anonymous"
            ></a-entity>

            {data.map((entity) => (
              <a-entity key={entity.id} {...entity}></a-entity>
            ))}
          </>
        )}

        <a-sphere
          position="0 0.7 -7"
          radius="2.25"
          change-color-on-hover="color:#FFFFFF"
          show-details-on-click
        />
        <a-box
          id = "details-box"
          position = "1 2 -2"
          color = "lightgreen"
          visible = "false"
        />
        <a-plane
          rotation="-90 0 0"
          position="0 -2 -10"
          width="10"
          height="10"
          color={gcolor}
          shadow
        ></a-plane>
        <a-sky src="#bg" />
      </a-scene>
    </>
  );
}

export default AFrame;
