import React, { useMemo, useState, useRef } from "react";

function Roundbutton(props) {
  const users = props.users;
  const logo = props.logo;

  const [currentIndex, setCurrentIndex] = useState(users.length - 1);
  const currentIndexRef = useRef(currentIndex);



  const childRefs = useMemo(
    () =>
      Array(users.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );
  // console.log(Array(users.length).fill(0).map((i) => React.createRef()));
  // console.log(childRefs[0]);

  const swipe = async (d) => {
    //   console.log(childRefs[currentIndex]);
    await childRefs[currentIndex].current.swipe(d); // Swipe the card!
  };

  return (
    <div>
      <button className="btn round-button" onClick={() => swipe("left")}>
        <img src={logo}></img>
      </button>
    </div>
  );
}

export default Roundbutton;
