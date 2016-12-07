import React from 'react';
import Nav from './Nav';
import MultipleStockChart from './MultipleStockChart';
import { Button } from 'react-bootstrap';
import StockTable from './StockTable';

import firebase from 'firebase';
import { hashHistory } from 'react-router';
import { Link } from 'react-router';


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

            finished: false,
            lastLoaded: false,
            noStocks: false
        };


        this.apiShoppingList = this.apiShoppingList.bind(this);
        this.updateState = this.updateState.bind(this);

        this.spanDay = this.spanDay.bind(this);
        this.spanWeek = this.spanWeek.bind(this);
        this.spanMonth = this.spanMonth.bind(this);
        this.spanThreeMonths = this.spanThreeMonths.bind(this);
        this.spanYear = this.spanYear.bind(this);
        this.spanFiveYears = this.spanFiveYears.bind(this);
        this.spanMonth = this.spanMonth.bind(this);


    }

    // Requests a bunch of stock codes to get data for
    // Stock codes list should not include stocks where the user has 0 of the stock
    apiShoppingList(codes, hasStocks) {
        var that = this;

        if (!hasStocks) {
            console.log('No stocks!');
            return that.setState({
                finished: true,
                noStocks: true
            });
        }

        var stockObjects = [];
        var stockCodes = [];

        console.log('API shopping list initiated');

        codes.forEach(function (stockCode) {
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

    spanDay() {
        this.setState({ span: 2 });
    }
    spanWeek() {
        this.setState({ span: 7 });
    }
    spanMonth() {
        this.setState({ span: 30 });
    }
    spanThreeMonths() {
        this.setState({ span: 90 });
    }
    spanYear() {
        this.setState({ span: 365 });
    }
    spanFiveYears() {
        this.setState({ span: 1825 });
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

                        var stocksRef = firebase.database().ref('users/' + user.uid + '/stocks/');
                        stocksRef.once('value')
                            .then(function (snapshot) {
                                var stockCompanyCount = 0;
                                // console.log(snapshot.val());

                                if (!snapshot.val()) {
                                    return that.apiShoppingList(that.state.stockCodes, false);
                                } else {
                                    stockCompanyCount = Object.keys(snapshot.val()).length;
                                }

                                var hasStocks = false;
                                var currentChecks = 0;

                                // console.log('SCC', stockCompanyCount);
                                snapshot.forEach(function (stock) {
                                    var stockCode = stock.key;
                                    var validQuantity = stock.val() > 0;

                                    if (stockCode && validQuantity) {
                                        allStockCodes.push(stockCode);
                                        console.log('Pushed', stockCode);
                                        that.setState({
                                            lastLoaded: (' ' + stockCode + ' done!')
                                        });

                                        hasStocks = true;
                                    }
                                    currentChecks++;
                                    // console.log(currentChecks);
                                    // console.log(stockCompanyCount);
                                    if (currentChecks == stockCompanyCount) {
                                        that.setState({
                                            stockCodes: allStockCodes
                                        });
                                        // console.log(hasStocks);
                                        that.apiShoppingList(that.state.stockCodes, hasStocks);
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

    render() {

        if (this.state.noStocks) {
            return (
                <section role="region" id="personal-timeline" className="text-center">
                    <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                    <div className="text-center go-buy-stocks gentle-title center-block">No stocks to view! Get out there and buy some stocks!</div>
                    <Link to="/main">Enter the market</Link>
                </section>
            );
        }

        // If loading data hasn't finished, show loading:
        else if (!this.state.finished) {
            return (
                <section role="region" id="personal-timeline">
                    <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                    <h2 className="text-center go-buy-stocks gentle-title center-block">Loading... {this.state.lastLoaded} </h2>
                </section>
            );
        }

        // if finished loading data:
        return (
            <section role="region" id="personal-timeline-region">
                <Nav updateParent={this.updateState} cash={this.state.cash} name={this.state.name} />
                <main role="main" id="personal-timeline">
                    <div>
                        <MultipleStockChart name="My Timeline (closing prices)" span={this.state.span} stocks={this.state.allStockObjects} stockCodes={this.state.allStockCodes} />
                        <ul className="timeline well" id="timelineGraph">
                            <li><strong>View:</strong></li>
                            <li><Button onClick={this.spanDay}>1d</Button></li>
                            <li><Button onClick={this.spanWeek}>1w</Button></li>
                            <li><Button onClick={this.spanMonth}>1m</Button></li>
                            <li><Button onClick={this.spanThreeMonths}>3m</Button></li>
                            <li><Button onClick={this.spanYear}>1y</Button></li>
                            <li><Button onClick={this.spanFiveYears}>5y</Button></li>
                        </ul>
                        {/* we need multicolumn tables before this will work */}
                        {/*<StockTable name={this.state.allStockCodes} stock={this.state.allStockCodes} stockCode={this.state.allStockCodes}/>*/}
                    </div>
                </main>
            </section>
        );
    }
}