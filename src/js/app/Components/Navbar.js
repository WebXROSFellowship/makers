import React, { useState, useEffect } from "react";
import "./../../../scss/style.scss";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [navbarMenus, setNavbarMenus] = useState();

  // The useEffect hook is used to call the getData function once when the component is mounted.
  useEffect(() => {
    getData();
  }, []);

  // This function fetches data from an API endpoint and sets the navbarMenus state variable to the retrieved data.
  async function getData() {
    let stagingData = await fetch(
      "https://staging.webxr.link/wp-json/wp/v2/menus?menus"
    );
    let jsonData = await stagingData.json();
    setNavbarMenus(jsonData);
    console.log("Getting Data");
    console.log(jsonData);
    let items = jsonData[0].items;
    console.log("Getting Items");
    console.log(items);
    let head = items[0];
    items = items.slice(1);
    let data = [
      {
        name: head,
        items: items,
      },
    ];
    setNavbarMenus(data);
  }

  /**
   * This is a functional React component that returns a Navbar.
   */

  return (
    <>
      <nav className="navbar">
        {/* The brand section of the Navbar */}
        <div className="navbar-brand">
          The Polys WebXR Awards and Summit Series
        </div>
        <div className="navbar-right">
          {/* The main dropdown menu items of the Navbar */}
          {navbarMenus ? (
            navbarMenus.map((currEle, i) => (
              <div className="dropdown" key={i}>
                <button className="dropbtn">{currEle.name.title}</button>
                <div className="dropdown__content">
                  {currEle.items.map((item, i) => (
                    <span className="dropdown__items" key={i}>
                      {item.title}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <></>
          )}

          {/* The social media logo section of the Navbar */}
          <div className="dropdown dropdown--logos dropdown__socials">
            <a
              href="https://twitter.com/webxrawards"
              rel="noreferrer"
              target="_blank"
            >
              <span className="dropdown__logo-img">
                <i className="fa-brands fa-twitter fa-xl"></i>
              </span>
            </a>
            <a
              href="https://www.instagram.com/webxrawards/"
              rel="noreferrer"
              target="_blank"
            >
              <span className="dropdown__logo-img">
                <i className="fa-brands fa-instagram fa-xl"></i>
              </span>
            </a>
            <a
              href="https://www.facebook.com/groups/webxrawards"
              rel="noreferrer"
              target="_blank"
            >
              <span className="dropdown__logo-img">
                <i className="fa-brands fa-facebook fa-xl"></i>
              </span>
            </a>
            <a
              href="https://www.linkedin.com/company/the-polys/"
              rel="noreferrer"
              target="_blank"
            >
              <span className="dropdown__logo-img">
                <i className="fa-brands fa-linkedin fa-xl"></i>
              </span>
            </a>
            <a
              href="https://discord.gg/T5vRuM5cDS"
              rel="noreferrer"
              target="_blank"
            >
              <span className="dropdown__logo-img">
                <i className="fa-brands fa-discord fa-xl"></i>
              </span>
            </a>
          </div>

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
              {navbarMenus ? (
                navbarMenus.map((currEle, i) => (
                  <div className="dropdown2" key={i}>
                    <button className="dropbtn">{currEle.name.title}</button>
                    <div className="dropdown__content">
                      {currEle.items.map((item, i) => (
                        <span className="dropdown__items" key={i}>
                          {item.title}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
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
