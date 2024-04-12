import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: "AIzaSyByyNsgyLABkJyGqUJZDhW6PsHQ1A27zIU",
  authDomain: "machineanalytics-88acf.firebaseapp.com",
  projectId: "machineanalytics-88acf",
  storageBucket: "machineanalytics-88acf.appspot.com",
  messagingSenderId: "736466400681",
  appId: "1:736466400681:web:2f7c10cb0d5e85c6b800b8"
};

firebase.initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
