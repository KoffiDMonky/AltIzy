import React, { useState, useCallback, useContext } from "react";
import Radiotogglebuttons from "../buttons/RadioToggleButtons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";

import * as api from "../../api-service";

function FormCandidature(props) {
  //On instantie useNavigate
  const navigate = useNavigate();

  //On instantie useContext
  const { idCurrentUser } = useContext(UserContext);

  //id de l'utilisateur courant
  const id = idCurrentUser;

  //On créé un objet "initialUserData" json qui servira pour le POST des données concernant l'entreprise via l'API REST
  const initialUserData = {
    utilisateur: `/api/utilisateurs/${id}`,
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

    api
      .postUser("http://127.0.0.1:8000/api/candidatures", userData)
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
      });

    navigate("/private/private-home");
  };

  return (
    <>
          <div className="form-group required">
            <label htmlFor="InputSiren" className="control-label">
              Intitulé de la candidature
            </label>
            <input
              required
              value={userData.siren}
              onChange={updateUserDataHandler("siren")}
              type="text"
              className="form-control"
              id="InputSiren"
              aria-describedby="siren"
              placeholder="Ex : Recherche alternance "
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputLogo">Photo de la candidature </label>
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
            <label htmlFor="InputNomSociete" className="control-label">
              Type de contrat recherché
            </label>
            <input
              required
              value={userData.nom}
              onChange={updateUserDataHandler("nom")}
              type="text"
              className="form-control"
              id="InputNomSociete"
              aria-describedby="Nom Societe"
              placeholder="Ex : Alternance 1 an"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputEmailSociete" className="control-label">
              Description
            </label>
            <input
              required
              value={userData.email}
              onChange={updateUserDataHandler("email")}
              type="email"
              className="form-control"
              id="InputEmailSociete"
              aria-describedby="Email"
              placeholder="Entrez une description"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputInterlocuteur" className="control-label">
              Domaine de recherche
            </label>
            <input
              required
              value={userData.interlocuteur}
              onChange={updateUserDataHandler("interlocuteur")}
              type="text"
              className="form-control"
              id="InputInterlocuteur"
              aria-describedby="Interlocuteur"
              placeholder="Ex : informatique"
            />
          </div>
    </>
  );
}

export default FormCandidature;
