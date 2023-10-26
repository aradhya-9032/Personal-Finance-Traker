// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getAuth,GoogleAuthProvider} from "firebase/auth";
// import {getFirestore, doc, setDoc} from "firebase/firestore";

// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyASLmky6t_uWxhrsXIhVZro-vv7lOPpwnM",
//   authDomain: "financely-7667f.firebaseapp.com",
//   projectId: "financely-7667f",
//   storageBucket: "financely-7667f.appspot.com",
//   messagingSenderId: "607308074643",
//   appId: "1:607308074643:web:05247c09a63e675f8a0766",
//   measurementId: "G-327ZHES23B"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const provider = new GoogleAuthProvider();
// export {db, auth, provider, doc, setDoc};




import { initializeApp } from "firebase/app";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHExHfMDRu2lVecgYxgW86TXDF-dvsWrY",
  authDomain: "personal-finance-tracker-ec56e.firebaseapp.com",
  projectId: "personal-finance-tracker-ec56e",
  storageBucket: "personal-finance-tracker-ec56e.appspot.com",
  messagingSenderId: "669303047696",
  appId: "1:669303047696:web:5b4b41cc896752c03e6c95",
  measurementId: "G-7X36E69HYW",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db, auth, provider, doc, setDoc };







