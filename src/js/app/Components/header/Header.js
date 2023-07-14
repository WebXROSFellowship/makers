import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import "@styles/style.scss";
import { DataContext, MenuDataContext } from "../../utils";
import { AppConfig } from "../../config/appConfig";

const Header = () => {
  const [mainMenus, setMainMenus] = useState();
  const { lang } = useContext(DataContext);
  const { menuData } = useContext(MenuDataContext);

  useEffect(() => {
    menuData.filter((item) => {
      if (item?.slug == "main-menu") {
        setMainMenus(item?.items);
      }
    });
  }, []);

  return (
    <nav className="navbar">
      {/* The brand section of the Navbar */}
      <Link to="/" className="text-decoration-none cursor-pointer">
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
      </Link>

      <div className="navbar-right">
        {/* The main dropdown menu items of the Navbar */}
        {mainMenus?.map((menusItem, index) => {
          let parnetMenuID = menusItem?.menu_item_parent;
          return (
            <div className="dropdown" key={index}>
              {parnetMenuID === "0" && (
                <Link to={menusItem?.url}>
                  <button className="dropbtn">{menusItem?.title}</button>
                </Link>
              )}
              {menusItem?.ID == parnetMenuID && (
                <div className="dropdown__content">
                  <Link className="dropdown__items" to={url}>
                    {formatNames(title)}
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </nav>
  );
};

export default Header;
