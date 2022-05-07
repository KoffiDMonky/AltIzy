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

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/utilisateurs/4.json") //On récupère l'utilisateur courant
      .then((res) => res.json())
      .then(
        (result) => {
          setUsers(result);
          setStudents(result.etudiant);
          setEnterprises(result.entreprise);
          if (result.etudiant) { //Si l'utilisateur est un étudiant, on récupère l'objet etudiant contenant les informations relative à l'utilisateur
            fetch(`http://127.0.0.1:8000${result.etudiant}.json`)
              .then((res) => res.json())
              .then((result) => {
                result.tags.map((tag) => //On récupère les domaines de recherche de l'etudiant afin de lui proposer des annonces lié à ces domaines
                  fetch(`http://127.0.0.1:8000/api/annonces.json?tags=${tag}`)
                    .then((res) => res.json())
                    .then((result) => {
                      setAnnonces(result);
                      setIsLoaded(true);
                    })
                );
              });
          } else if (result.entreprise) { //Sinon si l'utilisateur est une entreprise, on récupère l'objet etudiant contenant les informations relative à l'utilisateur
            fetch(`http://127.0.0.1:8000${result.entreprise}.json`)
              .then((res) => res.json())
              .then((result) => {
                console.log(result.tags);
                setIsLoaded(true);
              }); //TODO: finir la suite des appels
          }
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Erreur : {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Chargement...</div>;
  } else {
    return (
      <div className="private-home">
        <Chatlist />
        <div className="private-home-main">
          <Matchmodule annonces = {annonces} />
        </div>
      </div>
    );
  }
}

export default PrivateHome;
