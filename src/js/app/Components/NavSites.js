import React, { useContext, useEffect, useState, useMemo, useRef } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";
import MenuDataContext from "../Utils/MenuDataContext";

const NavSites = () => {
  const { sitename, sn } = useParams();
  const { lang } = useContext(DataContext);
  const { menuData } = useContext(MenuDataContext);

  const filteredMenuData = useMemo(() => {
    const curl = "/" + sitename + "/" + (sn != undefined ? sn + "/" : "");
    const langMenuData = menuData[lang] || [];
    const filteredData = langMenuData.filter((item) => item.url === curl);
    return filteredData.length > 0 ? filteredData[0].content : null;
  }, [menuData, lang, sitename, sn]);

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: filteredMenuData }} />
    </>
  );
};

export default NavSites;
