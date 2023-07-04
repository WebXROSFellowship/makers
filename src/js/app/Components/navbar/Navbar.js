import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "@styles/style.scss";
import { DataContext, StagingDataContext } from "../../utils";
import { AppConfig } from "../../config/appConfig";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [navbarMenus, setNavbarMenus] = useState([]);
  const [c2IDs, setC2IDs] = useState([]);
  const [languageArr, setLanguageArr] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { setLang } = useContext(DataContext);
  const { stagingData } = useContext(StagingDataContext);
  const base_url = AppConfig.SITE_URL;

  const [navbarData, setNavbarData] = useState([]);

  let imgBaseURL = `${base_url}/wp-content/uploads/2023/05/webxros.png`;

  // The useEffect hook is used to call the getData function once when the component is mounted.
  useEffect(() => {
    settingMenuData2();
    // settingMenuData();
    setLanguages();
  }, [stagingData]);

  function formatNames(name) {
    let allWords = name.toLowerCase().split(" ");
    for (let i = 0; i < allWords.length; i++) {
      allWords[i] = allWords[i][0].toUpperCase() + allWords[i].substr(1);
    }
    let formattedName = allWords.join(" ");
    return formattedName;
  }

  function settingMenuData2() {
    let items = stagingData;

    const parents = {};
    const children = [];
    const grandchildren = [];

    items.forEach((item) => {
      const { ID, menu_item_parent } = item;
      if (menu_item_parent === "0") {
        parents[ID] = {
          ...item,
          childItems: [],
        };
      } else if (parents[menu_item_parent]) {
        children.push(item);
      } else {
        console.log(item);
        grandchildren.push(item);
      }
    });

    children.forEach((child) => {
      const { menu_item_parent } = child;
      if (parents[menu_item_parent]) {
        parents[menu_item_parent].childItems.push(child);
      }
    });

    console.log("Grand Children", grandchildren);

    grandchildren.forEach((grandchild) => {
      console.log("GC in FE", grandchild);
      const { menu_item_parent } = grandchild;
      console.log(menu_item_parent);
      let parent = Object.values(parents);
      console.log("Parent", parent);
      parent = parent.find((parent) =>
        parent.childItems.filter((child) => child.ID === menu_item_parent)
      );
      console.log("Parent", parent);
      if (parent) {
        const child = parent.childItems.find(
          (child) => child.ID == menu_item_parent
        );
        console.log("Child", child);
        if (child) {
          console.log("Setting nowww");
          child.childItems = child.childItems || [];
          child.childItems.push(grandchild);
        }
      }
    });

    const navbarData2 = Object.values(parents)
      .map((parent) => parent)
      .map((child) => child)
      .map((gcc) => gcc);

    // Logging the grandchildren
    navbarData2.forEach((parent) => {
      parent.childItems.forEach((child) => {
        if (child?.childItems?.length > 0) {
          console.log("Parent:", parent);
          console.log("Child:", child);
          console.log("Grandchildren:", child.childItems);
        }
      });
    });
    console.log(navbarData2);
    setNavbarData(navbarData2);
  }

  function settingMenuData3() {
    let items = stagingData;

    console.log("Printing Items", items);

    const parents = {};
    const children = [];

    items.forEach((item) => {
      const { ID, menu_item_parent, title, content, url } = item;
      if (menu_item_parent === "0") {
        parents[ID] = {
          ...item,
          childItems: [],
        };
      } else {
        children.push(item);
      }
    });

    children.forEach((child) => {
      const { menu_item_parent } = child;
      if (parents[menu_item_parent]) {
        parents[menu_item_parent].childItems.push(child);
      }
    });
    console.log("Settingggg");
    console.log(parents);
    let navbarData2 = Object.values(parents);
    console.log("Printing values", navbarData2);
    setNavbarData(navbarData2);
  }

  // function settingMenuData() {
  //   let items = stagingData;
  //   let head = items.filter((e) => e.menu_item_parent === "0")[0];
  //   let childItems = items.filter(
  //     (e) => parseInt(e.menu_item_parent) === head.ID
  //   );
  //   let nestedItems = [];
  //   let currIDs = [];
  //   for (let i = 0; i < childItems.length; i++) {
  //     let currChild = childItems[i];
  //     let allNestedChild = items.filter(
  //       (e) => parseInt(e.menu_item_parent) === currChild.ID
  //     );
  //     if (allNestedChild.length > 0) {
  //       currIDs.push(currChild.ID);
  //       allNestedChild.map((ele) => nestedItems.push(ele));
  //     }
  //   }
  //   setC2IDs(currIDs);
  //   let cData = [
  //     {
  //       head,
  //       childItems,
  //       nestedItems,
  //     },
  //   ];
  //   setNavbarMenus(cData);
  // }

  async function setLanguages() {
    const langFetchURL = `${base_url}/wp-json/wpml/v1/active_languages`;
    let langData = await fetch(langFetchURL);
    let jsonLangData = await langData.json();
    setLanguageArr(jsonLangData);
  }

  /**
   * This is a functional React component that returns a Navbar.
   */

  return (
    <>
      <nav className="navbar">
        {/* The brand section of the Navbar */}
        <Link to="/" className="text-decoration-none cursor-pointer">
          <div
            className="navbar-brand text-white cursor-pointer"
            style={{ fontFamily: "sans-serif" }}
          >
            <img
              src={imgBaseURL}
              alt="logo"
              className="logo-img cursor-pointer"
              style={{
                width: "50px",
                height: "50px",
                marginTop: "-5px",
                borderRadius: "50%",
                cursor: "default",
                marginRight: "1rem",
              }}
            />
            <span className="title-head cursor-pointer">{AppConfig.SITE_TITLE}</span>
          </div>
        </Link>

        <div className="navbar-right">
          {/* The main dropdown menu items of the Navbar */}
          {navbarData ? (
            navbarData?.map((currNavBarItem, i) => {
              let title = currNavBarItem.title;
              let titleUrl = currNavBarItem.url;
              let childItems = currNavBarItem.childItems;

              return (
                <div className="dropdown" key={i}>
                  <Link to={titleUrl}>
                  <button className="dropbtn">{title}</button>
                  </Link>
                  <div className="dropdown__content">
                    {childItems.map((menu, i) => {
                      const { title, url, childItems: nestedChildItems } = menu;
                      return (
                        <Link className="dropdown__items" key={i} to={url}>
                          {formatNames(title)}
                          {nestedChildItems && nestedChildItems.length > 0 && (
                            <div className="n2">
                              {nestedChildItems.map((cur, i) => (
                                <Link
                                  to={cur.url}
                                  className="dropdown__items d2"
                                  key={i}
                                >
                                  {cur.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}

          {/* {navbarMenus ? (
            navbarMenus.map((currEle, i) => {
              let { head, childItems, nestedItems } = currEle;

              return (
                <div className="dropdown" key={i}>
                  <button className="dropbtn">{head.title}</button>
                  <div className="dropdown__content">
                    {childItems.map((menu, i) => {
                      const c = c2IDs.includes(menu.ID);
                      return (
                        <Link
                          className="dropdown__items"
                          key={i}
                          onMouseEnter={() => setHoveredIndex(i)}
                          onMouseLeave={() => setHoveredIndex(-1)}
                          to={menu.url}
                        >
                          {formatNames(menu.title)}
                          {c && (
                            <span className="n2-drop">
                              <i className="fa-solid fa-circle-chevron-down"></i>
                            </span>
                          )}
                          {c && hoveredIndex === i && (
                            <div className="n2">
                              {nestedItems.map((cur, i) => (
                                <Link
                                  to={cur.url}
                                  className="dropdown__items d2"
                                  key={i}
                                >
                                  {cur.title}
                                </Link>
                              ))}
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )} */}
          {/* The Language Section of Navbar*/}
          <div className="dropdown">
            <button className="dropbtn"> Languages </button>
            <div className="dropdown__content">
              {languageArr.map((currLang) => {
                let cLang = currLang.native_name;
                let code = currLang.code;
                if (code == "en") {
                  code = "";
                }
                return (
                  <span
                    onClick={() => setLang(`${code}`)}
                    key={code}
                    className="dropdown__items"
                  >
                    {cLang}
                  </span>
                );
              })}
            </div>
          </div>
          {/* The social media logo section of the Navbar */}
          

          <div className="hamburger">
            <span
              className="hamburger__logo"
              onClick={() => {
                setShowMenu(!showMenu);
              }}
            >
              <i className="fa-solid fa-bars fa-xl"></i>
            </span>
          </div>
          {/* The side menu that appears when the hamburger icon is clicked */}
          {showMenu === true ? (
            <div className="sideMenu">
              {navbarData ? (
                navbarData?.map((currNavBarItem) => {
                  let title = currNavBarItem.title;
                  let childItems = currNavBarItem.childItems;

                  return (
                    <div className="dropdown2" key={currNavBarItem}>
                      <button className="dropbtn">{title}</button>
                      <div className="dropdown__content">
                        {childItems.map((menu, i) => {
                          const { title, url } = menu;
                          return (
                            <Link
                              className="dropdown__items"
                              key={title}
                              to={url}
                            >
                              {formatNames(title)}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {navbarMenus ? (
                navbarMenus.map((currEle, i) => {
                  let { head, childItems, nestedItems } = currEle;

                  return (
                    <div className="dropdown2" key={i}>
                      <button className="dropbtn">{head.title}</button>
                      <div className="dropdown__content">
                        {childItems.map((menu, i) => {
                          const c = c2IDs.includes(menu.ID);
                          return (
                            <Link
                              className="dropdown__items"
                              key={i}
                              onMouseEnter={() => setHoveredIndex(i)}
                              onMouseLeave={() => setHoveredIndex(-1)}
                              to={menu.url}
                            >
                              {formatNames(menu.title)}
                              {c && (
                                <span className="n2-drop">
                                  <i className="fa-solid fa-circle-chevron-down"></i>
                                </span>
                              )}
                              {c && hoveredIndex === i && (
                                <div className="n2">
                                  {nestedItems.map((cur, i) => (
                                    <Link
                                      to={cur.url}
                                      className="dropdown__items d2"
                                      key={i}
                                    >
                                      {cur.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              <div className="dropdown2">
                <button className="dropbtn"> Languages </button>
                <div className="dropdown__content">
                  {languageArr.map((currLang) => {
                    let cLang = currLang.native_name;
                    let code = currLang.code;
                    if (code == "en") {
                      code = "";
                    }
                    return (
                      <span
                        onClick={() => setLang(`${code}`)}
                        key={code}
                        className="dropdown__items"
                      >
                        {cLang}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
