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
} from "./components";
import { DataContext, MenuDataContext, StagingDataContext } from "./utils";
import AppConfig from "./config/appConfig";

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
  const base_url = AppConfig.SITE_URL;
  const [lang, setLang] = useState("");
  const [menuData, setMenuData] = useState({});
  const [stagingData, setStagingData] = useState([]);

  useEffect(() => {
    fetchMenuData();
  }, [lang]);

  console.log("site url", base_url);

  // TODO: Optimize for dynamicity
  // useEffect(() => {
  //   sendDataDump("", "data_english");
  //   sendDataDump("de", "data_german");
  //   sendDataDump("hi", "data_hindi");
  // }, []);

  // const sendDataDump = async (lang, slug) => {
  //   const url = `${base_url}/${lang}/wp-json`;
  //   await fetch(url)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log("data..", data);
  //       const apiUrl = `${base_url}/wp-json/myroutes/data_publish`;
  //       const formdata = new FormData();
  //       formdata.append("slug", slug);
  //       formdata.append("data", JSON.stringify(data));
  //       const payload = {
  //         method: "POST",
  //         body: formdata,
  //         redirect: "follow",
  //       };

  //       fetch(apiUrl, payload)
  //         .then((response) => response.json())
  //         .then((result) => {
  //           console.log("Data Dump...", result);
  //         })
  //         .catch((error) => console.log("Data Dump Error...", error));
  //     })
  //     .catch((error) => {
  //       console.log("Error in Getting the Data...", error);
  //     });
  // };

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
        <div className="container mx-auto">
          <h1 className="h1">Loading...</h1>
        </div>
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
