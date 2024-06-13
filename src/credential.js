// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJC4E5CKh3EQSw951GGSMZvlRU5h4E5eI",
  authDomain: "crud-firebase-react-24e9f.firebaseapp.com",
  projectId: "crud-firebase-react-24e9f",
  storageBucket: "crud-firebase-react-24e9f.appspot.com",
  messagingSenderId: "279857574846",
  appId: "1:279857574846:web:7d4e73b714529495943fef"
};

// Initialize Firebase
const appFirebase = initializeApp(firebaseConfig);
export default appFirebase;