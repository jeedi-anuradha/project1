// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


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
const submit = document.getElementById('login')
submit.addEventListener('click', function (event) {
  event.preventDefault();
  //Inputs
  const email = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('login success')
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

