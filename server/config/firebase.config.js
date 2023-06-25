// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCP8wM0iNDQjZhfilwa0KT7WWWuwifGu3k",
  authDomain: "project-ts-53ffb.firebaseapp.com",
  projectId: "project-ts-53ffb",
  storageBucket: "project-ts-53ffb.appspot.com",
  messagingSenderId: "191175301985",
  appId: "1:191175301985:web:8906cfcbb4b72ceba10320",
  measurementId: "G-8KW73G9ZKN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
