import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCCTWjkt0LpmtqCKzJK2Qw7h0OO9VjJJ_4",
  authDomain: "freelancechat-566cc.firebaseapp.com",
  databaseURL: "https://freelancechat-566cc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "freelancechat-566cc",
  storageBucket: "freelancechat-566cc.appspot.com",
  messagingSenderId: "791808430946",
  appId: "1:791808430946:web:9c2288ff59b7f2242d923b",
  measurementId: "G-BDTKB8YVGF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);