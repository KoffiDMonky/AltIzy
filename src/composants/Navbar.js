import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth"
import { useNavigate } from 'react-router-dom'
import { auth } from "../firebase-config"

function Navbar() {
  const { toggleModals } = useContext(UserContext);

  const navigate = useNavigate()

  const logOut = async () => {
    try{ 
      await signOut(auth)
      navigate("/")
    } catch {
      alert("Pour des raisons qui nous sont obscure, vous ne pouvez pas vous déconnecter... Veuillez vérifier votre connexion internet et réessayez !")

    }
  }

  return (
    <nav className="navbar navbarlight bg-light px-4">
      <Link to="/" className="navbar-brand">
        <h1>Alt'izy</h1>
      </Link>

      <div>
        <button
          onClick={() => toggleModals("signUp")}
          className="btn btn-warning"
        >
          S'inscrire
        </button>
        <button
          onClick={() => toggleModals("signIn")}
          className="btn btn-warning ms-2"
        >
          Se connecter
        </button>
        <button onClick={logOut} className="btn btn-danger ms-2"> Se déconnecter</button>
      </div>
    </nav>
  );
}

export default Navbar;
