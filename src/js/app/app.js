import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { AppConfig } from "./config/appConfig";
import routes from "./routes/routes";
import { DataContext } from "./utils";
import { AppLoader } from "./components";

const App = () => {
  const base_url = AppConfig.SITE_URL;
  const [loading, setLoading] = useState(true);
  const [activeLanguages, setActiveLanguages] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [lang, setLang] = useState([]);

  useEffect(() => {
    getActiveLanguages();
    getMenuData();
  }, [lang]);

  const getActiveLanguages = async () => {
    console.log("AppConfig...", AppConfig);
    const url = `${base_url}/wp-json/wpml/v1/active_languages`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("active languages...", result);
        setActiveLanguages(result);
      })
      .catch((error) => {
        console.log("Error when getting ActiveLanguages data", error);
      });
  };

  const getMenuData = async () => {
    console.log("AppConfig...", AppConfig);
    const url = `${base_url}/${lang}/wp-json/wp/v2/menus?menus`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("menusdata...", result);
        setMenuData(result);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error when getting menu data", error);
      });
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
            setLang: setLang
          }}
        >
          <RouterProvider router={routes} />
        </DataContext.Provider>
      )}
    </>
  );
};
export default App;
