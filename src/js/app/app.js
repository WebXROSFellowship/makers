import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
// import AFrame from './Components/AFrame';

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    {/* <AFrame/> */}
    </BrowserRouter>
  )
}

export default App;
