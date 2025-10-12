import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDbao0F2uajYb3zCx-E8NKlwd8GSgFWLv0",
  authDomain: "portafolio-4fb0f.firebaseapp.com",
  databaseURL: "https://portafolio-4fb0f-default-rtdb.firebaseio.com/",
  projectId: "portafolio-4fb0f",
  storageBucket: "portafolio-4fb0f.firebasestorage.app",
  messagingSenderId: "69105401199",
  appId: "1:69105401199:web:e3de718639d17e992ebc9a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

export default app;
