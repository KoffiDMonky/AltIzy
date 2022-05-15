import React, { useState, useCallback, useContext } from "react";
import Radiotogglebuttons from "./../buttons/RadioToggleButtons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/userContext";

function Formenterpriseaccount(props) {
  //Permets de déterminer le statut de l'utilisateur: Etudiant (alternant / stagiare) ou Entreprise
  const status = props.status;

  //On instantie useNavigate
  const navigate = useNavigate();

  //On instantie useContext
  const { idCurrentUser } = useContext(UserContext);

  //id de l'utilisateur courant
  const id = idCurrentUser;

  //Fonction permettant de changer de formulaire en fonction du statut de l'utilisateur: Etudiant ou entreprise
  const handleStatusClick = props.handleStatusClick;

  //On créé un objet "initialUserData" json qui servira pour le POST des données concernant l'entreprise via l'API REST
  const initialUserData = {
    utilisateur: `/api/utilisateurs/${id}`, //TODO: régler problème id undefined...
    siren: "",
    nom: "",
    email: "",
    photo: "",
    interlocuteur: "",
    description: "",
  };

  //Méthodes permettant de mettre à jour les informations de l'utilisateur dans l'objet JSON
  const [userData, setUserData] = useState(initialUserData);
  const updateUserDataHandler = useCallback(
    (type) => (event) => {
      setUserData({ ...userData, [type]: event.target.value });
    },
    [userData]
  );

  //Méthode POST des données vers la BDD
  const handleForm = (e) => {
    e.preventDefault();
    console.log(userData);
    fetch("http://127.0.0.1:8000/api/entreprises", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    navigate("/private/private-home");
  };

  return (
    <div className=" container">
      <div className="form-myaccount">
        <h1>Mettre à jour mon profil</h1>
        <form onSubmit={handleForm} className="Account-form">
          <div className="form-group required">
            <label htmlFor="InputStatus" className="control-label">
              Vous êtes:
            </label>
            <div id="InputStatus">
              <Radiotogglebuttons
                status={status}
                setStatus={handleStatusClick}
              />
            </div>
          </div>
          <div className="form-group required">
            <label htmlFor="InputSiren" className="control-label">
              Numéro de SIREN
            </label>
            <input
              required
              value={userData.siren}
              onChange={updateUserDataHandler("siren")}
              type="number"
              className="form-control"
              id="InputSiren"
              aria-describedby="siren"
              placeholder="Entrez votre numéro de SIREN"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputNomSociete" className="control-label">
              Nom de la société
            </label>
            <input
              required
              value={userData.nom}
              onChange={updateUserDataHandler("nom")}
              type="text"
              className="form-control"
              id="InputNomSociete"
              aria-describedby="Nom Societe"
              placeholder="Entrez le nom de votre société"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputEmailSociete" className="control-label">
              Email
            </label>
            <input
              required
              value={userData.email}
              onChange={updateUserDataHandler("email")}
              type="email"
              className="form-control"
              id="InputEmailSociete"
              aria-describedby="Email"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputLogo">Logo de votre société </label>
            <br></br>
            <input
              value={userData.photo}
              onChange={updateUserDataHandler("photo")}
              type="file"
              className="form-control-file"
              id="InputLogo"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputInterlocuteur" className="control-label">
              Interlocuteur
            </label>
            <input
              required
              value={userData.interlocuteur}
              onChange={updateUserDataHandler("interlocuteur")}
              type="text"
              className="form-control"
              id="InputInterlocuteur"
              aria-describedby="Interlocuteur"
              placeholder="Entrez le nom de l'interlocuteur principal"
            />
          </div>

          <div className="form-group required">
            <label htmlFor="InputDescriptionSociete" className="control-label">
              Description de la société
            </label>
            <textarea
              required
              value={userData.description}
              onChange={updateUserDataHandler("description")}
              className="form-control"
              id="InputDescriptionSociete"
              placeholder="Présentez votre société succinctement"
              rows="3"
            ></textarea>
          </div>
          <div className="button-group">
            <button
              type="submit"
              className="btn text-danger"
              id="form-contact-submit"
            >
              Réinitialiser
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              id="form-contact-submit"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formenterpriseaccount;
