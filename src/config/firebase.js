
import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: "AIzaSyDVLGfqm4ZCryBGPUGfb58AgUUMGVz-jc8",
  authDomain: "addme-c74a4.firebaseapp.com",
  databaseURL: "https://addme-c74a4-default-rtdb.firebaseio.com",
  projectId: "addme-c74a4",
  storageBucket: "addme-c74a4.appspot.com",
  messagingSenderId: "337575543514",
  appId: "1:337575543514:web:39f7cf9d860f403cbddbe3"
};


export const app = initializeApp(firebaseConfig);
export default firebaseConfig