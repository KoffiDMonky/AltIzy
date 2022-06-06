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
  const [currentUser, setCurrentUser] = useState();
  const [idCurrentUser, setIdCurrentUser] = useState();
  const [isStudent, setIsStudent] = useState(false);
  const [isEnterprise, setIsEnterprise] = useState(false);
  const [loadingData, setLoadindData] = useState(true);

  
  //Permet de récupérer l'identifiant de l'utilisateur courant dans le context
  const getIdUser = (id) => {
    setIdCurrentUser(id);
  };

  //On instantie useNavigate
  const navigate = useNavigate();

  //authentification google
  const provider = new GoogleAuthProvider();

  //Méthode d'enregistrement d'un nouvel utilisateur
  const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd);
  //Méthode de connexion d'un utilisateur par mail et mots de passe
  const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd);

  //Méthode de connexion d'un utilisateur avec son compte google
  const signInWithGoogle = () =>
    signInWithPopup(auth, provider)
      .then((result) => {
        // On obtient un jeton d'accès Google qui permet l'accès à L'API Google
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // const operationType = result.operationType;

        //TODO: Pour savoir si c'est la 1er connexion, vérifier que l'uid n'existe pas en BDD

        // On récupère les informations de l'utilisateur
        const user = result.user;
        const uid = user.uid;
        const login = user.email;

        fetch(`http://127.0.0.1:8000/api/utilisateurs.json?uid=${uid}`) //On récupère l'utilisateur courant afin de récupérer son id en BDD
          .then((res) => res.json())
          .then((resultat) => {
            console.log("lenght", resultat);

            if (resultat.length === 1) {
              const idUser = resultat[0].id; //On récupère l'identifiant de l'utilisateur
              const student = resultat[0].etudiant; //On récupère la valeur d'étudiant dans l'objet pour savoir si l'utilisateur est étudiant (ou non si l valeur est nul)
              setIdCurrentUser(idUser); //On le stock dans la variable d'état idCurrentUser


              //Ensuite, on défini dans le contexte si l'utilisateur est un étudiant ou une entreprise
              if (student) {

                setIsStudent(true);

              } else {

                setIsStudent(false);

              }

              //On ferme la fenêtre modal et on redirige vers la page d'accueil privée
              toggleModals("reset");
              navigate("/private/private-home");
            } else if (resultat.length < 1) {
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
              })
                .then((res) => res.json())
                .then((result) => {
                  setIdCurrentUser(result.id); //On stock l'identifiant de l'utilisateur courant dans la variable d'état idCurrentUser
                });

              //On ferma la fenêtre modal et on redirige vers la page d'accueil privée
              toggleModals("reset");
              navigate("/private/private-myaccount");
            }
          });
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

  return (
    <UserContext.Provider
      value={{
        modalState,
        toggleModals,
        signUp,
        signIn,
        currentUser,
        getIdUser,
        idCurrentUser,
        signInWithGoogle,
        isStudent,
        isEnterprise
      }}
    >
      {!loadingData && props.children}
    </UserContext.Provider>
  );
}
