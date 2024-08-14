import './App.css';
import Home from './component/Home/Home';
import AdminComponent from './component/admin/AdminComponent'; // Import the AdminComponent
import { BrowserRouter as Router, Route,Routes, Switch } from 'react-router-dom';

// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: "AIzaSyBefkX-QfsKCaXMhBYOQfUaXwwOslmWurA",
//   authDomain: "mandir-website-c9eb7.firebaseapp.com",
//   projectId: "mandir-website-c9eb7",
//   storageBucket: "mandir-website-c9eb7.appspot.com",
//   messagingSenderId: "1082138016815",
//   appId: "1:1082138016815:web:5afa961fb84e20f27edada",
//   measurementId: "G-PKM1J2CC29"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/admin" component={AdminComponent} />
      <Route path="/" component={Home} />
     
    </Routes>
  </Router>
  );
}
 {/* 
      {path: '/', element: <Home />},     
      Element -> A plain object describing what you want to see on the screen, Think of it as a blueprint for a UI element.
      
      {path: '/', component: <Home />},
      Component -> A reusable piece of code that defines how a part of your UI looks and behaves.
      */}
export default App;

