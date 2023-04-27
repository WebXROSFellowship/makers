import React from 'react'
import "aframe";
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import AFrame from './Components/AFrame';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    {/* TODO : Add Pagination for AFRAME page */}
    {/* <AFrame/> */}
    </BrowserRouter>
  )
}

export default App;
