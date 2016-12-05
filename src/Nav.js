import React from 'react';
import firebase from 'firebase';
// import {hashHistory} from 'react-router';

export default class Nav extends React.Component {
    constructor(props){
        super(props);
        this.updateParent = this.props.updateParent;
        this.signOut = this.signOut.bind(this);
    }

    //A callback function for logging out the current user
    signOut(){
        /* Sign out the user, and update the state */
        console.log('Signing out');
        firebase.auth().signOut();
        this.updateParent({currentUser: null});
    }

    render(){
        
        return(
         <header role="banner">

        {/*Sidebar*/}
        <ul className="sidebar" id="leftSidebar">
                <h3>Stocks R Us</h3>
                {/*Insert user-specific information here
                Welcome back, [Insert current users name]!
                Cash: [Insert cash amount] */}
                <li><a href="#home">Home</a></li>
                <li><a href="#portfolio">My Portfolio</a></li>
                <li><a href="#timeline">My Timeline</a></li>
                <li><a href="#settings">Settings</a></li>
        </ul>
        <div className="logout">
              <button className="btn btn-warning" onClick={()=>this.signOut()}>Sign out</button>
        </div>
    </header>
        );
    }
}