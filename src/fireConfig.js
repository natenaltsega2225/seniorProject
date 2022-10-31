import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import 'firebase/analytics'
import 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyBi3m7PNcMaU6j7mEGtVenlkBfFR96OzlM",
  authDomain: "ethiofood-f0863.firebaseapp.com",
  projectId: "ethiofood-f0863",
  storageBucket: "ethiofood-f0863.appspot.com",
  messagingSenderId: "372498772854",
  appId: "1:372498772854:web:03f46c8ed233ec15dac057"


};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export default app
export {db,storage}