import React, { useState } from "react";
import "./chat.css";
import Chatitem from "./ChatItem";
import Chatwindow from './ChatWindow';
// import alex from "./../../images/alex.jpg";
// import johanna from "./../../images/johanna.jpg";
// import manon from "./../../images/manon.jpg";
// import chloe from "./../../images/chloe.jpg";
// import agenor from "./../../images/agenor.jpg";

import intersport from "./../../images/entreprises/intersport.png"
import lesbottes from "./../../images/entreprises/lesbottes.png"
import ubisoft from "./../../images/entreprises/ubisoft.png"
import naeco from "./../../images/entreprises/naeco.png"
import ojc from "./../../images/entreprises/ojc.png"


const users = [
  { id: 0, name: "Intersport", profilePhoto: intersport, message: "Bonjour Alexandre !"  },
  { id: 1, name: "Les bottes d'anémone", profilePhoto: lesbottes, message: "Connaissez-vous les bottes..."  },
  { id: 2, name: "Ubisoft", profilePhoto: ubisoft, message: "Votre profils nous interresse"  },
  { id: 3, name: "OJC Conseil", profilePhoto: ojc, message: "Félicitation !"  },
  { id: 4, name: "Naéco", profilePhoto: naeco, message: "Êtes-vous toujours en recherche de stage ?"  },
  // { id: 4, name: "Agénor", profilePhoto: agenor, message: "Salut ! ça va ?"  },
];

function Chatlist() {

  const [window, setWindow] = useState(false);
  const [UserIndex, setUserIndex] = useState();

  const toggleChatWindow = (e) => {

    setWindow(!window);
    setUserIndex(e.target.id) 

  };

  const listItems = users.map((user, index) => (
    <li key={index} onClick={ toggleChatWindow }>
      <Chatitem user={user} id={index} />
    </li>
  ));

  return (
    <div className="chat-list">
      <div className="chat-list-header"><h4>Discussions</h4></div>
      <div className="list-item">{listItems}</div>
      { window && <Chatwindow user={users} id={UserIndex} setWindow = {setWindow} />} 
    </div>
  );
}

export default Chatlist;
