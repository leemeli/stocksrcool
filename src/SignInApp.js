import React from 'react';
import firebase from 'firebase';
import SignInForm from './SignIn';
import {hashHistory} from 'react-router';

export default class SignInApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {incorrectLogin: false};
    this.signIn = this.signIn.bind(this);
  }
  
  componentDidMount() {
    /* Add a listener and callback for authentication events */
    this.unregister = firebase.auth().onAuthStateChanged(user => {
      if(user) {
        this.setState({userId:user.uid});
      }
      else{
        this.setState({userId: null}); //null out the saved state
      }
    })
  }
signIn(email, password) {
    /* Sign in the user */
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        function() {
          hashHistory.push('/main');
        }
      )
      .catch((err) => {
        console.log(err)
        this.setState({incorrectLogin: true});
      });
  }

  //A callback function for logging out the current user
  signOut(){
    /* Sign out the user, and update the state */
    firebase.auth().signOut();
  }

componentWillUnmount() {
    //when the component is unmounted, unregister using the saved function
    if(this.unregister){ //if have a function to unregister with
        this.unregister(); //call that function!
    }
}

  render() {

      return (<div id="signInDiv"><SignInForm signInCallback={this.signIn}/>
      {this.state.incorrectLogin &&
          <p className="incorrectLogin">Incorrect login!</p>
      }
      </div>);
  }
}
