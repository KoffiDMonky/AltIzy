import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import { UserContext } from "../../context/userContext";
import "./matching.css";
import TinderCard from "react-tinder-card";
import Likedislikemodule from "./LikeDislikeModule";
import Card from "./Card";

function Matchmodule(props) {

  const { idCurrentUser } = useContext(UserContext);

  const annonces = props.annonces;
  const [currentIndex, setCurrentIndex] = useState(annonces.length - 1);
  const [lastDirection, setLastDirection] = useState();
  const [userMatch, setUserMatch ] = useState([]);


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

  // Défini la dernière direction et diminuer l'index actuel
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);

    //TODO: Finir de gérer les matchs une fois qu'il y aura plus de data dans la BDD
    if (direction === "right") {
      console.log("Controle si match existant + passage à true");

    }
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
        <p>Plus d'offres, reviens plustard !</p>
        {cardStack}
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
