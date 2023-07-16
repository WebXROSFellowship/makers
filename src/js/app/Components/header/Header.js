import React, { useState, useEffect, useContext, useMemo } from "react";
import { Link } from "react-router-dom";

import "@styles/style.scss";
import { DataContext } from "../../utils";
import { AppConfig } from "../../config/appConfig";

const Header = () => {
  const [mainMenus, setMainMenus] = useState([]);
  const [parentMenus, setParentMenus] = useState([]);
  const [childMenus, setChildMenus] = useState([]);
  const { activeLanguages, menuData, lang, setLang } = useContext(DataContext);

  useMemo(() => {
    menuData.filter((item) => {
      if (item?.slug == "main-menu") {
        setMainMenus(item?.items);
        item?.items?.map((menuItem) => {
          let parent = [];
          let child = [];
          if (menuItem?.menu_item_parent === "0") {
            parent.push(menuItem);
            // console.log("Parent menu", parent);
            setParentMenus(parent);
          } else {
            child.push(menuItem);
            // console.log("child menu", child);
            setChildMenus(child);
          }
        });
      }
    });
  }, [menuData, lang]);

  return (
    <header className="App-header">
      <div className="App-header-left">
        <Link className="" to="/">
          {AppConfig?.SITE_CUSTOM_LOGO && (
            <div className="App-logo">
              <img src={AppConfig?.SITE_CUSTOM_LOGO[0]} alt="logo" />
            </div>
          )}
          <div className="App-title">
            {AppConfig.SITE_TITLE ? (
              <h4 className="title-head"> {AppConfig.SITE_TITLE}</h4>
            ) : (
              <h4 className="title-head"> Site Title </h4>
            )}
          </div>
        </Link>
      </div>
      <div className="App-header-right  d-flex flex-row-reverse ">
        <nav className="navbar navbar-expand-lg navbar-dark  ">
          <div className="container-fluid navbar-container ">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarToggleBtn"
              aria-controls="navbarToggleBtn"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarToggleBtn">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">
                {
                  /* The main dropdown menu items of the Navbar */

                  mainMenus?.map((menusItem, index) => {
                    let parnetMenuID = menusItem?.menu_item_parent;
                    let childMenu = [];

                    return (
                      parnetMenuID === "0" && (
                        <li className="nav-item dropdown " key={index}>
                          <Link
                            className="dropdownbtn nav-link active"
                            to={menusItem?.url}
                          >
                            {menusItem?.title}
                          </Link>
                          {parnetMenuID !== "0" && (
                            <ul className="dropdown-menu dropdown__content">
                              <li className="nav-item">
                                <Link className="dropdown-item" href="#">
                                  {menusItem?.title}
                                </Link>
                              </li>
                            </ul>
                          )}
                        </li>
                      )
                    );
                  })
                }

                {
                  /* The activeLanguages items of the Navbar */
                  activeLanguages && (
                    <li className="nav-item dropdown ">
                      <Link className="dropdownbtn nav-link active" to="#">
                        Languages
                      </Link>
                      <ul className="dropdown-menu dropdown__content">
                        {activeLanguages?.map((item, index) => {
                          let code = item?.code;
                          if (code == "en") {
                            code = "";
                          }

                          return (
                            <li className="nav-item" key={index}>
                              <span
                                className="dropdown-item"
                                onClick={() => setLang(`${code}`)}
                              >
                                {item?.native_name}
                              </span>
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
