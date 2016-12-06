import React from 'react';
import firebase from 'firebase';
import SignUpForm from './SignUp';
import { hashHistory } from 'react-router';

export default class SignUpApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    /* Add a listener and callback for authentication events */
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({ userId: user.uid });
      }
      else {
        this.setState({ userId: null }); //null out the saved state
      }
    })
  }
  //A callback function for registering new users
  signUp(email, password, fullName) {
    /* Create a new user and save their information */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function (firebaseUser) {
        //include information (for app-level content)
        var profilePromise = firebaseUser.updateProfile({
          displayName: fullName,
          stocks: [],
          cash: 5000,
          netWorth: 5000,
        }); //return promise for chaining

        //create new entry in the Cloud DB (for others to reference)
        var userRef = firebase.database().ref('users/' + firebaseUser.uid);
        var userData = {
          fullName: fullName,
          stocks: [],
          cash: 5000,
          netWorth: 5000
        }
        var userPromise = userRef.set(userData); //update entry in JOITC, return promise for chaining
        return Promise.all([profilePromise, userPromise]); //do both at once!
      })
      .then(function () {
        console.log('Logged in!');
        hashHistory.push('/main');
      })
      // .then(() => this.forceUpdate()) //bad, but helps demo
      .catch((err) => console.log(err));
  }

  componentWillUnmount() {
    //when the component is unmounted, unregister using the saved function
    if (this.unregister) { //if have a function to unregister with
      this.unregister(); //call that function!
    }
  }

  render() {
    return (
      <div id="signUpDiv">
        <SignUpForm signUpCallback={this.signUp} />
      </div>);

  }
}
