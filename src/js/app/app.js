import React from 'react'
import "aframe";
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Sidebar from './Components/sidebar';

import AFrame from './Components/AFrame';

const App = () => {
  return (
    <BrowserRouter>
    {/* <Navbar/>
    <Sidebar/> */}
    {/* TODO : Add Pagination for AFRAME page */}
    <AFrame/>
    </BrowserRouter>
  )
}

export default App;
