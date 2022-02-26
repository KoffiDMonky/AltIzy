import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="menu-footer">
        <div className="white-divider"></div>
        <Link to="/" className="navbar-brand">
          <div className="btn text-style-1">Mentions légales</div>
        </Link>
        <div className="white-divider"></div>

        <Link to="/" className="navbar-brand">
          <div className="btn text-style-1">Cookies</div>
        </Link>
        <div className="white-divider"></div>
        <Link to="/" className="navbar-brand">
          <div className="btn text-style-1">Politique de confidentialité</div>
        </Link>
        <div className="white-divider"></div>
      </div>
      <div className="copyright text-style-1">
        Copyright © 2021 Alt'izy <br></br>All rights reserved altizy.fr
      </div>
      <div className="social-media text-style-1">
        Copyright © 2021 Alt'izy <br></br>All rights reserved altizy.fr
      </div>
    </div>
  );
}

export default Footer;
