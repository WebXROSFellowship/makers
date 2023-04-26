import { lazy } from "react";
const ReactDOMLazy = lazy(() => import("react-dom"));
// import ReactDOM from 'react-dom/client';
import "./../../scss/style.scss";
import App from "./App";

const root = ReactDOMLazy.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);

// ReactDOM.render(<App />, document.getElementById('root'));

// const response =await fetch('https://staging.webxr.link/wp-json/wp/v2/menus?menus');
// console.log(response);

// if(!response.ok) {
//     console.log('Error');
// }
// const menus =await response.json();
// console.log("Expecting menu")
// console.log(menus);
