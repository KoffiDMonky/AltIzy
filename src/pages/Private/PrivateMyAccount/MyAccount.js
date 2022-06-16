import React, { useState, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../context/userContext";


import "./myaccount.css";
import Formenterpriseaccount from "../../../components/Form/FormEnterpriseaccount";
import Formstudentaccount from "../../../components/Form/FormStudentAccount";
import Radiotogglebuttons from "../../../components/buttons/RadioToggleButtons";


function Myaccount() {
  //On instantie useNavigate
  const navigate = useNavigate();

  //On instantie useContext
  const { idCurrentUser, getUserInformation } = useContext(UserContext);

  //id de l'utilisateur courant
  const id = idCurrentUser;

  //Permets de déterminer le statut de l'utilisateur: Etudiant (alternant / stagiare) ou Entreprise
  const [status, setStatus] = useState("");
  const [color, setColor] = useState("btn-outline-info");

  const handleStatusClick = (e) => {
    //Récupère l'identifiant du bouton cliqué
    const idBoutonRadio = e.target.id;

    //On affiche un formulaire différent en fonction que l'on soit étudiant ou entreprise
    switch (idBoutonRadio) {
      case "btn-professionnel":
        setStatus("professionnel");
        setColor("btn-outline-info");
        break;
      case "btn-alternant":
        setStatus("alternant");
        setColor("btn-outline-warning");
        break;
      case "btn-stagiaire":
        setStatus("stagiaire");
        setColor("btn-outline-warning");
        break;

      default:
        setStatus("alternant");
        setColor("btn-outline-warning");
        break;
    }
  };

  const radioButtons = (
    <Radiotogglebuttons
      color={color}
      status={status}
      setStatus={handleStatusClick}
    />
  );

  //On créé un objet "initialUserData" json qui servira pour le POST des données concernant l'entreprise via l'API REST
  const initialUserData = {
    utilisateur: `/api/utilisateurs/${id}`,
    nom: "",
    prenom: "",
    dateDeNaissance: "",
    email: "",
    photo: "",
    telephone: 0,
    niveauEtude: "",
    typeRecherche: "",
    zoneRecherche: "",
    cv: "",
    candidatures: [""],
    tags: [""],
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

    navigate("/private/private-home");
  };

  if (status === "professionnel") {
    return (
      <div className=" container">
        <div className="form-myaccount">
          <h1>Mettre à jour mon profil</h1>
          <form onSubmit={handleForm} className="Account-form">
            <div className="form-group required">
              <label htmlFor="InputStatus" className="control-label">
                Vous êtes:
              </label>
              <div id="InputStatus">{radioButtons}</div>
            </div>
            <Formenterpriseaccount radioButtons={radioButtons} />
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
  } else {
    return (
      <div className=" container">
        <div className="form-myaccount">
          <h1>Mettre à jour mon profil</h1>
          <form onSubmit={handleForm} className="Account-form">
            <div className="form-group required">
              <label htmlFor="InputStatus" className="control-label">
                Vous êtes:
              </label>
              <div id="InputStatus">{radioButtons}</div>
            </div>
            <Formstudentaccount radioButtons={radioButtons} userData={userData} updateUserDataHandler={updateUserDataHandler} />
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
}

export default Myaccount;
