"use strict";
(self["webpackChunkmakers"] = self["webpackChunkmakers"] || []).push([[361],{

/***/ 361:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ Components_AFrame)
});

// EXTERNAL MODULE: ./node_modules/react/index.js
var react = __webpack_require__(294);
;// CONCATENATED MODULE: ./src/js/app/psudo_data/assets.json
const assets_namespaceObject = JSON.parse('[{"id":"astra","type":"model","name":"astra","url":"https://cdn.glitch.com/ac5eecac-40b2-4897-8f67-28c497a19b47%2FAstronaut.glb"},{"id":"powersimple","type":"model","name":"powersimple","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/powersimple.glb"},{"id":"bg","type":"image","name":"background","url":"https://cdn.glitch.global/b32f8a0e-a5aa-4181-890e-189ebc2588f0/bg.jpg"}]');
;// CONCATENATED MODULE: ./src/js/app/Components/AFrame.js


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
        key: asset.id
      });
    }
    return /*#__PURE__*/react.createElement("img", {
      id: asset.id,
      src: asset.url,
      key: asset.id
    });
  })), loading ? /*#__PURE__*/react.createElement("p", null, "Loading...") : /*#__PURE__*/react.createElement(react.Fragment, null, /*#__PURE__*/react.createElement("a-entity", {
    "gltf-model": "#powersimple",
    position: "0 0.75 -3",
    radius: "0.5",
    height: "1.5"
  }), /*#__PURE__*/react.createElement("a-entity", {
    "gltf-model": "#astra",
    position: "1 0.75 -3"
  })), /*#__PURE__*/react.createElement("a-sphere", {
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

/***/ })

}]);