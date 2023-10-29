import React from "react";

import "@styles/style.scss";

const AppLoader = () => {
  return (
    <div className="appLoader">
      <div className="loaderCircle"></div>
       <span class="loaderText">Loading...</span>
    </div>
  );
};

export default AppLoader;
