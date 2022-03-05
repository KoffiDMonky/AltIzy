import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { auth } from "../../firebase-config";

function Googlesigninbutton() {

  const navigate = useNavigate(); //On instantie useNavigate

  //authentification google
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
          
        // On obtient un jeton d'accès Google qui permet l'accès à L'API Google
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // On récupère les informations de l'utilisateur
        const user = result.user;

        //On ferma la fenêtre modal et on redirige vers la page d'accueil privée
        toggleModals("reset");
        navigate("/private/private-home");

      })
      .catch((error) => {
        // Traitement des erreurs
        const errorCode = error.code;
        const errorMessage = error.message;
        // L'email du compte de l'utilisateur utilisé.
        const email = error.email;
        // Le type AuthCredential qui a été utilisé.
        const credential = GoogleAuthProvider.credentialFromError(error);

      });

  const { toggleModals } = useContext(UserContext); //On instantie useContext

  return (
    <div>
      <button className="btn btn-warning w-100 mt-2" onClick={signInWithGoogle}>
        Se connecter avec Google
      </button>
    </div>
  );
}

export default Googlesigninbutton;
