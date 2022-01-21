import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";

function SignInModal() {
  const { modalState, toggleModals, signIn } = useContext(UserContext); //On instantie useContext

  const navigate = useNavigate(); //On instantie useNavigate

  const [validation, setValidation] = useState("");
  const inputs = useRef([]); //useRef permet de récupérer nos inputs
  const addInputs = (el) => {

    // On ajout nos inputs courant (et leurs valeurs) dans notre tableau contenu dans useRef
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);

    }
  };

  const formRef = useRef();

  const handleForm = async (e) => {
    //Permet de faire des validation côté front
    e.preventDefault();

    try {
      await signIn( //On récupère le l'email et le mot de passe
        inputs.current[0].value,
        inputs.current[1].value
      )

      //On vide les inputs du formulaire
      setValidation("")
      toggleModals("close")
      navigate("/private/private-home")

    } catch (err) {
      
        setValidation("Oups, l'email et/ou le mot de passe n'est pas correct !");

    }
  };

  const closeModal = () => {
    setValidation("")
    toggleModals("close")
  }

  return (
    <>
      {modalState.signInModal && (
        <div className="position-fixed top-0 vw-100 vh-100">
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
                  <h5 className="modal-title">Se connecter</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>
                <div className="modal-body">
                  <form
                    // ref={formRef}
                    onSubmit={handleForm}
                    className="sign-in-form"
                  >
                    <div className="mb-3">
                      <label htmlFor="signInEmail" className="form-label">
                        Adresse mail
                      </label>
                      <input
                        ref={addInputs}
                        type="email"
                        name="email"
                        required
                        className="form-control"
                        id="signInEmail"
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="signInPwd" className="form-label">
                        Mot de passe
                      </label>
                      <input
                        ref={addInputs}
                        type="password"
                        name="pwd"
                        required
                        className="form-control"
                        id="signInPwd"
                      />
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary">Connexion</button>
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

export default SignInModal;
