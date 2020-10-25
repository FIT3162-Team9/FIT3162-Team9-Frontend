import * as firebase from "firebase/app";

import { firebaseConfig } from "./firebase";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}


export const getStates = () => {
  // Hardcoded states values to be used to query database
  return ['nsw', 'nt', 'qld', 'sa', 'tas', 'vic', 'wa'];
}

/**
 * return array of lga in a given state
 * @param   {string}    state              State name
 * @param   {function}  setLGAs            Function to set array with lga names from the module that called it
 */  
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

/**
 * return array of stations in a given state and lga
 * @param   {string}    state              State name
 * @param   {number}    station            Station number
 * @param   {function}  setStations        Function to set array with station ids from the module that called it
 */   
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