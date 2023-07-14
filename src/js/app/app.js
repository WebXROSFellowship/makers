import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { AppConfig } from "./config/appConfig";
import routes from "./routes/routes";
import { DataContext, MenuDataContext } from "./utils";
import { AppLoader } from "./components";

const App = () => {
  const base_url = AppConfig.SITE_URL;
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("");
  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    getMenuData();
  }, [lang]);

  const getMenuData = async () => {
    console.log("AppConfig...", AppConfig);
    const url = `${base_url}/${lang}/wp-json/wp/v2/menus?menus`;
    await fetch(url)
      .then((response) => response.json())
      .then((result) => {
        console.log("menusdata...", result);
        let menus = []
        result.map((menudata) => {
          menus.push(menudata)
          setMenuData(menus);
          setLoading(false);
        });
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
        <DataContext.Provider value={{ lang: lang, setLang: setLang }}>
          <MenuDataContext.Provider value={{ menuData, setMenuData }}>
            <RouterProvider router={routes} />
          </MenuDataContext.Provider>
        </DataContext.Provider>
      )}
    </>
  );
};
export default App;
