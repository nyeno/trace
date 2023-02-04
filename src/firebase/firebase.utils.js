import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'

const config = {
  apiKey: "AIzaSyBNHB1HqedABQLdHkMxHHZvL9e3agSRPvQ",
  authDomain: "devjobs-fa62b.firebaseapp.com",
  projectId: "devjobs-fa62b",
  storageBucket: "devjobs-fa62b.appspot.com",
  messagingSenderId: "373431437514",
  appId: "1:373431437514:web:4837678c1c78230f2a8c33",
  measurementId: "G-T1YMXFFJSW",
};

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomPamaters({ prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopUp(provider)

export default firebase