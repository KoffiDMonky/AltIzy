import React, { useState, useCallback } from "react";
import Messageitem from "./MessageItem";
import Profilephoto from "./ProfilePhoto";

function Chatwindow(props) {
  const id = props.id;
  const user = props.user;
  const currentUser = props.currentUser.profilePhoto;
  const photoCurrentUser = props.user[id].profilePhoto;
  const setWindow = props.setWindow;

  const messagesUser = props.messagesUser;
  const setMessagesUser = props.setMessagesUser;
  const [messagesUpdate, setMessagesUpdate] = useState("");


  const updateUserMessageHandler = useCallback(
    () => (event) => {
      setMessagesUpdate(event.target.value);
    },
    [messagesUpdate]
  );

  

  const sendMessage = (e) => {
    e.preventDefault();

    if(messagesUpdate){
      
      setMessagesUser([messagesUpdate , ...messagesUser]); //Mettre à jour le tableau de messages
      setMessagesUpdate() //on purge messagesUpdate pour ne pas avoir la possibilité de renvoyer plusieur fois le message
      
      document.getElementById("textfield").value = ""; //vider l'input

    }


  };

  const listMessages = messagesUser.map((message, index) => (
    <div className="message-item sender" id={index} key={index}>
      <div className="message-sender">
        <div className="user-message">{message}</div>
      </div>
      <Profilephoto user={currentUser} />
    </div>
  ));

  return (
    <div className="chat-window">
      <button className=" close-chat-window" onClick={() => setWindow(false)}>
        x
      </button>
      <div className="chat-window-header">
        <Profilephoto user={photoCurrentUser} />
        <span>{user[id].name}</span>
      </div>
      <div className="message-zone" id="zone">
        {listMessages}
        <Messageitem user={user[id]} />
      </div>

      <form className="text-zone">
        <input id="textfield" onChange={updateUserMessageHandler()} />
        <button className="btn" type="submit" onClick={sendMessage}>
          Envoyer
        </button>
      </form>
    </div>
  );
}

export default Chatwindow;
