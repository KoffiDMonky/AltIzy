import React from "react";
import { Link } from "react-router-dom";
import instagram from "./../../images/Icônes/altizy-instagram-logo-footer-blanc.png";
import linkedIn from "./../../images/Icônes/altizy-linkedin-logo-footer-blanc.png";
// import tiktok from "./../../images/Icônes/altizy-tiktok-logo-footer-blanc.png";
import "./Footer.css";

function Footer() {
  return (
    <div className="footer">
      <div className="menu-footer">
        <div className="white-divider"></div>
        <Link to="/mentions-legales" className="navbar-brand">
          <div className="btn text-style-1">Mentions légales</div>
        </Link>
        <div className="white-divider"></div>

        <Link to="/cookies" className="navbar-brand">
          <div className="btn text-style-1">Cookies</div>
        </Link>
        <div className="white-divider"></div>
        <Link to="/politique-de-confidentialite" className="navbar-brand">
          <div className="btn text-style-1">Politique de confidentialité</div>
        </Link>
        <div className="white-divider"></div>
      </div>
      <div className="copyright text-style-1">
        Copyright © 2021 Alt'izy <br></br>All rights reserved altizy.fr
      </div>
      <div className="social-media text-style-1">
        <a
          href="https://www.instagram.com/alt_izy/"
          target="_blank"
          rel="noopener"
          className="navbar-brand"
        >
          <img src={instagram} alt="instagram" />
        </a>
        <a
          href="https://www.linkedin.com/company/alt-izy"
          target="_blank"
          rel="noopener"
          className="navbar-brand"
        >
          <img src={linkedIn} alt="linkedIn" />
        </a>
      </div>
    </div>
  );
}

export default Footer;
