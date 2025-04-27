// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbi9uPTie3mPIJjmSaQXrZ4cZJvcL1rVQ",
  authDomain: "login-8f3cc.firebaseapp.com",
  projectId: "login-8f3cc",
  storageBucket: "login-8f3cc.firebasestorage.app",
  messagingSenderId: "594850633279",
  appId: "1:594850633279:web:e7ef95db21806e7c478a8a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Submit button listener
const submit = document.getElementById('login');
submit.addEventListener('click', function (event) {
  event.preventDefault();

  // First, validate the form
  const formIsValid = validateForm(event);
  if (!formIsValid) return;  // If the form is not valid, do not proceed

  // Inputs
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  // Firebase sign-in
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Login success
      const user = userCredential.user;
      alert('Login success');
      window.location.href = 'index.html';
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
    });
});

// Hide the loader when the page is loaded
window.addEventListener("load", function() {
  document.getElementById("loader").style.display = "none"; // Hide the loader
});

// Validate the form
function validateForm(event) {
  // Prevent form submission by default (handled by the submit button)
  event.preventDefault();

  // Get the values from the form fields
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  let isValid = true;

  // Clear previous error messages
  document.getElementById('username-error').innerText = '';
  document.getElementById('password-error').innerText = '';

  // Validate Username (Ensure it's not empty and matches a basic email pattern)
  if (username === '') {
    document.getElementById('username-error').innerText = 'Username cannot be empty.';
    document.getElementById('username-error').style.color = 'red';
    isValid = false;
  } else if (!validateEmail(username)) {
    document.getElementById('username-error').innerText = 'Please enter a valid email.';
    document.getElementById('username-error').style.color = 'orange'; 
    isValid = false;
  }

  // Validate Password (Ensure it's not empty and meets a minimum length)
  if (password === '') {
    document.getElementById('password-error').innerText = 'Password cannot be empty.';
    document.getElementById('password-error').style.color = 'red'; 
    isValid = false;
  } else if (password.length < 6) {
    document.getElementById('password-error').innerText = 'Password must be at least 6 characters long.';
    document.getElementById('password-error').style.color = 'orange'; 
    isValid = false;
  }

  // Return the validity of the form
  return isValid;
}

// Function to validate email pattern
function validateEmail(email) {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailPattern.test(email);
}

document.getElementById('username-error').classList.add('error-message');
document.getElementById('password-error').classList.add('error-message');
