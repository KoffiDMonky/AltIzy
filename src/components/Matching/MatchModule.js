import React, { useState, useMemo, useRef } from "react";
import "./matching.css";
import TinderCard from "react-tinder-card";
import Likedislikemodule from "./LikeDislikeModule";
import alex from "./../../images/alex.jpg";
import johanna from "./../../images/johanna.jpg";
import manon from "./../../images/manon.jpg";
import chloe from "./../../images/chloe.jpg";
import agenor from "./../../images/agenor.jpg";

const users = [
  { id: 0, name: "Alex", photo: alex },
  { id: 1, name: "Johanna", photo: johanna },
  { id: 2, name: "Manon", photo: manon },
  { id: 3, name: "Chloé", photo: chloe },
  { id: 4, name: "Agénor", photo: agenor },
];

function Matchmodule() {
  const [currentIndex, setCurrentIndex] = useState(users.length - 1);
  const [lastDirection, setLastDirection] = useState();

  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canSwipe = currentIndex >= 0;
  const canGoBack = currentIndex < users.length - 1;

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard();
  };

  const swipeLeft = async () => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe("left"); // Swipe the card on the left!
    }
  };

  const swipeRight = async () => {
    if (canSwipe && currentIndex < users.length) {
      await childRefs[currentIndex].current.swipe("right"); // Swipe the card on the right!
    }
  };

  const cardStack = users.map((user, index) => (
    <TinderCard
      key={index}
      ref={childRefs[index]}
      className="card"
      onSwipe={(dir) => swiped(dir, user.name, index)}
      onCardLeftScreen={() => outOfFrame(user.name, index)}
    >
      <div className="card-background" style={{ backgroundImage: "url(" + user.photo + ")" }}>
        <span>{user.name}</span>
      </div>
    </TinderCard>
  ));

  return (
    <div className="match-module">
      <div className="card-container">
        {cardStack}
        <p>Plus d'offres, reviens plustard !</p>
      </div>

      <Likedislikemodule
        users={users}
        swipeLeft={swipeLeft}
        swipeRight={swipeRight}
      />
    </div>
  );
}

export default Matchmodule;