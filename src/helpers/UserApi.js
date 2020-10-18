
import React, {Component} from 'react';

import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";

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

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const InitUser = () => {  
    function onAuthStateChanged(user) {
        if (user) {
            // User is signed in.
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            console.log(`Logged in as anonymous: ${isAnonymous}`)
            console.log(`User id: ${uid}`)
            // ...
          } else {
            // User is signed out.
            // ...
          }
    }

    function initialise(){
        firebase.auth().signInAnonymously().catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
            initialise();
          });
    }
    
  
    React.useEffect(() => {
        initialise();

        const unsubscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);
        return unsubscribe;
    }, []);
  
    return <></>;
  };
  