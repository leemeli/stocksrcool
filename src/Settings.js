import React from 'react';
import Nav from './Nav';
import firebase from 'firebase';
import { hashHistory } from 'react-router';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            warning: false,
            changeName: false,
            invalidName: false,
            cash: '',
            name: ''
        };

        this.updateState = this.updateState.bind(this);
        this.bankruptcyWarning = this.bankruptcyWarning.bind(this);
        this.nameChangeClick = this.nameChangeClick.bind(this);
        this.confirmNameChange = this.confirmNameChange.bind(this);
        this.bankruptcy = this.bankruptcy.bind(this);
    }

    updateState(stateChange) {
        this.setState(stateChange);
    }

    // File for bankruptcy!
    bankruptcy() {
         var user = firebase.auth().currentUser;
         var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
         var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks');
         var userWorthRef = firebase.database().ref('users/' + user.uid + '/netWorth');
         userStockRef.set([]);
         userCashRef.set(5000);
         userWorthRef.set(5000);
         this.forceUpdate();
         this.setState(
            {
                cash: 5000
            }
        );
    }

    // Warns the user that they are about to file for bankruptcy
    bankruptcyWarning() {
        if (!this.state.warning){
            this.setState(
                {
                    warning: true
                }
            );
        }
        else {
            this.setState(
                {
                    warning: false
                }
            );
        }
    }

    confirmNameChange(event){
        var user = firebase.auth().currentUser;
        var userNameRef = firebase.database().ref('users/' + user.uid + '/fullName');
        var nameValue = document.getElementById("nameBox").value;
        if (nameValue.length > 2){
            userNameRef.set(nameValue);
            this.forceUpdate();
            this.setState(
                {
                    changeName: false,
                    name: nameValue,
                    invalidName: false
                }
            );
        }
        else {
            this.setState(
                {
                    invalidName: true
                }
            )
        }
    }

    nameChangeClick(){
        if (!this.state.changeName){
            this.setState(
                {
                    changeName: true
                }
            );
        }
        else {
            this.setState(
                {
                    changeName: false
                }
            );
        }
    }

    // If user is not authenticated, show login page
    componentWillMount() {
        var that = this;
        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    if (user.email !== null) {
                        console.log("You're logged in as", user.email);

                        var fullName = '';
                        var userNameRef = firebase.database().ref('users/' + user.uid + '/fullName');
                        userNameRef.once('value')
                            .then(function (snapshot) {
                                fullName = snapshot.val();
                                that.setState({
                                    name: fullName
                                });
                            }
                            ).then(function () {
                                var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
                                userCashRef.once('value')
                                    .then(function (snapshot) {

                                        // Cash assets
                                        var cashVal = snapshot.val();

                                        that.setState(
                                            {
                                                cash: (cashVal).toFixed(2),
                                            }
                                        );
                                    });
                            })
                    }
                } else {
                    console.log('Not logged in, redirecting to login page');
                    hashHistory.push('/login');
                }
            }
        );
    }

    //field="fullName" 
    render() {
        return (
            <div>
                <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                <div id="settings">
                    <h3 className="text-center">Settings</h3>
                    <ul className="well list-unstyled center-block">
                        <li><span className="bold">Name</span>: {this.state.name}<a className="settings-option" onClick={this.nameChangeClick}>(change name)</a></li>
                         {this.state.changeName &&
                            <li><div className="text-danger">
                               <input type="text" id="nameBox"/>
                               <button type="button" className="btn" onClick={this.confirmNameChange}>Change Name</button>
                               {this.state.invalidName &&
                                   <div className="text-danger">Your name must be at least 3 characters long!</div>
                               }
                            </div></li>
                        }
                         <li><span className="bold">Your Cash</span>: {this.state.cash}</li>
                        <li id="deactivateBtn"><button type="button" className="btn btn-danger" onClick={this.bankruptcyWarning}>File for bankruptcy</button></li>
                    {this.state.warning &&
                        <li><div className="text-danger">
                            Are you sure? Filing for bankruptcy will reset your account. You will lose all of your current stocks.<br/>
                            <a onClick={this.bankruptcy}>Yes, reset my account!</a>
                        </div></li>
                    }
                    </ul>
                </div>
            </div>
        );
    }
}
// <li>Email: youremail@uw.edu <a href="#" className="pull-right">change email</a></li>

export default Settings;