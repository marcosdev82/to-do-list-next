
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyD55XduV2H9c38KlO4SJDX9cKYtTG1me44",
    authDomain: "to-do-list-next-fe4b7.firebaseapp.com",
    projectId: "to-do-list-next-fe4b7",
    storageBucket: "to-do-list-next-fe4b7.firebasestorage.app",
    messagingSenderId: "838152249179",
    appId: "1:838152249179:web:cca5d4154d5ac7cfc1c47e",
    measurementId: "G-3WKMR61DMJ"
};


const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);
// const analytics = getAnalytics(firebaseApp);
export { db };