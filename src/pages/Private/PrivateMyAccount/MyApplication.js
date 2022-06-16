import React from "react";
import { useNavigate } from "react-router-dom";
import FormCandidature from "../../../components/Form/FormCandidature";

function MyApplication() {

      //On instantie useNavigate
  const navigate = useNavigate();


      //Méthode POST des données vers la BDD
  const handleForm = (e) => {
    e.preventDefault();

    navigate("/private/private-home");
  };

  return (
    <div className=" container">
      <div className="form-myaccount">
        <h1>Ma candidature</h1>
        <form onSubmit={handleForm} className="Account-form">
          <FormCandidature />
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

export default MyApplication;
