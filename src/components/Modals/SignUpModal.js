import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./Modals.css";

function SignUpModal() {
  const { modalState, toggleModals, signUp, getIdUser } = useContext(UserContext); //On instantie useContext

  const navigate = useNavigate(); //On instantie useNavigate

  const [validation, setValidation] = useState("");
  const inputs = useRef([]); //useRef permet de récupérer nos inputs
  const addInputs = (el) => {
    // On ajout nos inputs courant (et leurs valeurs) dans notre tableau contenu dans useRef
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    //Permet de faire des validation côté front
    e.preventDefault();

    if (
      (inputs.current[1].value.length || inputs.current[2].value.length) < 6
    ) {
      // Si le mdp ou le mdp de vérification font moins de 6 caractères...
      setValidation("Veuillez saisir 6 caractères minimum !"); // On lance la fonction setValidation pour afficher le message de validation
      return;
    } else if (inputs.current[1].value !== inputs.current[2].value) {
      setValidation("Les mots de passes ne sont pas identique !");
      return;
    }

    try {
      await signUp(
        //On récupère l'email et le mot de passe dans UserContext
        inputs.current[0].value,
        inputs.current[1].value
      )
        .then((userCredential) => {
          // Récupération du login, de l'uid et du token de connexion de l'utilisateur current
          const userLogin = userCredential.user.email;
          const uid = userCredential.user.uid;
          const token = userCredential.user.accessToken;

          //Création d'un objet json qui sera envoyer au backend avec fetch
          const userJson = {
            login: userLogin,
            GoogleToken: token,
            uid: uid,
          };

          // Envoies des informations du nouvel utilisateur au backend via POST
          fetch("http://127.0.0.1:8000/api/utilisateurs", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userJson),
          }).then((response) => {
            response.json().then((object) => {

              //On récupère l'id autogénéré en base de l'utilisateur créé
              getIdUser(object.id) 

            });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      //On vide les inputs du formulaire
      // formRef.current.reset();
      setValidation("");
      toggleModals("close");
      navigate("/private/private-myaccount");
    } catch (err) {
      if (err.code === "auth/invalid-email") {
        //Si l'erreur "auth/invalid-email" est remonté, on indique à l'utilisateur que l'email est invalide
        setValidation("L'email est invalide !");
      }

      if (err.code === "auth/email-already-in-use") {
        //Si l'erreur "auth/email-already-in-use" est remonté, on indique à l'utilisateur que l'email existe déjà dans Firebase
        setValidation("L'email existe déjà !");
      }
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };


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
                  <button onClick={closeModal} className="btn-close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleForm} className="sign-up-form">
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
