import React, { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  AFrame,
  Body,
  Demo,
  Home,
  NavSites,
  Navbar,
  Profile,
  Sidebar,
} from "./Components";
import { DataContext, MenuDataContext, StagingDataContext } from "./Utils";

import { Config } from "./config/config";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <Home />
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
        path: "aframe",
        element: <AFrame />,
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
  const [lang, setLang] = useState("");
  const [menuData, setMenuData] = useState({});

  const [stagingData, setStagingData] = useState([]);

  console.log("configs...", Config)
  const base_url = Config.SITE_URL;


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

  if (stagingData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider value={{ lang: lang, setLang: setLang }}>
      <StagingDataContext.Provider value={{ stagingData, setStagingData }}>
        <MenuDataContext.Provider value={{ menuData, setMenuData }}>
          <RouterProvider router={appRouter} />
        </MenuDataContext.Provider>
      </StagingDataContext.Provider>
    </DataContext.Provider>
  );
};
export default App;
