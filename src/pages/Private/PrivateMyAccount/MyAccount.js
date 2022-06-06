import React, { useState } from "react";
import "./myaccount.css";
import Formenterpriseaccount from "../../../components/Form/FormEnterpriseaccount";
import Formstudentaccount from "../../../components/Form/FormStudentAccount";

function Myaccount() {
  //Permets de déterminer le statut de l'utilisateur: Etudiant (alternant / stagiare) ou Entreprise
  const [status, setStatus] = useState("");

  const handleStatusClick = (e) => {
    //Récupère l'identifiant du bouton cliqué
    const idBoutonRadio = e.target.id;

    //On affiche un formulaire différent en fonction que l'on soit étudiant ou entreprise
    switch (idBoutonRadio) {
      case "btn-professionnel":
        setStatus("professionnel");
        break;
      case "btn-alternant":
        setStatus("alternant");
        break;
      case "btn-stagiaire":
        setStatus("stagiaire");
        break;

      default:
        setStatus("stagiaire");
        break;
    }
  };

  if (status == "professionnel") {
    return (
      <Formenterpriseaccount
        status={status}
        handleStatusClick={handleStatusClick}
      />
    );
  } else {
    return (
      <Formstudentaccount
        status={status}
        handleStatusClick={handleStatusClick}
      />
    );
  }
}

export default Myaccount;
