import React from "react";
import "./myaccount.css";
import Radiotogglebuttons from "./../../../components/buttons/RadioToggleButtons";

function Myaccount() {
  return (
    <div className=" container">
      <div className="form-myaccount">
        <h1>Mettre à jour mon profil</h1>
        <form>
          <div className="form-group">
            <label htmlFor="InputStatus">Vous êtes:</label>
            <div id="InputStatus">
              <Radiotogglebuttons />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="InputPrenom">Prénom</label>
            <input
              type="text"
              className="form-control"
              id="InputPrenom"
              aria-describedby="prenom"
              placeholder="Entrez votre prénom"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputNom">Nom</label>
            <input
              type="text"
              className="form-control"
              id="InputNom"
              aria-describedby="Nom"
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputDateNais">Date de naissance</label>
            <input
              type="date"
              className="form-control"
              id="InputDateNais"
              aria-describedby="Date de naissance"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputEmail">Email</label>
            <input
              type="email"
              className="form-control"
              id="InputEmail"
              aria-describedby="Email"
              placeholder="Entrez votre email"
            />
          </div>
          <div class="form-group">
            <label htmlFor="InputImage">Photo de profil </label>
            <br></br>
            <input type="file" class="form-control-file" id="InputImage" />
          </div>
          <div className="form-group">
            <label htmlFor="InputDomaine">Domaine recherché</label>
            <input
              type="text"
              className="form-control"
              id="InputDomaine"
              aria-describedby="Domaine"
              placeholder="Agriculture, Informatique ..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputSecteurGeo">Secteur géographique</label>
            <input
              type="text"
              className="form-control"
              id="InputSecteurGeo"
              aria-describedby="Secteur Geographique"
              placeholder="Agriculture, Informatique ..."
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputDuree">Durée</label>
            <input
              type="text"
              className="form-control"
              id="InputDuree"
              aria-describedby="Duree"
              placeholder="Jour, Mois, Année"
            />
          </div>
          <div className="form-group">
            <label htmlFor="InputDescription">Description</label>
            <textarea
              className="form-control"
              id="InputDescription"
              placeholder="Présentez-vous succinctement "
              rows="3"
            ></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="InputImage">Ajouter CV </label>
            <br></br>
            <input type="file" class="form-control-file" id="InputImage" />
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
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Myaccount;
