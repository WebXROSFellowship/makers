import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import DataContext from "../Utils/DataContext";
import MenuDataContext from "../Utils/MenuDataContext";

const NavSites = () => {
  const { sitename, sn } = useParams();
  const { lang } = useContext(DataContext);

  const {menuData, setMenuData} = useContext(MenuDataContext);

  // const [menuData, setMenuData] = useState([]);

  // useEffect(() => {
  //   fetchMenuData();
  // }, [lang]);

  // async function fetchMenuData() {
  //   try {
  //     let fetchURL2 = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
  //     let stagingData = await fetch(fetchURL2);
  //     let jsonData = await stagingData.json();
  //     let items = jsonData.filter((item) => item.slug == "main-menu");
  //     items = items[0].items;
  //     setMenuData(items);
  //   } catch (err) {
  //     console.log("Error fetching menu data:" + err);
  //   }
  // }

  // const filteredMenuData = useMemo(() => {
  //   const curl = "/" + sitename + "/" + sn + "/";
  //   const filteredData = menuData?.filter((item) => item.url == curl);
  //   return filteredData.length > 0 ? filteredData[0].content : null;
  // }, [menuData, sitename, sn]);

  // const [menuData, setMenuData] = useState({});

  useEffect(()=>{
    fetchMenuData(lang);
  }, [lang]);

  async function fetchMenuData(lang) {
    try {
      let fetchURL = `https://staging.webxr.link/${lang}/wp-json/wp/v2/menus?menus`;
      let stagingData = await fetch(fetchURL);
      let jsonData = await stagingData.json();
      let items = jsonData.filter((item) => item.slug === "main-menu");
      items = items[0]?.items || [];
      setMenuData(prevData => ({
        ...prevData,
        [lang]: items
      }));
    } catch (err) {
      console.log("Error fetching menu data: " + err);
    }
  }
  
  const filteredMenuData = useMemo(() => {
    const curl = "/" + sitename + "/" + sn + "/";
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
