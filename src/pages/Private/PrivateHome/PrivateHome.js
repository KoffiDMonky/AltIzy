import React from "react";
import "./PrivateHome.css";
import Chatlist from "./../../../components/chat/ChatList";
import Matchmodule from "./../../../components/Matching/MatchModule";

function PrivateHome() {
  return (
    <div className="private-home">
      <Chatlist />
      <Matchmodule />
      <div>
        {/* <h1 className="display-3 mb-4 text-center">
          Connecté et réorienté vers la partie privée de l'app !👍
        </h1> */}
      </div>
    </ div>
  );
}

export default PrivateHome;
