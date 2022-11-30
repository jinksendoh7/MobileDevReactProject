import * as firebase from 'firebase';
import '@firebase/firestore';

// need to run: npm install --save firebase
// We will use the JS SDK with React Native

const firebaseConfig = {
  apiKey: "AIzaSyALaH1rTRuVPPqxEHK4B7H8SwhpYnUDsss",
  authDomain: "mobile1-7e02d.firebaseapp.com",
  projectId: "mobile1-7e02d",
  storageBucket: "mobile1-7e02d.appspot.com",
  messagingSenderId: "541263572735",
  appId: "1:541263572735:web:ff1809b7d9fcdf122826ca"
};

var app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
}else {
  app = firebase.app(); // if already initialized, use that one
}

export const db = app.database();
export const firestore = firebase.firestore(app);
export const auth = app.auth();