import React, { useState, useEffect, lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AFrame, Body, Demo, Home, NavSites, Navbar, Profile, Sidebar } from "./Components";
import { DataContext, MenuDataContext } from "./Utils";

// const NavSites = lazy(() => import("./Components"));
// const AFrame = lazy(() => import("./Components"));
// const Demo = lazy(() => import("./Components"));

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

  useEffect(() => {
    fetchMenuData();
  }, [lang]);

  async function fetchMenuData() {
    try {
      let fetchURL = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
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
