import React from "react";
import { CardSwiper } from "react-card-rotate-swiper";

// const handleSwipe = (d) => {
//   //fill this your callback
//   console.log(d);
// };

function Randomcard(props) {
  const users = props.users;
  const handleSwipe = props.handleSwipe;
  console.log(users);

  const cardStack = users.map((user, index) => (
    <CardSwiper
      key={index}
      onSwipe={handleSwipe}
      className={"swiper card"}
      // detectingSize={1000}
      throwLimit={1500}
      contents={
        <div
          className="card-background"
          style={{ backgroundImage: "url(" + user.photo + ")" }}
        >
          <span>{user.name}</span>
        </div>
      }
    />
  ));

  return <div className="card-container">
    {cardStack}
    <p>Plus d'offres, reviens plustard !</p>
    </div>;
}

export default Randomcard;
