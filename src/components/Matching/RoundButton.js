import React, { useMemo, useState, useRef } from "react";

function Roundbutton(props) {
  const users = props.users;
  const logo = props.logo;
  const swipe = props.swipe;

  return (
    <div>
      <button className="btn round-button"  onClick={swipe}>
        <img src={logo}></img>
      </button>
    </div>
  );
}

export default Roundbutton;
