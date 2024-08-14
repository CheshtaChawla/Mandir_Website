import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";  // storage is used to fetch the URL of images stored in Firebase Storage and add it to the event data fetched from Firestore.


const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID

  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  export const db = getFirestore(app);  //as we normally by defult export function in a same way i am exporting this constant by default ..but default keyword is not used here

  // Create a root reference
  export const storage = getStorage(app);


  //THIS IS FOR MY CONVENIENCE
   // url link for db at firebase https://console.firebase.google.com/u/0/project/mandir-website-c9eb7/settings/general/web:MDA5NmZjNzYtZTUxYi00NmFhLWI1MGItYzVlN2JjZTlhMGJm
   //url for adding the members to access firebase https://console.firebase.google.com/u/0/project/mandir-website-c9eb7/settings/iamcurl 'https://[YOUR_PROJECT_ID].firebaseio.com/.json?download=myfilename.json'