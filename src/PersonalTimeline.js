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
            stockCodes: [],

            allStockObjects: [],
            allStockCodes: [],
            span: 7,

            cash: '',
            name: '',

            finished: false
        };
        

        this.apiShoppingList = this.apiShoppingList.bind(this);
        this.updateState = this.updateState.bind(this);

        
    }

    // Requests a bunch of stock codes to get data for
    // Stock codes list should not include stocks where the user has 0 of the stock
    apiShoppingList(codes) {
        var that = this;
        that.setState({
            allStockObjects: [],
            allStockCodes: []
        });
        var stockObjects = [];
        var stockCodes = [];

        console.log('API shopping list initiated');

        codes.forEach(function (stockCode, i) {
            fetch('https://www.quandl.com/api/v3/datasets/WIKI/' + stockCode + '.json?api_key=_-huFRLBpt58XiqjyQyU')
                .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' + response.status);
                        return;
                    }

                    // Examine the text in the response  
                    response.json().then(function (data) {
                        
                        stockObjects.push(data.dataset.data);
                        stockCodes.push(data.dataset.dataset_code);

                        if (stockObjects.length == codes.length) {
                            console.log('Final stock object!');
                            that.setState({
                                allStockObjects: stockObjects,
                                allStockCodes: stockCodes,
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
        

        var allStockCodes = [];

        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    if (user.email !== null) {
                        console.log("You're logged in as", user.email);

                        var stocksRef = firebase.database().ref('users/' + user.uid + '/stocks');
                        stocksRef.once('value')
                            .then(function(snapshot) {
                                var stockCompanyCount = Object.keys(snapshot).length;
                                console.log('SCC', stockCompanyCount);
                                snapshot.forEach(function(stock) {
                                    var stockCode = stock.key;
                                    var validQuantity = stock.val() > 0;
                                    if (stockCode && validQuantity) {
                                        allStockCodes.push(stockCode);
                                        console.log('Pushed ', stockCode);
                                        if (allStockCodes.length == stockCompanyCount) {
                                            that.setState({
                                                stockCodes: allStockCodes
                                            });
                                            that.apiShoppingList(that.state.stockCodes);
                                        }
                                    }
                                });
                            });

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
                            });
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
                    <MultipleStockChart name="My Timeline (closing prices)" stocks={this.state.allStockObjects} stockCodes={this.state.allStockCodes}/>
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
                    <div className="stocklist">
                        {/* we need multicolumn tables before this will work */}
                        {/*<StockTable name={this.state.allStockCodes} stock={this.state.allStockCodes} stockCode={this.state.allStockCodes}/>*/}
                    </div>
                </div>
            </div>
        );
    }
}