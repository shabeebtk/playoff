import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useState } from 'react';
import userAxiosIntance from '../instance/axios/UserAxiosInstance';
import { saveFCMtoken } from '../instance/endpoints/user/userEndpoints';

const firebaseConfig = {
  apiKey: "AIzaSyCCp3OsQ-4bO8cR6NPPGcVagbZBVfkZMp8",
  authDomain: "playoff-turf-management.firebaseapp.com",
  projectId: "playoff-turf-management",
  storageBucket: "playoff-turf-management.appspot.com",
  messagingSenderId: "312664297251",
  appId: "1:312664297251:web:9b1bea696b961dd6304696",
  measurementId: "G-86H8X5FZ5S"
};

initializeApp(firebaseConfig);
const messaging = getMessaging();


export const requestForToken = async () => {
  return getToken(messaging, { vapidKey: 'BHSYRW5cy7L6YhmHQOCcvcvdM1MUVdJ3rRSEZ7mpxLXKcyECcPu1o9INtqo66vWrd08AVOVdX2L0Uit0sTrgZnc' })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        userAxiosIntance.post(saveFCMtoken, {
          fcm_token: currentToken
        })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((error) => {
      console.log('An error occurred while retrieving token. ', err);
    })
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  })















