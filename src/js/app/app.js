import React, { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AFrame, Body, Demo, Home, NavSites, Navbar, Profile, Sidebar } from "./Components";
import { DataContext, MenuDataContext } from "./Utils";

import { Config } from "./config/config";


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Sidebar/>
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
      }
    ],
  },
]);

const App = () => {
  const [lang, setLang] = useState("");
  const [menuData, setMenuData] = useState({});
  let data = menuData[lang] || [];

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
      setMenuData(prevData => ({
        ...prevData,
        [lang]: items
      }));
    } catch (error) {
      console.log("Error fetching staging data: ", error);
    }
  }

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <DataContext.Provider value={{ lang: lang, setLang: setLang }} >
      <MenuDataContext.Provider value={{ menuData, setMenuData }}>
        <RouterProvider router={appRouter} />
      </MenuDataContext.Provider>
    </DataContext.Provider>
  );
};
export default App;
