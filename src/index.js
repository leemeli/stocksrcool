import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; //import our component
import {Router, Route, hashHistory} from 'react-router';
import SignIn from './SignIn';
//can load other CSS files (e.g,. Bootstrap) here
import 'bootstrap/dist/css/bootstrap.css';

//load our CSS file
import './index.css';

//render the Application view
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="SignIn" component={SignIn} />
    </Route>
  </Router>,
  document.getElementById('root')
);
