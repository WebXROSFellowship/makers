
// http://localhost:3000/?color=pink
import 'aframe'
import React, {Component} from 'react'

function App() {
  const color = new URLSearchParams(document.location.search).get('color');
   console.log(color); 
  return (
      <a-scene>
        <a-box 
          position="-1 0.5 -3" 
          rotation="0 45 0" 
          color="#4CC3D9" />
        <a-sphere 
          position="0 1.25 -5" 
          radius="1.25" 
          color={color} />
        <a-cylinder 
          position="1 0.75 -3" 
          radius="0.5" 
          height="1.5" 
          color="#FFC65D" />
        <a-plane 
          position="0 0 -4" 
          rotation="-90 0 0" 
          width="4" 
          height="4" 
          color="#7BC8A4" />
        <a-dodecahedron 
          color="#FF926B" 
          radius="5" 
          position="0 -1 -30"></a-dodecahedron>
        <a-sky src={require('./sky.jpg')} />
      </a-scene>
    );
  }
export default App;