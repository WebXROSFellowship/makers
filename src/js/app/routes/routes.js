import React, { Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import { Navbar, Sidebar, Footer, AppLoader } from "../components";
import { Home, Body, Profile, AFrame, NotFound, NavSites } from "../views";

const routes = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Sidebar />
        <Home />
        <Footer />
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
        path: "/:sitename/:sn",
        element: (
          <Suspense fallback={<AppLoader />}>
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

export default routes;
