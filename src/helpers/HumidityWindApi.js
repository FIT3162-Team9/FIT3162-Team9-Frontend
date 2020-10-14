// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyBXkrUCPaNezZ2spIV5Rl6bgTHMXKA8cjc",
    authDomain: "fit3162-team9.firebaseapp.com",
    databaseURL: "https://fit3162-team9.firebaseio.com",
    projectId: "fit3162-team9",
    storageBucket: "fit3162-team9.appspot.com",
    messagingSenderId: "462264365721",
    appId: "1:462264365721:web:fbf3ea809fe572e42b3e08",
    measurementId: "G-W55P86GJRE"
  };

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const getHumidityWind= async (LGA='', setHumidityWind, startAt, endAt) => {
  if (LGA == "") {return}
  const db = firebase.firestore();
  var tempStationRef = db.collection('data').doc('humidity_wind').collection(LGA).orderBy("timestamp").startAt(startAt).endAt(endAt);
  console.log('Humidity/Wind')
  return tempStationRef.onSnapshot((snapshot) => {
    let humidityWindData = [];
    snapshot.forEach((doc) => humidityWindData.push({ ...doc.data(), id: doc.id }));
    console.log('Fetched all humidity data', humidityWindData);
    setHumidityWind(humidityWindData);
  });
}

