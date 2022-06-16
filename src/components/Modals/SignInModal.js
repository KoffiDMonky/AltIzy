import React, { useContext, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import "./Modals.css";
import Googlesigninbutton from "../buttons/GoogleSignInButton";

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

function SignInModal() {
  const { modalState, toggleModals, signIn } =
    useContext(UserContext); //On instantie useContext
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
      await signIn(
        //On récupère le l'email et le mot de passe
        inputs.current[0].value,
        inputs.current[1].value
      )
        .then((userCredential) => {
          // Récupération du login, de l'uid et du token de connexion de l'utilisateur current
          const userLogin = userCredential.user.email;
          const uid = userCredential.user.uid;
          const token = userCredential.user.accessToken;


          // fetch(`http://127.0.0.1:8000/api/users.json?uid=${uid}`, {
          //   method: "GET",
          //   headers: {
          //     "Content-Type": "application/ld+json",
          //     // Authorization:
          //     //   "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDg5ODUsImV4cCI6MTY1NDgxMjU4NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.Vid_u5C0LivpMULXbE-cJ-fqZIEnlK0Axzx-TrcwRP0P0emwtnHUAGga1X9pO6hlcohROPSmpGtQ74DHa1e1HRDPsz0732iYzlnpmqGKINbDpGfNvDfMsPNMtu2Rx6JKexqSMKu4sFW-PYMdx6CZEf_KV48vRiM8ehR3D1ZpEUMwUm2gmm1uhVp-wq6EiPBCDu0huIwyQ1Zv0GEvA8PlbTxU_5OyNEA3bRg9r9sIEBNOq9KOx27CPzaGf1MUNmBM5tOIT2QeTZezXG0CW6p_hYZiqFdsWRG5KwMt4XsaeMQkhoPH6wI8Fyk0fBgRZxX_iCQ2r5SrRw92A9iIFw6_9zDNampl-ZXj6bH_PJwlkem0m5IcBeGzxHB-Vzoz5C1afZNLVCwtEuhUQ6rIQdVbVNazPrp4BF286WoOksogBDBKx-BAMRYRDaT5Iud-dZE5b0NADJfqQwdJcK9kYsW4MJwHvw6KDcZPAxntf4HIskYuBhypXGMZfyWD3kPS7Fdz71ZpweF9mBdUUdLDC7_YkKfpxQFqDAS83G0xI6w9rIQvp635lH4jjPd9uPvacYNBhsNTGCbYD8ko_4mFo1eDUbCCfx6Vfl2GGjFZj8LO9awFEo0YArpvd7As8G1FyCNP9EVfBwNWVi4xckHNkqrt8xqULcCzFC7KLelF3euDcVQ",
          //   },
          // })
          //   .then((res) => res.json())
          //   .then((result) => {

          //     getIdUser(result[0].id)

          //   });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });

      //On vide les inputs du formulaire,ferme la modal et on redirige vers la page d'accueil privée
      setValidation("");
      toggleModals("close");
      navigate("/private/private-home");
    } catch (err) {
      setValidation("Oups, l'email et/ou le mot de passe n'est pas correct !");
    }
  };

  const closeModal = () => {
    setValidation("");
    toggleModals("close");
  };

  return (
    <>
      {modalState.signInModal && (
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
                  <h5 className="modal-title">Se connecter</h5>
                  <button onClick={closeModal} className="btn-close"></button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleForm} className="sign-in-form">
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
                      <button
                        className="btn"
                        onClick={() => toggleModals("reset")}
                      >
                        Mot de passe oublié ?
                      </button>
                      <p className="text-danger mt-1">{validation}</p>
                    </div>
                    <button className="btn btn-primary w-100">Connexion</button>
                  </form>
                  <Googlesigninbutton />
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
