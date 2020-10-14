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

export const getStates = () => {
  // Hardcoded states
  return ['nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'];
}

export const getLGAs = async (state, setLGAs) => {
  const db = firebase.firestore();

  var lgaRef = db.collection('lga').doc(state).collection('lga_to_stations')
  lgaRef.get().then(querySnapshot => {
    const lgaData = [];
    querySnapshot.forEach((doc) => lgaData.push(doc.id));
    console.log('lga data', lgaData);
    setLGAs(lgaData);
  })
}

export const getStations = async (state, station, setStations) => {
  const db = firebase.firestore();

  var stationRef = db.collection('lga').doc(state).collection('lga_to_stations').doc(station)

  return stationRef.onSnapshot((snapshot) => {
    const array = snapshot.data().array;
    const stations = array.map((item) => item.number)
    console.log('stations', stations);
    setStations(stations);

  });
}