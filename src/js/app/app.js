import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import routes from "./routes/routes";
import { DataContext } from "./utils";
import { AppLoader } from "./components";
import { HttpRequest } from "./config/ApiConfig";
import { ApiEndpoint } from "./config/ApiEndpoint";
import { AppConfig } from "./config/AppConfig";

const App = () => {
  const base_url = AppConfig.SITE_URL;
  const httpRequest = HttpRequest(); // Create an instance of the HttpRequest module
  const [loading, setLoading] = useState(true);
  const [activeLanguages, setActiveLanguages] = useState([
    {
      code: "en",
      native_name: "English",
      is_default: true,
    },
  ]);
  const [menuData, setMenuData] = useState([]);
  const [lang, setLang] = useState([]);

  useEffect(() => {
    console.log("app config", AppConfig);
    getActiveLanguages();
    getMenuData();
  }, [lang]);

  const getActiveLanguages = async () => {
    let SITE_ACTIVE_PLUGINS = AppConfig.SITE_ACTIVE_PLUGINS;
    let wpml = "sitepress-multilingual-cms/sitepress.php";
    if (!SITE_ACTIVE_PLUGINS.includes(wpml)) {
      setActiveLanguages();
    } else {
      const url = `${ApiEndpoint.GET_ACTIVE_LANGUAGES}`;
      try {
        httpRequest
          .httpGet(url)
          .then((result) => {
            console.log("GET_ACTIVE_LANGUAGES Api Result...", result);
            setActiveLanguages(result);
          })
          .catch((error) => {
            console.log("Error when getting ActiveLanguages data", error);
          });
      } catch (error) {
        console.log("Exception comming while making menus http request", error);
      }
    }
  };

  const getMenuData = async () => {
    const url = `/${lang}${ApiEndpoint.GET_MENUS}`;
    try {
      httpRequest
        .httpGet(url)
        .then((result) => {
          console.log("GET_MENUS Api Result...", result);
          setMenuData(result);
        })
        .catch((error) => {
          console.log("Error when getting menu data", error);
        })
        .finally((result) => {
          console.log("finaly response", result);
          setLoading(false);
        });
    } catch (error) {
      console.log("Exception comming while making menus http request", error);
    }
  };

  return (
    <>
      {loading ? (
        <AppLoader />
      ) : (
        <DataContext.Provider
          value={{
            activeLanguages: activeLanguages,
            setActiveLanguages: setActiveLanguages,
            menuData: menuData,
            setMenuData: setMenuData,
            lang: lang,
            setLang: setLang,
          }}
        >
          <RouterProvider router={routes} />
        </DataContext.Provider>
      )}
    </>
  );
};
export default App;
