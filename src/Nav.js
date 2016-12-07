import React from 'react';
import firebase from 'firebase';
import { Link, hashHistory } from 'react-router';
// import {hashHistory} from 'react-router';

export default class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.updateParent = this.props.updateParent;
        this.signOut = this.signOut.bind(this);
    }

    //A callback function for logging out the current user
    signOut() {
        /* Sign out the user, and update the state */
        console.log('Signing out');
        firebase.auth().signOut();
        this.updateParent({ currentUser: null });
    }

    render() {

        return (
            <header role="banner">

                {/*Sidebar*/}
                <ul className="sidebar" id="leftSidebar">
                    <h1 className="title">Stocks R Us</h1>
                    <li className="welcome-back">Welcome back, {this.props.name}!</li>
                    <li className="cash">Cash: ${this.props.cash}</li>
                    <li><a href="#main" className="text-uppercase">Home</a></li>
                    <li><a href="#portfolio" className="text-uppercase">My Portfolio</a></li>
                    <li><a href="#timeline" className="text-uppercase">My Timeline</a></li>
                    <li><a href="#settings" className="text-uppercase">Settings</a></li>
                    <li><div className="logout">
                        <button className="btn btn-warning" onClick={() => this.signOut()}>Sign out</button>
                    </div></li>
                </ul>
            </header>
        );
    }
}