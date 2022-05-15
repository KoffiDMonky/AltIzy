import React, { useState, useCallback, useContext } from "react";
import Radiotogglebuttons from "./../buttons/RadioToggleButtons";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/userContext";

function Formstudentaccount(props) {
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
    console.log(userData);
    fetch("http://127.0.0.1:8000/api/etudiants", {
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
            <label htmlFor="InputPrenom" className="control-label">
              Prénom
            </label>
            <input
              required
              value={userData.prenom}
              onChange={updateUserDataHandler("prenom")}
              type="text"
              className="form-control"
              id="InputPrenom"
              aria-describedby="prenom"
              placeholder="Entrez votre prénom"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputNom" className="control-label">
              Nom
            </label>
            <input
              required
              value={userData.nom}
              onChange={updateUserDataHandler("nom")}
              type="text"
              className="form-control"
              id="InputNom"
              aria-describedby="Nom"
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputDateNais" className="control-label">
              Date de naissance
            </label>
            <input
              required
              value={userData.dateDeNaissance}
              onChange={updateUserDataHandler("dateDeNaissance")}
              type="date"
              className="form-control"
              id="InputDateNais"
              aria-describedby="Date de naissance"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputEmail" className="control-label">
              Email
            </label>
            <input
              value={userData.email}
              onChange={updateUserDataHandler("email")}
              type="email"
              required
              className="form-control"
              id="InputEmail"
              aria-describedby="Email"
              placeholder="Entrez votre email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputTel">Téléphone</label>
            <input
              value={userData.telephone}
              onChange={updateUserDataHandler("telephone")}
              type="tel"
              className="form-control"
              id="InputTel"
              aria-describedby="Téléphone"
              placeholder="Entrez votre numéro de téléphone"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputPhotoProfils">Photo de profil </label>
            <br></br>
            <input
              required
              value={userData.photo}
              onChange={updateUserDataHandler("photo")}
              type="file"
              className="form-control-file"
              id="InputPhotoProfils"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputDomaine" className="control-label">
              Domaine recherché
            </label>
            <select
              required
              value={userData.tags}
              onChange={updateUserDataHandler("tags")}
              className="form-select"
              aria-label="multiple select example"
              id="InputDomaine"
            >
              <option defaultValue>Open this select menu</option>
              <option defaultValue="1">One</option>
              <option defaultValue="2">Two</option>
              <option defaultValue="3">Three</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="InputSecteurGeo">Secteur géographique</label>
            <input
              value={userData.zoneRecherche}
              onChange={updateUserDataHandler("zoneRecherche")}
              type="text"
              className="form-control"
              id="InputSecteurGeo"
              aria-describedby="Secteur Geographique"
              placeholder="Région, département ..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputEtude">Niveau d'étude</label>
            <input
              value={userData.niveauEtude}
              onChange={updateUserDataHandler("niveauEtude")}
              type="text"
              className="form-control"
              id="InputEtude"
              aria-describedby="Niveau d'étude"
              placeholder="Niveau d'étude"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputContrat">Type de contrat</label>
            <input
              value={userData.typeRecherche}
              onChange={updateUserDataHandler("typeRecherche")}
              type="text"
              className="form-control"
              id="InputContrat"
              aria-describedby="Type de contrat"
              placeholder="Type de contrat"
            />
          </div>
          <div className="form-group required">
            <label htmlFor="InputDescription" className="control-label">
              Description
            </label>
            <textarea
              required
              value={userData.description}
              onChange={updateUserDataHandler("description")}
              className="form-control"
              id="InputDescription"
              placeholder="Présentez-vous succinctement "
              rows="3"
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="InputCV">Ajouter CV </label>
            <br></br>
            <input
              value={userData.cv}
              onChange={updateUserDataHandler("cv")}
              type="file"
              className="form-control-file"
              id="InputCV"
            />
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

export default Formstudentaccount;
