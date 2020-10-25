import * as firebase from "firebase/app";
import moment from 'moment';

import { firebaseConfig } from "./firebase";

import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Tests the temperature api
export const testing = async () => {
  const db = firebase.firestore();

  var tempStationRef = db.collection('data').doc('temperature').collection('76031').orderBy("timestamp").startAt(moment(1568657396).unix()).endAt(moment(1569506400).unix());

  tempStationRef.onSnapshot((snapshot) => {
    const tempData = [12];
    snapshot.forEach((doc) => tempData.push({ ...doc.data(), id: doc.id }));
    return tempData
  });

}

/**
 * return historic temperature data based on LGA and date range
 * @param   {number}    station            Station number
 * @param   {function}  setTempData        Function to set temperature array from the module that called it
 * @param   {number}    startAt            Timestamp at the start date
 * @param   {number}    endAt              Timestamp at the end date
 */  
export const getTemperature = async (station='', setTempData, startAt, endAt) => {
  const db = firebase.firestore();

  var tempStationRef = db.collection('data').doc('temperature').collection(station).orderBy("timestamp").startAt(startAt).endAt(endAt);
  
  
  return tempStationRef.onSnapshot((snapshot) => {
    const tempData = [];
    snapshot.forEach((doc) => tempData.push({ ...doc.data(), id: doc.id }));
    console.log('Fetched all data', tempData);
    setTempData(tempData);
  });
}

/**
 * return forecasted temperature data based on LGA and date range
 * @param   {number}    station            Station number
 * @param   {function}  setTempData        Function to set temperature data from the module that called it
 * @param   {number}    startAt            Timestamp at the start date
 * @param   {number}    endAt              Timestamp at the end date
 * @return  {array}                        Array of forecasted temperature values by timestamp 
 */  
export const getForecastedTemperature= async (station='', setTempData, startAt, endAt) => {
  const db = firebase.firestore();
  var tempStationRef = db.collection('forecast').doc('temperature').collection(station).orderBy("timestamp").startAt(startAt).endAt(endAt);
  
  return tempStationRef.onSnapshot((snapshot) => {
    let tempData = [];
    snapshot.forEach((doc) => tempData.push({ ...doc.data(), id: doc.id }));
    console.log('Fetched all data', tempData);
    setTempData(tempData);
  });
}