import React, { useRef, useState, useContext } from "react";
import "./myaccount.css";
import Radiotogglebuttons from "./../../../components/buttons/RadioToggleButtons";
import Formenterpriseaccount from "../../../components/Form/FormEnterpriseaccount";
import Formstudentaccount from "../../../components/Form/FormStudentAccount";
import { UserContext } from "./../../../context/userContext";

function Myaccount() {
  //Permets de déterminer le statut de l'utilisateur: Etudiant (alternant / stagiare) ou Entreprise
  const [status, setStatus] = useState("");

  const { idCurrentUser } = useContext(UserContext); //On instantie useContext

  console.log(idCurrentUser);

  //useRef permet de récupérer les valeurs de nos inputs
  // const inputs = useRef([]);

  // const addInputs = (el) => {
  //   // On ajout nos inputs courant (leurs valeurs) dans notre tableau contenu dans useRef
  //   if (el && !inputs.current.includes(el)) {
  //     inputs.current.push(el);
  //   }
  // };

  const handleStatusClick = (e) => {
    //Récupère l'identifiant du bouton cliqué
    const idBoutonRadio = e.target.id;
    //Permet de reset les inputs si l'on change de jsonStudentAccount
    // reset();

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
