import React from "react";
import "./matching.css";
import Likedislikemodule from "./LikeDislikeModule";
import Randomcard from "./RandomCard";
import alex from "./../../images/alex.jpg";
import johanna from "./../../images/johanna.jpg";
import manon from "./../../images/manon.jpg";
import chloe from "./../../images/chloe.jpg";
import agenor from "./../../images/agenor.jpg";


const users = [
  { id: 0, name: "Alex", photo: alex  },
  { id: 1, name: "Johanna", photo: johanna  },
  { id: 2, name: "Manon", photo: manon  },
  { id: 3, name: "Chloé", photo: chloe  },
  { id: 4, name: "Agénor", photo: agenor  },
];
const handleSwipe = (d) => {
  //fill this your callback
  console.log(d);
};

function Matchmodule() {
  return (
    <div className="match-module">
      <Randomcard users={users} handleSwipe={handleSwipe} />
      <Likedislikemodule users={users} />
    </div>
  );
}

export default Matchmodule;
