import React from "react";
import Profilephoto from "./ProfilePhoto";

function Chatitem(props) {
  const user = props.user;
  const photo = user.profilePhoto;
  const id = props.id;
 
  return (
    <div className="chat-item" id={id}>
      <Profilephoto user={photo} id={id} />
      <div className="chat-item-content" id={id}>
        <span id={id}>{user.name}</span>
        <span className="last-message" id={id}>{user.message}</span>
      </div>
    </div>
  );
}

export default Chatitem;
