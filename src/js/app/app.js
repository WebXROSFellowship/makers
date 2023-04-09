import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './Components/Navbar';
import './../../scss/style.scss';
const App = () => {
  return (
    <>
    <Navbar/>
    </>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);





