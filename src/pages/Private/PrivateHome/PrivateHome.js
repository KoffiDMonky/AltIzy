import React, { useState, useContext, useEffect } from "react";
import "./PrivateHome.css";
import { UserContext } from "./../../../context/userContext";
import Chatlist from "./../../../components/chat/ChatList";
import Matchmodule from "./../../../components/Matching/MatchModule";

function PrivateHome() {
  //On instantie useContext
  const { currentUser } = useContext(UserContext);
  //uid de l'utilisateur courant
  const uid = currentUser.uid;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUsers] = useState([]);
  const [student, setStudents] = useState();
  const [enterprise, setEnterprises] = useState();
  const [annonces, setAnnonces] = useState([]);
  const [candidatures, setCandidatures] = useState([]);

  const getSuggestions = async () => {
    try {
      await fetch("http://127.0.0.1:8000/api/utilisateurs/4.json") //On récupère l'utilisateur courant
        .then((res) => res.json())
        .then(
          (result) => {
            setUsers(result);
            setStudents(result.etudiant);
            setEnterprises(result.entreprise);
            if (result.etudiant) {
              //Si l'utilisateur est un étudiant, on récupère l'objet etudiant contenant les informations relative à l'utilisateur
              fetch(`http://127.0.0.1:8000${result.etudiant}.json`)
                .then((res) => res.json())
                .then((result) => {
                  result.tags.map(
                    (
                      tag //On récupère les domaines de recherche de l'etudiant afin de lui proposer des annonces lié à ces domaines
                    ) =>
                      fetch(
                        `http://127.0.0.1:8000/api/annonces.json?tags=${tag}`
                      )
                        .then((res) => res.json())
                        .then((result) => {
                          result.forEach((annonce) => {
                            fetchFullAnnonces(annonce, result.length);
                          });
                        })
                  );
                });
            } else if (result.entreprise) {
              //Sinon si l'utilisateur est une entreprise, on récupère l'objet etudiant contenant les informations relative à l'utilisateur
              fetch(`http://127.0.0.1:8000${result.entreprise}.json`)
                .then((res) => res.json())
                .then((result) => {
                  result.tags.map(
                    (
                      tag //On récupère les domaines de recherche de l'entreprise afin de lui proposer des candidatures lié à ces domaines
                    ) =>
                      fetch(
                        `http://127.0.0.1:8000/api/annonces.json?tags=${tag}`
                      )
                        .then((res) => res.json())
                        .then((result) => {
                          result.forEach((candidature) => {
                            fetchFullAnnonces(candidature, result.length);
                          });
                        })
                  );
                });
            }
          },
          (error) => {
            setError(error);
          }
        );
    } catch (error) {
      console.log(error);
    }
  };

  let allAnnonces = [];

  const fetchFullAnnonces = async (suggestion, nombre) => {
    let objAnnonceFull = {};
    let entreprise = suggestion.entreprise[0];
    let tag = suggestion.tags[0];

    objAnnonceFull.intitule = suggestion.intitule;
    objAnnonceFull.auteur = suggestion.auteur;
    objAnnonceFull.description = suggestion.description;
    objAnnonceFull.typeContrat = suggestion.typeContrat;

    await fetch(`http://127.0.0.1:8000${entreprise}.json`)
      .then((res) => res.json())
      .then(async (entreprise) => {
        objAnnonceFull.nomEntreprise = entreprise.nom;
        objAnnonceFull.photo = entreprise.photo;
        objAnnonceFull.email = entreprise.email;
        objAnnonceFull.descriptionEntreprise = entreprise.description;


        const addressEnterprise = entreprise.adresse;

        await fetch(`http://127.0.0.1:8000${addressEnterprise}.json`)
        .then((res) => res.json())
            .then((adresse) => {
              objAnnonceFull.adresseEntreprise = adresse.ville;
            });

        if (tag) {
          await fetch(`http://127.0.0.1:8000${tag}.json`)
            .then((res) => res.json())
            .then((tag) => {
              objAnnonceFull.tag = tag.label;
            });
        }

        allAnnonces.push(objAnnonceFull);

        if (allAnnonces.length === nombre) {
          setAnnonces(allAnnonces);
          setIsLoaded(true);
        }
      });
  };

  useEffect(() => {
    getSuggestions();
  }, []);

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
