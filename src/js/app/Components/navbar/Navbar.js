import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";

import "@styles/style.scss";
import { DataContext } from "../../utils";
import { AppConfig } from "../../config/appConfig";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [navbarMenus, setNavbarMenus] = useState([]);
  const [c2IDs, setC2IDs] = useState([]);
  const [languageArr, setLanguageArr] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const { setLang, menuData } = useContext(DataContext);
  const base_url = AppConfig.SITE_URL;
  const { activeLanguages, setActiveLanguages } = useContext(DataContext);

  const [navbarData, setNavbarData] = useState([]);

  // The useEffect hook is used to call the getData function once when the component is mounted.
  useEffect(() => {
    settingMenuData();
  }, [menuData]);

  function formatNames(name) {
    let allWords = name.toLowerCase().split(" ");
    for (let i = 0; i < allWords.length; i++) {
      allWords[i] = allWords[i][0].toUpperCase() + allWords[i].substr(1);
    }
    let formattedName = allWords.join(" ");
    return formattedName;
  }

  function settingMenuData() {
    let items = menuData.filter((item) => item?.slug === "main-menu");
    items = items[0].items;
    console.log("main menus", items);

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
        grandchildren.push(item);
      }
    });

    children.forEach((child) => {
      const { menu_item_parent } = child;
      if (parents[menu_item_parent]) {
        parents[menu_item_parent].childItems.push(child);
      }
    });

    grandchildren.forEach((grandchild) => {
      const { menu_item_parent } = grandchild;
      let parent = Object.values(parents);
      parent = parent.find((parent) =>
        parent.childItems.filter((child) => child.ID === menu_item_parent)
      );
      if (parent) {
        const child = parent.childItems.find(
          (child) => child.ID == menu_item_parent
        );
        if (child) {
          child.childItems = child.childItems || [];
          child.childItems.push(grandchild);
        }
      }
    });

    const navbarData2 = Object.values(parents)
      .map((parent) => parent)
      .map((child) => child)
      .map((gcc) => gcc);

    setNavbarData(navbarData2);
  }

  /**
   * This is a functional React component that returns a Navbar.
   */

  return (
    <>
      <nav className="navbar">
        {/* The brand section of the Navbar */}
        <NavLink to="/" className="text-decoration-none cursor-pointer">
          <div
            className="navbar-brand text-white cursor-pointer"
            style={{ fontFamily: "sans-serif" }}
          >
            {AppConfig?.SITE_CUSTOM_LOGO && (
              <img
                src={AppConfig?.SITE_CUSTOM_LOGO[0]}
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
            )}
            <span className="title-head cursor-pointer">
              {AppConfig.SITE_TITLE}
            </span>
          </div>
        </NavLink>

        <div className="navbar-right">
          {/* The main dropdown menu items of the Navbar */}
          {navbarData ? (
            navbarData?.map((currNavBarItem, i) => {
              let title = currNavBarItem.title;
              let titleUrl = currNavBarItem.url;
              let childItems = currNavBarItem.childItems;

              return (
                <div className="dropdown" key={i}>
                  <NavLink to={titleUrl}>
                    <button className="dropbtn">{title}</button>
                  </NavLink>
                  <div className="dropdown__content">
                    {childItems.map((menu, i) => {
                      const { title, url, childItems: nestedChildItems } = menu;
                      return (
                        <NavLink className="dropdown__items" key={i} to={url}>
                          {formatNames(title)}
                          {nestedChildItems && nestedChildItems.length > 0 && (
                            <div className="n2">
                              {nestedChildItems.map((cur, i) => (
                                <NavLink
                                  to={cur.url}
                                  className="dropdown__items d2"
                                  key={i}
                                >
                                  {cur.title}
                                </NavLink>
                              ))}
                            </div>
                          )}
                        </NavLink>
                      );
                    })}
                  </div>
                </div>
              );
            })
          ) : (
            <></>
          )}

          {/* The Language Section of Navbar*/}
          {activeLanguages?.length > 0 ? (
            <div className="dropdown">
              <button className="dropbtn"> Languages </button>
              <div className="dropdown__content">
                {activeLanguages?.map((currLang) => {
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
          ) : (
            <></>
          )}

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
                            <NavLink
                              className="dropdown__items"
                              key={title}
                              to={url}
                            >
                              {formatNames(title)}
                            </NavLink>
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
                            <NavLink
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
                                    <NavLink
                                      to={cur.url}
                                      className="dropdown__items d2"
                                      key={i}
                                    >
                                      {cur.title}
                                    </NavLink>
                                  ))}
                                </div>
                              )}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
              {activeLanguages?.length > 0 ? (
                <div className="dropdown2">
                  <button className="dropbtn"> Languages </button>
                  <div className="dropdown__content">
                    {activeLanguages?.map((currLang) => {
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
              ) : (
                <></>
              )}
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
