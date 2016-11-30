import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component
import {Router, Route, hashHistory} from 'react-router';
import SignIn from './SignIn';
import MainPage from './Main';
import firebase from 'firebase';
//can load other CSS files (e.g,. Bootstrap) here
import 'bootstrap/dist/css/bootstrap.css';


//load our CSS file
import './index.css';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyBdng3b4dOrrRzHCsGNtintoohihmPzVDU",
    authDomain: "stocks-r-us.firebaseapp.com",
    databaseURL: "https://stocks-r-us.firebaseio.com",
    storageBucket: "stocks-r-us.appspot.com",
    messagingSenderId: "71820765377"
  };
  firebase.initializeApp(config);

//render the Application view
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="signin" component={SignIn} />
      <Route path="main" component={MainPage} />
    </Route>
  </Router>,
  document.getElementById('root')
);
