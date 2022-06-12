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
      await fetch("http://127.0.0.1:8000/api/users/10.json") //On récupère l'utilisateur courant
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


    objAnnonceFull.id = suggestion.id;
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

        await fetch(`http://127.0.0.1:8000${addressEnterprise}.json`, {
          method: "GET",
          headers: { "Content-Type": "application/ld+json", 
          // "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDUwNDIsImV4cCI6MTY1NDgwODY0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.raieb7RlJ2OeRxwBOHZXnPNxBAHH_diDfQDRRFaYhkx2SoMCqYkaoLYF8zyLj3tOcSzWEAUpCYRCZum2j7D4DXd--pZ0h6_kZiyiVc2CpI0cdCLTIwjY70EkEN4sm6H_Xv0pu8P-KfY7PddThu7Xng9jJKL7ipbPDaO9S2o_EPeram_nq5Nexxn8GY20uRGAtSiEOSig7Xq_r04FX8r9diu1ij2vrJsCAWDmd6TmkOJUFixdqM6AwwqF74KBN30JPr8tcFzsAs9x844tZ6gm29TkiDO3R96vJFRbiEQLspssjakmhL_QNJPtl95xNk_iRjgpz-VvzAU4McBC0rkM-BM5hJKChkhb5Ruyomj2wFoZrwgpfiRKIVg1e3CSGXAD3N4V4haC5jZmAOqdkz0FOIPEwGzui7hPH14UAi4Ch1kOSLjLnbu5qXF9lNECwDmCOkx0QgaS9Kn6gCHDErYu8uoftInFpQHL2h8JoHD-v8ef70A__lbppPEN6sCQSbX1_4y3rqRf8HdBl0Oo4LuRXGFNtCuY3OOvF5my7TTuqmBMAOCsjFt-j2HMRhn2NnabqAzR2myEOgD7DwNIvi5OsCuO428BuWdwKPsZhyu1ZpNq1rIsMoBiZnRdbg7PJeD3d-gZ6aI3AS_afUCOZ7rdXet8UUYX6ZhZVw8eJenC9yU" 
        }
        })
        .then((res) => res.json())
            .then((adresse) => {
              objAnnonceFull.adresseEntreprise = adresse.ville;
            });

        if (tag) {
          await fetch(`http://127.0.0.1:8000${tag}.json`, {
            method: "GET",
            headers: { "Content-Type": "application/ld+json", 
            // "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTQ4MDUwNDIsImV4cCI6MTY1NDgwODY0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoidGVzdCJ9.raieb7RlJ2OeRxwBOHZXnPNxBAHH_diDfQDRRFaYhkx2SoMCqYkaoLYF8zyLj3tOcSzWEAUpCYRCZum2j7D4DXd--pZ0h6_kZiyiVc2CpI0cdCLTIwjY70EkEN4sm6H_Xv0pu8P-KfY7PddThu7Xng9jJKL7ipbPDaO9S2o_EPeram_nq5Nexxn8GY20uRGAtSiEOSig7Xq_r04FX8r9diu1ij2vrJsCAWDmd6TmkOJUFixdqM6AwwqF74KBN30JPr8tcFzsAs9x844tZ6gm29TkiDO3R96vJFRbiEQLspssjakmhL_QNJPtl95xNk_iRjgpz-VvzAU4McBC0rkM-BM5hJKChkhb5Ruyomj2wFoZrwgpfiRKIVg1e3CSGXAD3N4V4haC5jZmAOqdkz0FOIPEwGzui7hPH14UAi4Ch1kOSLjLnbu5qXF9lNECwDmCOkx0QgaS9Kn6gCHDErYu8uoftInFpQHL2h8JoHD-v8ef70A__lbppPEN6sCQSbX1_4y3rqRf8HdBl0Oo4LuRXGFNtCuY3OOvF5my7TTuqmBMAOCsjFt-j2HMRhn2NnabqAzR2myEOgD7DwNIvi5OsCuO428BuWdwKPsZhyu1ZpNq1rIsMoBiZnRdbg7PJeD3d-gZ6aI3AS_afUCOZ7rdXet8UUYX6ZhZVw8eJenC9yU" 
          }
          })
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
