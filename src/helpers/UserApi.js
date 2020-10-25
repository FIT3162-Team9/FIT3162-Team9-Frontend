
import React, {Component} from 'react';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import { firebaseConfig } from "./firebase";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

// Component used to initialise the user 
export const InitUser = () => {  
    function onAuthStateChanged(user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            console.log(`Logged in as anonymous: ${isAnonymous}`)
            console.log(`User id: ${uid}`)
          }
    }

    function initialise(){
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("Error", errorCode, errorMessage);

            // Attempt to initialise again
            initialise();
          });
    }
    
    React.useEffect(() => {
        initialise();

        // Rmo subscription when component 
        const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return unsubscribe;
    }, []);
  
    return <></>;
  };
  