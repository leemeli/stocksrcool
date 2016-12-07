import React from 'react';
import Nav from './Nav';
import PoliticalBar from './PoliticalBar';
import Timeline from './Timeline';

import firebase from 'firebase';
import { hashHistory } from 'react-router';

export default class MainPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            netWorth: false,
            cash: '',
            name: '',
            currentStock: 'MSFT', 
            val: '',
            faction: 'np'
        };
        this.updateState = this.updateState.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.updateCash = this.updateCash.bind(this);
        this.democrat = this.democrat.bind(this);
        this.republican = this.republican.bind(this);
        this.viewAll = this.viewAll.bind(this);
    }

    updateState(stateChange) {
        this.setState(stateChange);
    }

    handleChange(event) {
        this.setState({currentStock: event.target.value});
    }

    handleClick() {
        this.setState({currentStock: this.state.val});
    }

    // If user is not authenticated, show login page
    componentWillMount() {
        var that = this;
        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    if (user.email !== null) {
                        console.log("You're logged in as", user.email);

                        // Reevaluate user's net worth when the user is here:

                        var fullName = '';

                        // User's name to display
                        var userNameRef = firebase.database().ref('users/' + user.uid + '/fullName');
                        userNameRef.once('value')
                            .then(function(snapshot) {
                                fullName = snapshot.val();
                                that.setState({
                                    name: fullName
                                });
                            }

                            // User's cash to display
                            ).then(function() {
                                var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
                                userCashRef.once('value')
                                    .then(function(snapshot) {

                                        // Cash assets
                                        var cashVal = snapshot.val();

                                        that.setState(
                                            {
                                                cash: (cashVal).toFixed(2),
                                            }
                                        );
                                    });
                            });
                    }
                } else {
                    console.log('Not logged in, redirecting to login page');
                    hashHistory.push('/login');
                }
            }
        );
    }

    // Show only democrat companies!
    democrat() {
        console.log('Democrat!');
        this.setState({
            faction: 'd'
        });
    }
    // Show only republican companies!
    republican() {
        console.log('Republican!');
        this.setState({
            faction: 'r'
        });
    }
    // Show all companies!
    viewAll() {
        console.log('No preference!');
        this.setState({
            faction: 'np'
        });
    }
    updateCash(event){
        this.setState({cash: event})
    }

    render() {
        return (
            <div>
                <header role="banner">
                    <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                </header>
                <main role="main" id="loggedInMain">
                    <PoliticalBar change={this.handleChange} oc1={this.democrat} oc2={this.republican} oc3={this.viewAll}/>
                    <Timeline stock={this.state.currentStock} updateCash={this.updateCash} additionalStocks={true} faction={this.state.faction}/>
                    
                </main>
            </div>
        );
    }
}