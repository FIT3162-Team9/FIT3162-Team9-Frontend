import * as firebase from "firebase/app";
import { firebaseConfig } from "./firebase";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

/**
 * return humidity and wind speed data based on LGA and date range (includes both historic and forecasted)
 * @param   {number}    LGA                LGA string in snake case
 * @param   {function}  setHumidityWind    Function to set humidity and wind data from the module that called it
 * @param   {number}    startAt            Timestamp at the start date
 * @param   {number}    endAt              Timestamp at the end date
 */  
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

