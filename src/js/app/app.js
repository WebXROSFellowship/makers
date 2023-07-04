import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";

import { AppConfig } from "./config/appConfig";
import routes from "./routes/routes";
import { DataContext, MenuDataContext, StagingDataContext } from "./utils";
import { AppLoader } from "./components";

const App = () => {
  const base_url = AppConfig.SITE_URL;
  const [lang, setLang] = useState("");
  const [menuData, setMenuData] = useState({});
  const [stagingData, setStagingData] = useState([]);

  useEffect(() => {
    fetchMenuData();
  }, [lang]);

  async function fetchMenuData() {
    try {
      let fetchURL = `${base_url}/${lang}/wp-json/wp/v2/menus?menus`;
      let stagingData = await fetch(fetchURL);
      let jsonData = await stagingData.json();
      let items = jsonData.filter((item) => item.slug == "main-menu");
      items = items[0].items;
      setStagingData([...items]);
    } catch (error) {
      console.log("Error fetching staging data: ", error);
    }
  }

  return (
    <>
      {stagingData.length === 0 ? (
        <AppLoader />
      ) : (
        <DataContext.Provider value={{ lang: lang, setLang: setLang }}>
          <StagingDataContext.Provider value={{ stagingData, setStagingData }}>
            <MenuDataContext.Provider value={{ menuData, setMenuData }}>
              <RouterProvider router={routes} />
            </MenuDataContext.Provider>
          </StagingDataContext.Provider>
        </DataContext.Provider>
      )}
    </>
  );
};
export default App;
