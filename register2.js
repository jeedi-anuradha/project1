// Import Firebase SDK functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";

// Firebase configuration
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

// Get form and submit button
const form = document.getElementById('registrationForm');
const submit = document.getElementById('submit');

// Add form submit event listener
form.addEventListener('submit', function (event) {
    event.preventDefault();  // Prevent default form submission

    // Clear previous error messages
    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';

    let isValid = true;

    // Validate Username
    const username = document.getElementById('username').value;
    const usernamePattern = /^[A-Za-z0-9]+$/;
    if (username.length < 3 || username.length > 20 || !usernamePattern.test(username)) {
        document.getElementById('usernameError').textContent = 'Username should only contain letters and numbers and be between 3-20 characters.';
        isValid = false;
    }

    // Validate Email
    const email = document.getElementById('email').value;
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById('emailError').textContent = 'Please enter a valid email address.';
        isValid = false;
    }

    // Validate Password
    const password = document.getElementById('password').value;
    if (password.length < 8) {
        document.getElementById('passwordError').textContent = 'Password must be at least 8 characters long.';
        isValid = false;
    }

    // If the form is valid, submit it to Firebase
    if (isValid) {
        // Get user credentials from form
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up successfully
                const user = userCredential.user;
                alert('Account created successfully');
                window.location.href = 'index.html';  // Redirect to another page
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert('Error: ' + errorMessage);  // Show error message from Firebase
            });
    }
});

// Grab elements for show password functionality
const passwordField = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('showPassword');

// Toggle password visibility
showPasswordCheckbox.addEventListener('change', function () {
    if (showPasswordCheckbox.checked) {
        passwordField.type = 'text';  // Show password
    } else {
        passwordField.type = 'password';  // Hide password
    }
});
