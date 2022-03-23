// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDNP4KqM4bNTuQTBBiZhHLMTHcjsMhuZyc",
  authDomain: "myblog-2e3c2.firebaseapp.com",
  projectId: "myblog-2e3c2",
  storageBucket: "myblog-2e3c2.appspot.com",
  messagingSenderId: "8102699446",
  appId: "1:8102699446:web:684bcb9426bfb89f2a6117"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;