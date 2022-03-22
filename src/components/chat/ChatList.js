import React, { useState } from "react";
import "./chat.css";
import Chatitem from "./ChatItem";
import Chatwindow from './ChatWindow';
import alex from "./../../images/alex.jpg";
import johanna from "./../../images/johanna.jpg";
import manon from "./../../images/manon.jpg";
import chloe from "./../../images/chloe.jpg";
import agenor from "./../../images/agenor.jpg";


const users = [
  { id: 0, name: "Alex", profilePhoto: alex, message: "Salut ! ça va ?"  },
  { id: 1, name: "Johanna", profilePhoto: johanna, message: "Salut ! ça va ?"  },
  { id: 2, name: "Manon", profilePhoto: manon, message: "Salut ! ça va ?"  },
  { id: 3, name: "Chloé", profilePhoto: chloe, message: "Salut ! ça va ?"  },
  { id: 4, name: "Agénor", profilePhoto: agenor, message: "Salut ! ça va ?"  },
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
