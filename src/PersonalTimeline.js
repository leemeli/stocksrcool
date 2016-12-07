import React from 'react';
import Nav from './Nav';
import StockChart from './StockChart';
import { Button } from 'react-bootstrap';
import StockTable from './StockTable';

import firebase from 'firebase';
import { hashHistory } from 'react-router';

export default class PersonalTimeline extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            stockCodes: ['AAPL', 'MSFT'],

            allStockObjects: {},
            span: 7,

            cash: '',
            name: '',

            finished: false
        };
        var companies = ['AAPL', 'MSFT'];
        this.apiShoppingList(companies);

        this.updateState = this.updateState.bind(this);
    }

    // Requests a bunch of companies to get data for
    // Companies list should not include stocks where the user has 0 of the stock
    apiShoppingList(companies) {
        var that = this;
        that.setState({
            allStockObjects: {}
        });

        companies.forEach(function (stockCode) {
            fetch('https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=_-huFRLBpt58XiqjyQyU')
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        console.log(data);
                        // that.setState(
                        //     {
                        //         allStockObjects[stockCode] = data
                        //     }
                        // );
                        console.log('ALL STOCK OBJECTS: ') + this.state.allStockObjects;
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

    // Change time span to X
    changeTimeSpan(x) {
        this.setState({ span: x });
    }



    render() {

        if (!this.state.finished) {
            return (<p>Loading...</p>)
        }

        return (
            <div>
                <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                <div>
                    <StockChart name="My Timeline" stock={this.state.stock} />
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


            // <div>
            //     <StockChart name="My Timeline" stock={this.state.stock} />
            //     <ul className="timeline well" id="timelineGraph">
            //         <li><strong>View:</strong></li>
            //         <li><Button onClick={this.changeTimeSpan}>1d</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>1w</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>1m</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>3m</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>1y</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>5y</Button></li>
            //         <li><Button onClick={this.changeTimeSpan}>Max</Button></li>
            //     </ul>
            //     <StockTable name={this.state.company} stock={this.state.stock} stockCode={this.state.stockCode} />
            // </div>
        );
    }
}