import React, {useState} from 'react';
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import Body from "./Components/Body";
import Profile from "./Components/Profile";
import NavSites from "./Components/NavSites";
import Sidebar from "./Components/Sidebar";
import AFrame from "./Components/AFrame";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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