"use strict";
(self["webpackChunkmakers"] = self["webpackChunkmakers"] || []).push([["src_js_app_Components_NavSites_js"],{

/***/ "./src/js/app/Components/NavSites.js":
/*!*******************************************!*\
  !*** ./src/js/app/Components/NavSites.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router/dist/index.js");
/* harmony import */ var _Utils_DataContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Utils/DataContext */ "./src/js/app/Utils/DataContext.js");
/* harmony import */ var _Utils_MenuDataContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Utils/MenuDataContext */ "./src/js/app/Utils/MenuDataContext.js");




const NavSites = () => {
  const {
    sitename,
    sn
  } = (0,react_router_dom__WEBPACK_IMPORTED_MODULE_3__.useParams)();
  const {
    lang
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Utils_DataContext__WEBPACK_IMPORTED_MODULE_1__["default"]);
  const {
    menuData,
    setMenuData
  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_Utils_MenuDataContext__WEBPACK_IMPORTED_MODULE_2__["default"]);

  // const [menuData, setMenuData] = useState([]);

  // useEffect(() => {
  //   fetchMenuData();
  // }, [lang]);

  // async function fetchMenuData() {
  //   try {
  //     let fetchURL2 = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
  //     let stagingData = await fetch(fetchURL2);
  //     let jsonData = await stagingData.json();
  //     let items = jsonData.filter((item) => item.slug == "main-menu");
  //     items = items[0].items;
  //     setMenuData(items);
  //   } catch (err) {
  //     console.log("Error fetching menu data:" + err);
  //   }
  // }

  // const filteredMenuData = useMemo(() => {
  //   const curl = "/" + sitename + "/" + sn + "/";
  //   const filteredData = menuData?.filter((item) => item.url == curl);
  //   return filteredData.length > 0 ? filteredData[0].content : null;
  // }, [menuData, sitename, sn]);

  // const [menuData, setMenuData] = useState({});

  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchMenuData(lang);
  }, [lang]);
  async function fetchMenuData(lang) {
    try {
      let fetchURL = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
      let stagingData = await fetch(fetchURL);
      let jsonData = await stagingData.json();
      let items = jsonData.filter(item => item.slug === "main-menu");
      items = items[0]?.items || [];
      setMenuData(prevData => ({
        ...prevData,
        [lang]: items
      }));
    } catch (err) {
      console.log("Error fetching menu data: " + err);
    }
  }
  const filteredMenuData = (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const curl = "/" + sitename + "/" + sn + "/";
    const langMenuData = menuData[lang] || [];
    const filteredData = langMenuData.filter(item => item.url === curl);
    return filteredData.length > 0 ? filteredData[0].content : null;
  }, [menuData, lang, sitename, sn]);
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement((react__WEBPACK_IMPORTED_MODULE_0___default().Fragment), null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", {
    dangerouslySetInnerHTML: {
      __html: filteredMenuData
    }
  }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (NavSites);

/***/ })

}]);