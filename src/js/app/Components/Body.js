import React from 'react'

import ToggleVisibility from "./ToggleVisibility";
import AFrame from "./AFrame";

const Body = () => {
  return (
    <div>
      Body
      <ToggleVisibility>
        <AFrame />
      </ToggleVisibility>
    </div>
  )
}

export default Body;