import React, { useState, useMemo, useRef } from "react";
import "./matching.css";
import TinderCard from "react-tinder-card";
import Likedislikemodule from "./LikeDislikeModule";
import domaine from "./../../images/Icônes/altizy-domaine-bleu.png";
import pin from "./../../images/Icônes/altizy-localisation-bleu.png";
import offre from "./../../images/Icônes/altizy-personne-bleu.png";
import Card from "./Card";
// import alex from "./../../images/alex.jpg";
// import johanna from "./../../images/johanna.jpg";
// import manon from "./../../images/manon.jpg";
// import chloe from "./../../images/chloe.jpg";
// import agenor from "./../../images/agenor.jpg";

// const users = [
//   { id: 0, name: "Alex", photo: alex },
//   { id: 1, name: "Johanna", photo: johanna },
//   { id: 2, name: "Manon", photo: manon },
//   { id: 3, name: "Chloé", photo: chloe },
//   { id: 4, name: "Agénor", photo: agenor },
// ];

function Matchmodule(props) {
  const annonces = props.annonces;
  const [currentIndex, setCurrentIndex] = useState(annonces.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(annonces.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  const canGoBack = currentIndex < annonces.length - 1;

  // Défini la dernière direction et diminuer l'index actuel
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    //TODO: Finir de gérer les match une fois qu'il y aura plus de data dans la BDD
    if (direction === "right") {
      console.log("Controle si match existant + passage à true");
    }

    // console.log(direction);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipeLeft = async () => {
    if (canSwipe && currentIndex < annonces.length) {
      await childRefs[currentIndex].current.swipe("left"); // Passez la carte sur la gauche
    }
  };

  const swipeRight = async () => {
    if (canSwipe && currentIndex < annonces.length) {
      await childRefs[currentIndex].current.swipe("right"); // Passez la carte sur la droite
    }
  };

  const cardStack = annonces.map((annonce, index) => (
    <TinderCard
      key={index}
      ref={childRefs[index]}
      className="card"
      onSwipe={(dir) => swiped(dir, annonce.intitule, index)}
      onCardLeftScreen={() => outOfFrame(annonce.intitule, index)}
    >
      <Card
        photo={annonce.photo}
        nomEntreprise={annonce.nomEntreprise}
        auteur={annonce.auteur}
        tag={annonce.tag}
        adresseEntreprise={annonce.adresseEntreprise}
        typeContrat={annonce.typeContrat}
        intitule={annonce.intitule}
        description={annonce.description}
      />
    </TinderCard>
  ));

  return (
    <div className="match-module">
      <div className="card-container">
        {cardStack}
        <p>Plus d'offres, reviens plustard !</p>
      </div>

      <Likedislikemodule
        annonces={annonces}
        swipeLeft={swipeLeft}
        swipeRight={swipeRight}
      />
    </div>
  );
}

export default Matchmodule;
