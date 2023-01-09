// Import the functions you need from the SDKs you need
// import { initializeApp } from 'firebase/app'; // old way

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD8-tWpidLF2Cwu42YSFe8NC2SQ4mYJ7L8',
  authDomain: 'rn-content-feed-app.firebaseapp.com',
  projectId: 'rn-content-feed-app',
  storageBucket: 'rn-content-feed-app.appspot.com',
  messagingSenderId: '678104941620',
  appId: '1:678104941620:web:1db804c0eb672dcf547661',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

// export default firebaseApp;
const firebaseAppAuth = getAuth(firebaseApp);

export { firebaseAppAuth };
