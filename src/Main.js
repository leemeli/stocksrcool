import React from 'react';
import Nav from './Nav';
import PoliticalBar from './PoliticalBar';
import Timeline from './Timeline';
import StockTable from './StockTable';
// import SignUpApp from './SignUpApp';
// import SignInApp from './SignInApp';
// import About from './About';
// import Footer from './Footer';
import firebase from 'firebase';
import { hashHistory } from 'react-router';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        // var user = firebase.auth().currentUser;
        // this.state = {
        //     currentUser: user
        // };
        this.updateState = this.updateState.bind(this);
    }

    updateState(stateChange) {
        this.setState(stateChange);
    }

    // If user is not authenticated, show login page
    componentWillMount() {
        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    if (user.email !== null) {
                        console.log("You're logged in as", user.email);
                    }
                } else {
                    console.log('Not logged in, redirecting to login page');
                    hashHistory.push('/login');
                }
            }
        );
    }

    render() {
        return (
             <div>
                <Nav updateParent={this.updateState} />
                <main role="main">
                    <PoliticalBar />
                    <Timeline stock="MSFT"/>
                </main>
            </div>
        );
    }
}