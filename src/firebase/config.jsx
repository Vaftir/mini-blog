// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrCpblswMOymf3pPPDzmcPN04asOhEKO0",
  authDomain: "miniblog-yf.firebaseapp.com",
  projectId: "miniblog-yf",
  storageBucket: "miniblog-yf.appspot.com",
  messagingSenderId: "373333093832",
  appId: "1:373333093832:web:8d02299ccff769050fe4fd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };

/*import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

const db = getFirestore();
connectFirestoreEmulator(db, 'localhost', 8080)*/
