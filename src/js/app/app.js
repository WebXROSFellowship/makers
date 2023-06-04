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
        path: "/profile/:username",
        element: <Profile />,
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
    console.log("Calling Fetch in App");
    fetchMenuData();
  }, [lang]);

  async function fetchMenuData() {
    try {
      console.log("1");
      console.log("Fetching in App");
      let fetchURL = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
      console.log(fetchURL);
      let stagingData = await fetch(fetchURL);
      let jsonData = await stagingData.json();
      console.log(jsonData);
      let items = jsonData.filter((item) => item.slug == "main-menu");
      items = items[0].items;
      console.log(menuData);
      setMenuData(prevData => ({
        ...prevData,
        [lang]: items
      }));
      setTimeout(()=>{
        console.log("MenuData in st",menuData);
      }, 1000);
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
