import React from 'react';
import SignUpApp from './SignUpApp';
import SignInApp from './SignInApp';
import About from './About';
import Footer from './Footer';
import firebase from 'firebase';

// The page for logging in and signing up!
export default class LoginPage extends React.Component {
    updateState(stateChange) {
        this.setState(stateChange);
    }

    // If user is logged in, log them out if they go to this page
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
                    <header role="banner">
                        <h1 className="title frontTitle">Stocks R Us</h1>
                    </header>
                    <main role="main">
                        <SignInApp />
                        <SignUpApp />
                    </main>
                </div>
                <About />
                <Footer />
            </div>
        );
    }
}

