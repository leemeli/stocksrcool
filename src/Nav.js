import React from 'react';
import firebase from 'firebase';
import { Link } from 'react-router';
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


                    <li><Link to="/main" className="text-uppercase">Home</Link></li>
                    <li><Link to="/portfolio" className="text-uppercase">My Portfolio</Link></li>
                    <li><Link to="/mytimeline" className="text-uppercase">My Timeline</Link></li>
                    <li><Link to="/settings" className="text-uppercase">Settings</Link></li>
                    <li><div className="logout">
                        <button className="btn btn-warning" onClick={() => this.signOut()}>Sign out</button>
                    </div></li>
                </ul>
            </header>
        );
    }
}