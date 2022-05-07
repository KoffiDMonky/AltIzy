import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { auth } from "../../firebase-config";

function Googlesigninbutton() {

   //On instantie useNavigate
  const navigate = useNavigate();
   //On instantie useContext
  const { toggleModals } = useContext(UserContext);


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
        const uid = user.uid;
        const login = user.email;

        //Création d'un objet json qui sera envoyer au backend avec fetch
        const userJson = {
          login: login,
          GoogleToken: token,
          uid: uid,
        };

        // Envoies des informations du nouvel utilisateur au backend via POST
        fetch("http://127.0.0.1:8000/api/utilisateurs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userJson),
        });

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


  return (
    <div>
      <button className="btn btn-warning w-100 mt-2" onClick={signInWithGoogle}>
        Se connecter avec Google
      </button>
    </div>
  );
}

export default Googlesigninbutton;
