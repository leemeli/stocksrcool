import React from 'react';
import firebase from 'firebase';
import SignUpForm from './SignUp';
import {hashHistory} from 'react-router';

export default class SignUpApp extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
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
  //A callback function for registering new users
  signUp(email, password, fullName) {
    /* Create a new user and save their information */
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(function(firebaseUser) {
        //include information (for app-level content)
        var profilePromise = firebaseUser.updateProfile({
          displayName: fullName,
          stocks: [],
          cash: 5000
        }); //return promise for chaining

        //create new entry in the Cloud DB (for others to reference)
		var userRef = firebase.database().ref('users/'+firebaseUser.uid); 
        var userData = {
          fullName:fullName,

          stocks:[''],
          cash: 5000
        }
        var userPromise = userRef.set(userData); //update entry in JOITC, return promise for chaining
        return Promise.all(profilePromise, userPromise); //do both at once!
      })
      .then(() => this.forceUpdate()) //bad, but helps demo
      .catch((err) => console.log(err));
  }
  
componentWillUnmount() {
    //when the component is unmounted, unregister using the saved function
    if(this.unregister){ //if have a function to unregister with
        this.unregister(); //call that function!
    }
}

  render() {
      return (<div id="signUpDiv"><SignUpForm signUpCallback={this.signUp}/>
               <div className="container">
                    <div className="row header">
                        <h3>Start exploring our virtual stock market by signing up!</h3>
                    </div>
                    
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore cumque, obcaecati ex eveniet reiciendis, quaerat placeat itaque totam magnam aperiam repellat quis possimus perspiciatis debitis incidunt. Natus molestiae non nobis.</p>
                    <p>Excepturi, vitae veniam doloremque nihil reprehenderit adipisci, perspiciatis, assumenda laudantium molestiae blanditiis tempore saepe odio. Ipsum nobis, nulla molestias. Alias dolorem voluptatem, voluptatibus eveniet, aspernatur nesciunt cumque iste sint sed.</p>
                </div>
              </div>
              );
    
  }
}
