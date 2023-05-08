import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";

const NavSites = () => {
  const { sitename, sn } = useParams();
  const { lang } = useContext(DataContext);
  let [mainText, setMainText] = useState();
  
  useEffect(() => {
    fetchMenuData();
  }, [sitename, sn, lang]);

  async function fetchMenuData() {
    try {
      let fetchURL =
         sn != undefined
           ? `https://staging.webxr.link/${lang}/${sitename}/${sn}`
           : `https://staging.webxr.link/${lang}/${sitename}`;
      let stagingData = await fetch(fetchURL);
      let rt = await stagingData.text();
      setMainText(rt);
    } catch (error) {
      console.log("Error fetching staging data: ", error);
    }
  }

  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: mainText }} />
    </>
  );
};

export default NavSites;
