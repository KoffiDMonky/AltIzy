import React from "react";
import Radiotogglebuttons from "../buttons/RadioToggleButtons";
import "./Form.css";

function Formcontact() {
  return (
    <div className="form-contact">
      <h1>Nous contacter</h1>
      <form>
        <div className="form-group">
          <label htmlFor="InputStatus">Vous êtes:</label>
          <div id="InputStatus">
            <Radiotogglebuttons />
          </div>
        </div>
        <div class="form-group">
          <label htmlFor="InputEmail">Adresse e-mail</label>
          <input
            type="email"
            class="form-control"
            id="InputEmail"
            aria-describedby="email"
            placeholder="Entrez un email"
          />
        </div>
        <div class="form-group">
          <label htmlFor="InputSujet">Sujet</label>
          <input
            type="text"
            class="form-control"
            id="InputSujet"
            aria-describedby="sujet"
            placeholder="Objet du mail"
          />
        </div>
        <div class="form-group">
          <label for="exampleFormControlTextarea1">Message</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Formcontact;
