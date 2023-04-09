import React, { useState } from "react";
import "./../../../scss/style.scss";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-brand">The Polys WebXR Awards and Summit Series</div>
        <div className="navbar-right">
          <div className="dropdown">
            <button className="dropbtn">WEBXR SUMMIT SERIES</button>
            <div className="dropdown__content">
              <span
                href="https://www.google.com"
                target="_blank"
                className="dropdown__items"
              >
                WEBXR PRODUCTION SUMMIT
              </span>
              <span href="#" className="dropdown__items">
                WEBXR BRAND SUMMIT
              </span>
              <span className="dropdown__items">WEBXR EDUCATION SUMMIT</span>
              <span className="dropdown__items">WEBXR DESIGN SUMMIT</span>
              <span className="dropdown__items">WEBXR BUSINESS SUMMIT</span>
              <span className="dropdown__items">WEBXR DEVELOPER SUMMIT</span>
            </div>
          </div>
          <div className="dropdown">
            <button className="dropbtn">THE POLYS - WEBXR AWARDS</button>
            <div className="dropdown__content">
              <span className="dropdown__items">
                THE 2ND POLYS - WEBXR AWARDS
              </span>
              <span className="dropdown__items">2021 WINNERS</span>
              <span className="dropdown__items">
                THE POLYS - 2020 VIRTUAL RED CARPET
              </span>
              <span className="dropdown__items">
                THE POLYS - 2020 WEBXR AWARDS CEREMONY
              </span>
              <span className="dropdown__items">2020 AWARDS</span>
            </div>
          </div>
          <div className="dropdown dropdown--logos dropdown__socials">
            <a href="https://twitter.com/webxrawards" rel="noreferrer" target="_blank" >
            <span className="dropdown__logo-img">
            <i className="fa-brands fa-twitter fa-xl"></i>
            </span>
            </a>
            <a href="https://www.instagram.com/webxrawards/" rel="noreferrer" target="_blank">
            <span className="dropdown__logo-img">
            <i className="fa-brands fa-instagram fa-xl"></i>
            </span>
            </a>
            <a href="https://www.facebook.com/groups/webxrawards" rel="noreferrer" target="_blank">
            <span className="dropdown__logo-img">
            <i className="fa-brands fa-facebook fa-xl"></i>
            </span>
            </a>
            <a href="https://www.linkedin.com/company/the-polys/" rel="noreferrer" target="_blank">
            <span className="dropdown__logo-img">
            <i className="fa-brands fa-linkedin fa-xl"></i>
            </span>
            </a>
            <a href="https://discord.gg/T5vRuM5cDS" rel="noreferrer" target="_blank">
            <span className="dropdown__logo-img">
            <i className="fa-brands fa-discord fa-xl"></i>
            </span>
            </a>
          </div>

          <div className="hamburger">
            <span className="hamburger__logo" onClick={()=>{
                setShowMenu(!showMenu);
            }}>
            <i className="fa-solid fa-bars fa-xl"></i>
            </span>
          </div>

          {showMenu === true ? (
            <div className="sideMenu">
              <div className="dropdown2">
                <button className="dropbtn">WEBXR SUMMIT SERIES</button>
                <div className="dropdown__content">
                  <span className="dropdown__items">WEBXR PRODUCTION SUMMIT</span>
                  <span className="dropdown__items">WEBXR BRAND SUMMIT</span>
                  <span className="dropdown__items">WEBXR EDUCATION SUMMIT</span>
                  <span className="dropdown__items">WEBXR DESIGN SUMMIT</span>
                  <span className="dropdown__items">WEBXR BUSINESS SUMMIT</span>
                  <span className="dropdown__items">WEBXR DEVELOPER SUMMIT</span>
                </div>
              </div>
              <div className="dropdown2">
                <button className="dropbtn">THE POLYS - WEBXR AWARDS</button>
                <div className="dropdown__content">
                  <span className="dropdown__items">THE 2ND POLYS - WEBXR AWARDS</span>
                  <span className="dropdown__items">THE POLYS - 2020 VIRTUAL RED CARPET</span>
                  <span className="dropdown__items">THE POLYS - 2020 WEBXR AWARDS CEREMONY</span>
                  <span className="dropdown__items">2020 AWARDS</span>
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
