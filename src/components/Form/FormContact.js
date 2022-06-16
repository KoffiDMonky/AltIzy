import React, { useState } from "react";
import Radiotogglebuttons from "../buttons/RadioToggleButtons";
import "./Form.css";

function Formcontact() {

  //Variable d'état définissant la couleur des boutons radio en fonction du type
  const [color, setColor] = useState("btn-outline-info");
  const [status, setStatus] = useState("alternant");

  const handleStatusClick = (e) => {
    //Récupère l'identifiant du bouton cliqué
    const idBoutonRadio = e.target.id;

    console.log(idBoutonRadio);

    //On affiche un formulaire différent en fonction que l'on soit étudiant ou entreprise
    switch (idBoutonRadio) {
      case "btn-professionnel":
        setStatus("professionnel");
        console.log('coucou');
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


  return (
    <div className="form-contact" id="contact">
      <h1>Nous contacter</h1>
      <form>
        <div className="form-group">
          <label htmlFor="InputStatus">Vous êtes:</label>
          <div id="InputStatus">
            <Radiotogglebuttons color={color} status={status} setStatus={handleStatusClick}/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="InputEmail">Adresse e-mail</label>
          <input
            type="email"
            className="form-control"
            id="InputEmail"
            aria-describedby="email"
            placeholder="Entrez un email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="InputSujet">Sujet</label>
          <input
            type="text"
            className="form-control"
            id="InputSujet"
            aria-describedby="sujet"
            placeholder="Objet du mail"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleFormControlTextarea1">Message</label>
          <textarea
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" id="form-contact-submit">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Formcontact;
