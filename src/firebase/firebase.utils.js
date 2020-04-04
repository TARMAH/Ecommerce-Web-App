import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyA8hlziJI_eLsJB3XSI_DcYAbgg_l6Nnpc",
    authDomain: "crwn-db-db831.firebaseapp.com",
    databaseURL: "https://crwn-db-db831.firebaseio.com",
    projectId: "crwn-db-db831",
    storageBucket: "crwn-db-db831.appspot.com",
    messagingSenderId: "388676863729",
    appId: "1:388676863729:web:7fec19a7a1c0cc45940b50",
    measurementId: "G-ZXFL1C6MR9"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async (userAuth, additionalData) => {

  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {

    const { displayName, email } = userAuth;

    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }

  }

  return userRef;

};

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;
