import React from "react";
import "./chat.css";
import Chatitem from "./ChatItem";
import Chatwindow from './ChatWindow';
import profilePhoto from "./../../images/agenorhouessou.jpg";

const users = [
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
  { profilePhoto: { profilePhoto }, name: "Agénor", message: "Salut ! ça va ?" },
];

function Chatlist() {
  const listItems = users.map((user, index) => (
    <li key={index}>
      <Chatitem user={user} />
    </li>
  ));

  return (
    <div className="chat-list">
      <div className="chat-list-header"><h4>Discussions</h4></div>
      <div className="list-item">{listItems}</div>
      <Chatwindow user={users} /> 
    </div>
  );
}

export default Chatlist;
