import React, { useContext, useRef, useState, useEffect } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./Modals.css";

function SignUpModal() {
  const { modalState, toggleModals, signUp, getIdUser, getTokenUser } = useContext(UserContext); //On instantie useContext
  const navigate = useNavigate(); //On instantie useNavigate
  const [validation, setValidation] = useState(""); //Variable d'état permettant de déclencher un message d'erreur si le mail n'est pas valide ou déjà existant
  const [pwdOne, setPwdOne] = useState(""); //Variable d'état contenant le premier mot de passe saisie
  const [pwdTwo, setPwdTwo] = useState(""); //Variable d'état contenant le second mot de passe saisie
  const [strongPasswordMessage, setStrongPasswordMessage] = useState(""); //Variable d'état permettant de définir le message d'erreur en rapport avec la force du mot du passe saisie : plus de 6 caratères
  const [samePasswordMessage, setSamePasswordMessage] = useState(""); //Variable d'état permettant de définir si les deux mots de passes saisie sont identique ou non

  const inputs = useRef([]); //useRef permet de récupérer nos inputs
  const addInputs = (el) => {
    // On ajout nos inputs courant (et leurs valeurs) dans notre tableau contenu dans useRef
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const strongPassword = (value) => {
    if (value === 0) {
      setStrongPasswordMessage("");
    } else if (value < 6) {
      // Si le mdp ou le mdp de vérification font moins de 6 caractères...
      setStrongPasswordMessage("Veuillez saisir 6 caractères minimum !"); // On lance la fonction setStrongPasswordMessage pour afficher le message de validation
    } else if (value > 5) {
      setStrongPasswordMessage("");
    }
  };

  const samePassword = (value) => {
    if (value == pwdOne && pwdOne) {
      setSamePasswordMessage("");
    } else if (!value) {
      setSamePasswordMessage("");
    } else {
      //Si les deux mots de passe ne sont pas identiques...
      setSamePasswordMessage("saisir le même mdp"); // On lance la fonction setSamePasswordMessage pour afficher le message de validation
    }
  };

  const handleForm = async (e) => {
    //Permet de faire des validation côté front
    e.preventDefault();

    try {
      await signUp( //On récupère l'email et le mot de passe dans UserContext
        inputs.current[0].value,
        inputs.current[1].value
      ).then((userCredential) => {
        // Récupération du login, de l'uid et du token de connexion de l'utilisateur current
        const userLogin = userCredential.user.email;
        const uid = userCredential.user.uid;
        const token = userCredential.user.accessToken;

        console.log(userCredential.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });

      //On vide les inputs du formulaire
      // formRef.current.reset(); 
      setValidation("")
      toggleModals("close")
      navigate("/private/private-home")
    } catch (err) {
      
      if(err.code === "auth/invalid-email"){ //Si l'erreur "auth/invalid-email" est remonté, on indique à l'utilisateur que l'email est invalide
        setValidation("L'email est invalide !")
      }
      if(err.code === "auth/email-already-in-use"){//Si l'erreur "auth/email-already-in-use" est remonté, on indique à l'utilisateur que l'email existe déjà dans Firebase
        setValidation("L'email existe déjà !")
      }
    }
  };
  const closeModal = () => {
    setValidation("")
    toggleModals("close")
  }
  return (
    <>
      {modalState.signUpModal && (
        <div className="position-fixed top-0 vw-100 vh-100 modal-open">
          <div
            onClick={closeModal}
            className="w-100 h-100 bg-dark bg-opacity-75"
          ></div>
          <div
            className="position-absolute top-50 start-50 translate-middle"
            style={{ minWidth: "400px" }}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">S'inscrire</h5>
                  <button
                    onClick={closeModal}
                    className="btn-close"
                  ></button>
                </div>
                <div className="modal-body">
                  <form 
                  // ref={formRef} 
                  onSubmit={handleForm} 
                  className="sign-up-form">
                    <div className="mb-3">
                      <label htmlFor="signUpEmail" className="form-label">
                        Adresse mail
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        id="signUpEmail"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="signUpPwd" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        required
                        className="form-control"
                        id="signUpPwd"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="repeatPwd" className="form-label">
                        Ressaisir le mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        required
                        className="form-control"
                        id="repeatPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary">S'inscrire</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default SignUpModal;