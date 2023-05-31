"use strict";
(self["webpackChunkmakers"] = self["webpackChunkmakers"] || []).push([["src_js_app_Components_Demo_js"],{

/***/ "./src/js/app/Components/Demo.js":
/*!***************************************!*\
  !*** ./src/js/app/Components/Demo.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ "./node_modules/@babel/runtime/helpers/esm/extends.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _psudo_data_assets_demo_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../psudo_data/assets_demo.json */ "./src/js/app/psudo_data/assets_demo.json");
/* harmony import */ var _dynamicContent_demo_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./dynamicContent_demo.json */ "./src/js/app/Components/dynamicContent_demo.json");




// have used native file system till endpoints unavailable

function Demo() {
  const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);
  (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
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
      const updatedData = _dynamicContent_demo_json__WEBPACK_IMPORTED_MODULE_3__.map(item => {
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
      saveJsonAsBlob(updatedJsonString, fileName);
    }
    function saveJsonAsBlob(updatedData, fileName) {
      const blob = new Blob([updatedData], {
        type: "application/json"
      });
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

    // Heavy models take time to load, hence wait for a while
    setTimeout(() => setLoading(false), 1000); // Wait for 1 second before setting loading to false

    loadAndGet();
    addMani();
  }, []);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-scene", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", {
    id: "rig",
    "movement-controls": "constrainToNavMesh: true;\r controls: checkpoint, gamepad, trackpad, keyboard, touch;"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", {
    camera: true,
    position: "0 1.6 0",
    "look-controls": "pointerLockEnabled: true"
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-assets", null, _psudo_data_assets_demo_json__WEBPACK_IMPORTED_MODULE_2__.map(asset => {
    if (asset.type === "model") {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-asset-item", {
        id: asset.id,
        src: asset.url,
        key: asset.id,
        crossOrigin: "anonymous"
      });
    }
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("img", {
      id: asset.id,
      src: asset.url,
      key: asset.id,
      crossOrigin: "anonymous"
    });
  })), loading ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("p", null, "Loading...") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement((react__WEBPACK_IMPORTED_MODULE_1___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", {
    environment: "preset:starry;groundTexture:  walkernoise;grid:none"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", {
    id: "#room",
    "gltf-model": "#room",
    crossOrigin: "anonymous",
    position: "-1.693 0 0.07"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", {
    "nav-mesh": true,
    id: "#navmesh",
    "gltf-model": "#navmesh",
    crossOrigin: "anonymous",
    visible: "true"
  }), _dynamicContent_demo_json__WEBPACK_IMPORTED_MODULE_3__.map(entity => /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-entity", (0,_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__["default"])({
    key: entity.id
  }, entity)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-light", {
    type: "directional",
    color: "#ffffff",
    intensity: "0.8",
    position: "0.12062 1.52455 0.52977",
    light: "type: point; angle: 180",
    rotation: "-0.3 50.509 147.30229250797848",
    id: "bulb",
    visible: ""
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-light", {
    type: "directional",
    color: "#ffffff",
    intensity: "0.8",
    position: "3.94786 -1.28516 -0.54807",
    light: "type: hemisphere; angle: 180",
    rotation: "-0.3 50.509 147.30229250797848",
    id: "bulb-3"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-light", {
    type: "hemisphere",
    color: "#ffffff",
    intensity: "0.8",
    position: "20.45283 -2.62394 -5.68868",
    light: "type: hemisphere; angle: 180",
    rotation: "-0.3 50.509 147.30229250797848",
    id: "bulb-4"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().createElement("a-plane", {
    "static-body": "shape:  mesh",
    position: "0 0 -4",
    visible: "false",
    rotation: "-90 0 0",
    width: "4",
    height: "4",
    color: "#7BC8A4",
    scale: "6 2 2"
  })));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Demo);

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/extends.js":
/*!************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/extends.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _extends)
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

/***/ }),

/***/ "./src/js/app/Components/dynamicContent_demo.json":
/*!********************************************************!*\
  !*** ./src/js/app/Components/dynamicContent_demo.json ***!
  \********************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":"#powersimple","gltf-model":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/powersimple.glb","crossorigin":"anonymous","position":"-6.244 1.426 -0.311","rotation":"0 90 0","scale":"0.49834 0.58072 1"},{"troika-text":"strokeColor: #fffafa; value: Text is here","id":"#text","position":"3.66571 1.34902 -0.37157","visible":"","rotation":"0.9998113525032866 -89.45590055377542 0"},{},{"id":"#room","gltf-model":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/WEBXROS9.glb","crossorigin":"anonymous","position":"-1.693 0 0.07"}]');

/***/ }),

/***/ "./src/js/app/psudo_data/assets_demo.json":
/*!************************************************!*\
  !*** ./src/js/app/psudo_data/assets_demo.json ***!
  \************************************************/
/***/ ((module) => {

module.exports = JSON.parse('[{"id":"powersimple","type":"model","name":"powersimple","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/powersimple.glb"},{"id":"room","type":"model","name":"room","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/WEBXROS9.glb"},{"id":"navmesh","type":"model","name":"navmesh","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/Mesh3.glb"}]');

/***/ })

}]);