import React, { useState, useContext } from "react";
import "./PrivateHome.css";
import { UserContext } from "./../../../context/userContext";
import Chatlist from "./../../../components/chat/ChatList";
import Matchmodule from "./../../../components/Matching/MatchModule";

function PrivateHome() {
  //On instantie useContext
  const { currentUser } = useContext(UserContext);

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUsers] = useState([]);
  const [student, setStudents] = useState("student");
  const [enterprise, setEnterprises] = useState();
  // const [annonces, setAnnonces] = useState([]);
  const [candidatures, setCandidatures] = useState([]);

  const annonces = [
    {
      "@type": "Annonce",
      id: 1,
      intitule: "Poste Consultant Ivalua stagiaire",
      auteur: "Olivier Jullian",
      typeContrat: "CDD Alternance",
      description: "Nous recherchons un consultant stagiaire.",
      nomEntreprise: "OJC Conseil",
      photo: "./../../images/logoOJC.jpg",
      adresseEntreprise: "Vannes",
      tag: "informatique",
    },
    {
      "@type": "Annonce",
      id: 2,
      intitule: "Poste dev C# alternance ",
      auteur: "Olivier Jullian",
      typeContrat: "CDD Alternance",
      description: "Nous recherchons un dev stagiaire maîtrisant C#",
      nomEntreprise: "OJC Conseil",
      photo: "./../../images/logoOJC.jpg",
      adresseEntreprise: "Vannes",
      tag: "informatique",
    },
    {
      "@type": "Annonce",
      id: 3,
      intitule: "Poste dev Front alternance ",
      auteur: "Jean Pierre",
      typeContrat: "CDD Alternance",
      description: "Nous recherchons un dev stagiaire maîtrisant React",
      nomEntreprise: "Alt'izy",
      photo: "./../../images/Logo_Altizy.png",
      adresseEntreprise: "Vannes",
      tag: "informatique",
    },
    {
      "@type": "Annonce",
      id: 4,
      intitule: "Community manager en alternance ",
      auteur: "Sylvain Pruvost",
      typeContrat: "CDD Alternance",
      description:
        "Nous sommes à la recherche un apprenti community manager pour gérer nos réseaux sociaux.",
      nomEntreprise: "Intersport",
      photo: "./../../images/entreprises/intersport.jpg",
      adresseEntreprise: "Auray",
      tag: "web",
    },
    {
      "@type": "Annonce",
      id: 5,
      intitule: "Poste developpeur ",
      auteur: "Anna Chauvel",
      typeContrat: "CDD Alternance",
      description: "Nous recherchons un alternant pour la rentrée 2022.",
      nomEntreprise: "Ubisoft",
      photo: "./../../images/entreprises/ubisoft.png",
      adresseEntreprise: "Vannes",
      tag: "informatique",
    },
    {
      "@type": "Annonce",
      id: 6,
      intitule: "Poste dev Front alternance ",
      auteur: "Charles Le Baud",
      typeContrat: "CDD Alternance",
      description: "Nous recherchons un dev stagiaire maîtrisant React",
      nomEntreprise: "Naéco",
      photo: "./../../images/entreprises/naeco.png",
      adresseEntreprise: "Carnac",
      tag: "informatique",
    },
    {
      "@type": "Annonce",
      id: 7,
      intitule: "Poste webdesigner(se) en alternance ",
      auteur: "Tiphaine Turluche",
      typeContrat: "CDD Alternance",
      description:
        "En tant que designer, vous aurez pour mission de redesigner l'identité visuel de la société... ",
      nomEntreprise: "Les bottes d'anémone",
      photo: "./../../images/entreprises/lesbottes.png",
      adresseEntreprise: "Vannes",
      tag: "webdesign",
    },
  ];

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return (
      <div className="load-banner">
        <div className="lds-roller">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="private-home">
        <div className="private-home-main">
          {student ? (
            <Matchmodule annonces={annonces} />
          ) : (
            <Matchmodule annonces={candidatures} />
          )}
        </div>
        <Chatlist />
      </div>
    );
  }
}

export default PrivateHome;
