import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain:process.env.REACT_APP_FIREBASE_AUTH_DOMAINE,
  projectId:process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket:process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId:process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId:process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId:process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

//Export de la méthode d'authentification Firebase
export const auth = getAuth(app);

//Export de la méthode DB firestore
export const db = getFirestore(app);

// //authentification google
// const provider = new GoogleAuthProvider();
// // provider.setCustomParameters({ prompt: 'select_account' });
// export const signInWithGoogle = () => signInWithPopup(auth,provider)
// .then((result) => {
//   // This gives you a Google Access Token. You can use it to access the Google API.
//   const credential = GoogleAuthProvider.credentialFromResult(result);
//   const token = credential.accessToken;
//   // The signed-in user info.
//   const user = result.user;
//   // ...
// }).catch((error) => {
//   // Handle Errors here.
//   const errorCode = error.code;
//   const errorMessage = error.message;
//   // The email of the user's account used.
//   const email = error.email;
//   // The AuthCredential type that was used.
//   const credential = GoogleAuthProvider.credentialFromError(error);
//   // ...
// });;
