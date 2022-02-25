import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase-config";
import logo from "./Logo_Altizy.png"


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
      <Link to="/private/private-home" className="navbar-brand">
        <img style={{height: "54px"}} src ={logo} alt="logo" />
      </Link>

      <div>
        {!currentUser && (
          <button
            onClick={() => toggleModals("signUp")}
            className="btn btn-warning"
          >
            S'inscrire
          </button>
        )}
        {!currentUser && (
          <button
            onClick={() => toggleModals("signIn")}
            className="btn btn-warning ms-2"
          >
            Se connecter
          </button>
        )}
        {currentUser && (
          <button onClick={logOut} className="btn btn-danger ms-2">
            {" "}
            Se déconnecter
          </button>
        )}{" "}
      </div>
    </nav>
  );
}

export default Navbar;
