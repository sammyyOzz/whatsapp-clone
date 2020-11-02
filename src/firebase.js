import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyBNF-q_ewBf3ip8SIFk80w9OcuVmwFWUq8",
    authDomain: "whatsapp-clone-eff6d.firebaseapp.com",
    databaseURL: "https://whatsapp-clone-eff6d.firebaseio.com",
    projectId: "whatsapp-clone-eff6d",
    storageBucket: "whatsapp-clone-eff6d.appspot.com",
    messagingSenderId: "766502272681",
    appId: "1:766502272681:web:237b9e8851f7fce394f3b8",
    measurementId: "G-8RTYSR2CN4"
  };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider }
export default db