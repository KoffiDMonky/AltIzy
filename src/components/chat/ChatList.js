import React, { useState } from "react";
import "./chat.css";
import Chatitem from "./ChatItem";
import Chatwindow from './ChatWindow';

import intersport from "./../../images/entreprises/intersport.png"
import lesbottes from "./../../images/entreprises/lesbottes.png"
import ubisoft from "./../../images/entreprises/ubisoft.png"
import naeco from "./../../images/entreprises/naeco.png"
import ojc from "./../../images/entreprises/ojc.png"
import user from "./../../images/alex.jpg"




function Chatlist() {

  const [messagesUser, setMessagesUser] = useState([]);

  const users = [
    { id: 0, name: "Intersport", profilePhoto: intersport, message: "Bonjour Alexandre !" },
    { id: 1, name: "Les bottes d'anémone", profilePhoto: lesbottes, message: "Connaissez-vous les bottes..."  },
    { id: 2, name: "Ubisoft", profilePhoto: ubisoft, message: "Votre profils nous interresse"  },
    { id: 3, name: "OJC Conseil", profilePhoto: ojc, message: "Félicitation !"  },
    { id: 4, name: "Naéco", profilePhoto: naeco, message: "Êtes-vous toujours en recherche de stage ?"  },
    { id: 5, name: "User", profilePhoto: user, message: ""  },
  ];

  const currentUser = { id: 5, name: "User", profilePhoto: user, message: ""  }

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





  const setMessage = message => {
    setMessagesUser(message)
  }



  return (
    <div className="chat-list">
      <div className="chat-list-header"><h4>Discussions</h4></div>
      <div className="list-item">{listItems}</div>
      { window && <Chatwindow user={users} currentUser={currentUser} id={UserIndex} setWindow = {setWindow} messagesUser={messagesUser} setMessagesUser={setMessage} />} 
    </div>
  );
}

export default Chatlist;
