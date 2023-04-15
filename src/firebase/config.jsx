import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDbWy7C1fHwjbs6ImA24cMeOqewlWrJJoI",
  authDomain: "objectdpc.firebaseapp.com",
  projectId: "objectdpc",
  storageBucket: "objectdpc.appspot.com",
  messagingSenderId: "120711364461",
  appId: "1:120711364461:web:c15bd83b2e888ff68d2464"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };