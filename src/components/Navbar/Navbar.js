import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import logo from "./../../images/Logo_Altizy.png";
import Button from "../buttons/Button";
import "./navbar.css";

function Navbar() {
  const { toggleModals, currentUser, isStudent } = useContext(UserContext);

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch {
      alert(
        "Pour des raisons qui nous sont obscure, vous ne pouvez pas vous déconnecter... Veuillez vérifier votre connexion internet et réessayez !"
      );
    }
  };

  return (
    <nav className="navbar navbarlight bg-light px-4">
      <div className="menu">
        <Link to="/private/private-home" className="navbar-brand">
          <img style={{ height: "86px" }} src={logo} alt="logo" />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="menu1">
          {!currentUser && <Button label="Présentation " url="/" />}

          {!currentUser && <Button label="Équipe" url="/" />}

          {!currentUser && <Button label="Avis" url="/" />}

          {!currentUser && <Button label="Contact" url="/" />}
        </div>
      </div>

      <div className="menu2">
        {!currentUser && (
          <button onClick={() => toggleModals("signUp")} className="btn ">
            S'inscrire
          </button>
        )}
        {!currentUser && (
          <button onClick={() => toggleModals("signIn")} className="btn ms-2">
            Se connecter
          </button>
        )}
        {currentUser && (
          <>
            {isStudent ? (
              <Button
                label="Ma candidature"
                url="/private/private-myapplication"
              />
            ) : (
              <Button label="Mes annonces" url="/private/private-myaccount" />
            )}
            <Button label="Mon compte" url="/private/private-myaccount" />
            <button onClick={logOut} className="btn ms-2 text-danger">
              Se déconnecter
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
