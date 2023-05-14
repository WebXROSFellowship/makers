import React, {useState} from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import NavSites from "./Components/NavSites";
import Sidebar from "./Components/Sidebar";
import AFrame from "./Components/AFrame";
import DataContext from './Utils/DataContext';

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
        path: "aframe",
        element: <AFrame />,
      },
      {
        path: "profile/:username",
        element: <Profile />,
      },
      {
        path: "/:sitename",
        element: <NavSites/>
      }
    ],
  },
]);

const App = () => {
  const [data, setData] = useState([]);
  return (
    <DataContext.Provider value={{ data: data, setData: setData }}>
      <RouterProvider router={appRouter} />
    </DataContext.Provider>
  );
};
export default App;