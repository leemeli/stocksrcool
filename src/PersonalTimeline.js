import React from 'react';
import Nav from './Nav';
import MultipleStockChart from './MultipleStockChart';
import { Button } from 'react-bootstrap';
import StockTable from './StockTable';

import firebase from 'firebase';
import { hashHistory } from 'react-router';

export default class PersonalTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockCodes: ['AAPL', 'MSFT' ,'AFL'],

            allStockObjects: {},
            span: 7,

            cash: '',
            name: '',

            finished: false
        };
        var companies = ['AAPL', 'MSFT', 'AFL'];
        

        this.apiShoppingList = this.apiShoppingList.bind(this);
        this.updateState = this.updateState.bind(this);

        this.apiShoppingList(companies);
    }

    // Requests a bunch of companies to get data for
    // Companies list should not include stocks where the user has 0 of the stock
    apiShoppingList(companies) {
        var that = this;
        that.setState({
            allStockObjects: {}
        });
        var stockObjects = [];

        companies.forEach(function (stockCode, i) {
            fetch('https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=_-huFRLBpt58XiqjyQyU')
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        
                        stockObjects[stockCode] = data.dataset.data;

                        if (i == companies.length - 1) {
                            console.log('Final stock object!');
                            that.setState({
                                allStockObjects: stockObjects,
                                finished: true
                            });
                            console.log(that.state.allStockObjects);
                        }

                        // currentStock.setState({ stock: data.dataset.data, company: data.dataset.name, stockCode: data.dataset.dataset_code });
                    });
                }
                )
                .catch(function (err) {
                    console.log('Fetch Error :-S', err);
                });
        });
    }

    updateState(stateChange) {
        this.setState(stateChange);
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

                                        that.setState({
                                            cash: (cashVal).toFixed(2),
                                        });
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

    // Change time span to X
    changeTimeSpan(x) {
        this.setState({ span: x });
    }



    render() {

        // If loading data hasn't finished, show loading:
        if (!this.state.finished) {
            return (
                <div>
                    <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                    <p className="text-center">Loading...</p>
                </div>
            );
        }

        // if finished loading data:
        return (
            <div>
                <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                <div>
                    <MultipleStockChart name="My Timeline" stocks={this.state.allStockObjects} />
                    <ul className="timeline well" id="timelineGraph">
                        <li><strong>View:</strong></li>
                        <li><Button onClick={this.changeTimeSpan}>1d</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>1w</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>1m</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>3m</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>1y</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>5y</Button></li>
                        <li><Button onClick={this.changeTimeSpan}>Max</Button></li>
                    </ul>
                </div>
            </div>
        );
    }
}