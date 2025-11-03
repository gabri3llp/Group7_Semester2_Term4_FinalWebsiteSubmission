// Firebase auth module (type="module"). Handles sign-up and sign-in using Firebase Auth.
// Replace firebaseConfig values with your own if necessary.

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

document.addEventListener('DOMContentLoaded', () => {
  // Firebase configuration (from your provided config)
  const firebaseConfig = {
    apiKey: "AIzaSyC5uSrI9fgF-3ZZRkrgzN1PS8tqqkUf-js",
    authDomain: "finalhandin.firebaseapp.com",
    projectId: "finalhandin",
    storageBucket: "finalhandin.firebasestorage.app",
    messagingSenderId: "268572973465",
    appId: "1:268572973465:web:448376925c375914619b08",
    measurementId: "G-QHKD03PG8Q"
  };

  try {
    const app = initializeApp(firebaseConfig);
    // analytics is optional and may fail in some environments (e.g., not served over https/localhost)
    try { getAnalytics(app); } catch (err) { /* ignore analytics errors */ }
  } catch (err) {
    console.error('Firebase initialization error:', err);
  }

  const auth = getAuth();

  const signupForm = document.getElementById('SN-signupForm');
  const loginForm = document.getElementById('SN-loginForm');

  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('SN-signupUserName')?.value?.trim() || '';
      const email = document.getElementById('SN-signUpEmail')?.value?.trim() || '';
      const password = document.getElementById('SN-signUpPass')?.value || '';

      if (!email || !password) {
        alert('Please enter email and password.');
        return;
      }

      try {
        // Create user with Firebase Auth
        await createUserWithEmailAndPassword(auth, email, password);

        // Optionally store a minimal local copy (not secure for sensitive data)
        const newUser = { username, email };
        const usersSN = JSON.parse(localStorage.getItem('usersSN') || '[]');
        usersSN.push(newUser);
        localStorage.setItem('usersSN', JSON.stringify(usersSN));

        alert('Account has been created successfully');
        signupForm.reset();
        // Redirect or toggle to login page view
        // If you want to show the login panel instead of redirect:
        const container = document.querySelector('.SN-container');
        if (container) container.classList.remove('active');

        // Optionally redirect to index.html (uncomment if desired)
        // window.location.href = "index.html";
      } catch (error) {
        console.error('Signup error:', error);
        alert(error.message || 'Signup failed');
      }
    });
  } else {
    console.warn('Signup form (#SN-signupForm) not found on the page.');
  }

  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('SN-signInEmail')?.value?.trim() || '';
      const password = document.getElementById('SN-signInPass')?.value || '';

      if (!email || !password) {
        alert('Please enter email and password.');
        return;
      }

      try {
        // Sign in with Firebase Auth
        await signInWithEmailAndPassword(auth, email, password);

        // Optionally you can store minimal logged in user info
        const usersSN = JSON.parse(localStorage.getItem('usersSN') || '[]');
        const localUser = usersSN.find(u => u.email === email);
        if (localUser) {
          localStorage.setItem('loggedInUserSN', JSON.stringify(localUser));
          alert(`Welcome back ${localUser.username}`);
        } else {
          alert('Login successful');
        }

        // Redirect to main app page:
        window.location.href = "index.html";
      } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed');
      }
    });
  } else {
    console.warn('Login form (#SN-loginForm) not found on the page.');
  }
});