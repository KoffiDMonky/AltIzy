import React from "react";
import { Link } from "react-router-dom";
import instagram from "./../../images/Icônes/altizy-instagram-logo-footer-blanc.png";
import linkedIn from "./../../images/Icônes/altizy-linkedin-logo-footer-blanc.png";
import tiktok from "./../../images/Icônes/altizy-tiktok-logo-footer-blanc.png";
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
      <Link to="/" className="navbar-brand">
        <img src={instagram} alt="instagram" />
      </Link>
      <Link to="/" className="navbar-brand">
        <img src={linkedIn} alt="instagram" />
      </Link>
      <Link to="/" className="navbar-brand">
        <img src={tiktok} alt="instagram" />
      </Link>
      </div>
    </div>
  );
}

export default Footer;
