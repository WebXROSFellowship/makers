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
        <Sidebar/>
        {/* TODO : Add Pagination for AFRAME page */}
        {/* <AFrame/> */}
        <Home />
      </>
    ),
    children: [
      {
        path: "/",
        element: <Body />,
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