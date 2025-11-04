// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js"; // optional

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC5uSrI9fgF-3ZZRkrgzN1PS8tqqkUf-js",
  authDomain: "finalhandin.firebaseapp.com",
  projectId: "finalhandin",
  storageBucket: "finalhandin.appspot.com", 
  messagingSenderId: "268572973465",
  appId: "1:268572973465:web:448376925c375914619b08",
  measurementId: "G-QHKD03PG8Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// SIGN UP
document.getElementById('signupForm').addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.getElementById('signUpEmail').value;
  let password = document.getElementById('signUpPass').value;

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Account created successfully!");
    window.location.href = "index.html";
  } catch (error) {
    alert(error.message);
  }
});

// LOGIN
document.getElementById('loginForm').addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = document.getElementById('signInEmail').value;
  let password = document.getElementById('signInPass').value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful!");
    window.location.href = "../index.html";
  } catch (error) {
    alert(error.message);
  }
});
