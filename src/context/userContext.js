import { createContext, useState, useEffect } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase-config";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
export const UserContext = createContext();

export function UserContextProvider(props) {
  //Partie utilisateur (création, identitfication de l'utilisateur)
  const [currentUser, setCurrentUser] = useState("");
  const [idCurrentUser, setIdCurrentUser] = useState("");
  const [userToken, setUserToken] = useState("");
  const [isStudent, setIsStudent] = useState(false);
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [loadingData, setLoadindData] = useState(true);
  const [userInformations, setUserInformations] = useState([])

  //Permet de récupérer l'identifiant de l'utilisateur courant dans le context
  const getIdUser = (id) => {
    setIdCurrentUser(id);
  };

  //Permet de récupérer le token de connexion à l'api de l'utilisateur courant dans le context
  const getTokenUser = (token) => {
    setUserToken(token);
  };


  const getUserInformation = (info) => {
    setUserInformations(info);
  };

  //On instantie useNavigate
  const navigate = useNavigate();

  //authentification google
  const provider = new GoogleAuthProvider();

  //Méthode d'enregistrement d'un nouvel utilisateur
  const signUp = (email, pwd) =>
    createUserWithEmailAndPassword(auth, email, pwd);
  //Méthode de connexion d'un utilisateur par mail et mots de passe
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  //Méthode de connexion d'un utilisateur avec son compte google
  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
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



  //Partie méthodes pour gérer les modales
  const [modalState, setModalState] = useState({
    //Variable d'état des modales d'inscription et de connection
    signUpModal: false,
    signInModal: false,
  });

  const toggleModals = (modal) => {
    if (modal === "signIn") {
      //Si modal est strictement égale à "signIn", on passe signInModal à true pour afficher la modale de connection
      setModalState({
        signUpModal: false,
        signInModal: true,
        resetModal: false,
      });
    }

    if (modal === "signUp") {
      //Si modal est strictement égale à "signUp", on passe signUpModal à true pour afficher la modale d'inscription
      setModalState({
        signUpModal: true,
        signInModal: false,
        resetModal: false,
      });
    }

    if (modal === "reset") {
      //Si modal est strictement égale à "reset", on passe resetModal à true pour afficher la modale de réinitialisation du MDP
      setModalState({
        signUpModal: false,
        signInModal: false,
        resetModal: true,
      });
    }

    if (modal === "close") {
      //Si modal est strictement égale à "close", on ferme la modale qui est affichée
      setModalState({
        signUpModal: false,
        signInModal: false,
        resetModal: false,
      });
    }
  };

  useEffect(() => {
    //On vérifie si l'utilisateur courant est bien connecté avant d'afficher la page d'accueil privée
    const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
      setCurrentUser(currentUser);
      setIsStudent(true);
      navigate("/private/private-home");
      setLoadindData(false);
    });

    return unsubsribe;
  }, []);

  return (
    <UserContext.Provider
      value={{
        modalState,
        toggleModals,
        signUp,
        signIn,
        currentUser,
        getIdUser,
        getTokenUser,
        userToken,
        idCurrentUser,
        signInWithGoogle,
        isStudent,
        isEnterprise,
        getUserInformation
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
