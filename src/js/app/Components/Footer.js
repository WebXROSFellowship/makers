import React from "react";
import { Link } from "react-router-dom";

import "@styles/style.scss";

const Footer = () => {
  
  return (
    <div className="footer">
      <h6 className="h6">
        &copy; Copyright by {" "}
        <Link to="/" className="text-decoration-none">
          Powersimple
        </Link>
      </h6>
      <span> {" "} </span>
      <h6 className="h6">
        <Link to="#" className="text-decoration-none"> Privacy Policy </Link>
      </h6>

      <div className="footer_icons">
    {/* <div className="dropdown dropdown--logos dropdown__socials"> */}
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
          {/* </div> */}

    </div>
    </div>
    
  );
};

export default Footer;
