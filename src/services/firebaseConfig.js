// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from 'firebase/database';
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy9C0ROVcYg54GDfFcv9gGTXAyz7YxW9E",
  authDomain: "qrpwa-50942.firebaseapp.com",
  projectId: "qrpwa-50942",
  storageBucket: "qrpwa-50942.appspot.com",
  messagingSenderId: "687789998488",
  appId: "1:687789998488:web:0cfe007f05119e4fb92bed",
  databaseURL:"https://qrpwa-50942-default-rtdb.asia-southeast1.firebasedatabase.app/"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };