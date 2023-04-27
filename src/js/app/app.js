import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navbar from './Components/Navbar';
import Sidebar from './Components/sidebar';


const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
    <Sidebar/>
    </BrowserRouter>
  )
}

export default App;
