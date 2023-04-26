import { lazy } from "react";
// import { BrowserRouter } from 'react-router-dom';
// const BrowserRouterLazy = lazy(() => import('react-router-dom/BrowserRouter'));
// import Navbar from './Components/Navbar';
const BrowserRouterLazy = lazy(() =>
  import("react-router-dom").then((module) => ({
    default: module.BrowserRouter,
  }))
);

const Navbar = lazy(() => import("./Components/Navbar"));

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouterLazy>
        <Navbar />
      </BrowserRouterLazy>
    </Suspense>
  );
};
// window.onload = function() {
// App = () => {
//   return (
//     <BrowserRouter>
//     <Navbar/>
//     </BrowserRouter>
//   )
// }

// }
export default App;
