import React from "react";
import Profilephoto from "./ProfilePhoto";

function Chatitem(props) {
    const user = props.user;
    const photo = user.profilePhoto;
  return (
    <div className="chat-item">
      <Profilephoto user={photo} />
      {user.name}
    </div>
  );
}

export default Chatitem;
