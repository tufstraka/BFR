import firebase from 'firebase/app';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: `${process.env.VUE_APP_FIREBASE_API_KEY}`,
    authDomain: "biasedfilmreviews-c40dd.firebaseapp.com",
    projectId: "biasedfilmreviews-c40dd",
    storageBucket: "biasedfilmreviews-c40dd.appspot.com",
    messagingSenderId: "613927693608",
    appId: "1:613927693608:web:27a0b7af000f576668341d",
    measurementId: "G-LNDJFEETW7"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const timestamp = firebase.firestore.FieldValue.serverTimestamp;
  //firebase.analytics();

  export { timestamp };
  export default firebaseApp.firestore();
