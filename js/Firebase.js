// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT_FoXE0zUSh9i0P83wByt5UsdsodHM7M",
  authDomain: "introclass-c102e.firebaseapp.com",
  projectId: "introclass-c102e",
  storageBucket: "introclass-c102e.firebasestorage.app",
  messagingSenderId: "873363500893",
  appId: "1:873363500893:web:d2aaacc9be2c58ef47c2b4",
  measurementId: "G-LLKJB9YCLY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const auth = getAuth(app);

document.getElementById('signupForm').addEventListener("submit", async(e) =>{
    e.preventDefault();
    let email = document.getElementById('signUpEmail').value;
    let password = document.getElementById('signUpPass').value;

    try{
        await createUserWithEmailAndPassword(auth, email, password);
        alert ("Account has been created successfully");
        window.location.href = "index.html";
    }catch(error){
        alert (error.message);
    }
});

document.getElementById('loginForm').addEventListener("submit", async (e) => {
        e.preventDefault();
        let email = document.getElementById('signInEmail').value;
        let password = document.getElementById('signInPass').value;

            try{
        await signInWithEmailAndPassword(auth, email, password);
        alert ("Login successfully");
        window.location.href = "index.html";
    }catch(error){
        alert (error.message);
    }
});