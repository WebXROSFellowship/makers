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
    </div>
  );
};

export default Footer;
