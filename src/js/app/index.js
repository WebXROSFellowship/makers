import React from 'react';
import ReactDOM from 'react-dom/client';
import "./../../scss/style.scss";
import App from './app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

const response =await fetch('wp-json/wp/v2/menus');
console.log(response);

if(!response.ok) {
    console.log('Error');
}
const menus =await response.json();
console.log("Expecting menu")
console.log(menus);
