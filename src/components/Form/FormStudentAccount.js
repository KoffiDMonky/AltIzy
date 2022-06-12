import React, { useState, useCallback, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../context/userContext";

import * as api from "./../../api-service";

function Formstudentaccount(props) {
  // //Permets de déterminer le statut de l'utilisateur: Etudiant (alternant / stagiare) ou Entreprise
  // const status = props.status;

  // //On instantie useNavigate
  // const navigate = useNavigate();

  // //On instantie useContext
  // const { idCurrentUser } = useContext(UserContext);

  // //id de l'utilisateur courant
  // const id = idCurrentUser;

  // //Composant bouton radio
  // const radioButtons = props.radioButtons;

  // //On créé un objet "initialUserData" json qui servira pour le POST des données concernant l'entreprise via l'API REST
  // const initialUserData = {
  //   utilisateur: `/api/utilisateurs/${id}`,
  //   nom: "",
  //   prenom: "",
  //   dateDeNaissance: "",
  //   email: "",
  //   photo: "",
  //   telephone: 0,
  //   niveauEtude: "",
  //   typeRecherche: "",
  //   zoneRecherche: "",
  //   cv: "",
  //   candidatures: [""],
  //   tags: [""],
  //   description: "",
  // };

  const [tags, setTags] = useState([]);

  // const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDUwNDIsImV4cCI6MTY1NDgwODY0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.raieb7RlJ2OeRxwBOHZXnPNxBAHH_diDfQDRRFaYhkx2SoMCqYkaoLYF8zyLj3tOcSzWEAUpCYRCZum2j7D4DXd--pZ0h6_kZiyiVc2CpI0cdCLTIwjY70EkEN4sm6H_Xv0pu8P-KfY7PddThu7Xng9jJKL7ipbPDaO9S2o_EPeram_nq5Nexxn8GY20uRGAtSiEOSig7Xq_r04FX8r9diu1ij2vrJsCAWDmd6TmkOJUFixdqM6AwwqF74KBN30JPr8tcFzsAs9x844tZ6gm29TkiDO3R96vJFRbiEQLspssjakmhL_QNJPtl95xNk_iRjgpz-VvzAU4McBC0rkM-BM5hJKChkhb5Ruyomj2wFoZrwgpfiRKIVg1e3CSGXAD3N4V4haC5jZmAOqdkz0FOIPEwGzui7hPH14UAi4Ch1kOSLjLnbu5qXF9lNECwDmCOkx0QgaS9Kn6gCHDErYu8uoftInFpQHL2h8JoHD-v8ef70A__lbppPEN6sCQSbX1_4y3rqRf8HdBl0Oo4LuRXGFNtCuY3OOvF5my7TTuqmBMAOCsjFt-j2HMRhn2NnabqAzR2myEOgD7DwNIvi5OsCuO428BuWdwKPsZhyu1ZpNq1rIsMoBiZnRdbg7PJeD3d-gZ6aI3AS_afUCOZ7rdXet8UUYX6ZhZVw8eJenC9yU'

  //Méthodes permettant de mettre à jour les informations de l'utilisateur dans l'objet JSON
  // const [userData, setUserData] = useState(initialUserData);
  // const updateUserDataHandler = useCallback(
  //   (type) => (event) => {
  //     setUserData({ ...userData, [type]: event.target.value });
  //   },
  //   [userData]
  // );

  const userData = props.userData;
  const updateUserDataHandler = props.updateUserDataHandler;

  const getTags = async () => {
    await fetch("http://127.0.0.1:8000/api/tags.json", {
      method: "GET",
      headers: {
        "Content-Type": "application/ld+json",
        // "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDUwNDIsImV4cCI6MTY1NDgwODY0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.raieb7RlJ2OeRxwBOHZXnPNxBAHH_diDfQDRRFaYhkx2SoMCqYkaoLYF8zyLj3tOcSzWEAUpCYRCZum2j7D4DXd--pZ0h6_kZiyiVc2CpI0cdCLTIwjY70EkEN4sm6H_Xv0pu8P-KfY7PddThu7Xng9jJKL7ipbPDaO9S2o_EPeram_nq5Nexxn8GY20uRGAtSiEOSig7Xq_r04FX8r9diu1ij2vrJsCAWDmd6TmkOJUFixdqM6AwwqF74KBN30JPr8tcFzsAs9x844tZ6gm29TkiDO3R96vJFRbiEQLspssjakmhL_QNJPtl95xNk_iRjgpz-VvzAU4McBC0rkM-BM5hJKChkhb5Ruyomj2wFoZrwgpfiRKIVg1e3CSGXAD3N4V4haC5jZmAOqdkz0FOIPEwGzui7hPH14UAi4Ch1kOSLjLnbu5qXF9lNECwDmCOkx0QgaS9Kn6gCHDErYu8uoftInFpQHL2h8JoHD-v8ef70A__lbppPEN6sCQSbX1_4y3rqRf8HdBl0Oo4LuRXGFNtCuY3OOvF5my7TTuqmBMAOCsjFt-j2HMRhn2NnabqAzR2myEOgD7DwNIvi5OsCuO428BuWdwKPsZhyu1ZpNq1rIsMoBiZnRdbg7PJeD3d-gZ6aI3AS_afUCOZ7rdXet8UUYX6ZhZVw8eJenC9yU"
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setTags(result);
      });
  };

  const tagsList = tags.map((tag, index) => (
    <option defaultValue={index} key={index}>
      {tag.label}
    </option>
  ));

  // //Méthode POST des données vers la BDD
  // const handleForm = (e) => {
  //   e.preventDefault();
  //   api
  //     .postUser("http://127.0.0.1:8000/api/etudiants", userData)
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log(result);
  //     });

  //   navigate("/private/private-home");
  // };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <>
      {/* <div className="form-myaccount">
        <h1>Mettre à jour mon profil</h1>
        <form onSubmit={handleForm} className="Account-form">
          <div className="form-group required">
            <label htmlFor="InputStatus" className="control-label">
              Vous êtes:
            </label>
            <div id="InputStatus">{radioButtons}</div>
          </div> */}
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
              // value={userData.tags}
              onChange={updateUserDataHandler("tags")}
              className="form-select"
              aria-label="multiple select example"
              id="InputDomaine"
            >
              <option defaultValue>Ouvrir pour voir les domaines</option>
              {tagsList}
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
          {/* <div className="button-group">
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
          </div> */}
        {/* </form> */}
      {/* // </div> */}
    </>
  );
}

export default Formstudentaccount;
