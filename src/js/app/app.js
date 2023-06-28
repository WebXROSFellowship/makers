import React, { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  Body,
  Demo,
  Home,
  NavSites,
  Navbar,
  Profile,
  // Sidebar,
  Footer,
  AppLoader
} from "./components";
import { DataContext, MenuDataContext, StagingDataContext } from "./utils";
import { AppConfig } from "./config/appConfig";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        {/* <Sidebar /> */}
        <Home />
        <Footer/>
      </>
    ),
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "aframe_demo",
        element: <Demo />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
      {
        path: "/:sitename/:sn",
        element: (
          <Suspense fallback={<h1>Loadinggg...</h1>}>
            <NavSites />
          </Suspense>
        ),
      },
      {
        path: "/:sitename",
        element: <NavSites />,
      },
    ],
  },
]);

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
              <RouterProvider router={appRouter} />
            </MenuDataContext.Provider>
          </StagingDataContext.Provider>
        </DataContext.Provider>
      )}
    </>
  );
};
export default App;
