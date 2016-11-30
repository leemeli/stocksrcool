import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component
import {Router, Route, hashHistory} from 'react-router';
import SignIn from './SignIn';
import MainPage form './Main';
//can load other CSS files (e.g,. Bootstrap) here

//load our CSS file
import './index.css';

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
