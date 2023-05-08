import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Body from "./Components/Body";
import NavSites from "./Components/NavSites";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AFrame from "./Components/AFrame";
import DataContext from './Utils/DataContext';
import "aframe";

// console.log(window);
// console.log(window.ReactRouterDOM);
// const { BrowserRouter } = window.ReactRouterDOM;
// const { createBrowserHistory } = window.HistoryLibrary;
// // console.log(BrowserRouter);
// console.log(createBrowserHistory); 

// const history = createBrowserHistory();
// console.log(history);

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Navbar />
//     </BrowserRouter>
//   );
// };

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        {/* <AFrame/> */}
      </>
    ),
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/:sitename/:sn",
        element: <NavSites />
      },
      {
        path: "/:sitename",
        element: <NavSites />
      }
    ],
  },
]);


const App = () => {
  const [data, setData] = useState([]);
  const [lang, setLang] = useState('');

  useEffect(() => {
    fetchMenuData();
  }, [lang]);

  async function fetchMenuData() {
    try {
      let fetchURL = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
      let stagingData = await fetch(fetchURL);
      let jsonData = await stagingData.json();
      let items = jsonData.filter(item => item.slug == "main-menu");
      items = items[0].items;
      setData(items);
    } catch (error) {
      console.log("Error fetching staging data: ", error);
    }
  }

  if(data.length === 0) {
    return <div>Loading...</div>
  }

  return (
    <DataContext.Provider value={{ data: data, setData: setData, lang: lang, setLang: setLang }}>
      <RouterProvider router={appRouter} />
    </DataContext.Provider>
  );
};

export default App;