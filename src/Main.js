import React from 'react';
import Nav from './Nav';
import PoliticalBar from './PoliticalBar';
import Timeline from './Timeline';
import StockTable from './StockTable';
import SignUpApp from './SignUpApp';
import SignIn from './SignIn';
import firebase from 'firebase';
import {hashHistory} from 'react-router';

export default class MainPage extends React.Component {
    constructor(props){
        super(props);
        var user = firebase.auth().currentUser;
        this.state = {currentUser: user};
        this.updateState = this.updateState.bind(this);
    }

    updateState(stateChange){
        this.setState(stateChange);
    }

    render(){
        if(this.state.currentUser === null) {
            return (
                <div>
                <main role="main">
                <SignIn />
                <SignUpApp />
                </main>
                </div>
            );
         }
         else {
            return (
                <div>
                <Nav updateParent={this.updateState}/>
                <main role="main">
                    <PoliticalBar />
                    <Timeline />
                    <StockTable />
                </main>
                </div>
            );
        }
    }
}