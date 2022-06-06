import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { UserContext } from "../../context/userContext";
import { auth } from "../../firebase-config";

function Googlesigninbutton() {

  const { signInWithGoogle } = useContext(UserContext);

  return (
    <div>
      <button className="btn btn-warning w-100 mt-2" onClick={signInWithGoogle}>
        Se connecter avec Google
      </button>
    </div>
  );
}

export default Googlesigninbutton;
