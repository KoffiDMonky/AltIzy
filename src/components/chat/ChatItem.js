import React from "react";
import Profilephoto from "./ProfilePhoto";

function Chatitem(props) {
  const user = props.user;
  const photo = user.profilePhoto;
  return (
    <div className="chat-item">
      <Profilephoto user={photo} />
      <div className="chat-item-content">
        <span>{user.name}</span>
        <span className="last-message">{user.message}</span>
      </div>
    </div>
  );
}

export default Chatitem;
