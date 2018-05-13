import Rebase from "re-base";
import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAIAE43Szod9eU_l25gOP8zs1129H4heLU",
  authDomain: "catch-of-the-day-falgun.firebaseapp.com",
  databaseURL: "https://catch-of-the-day-falgun.firebaseio.com",
});

const base = Rebase.createClass(firebaseApp.database());

export { firebaseApp };

export default base;
