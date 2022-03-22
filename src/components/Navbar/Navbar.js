import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import logo from "./../../images/Logo_Altizy.png";
import Button from "../buttons/Button";

function Navbar() {
  const { toggleModals } = useContext(UserContext);

  const { currentUser } = useContext(UserContext);

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
      <div>
      <Link to="/private/private-home" className="navbar-brand">
        <img style={{ height: "86px" }} src={logo} alt="logo" />
      </Link>

        {!currentUser && <Button label="Présentation " url="/"/>}
      
        {!currentUser && <Button label="Équipe" url="/"/>}

        {!currentUser && <Button label="Avis" url="/"/>}

        {!currentUser && <Button label="Contact" url="/"/>}

      </div>

      <div>

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
            <Button label="Mon compte" url="/private/private-myaccount"/>
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
