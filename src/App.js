import './App.css';
// import Header from './component/Header/Header';
import Home from './component/Home/Home';
// import DonatePopUp from "./component/Home/component/DonatePopUp"


import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

function App() {

 //firebase configuration
  // const firebaseConfig = {
  //   apiKey: "AIzaSyBefkX-QfsKCaXMhBYOQfUaXwwOslmWurA",
  //   authDomain: "mandir-website-c9eb7.firebaseapp.com",
  //   projectId: "mandir-website-c9eb7",
  //   storageBucket: "mandir-website-c9eb7.appspot.com",
  //   messagingSenderId: "1082138016815",
  //   appId: "1:1082138016815:web:5afa961fb84e20f27edada",
  //   measurementId: "G-PKM1J2CC29"
  // };
  
  // Initialize Firebase
  // const app = initializeApp(firebaseConfig);
  // const DB = getFirestore(app);
  
  return (
    <>
      <Home />
     
    </>
  );
}

export default App;
