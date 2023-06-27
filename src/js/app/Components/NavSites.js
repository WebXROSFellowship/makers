import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";

import { DataContext, StagingDataContext,MenuDataContext } from "../utils";

const NavSites = () => {
  const { sitename, sn } = useParams();
  const { lang } = useContext(DataContext);
  // const { menuData } = useContext(MenuDataContext);
  const { stagingData } = useContext(StagingDataContext);

  const filteredMenuData = useMemo(() => {
    const curl = "/" + sitename + "/" + (sn != undefined ? sn + "/" : "");
    const langMenuData = stagingData || [];
    const filteredData = langMenuData.filter((item) => item.url === curl);
    return filteredData.length > 0 ? filteredData[0] : null;
  }, [stagingData, lang, sitename, sn]);

  return (
    <>
     <div className="navsite"> <h1 dangerouslySetInnerHTML={{ __html: filteredMenuData.title }} />
      <div dangerouslySetInnerHTML={{ __html: filteredMenuData.content }} /> </div>
    </>
  );
};

export default NavSites;
