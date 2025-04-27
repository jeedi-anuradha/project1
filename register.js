// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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


//submit button
const submit = document.getElementById('submit')
submit.addEventListener('click', function (event) {
  event.preventDefault();
  //Inputs
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('creating account')
      window.location.href='index.html';
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      // ..
    });

})
document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();
  
  // Clear previous errors
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
      document.getElementById('passwordError').textContent = 'Password length must be at least 8.';
      isValid = false;
  }

  if (isValid) {
      alert('Form submitted successfully!');
      // Submit the form or handle the form submission logic here
      // this.submit();  // Uncomment this to allow form submission after validation
  }
});
