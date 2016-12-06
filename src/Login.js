import React from 'react';
import SignUpApp from './SignUpApp';
import SignInApp from './SignInApp';
import About from './About';
import Footer from './Footer';
import firebase from 'firebase';

export default class LoginPage extends React.Component {
    // constructor(props) {
    //     super(props);
    //     // this.state = {
            
    //     // };
    // }

    updateState(stateChange) {
        this.setState(stateChange);
    }

    // If user is logged in, log them out
    componentWillMount() {
        var user = firebase.auth().currentUser;
        if (user) {
            console.log('Signing out');
            firebase.auth().signOut();
        }
    }

    render() {
        return (
            <div>
                <div id="front">
                    <h1 className="title">Stocks R Us</h1>
                    <SignInApp />
                    <SignUpApp />
                </div>
                <About />
                <Footer />
            </div>
        );
    }
}

