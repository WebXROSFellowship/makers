import React from 'react'

import ToggleVisibility from "./ToggleVisibility";
import AFrame from "./AFrame";

const Body = () => {


const SITE_URL=process.env.SITE_URL;
  const HOME_URL=process.env.HOME_URL;
  const SITE_TITLE=process.env.SITE_TITLE;
  const SITE_TAGLINE=process.env.SITE_TAGLINE;

  console.log("Site url", SITE_URL);


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