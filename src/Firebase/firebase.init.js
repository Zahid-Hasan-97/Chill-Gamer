// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAbDUMwSvlbwCiKd08rNR4nD5KiQW5cvNA",
    authDomain: "assignment-10-ac992.firebaseapp.com",
    projectId: "assignment-10-ac992",
    storageBucket: "assignment-10-ac992.firebasestorage.app",
    messagingSenderId: "219423386450",
    appId: "1:219423386450:web:1097e3e236fa65587f688b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;