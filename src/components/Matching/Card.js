import React from "react";
import "./matching.css";
import domaine from "./../../images/Icônes/altizy-domaine-bleu.png";
import pin from "./../../images/Icônes/altizy-localisation-bleu.png";
import offre from "./../../images/Icônes/altizy-personne-bleu.png";



function Card(props) {

    const photo = props.photo;
    const nomEntreprise = props.nomEntreprise;
    const auteur = props.auteur;
    const tag = props.tag;
    const adresseEntreprise = props.adresseEntreprise;
    const typeContrat = props.typeContrat;
    const intitule = props.intitule;
    const description = props.description;

  return (
    <div
      className="card-background"
      style={{ backgroundImage: "url(" + photo + ")" }}
    >
      <div className="informations">
        <div className="nom-entreprise">{nomEntreprise}</div>
        <div className="auteur">{auteur}</div>
        <div className="resume">
          <div className="tag res">
            <img className="icon" src={domaine} />
            <span className="texte">{tag}</span>
          </div>
          <div className="adresse-entreprise res">
            <img className="icon" src={pin} />
            <span className="texte">{adresseEntreprise}</span>
          </div>
          <div className="type-contrat res">
            <img className="icon" src={offre} />
            <span className="texte">
              {typeContrat}, {intitule}
            </span>
          </div>
        </div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
}

export default Card;
