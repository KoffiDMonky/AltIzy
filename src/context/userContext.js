import { createContext, useState, useEffect } from "react";
import {signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"
import {auth} from "../firebase-config"
export const UserContext = createContext();

export function UserContextProvider(props){

    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd)
    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)
    
    //Partie utilisateur (création, identitfication de l'utilisateur)
    const [currentUser, setCurrentUser] = useState();
    const [loadingData, setLoadindData] = useState(true);

    useEffect(() => {
         //On vérifie si l'utilisateur courant est bien connecté avant d'afficher la page d'accueil privée
        const unsubsribe = onAuthStateChanged(auth, (currentUser) => {
            setCurrentUser(currentUser)
            setLoadindData(false)
        })

        return unsubsribe;

    }, [])


    //Partie méthodes pour gérer les modales
    const [modalState, setModalState] = useState({ //Variable d'état des modales d'inscription et de connection
        signUpModal: false,
        signInModal: false
    })

    const toggleModals = modal => {
        if(modal === "signIn"){ //Si modal est strictement égale à "signIn", on passe signInModal à true pour afficher la modale de connection
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }

        if(modal === "signUp"){ //Si modal est strictement égale à "signUp", on passe signUpModal à true pour afficher la modale d'inscription
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }

        if(modal === "close"){ //Si modal est strictement égale à "close", on ferme la modale qui est affichée
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
    }
    

    return(
        <UserContext.Provider value={{modalState, toggleModals, signUp, signIn, currentUser}}>
            {!loadingData && props.children}
        </UserContext.Provider>
    );
}