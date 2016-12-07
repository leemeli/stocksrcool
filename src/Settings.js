import React from 'react';
import Nav from './Nav';
import firebase from 'firebase';
import { hashHistory } from 'react-router';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            warning: false,
            cash: '',
            name: ''
        };

        this.updateState = this.updateState.bind(this);
    }

    updateState(stateChange) {
        this.setState(stateChange);
    }

    // File for bankruptcy!
    bankruptcy() {

    }

    // Warns the user that they are about to file for bankruptcy
    bankruptcyWarning() {
        this.setState(
            {
                warning: 'bankruptcy'
            }
        );
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

    render() {
        return (
            <div>
                <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                <div id="settings">
                    <h3 className="text-center">Settings</h3>
                    <ul className="well list-unstyled center-block">
                        <li><span className="bold">Name</span>: your name <span className="settings-option">(change name)</span></li>
                        <li id="deactivateBtn"><button type="button" className="btn btn-xs btn-danger" onClick={this.bankruptcyWarning}>File for bankruptcy</button></li>
                    </ul>
                </div>
            </div>
        );
    }
}
// <li>Email: youremail@uw.edu <a href="#" className="pull-right">change email</a></li>

export default Settings;