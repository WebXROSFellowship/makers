"use strict";
(self["webpackChunkmakers"] = self["webpackChunkmakers"] || []).push([[739],{

/***/ 739:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Components_AFrame)
});

// EXTERNAL MODULE: ./node_modules/@babel/runtime/helpers/esm/extends.js
var esm_extends = __webpack_require__(462);
// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
;// CONCATENATED MODULE: ./src/js/app/psudo_data/assets.json
const assets_namespaceObject = JSON.parse('[{"id":"marvel","type":"model","name":"astra","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/marvel.glb"},{"id":"powersimple","type":"model","name":"powersimple","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/powersimple.glb"},{"id":"astra","type":"model","name":"marvel","url":"https://cdn.glitch.com/ac5eecac-40b2-4897-8f67-28c497a19b47%2FAstronaut.glb"},{"id":"bg","type":"image","name":"background","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/bg.jpg"}]');
;// CONCATENATED MODULE: ./src/js/app/Components/dynamicContent.json
const dynamicContent_namespaceObject = JSON.parse('[{"id":"#astra","gltf-model":"https://cdn.glitch.com/ac5eecac-40b2-4897-8f67-28c497a19b47%2FAstronaut.glb","position":"-1 1.93968 -3","crossorigin":"anonymous"},{"troika-text":"strokeColor: #fffafa; value: Text is here","id":"#text","position":"1.27063 1.34902 1","visible":"","rotation":"1 0 0"},{"id":"#marvel","gltf-model":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/marvel.glb","position":"1.91177 0.75 -3","scale":"3 3 3","crossorigin":"anonymous"}]');
;// CONCATENATED MODULE: ./src/js/app/Components/AFrame.js




// have used native file system till endpoints unavailable

function AFrame() {
  const [loading, setLoading] = (0,react.useState)(true);
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
  (0,react.useEffect)(() => {
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
        var ele = document.querySelector("#scenegraph > div.outliner > div:nth-child(1)");
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
        var parentElement = document.querySelector("#componentEntityHeader > div.static > div.collapsible-header > div");
        console.log("!!!!!!!!!!!!got the parent element");
        console.log(parentElement);
        parentElement.appendChild(link);
        dataToConsole();
      }, 10000); // Adjust the delay as needed
    }

    // getting data from the clipboard to console
    function dataToConsole() {
      var element = document.querySelector("#componentEntityHeader > div.static > div.collapsible-header > div > a.button.fa.fa-bookmark");

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
      const updatedData = dynamicContent_namespaceObject.map(item => {
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
      console.log('Updated data:', updatedData);
      const fileName = 'dynamicContent.json';
      saveJsonAsBlob(updatedJsonString, fileName);
    }
    function saveJsonAsBlob(updatedData, fileName) {
      const blob = new Blob([updatedData], {
        type: 'application/json'
      });
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
          color: {
            default: "red"
          }
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
        }
      });
    }
    // Heavy models take time to load, hence wait for a while
    setTimeout(() => setLoading(false), 1000); // Wait for 1 second before setting loading to false

    changeColor();
    loadAndGet();
    addMani();
  }, []);
  return /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("a-scene", null, /*#__PURE__*/react.createElement("a-camera", {
    position: "0 1.2 0",
    rotation: "0 -45 0"
  }, /*#__PURE__*/react.createElement("a-cursor", {
    id: "cursor",
    color: "#FF0000"
  })), /*#__PURE__*/react.createElement("a-assets", null, assets_namespaceObject.map(asset => {
    if (asset.type === "model") {
      return /*#__PURE__*/react.createElement("a-asset-item", {
        id: asset.id,
        src: asset.url,
        key: asset.id,
        crossOrigin: "anonymous"
      });
    }
    return /*#__PURE__*/react.createElement("img", {
      id: asset.id,
      src: asset.url,
      key: asset.id,
      crossOrigin: "anonymous"
    });
  })), loading ? /*#__PURE__*/react.createElement("p", null, "Loading...") : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("a-entity", {
    id: "#powersimple",
    "gltf-model": "#powersimple",
    position: "0 0.75 -3",
    radius: "0.5",
    height: "1.5",
    crossOrigin: "anonymous"
  }), dynamicContent_namespaceObject.map(entity => /*#__PURE__*/react.createElement("a-entity", (0,esm_extends/* default */.Z)({
    key: entity.id
  }, entity)))), /*#__PURE__*/react.createElement("a-sphere", {
    position: "0 0.7 -7",
    radius: "2.25",
    "change-color-on-hover": "color:#FFFFFF"
  }), /*#__PURE__*/react.createElement("a-plane", {
    rotation: "-90 0 0",
    position: "0 -2 -10",
    width: "10",
    height: "10",
    color: gcolor,
    shadow: true
  }), /*#__PURE__*/react.createElement("a-sky", {
    src: "#bg"
  })));
}
/* harmony default export */ const Components_AFrame = (AFrame);

/***/ }),

/***/ 462:
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Z: () => (/* binding */ _extends)
/* harmony export */ });
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}

/***/ })

}]);