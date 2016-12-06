import React from "react";
import Bootstrap from "react-bootstrap";
import firebase from 'firebase';


class StockTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buying: false,
            selling: false,
            quantity: 0,
            count: 0,
            lastStatus: false
        };
        this.startBuy = this.startBuy.bind(this);
        this.buy = this.buy.bind(this);

        this.startSell = this.startSell.bind(this);
        this.sell = this.sell.bind(this);

        this.cancel = this.cancel.bind(this);
    }

    // When component is about to be mounted, check the user's stock count for this row
    componentDidMount() {
        var user = firebase.auth().currentUser;
        var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + this.props.stockCode);
        userStockRef.once('value')
            .then(function (snapshot) {
                var stockCount = snapshot.val();
                if (!stockCount) {
                    stockCount = 0;
                }
                this.setState(
                    {
                        count: stockCount
                    }
                );
            }.bind(this));
    }

    // Start sale prompt
    startSell() {
        console.log('Starting sell');
        this.setState({
            buying: false,
            selling: true,
            quantity: 0,
        });
        console.log(this.state);
    }

    // Start buy prompt
    startBuy() {
        console.log('Starting buy');
        this.setState({
            buying: true,
            selling: false,
            quantity: 0,
        });
        console.log(this.state);
    }

    // Sell stocks
    sell() {
        var stockPrice = this.props.stock.slice(0, 1)[0][4];
        var stockCode = this.props.stockCode;
        var quantity = this.state.quantity;

        console.log('_____________________');
        console.log('[SELL] Code: ' + stockCode);
        console.log('Stock Price: ' + stockPrice);
        console.log('Quantity: ' + quantity);

        var user = firebase.auth().currentUser;

        

        if (quantity && quantity > 0) {

            var totalCost = quantity * stockPrice;
            console.log('Total returns: ' + totalCost);

            var newStockCount = null;
            var newMoneyValue = null;

            var that = this;

            // Check if the user actually has the number of stocks they're trying to sell
            var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + stockCode);
            userStockRef.once('value')
                .then(function (snapshot) {
                    var stockCount = snapshot.val();

                    // If they do have enough stocks, sell the stocks and add the money
                    if (stockCount && stockCount >= quantity) {

                        newStockCount = stockCount - quantity;

                        var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
                        userCashRef.once('value')
                            .then(function (snapshot2) {
                                var cash = snapshot2.val();
                                newMoneyValue = cash + totalCost;
                            })
                            .then(function () {
                                var stockPromise = userStockRef.set(newStockCount);
                                var cashPromise = userCashRef.set(newMoneyValue);

                                that.setState(
                                    {
                                        count: newStockCount,
                                        buying: false,
                                        selling: false,
                                        quantity: 0
                                    }
                                );
                                console.log('New stock count: ' + newStockCount);
                                console.log('New cash: ' + newMoneyValue);

                                return Promise.all([stockPromise, cashPromise]); //do both at once!
                            });
                    } else {
                        console.log("You don't have that many stocks to sell!");
                    }
                });
        }
    }

    // Buy stocks
    buy() {

        var stockPrice = this.props.stock.slice(0, 1)[0][4];
        var stockCode = this.props.stockCode;
        var quantity = this.state.quantity;

        console.log('_____________________');
        console.log('[BUY] Code: ' + stockCode);
        console.log('Stock Price: ' + stockPrice);
        console.log('Quantity: ' + quantity);

        var user = firebase.auth().currentUser;

        // Check the total price of stocks (stock price * quantity)
        

        if (quantity && quantity > 0) {
            var totalCost = quantity * stockPrice;
            console.log('Total cost: ' + totalCost);

            var newStockCount = null;
            var newMoneyValue = null;

            var that = this;

            var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
            userCashRef.once('value')
                .then(function (snapshot) {
                    var cash = snapshot.val();

                    if (cash >= totalCost) {
                        console.log('Sufficient funds!');
                        // Get reference to the user for the current stock
                        var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + stockCode);
                        userStockRef.once('value')
                            .then(function (snapshot2) {
                                var previousStocks = snapshot2.val();
                                newStockCount = previousStocks + quantity;
                                newMoneyValue = cash - totalCost;
                            })
                            .then(function () {
                                var stockPromise = userStockRef.set(newStockCount);
                                var cashPromise = userCashRef.set(newMoneyValue);

                                that.setState(
                                    {
                                        count: newStockCount,
                                        buying: false,
                                        selling: false,
                                        quantity: 0
                                    }
                                );
                                console.log('New stock count: ' + newStockCount);
                                console.log('New cash: ' + newMoneyValue);

                                return Promise.all([stockPromise, cashPromise]); //do both at once!
                            });
                    } else {
                        console.log('Inefficient funds! You have $' + cash + ', but the stocks you want to purchase cost $' + totalCost + '.');
                    }
                }
                );
        }
    }


    // Sets both buying and selling to false
    cancel() {
        console.log('Cancelled');
        this.setState({
            buying: false,
            selling: false,
            quantity: 1
        });
        console.log(this.state);
    }

    onChange(e) {
        e.preventDefault();
        this.setState(
            {
                quantity: parseInt(e.target.value)
            }
        );
    }





    render() {
        var name = this.props.name;

        var shortName = name.substr(0, name.indexOf('('));

        var closePrice = this.props.stock.slice(0, 1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0, 1)[0][4] - this.props.stock.slice(0, 1)[0][1]) * 100) / 100;

        return (
            <tr>
                <td>{shortName}</td>
                <td>Democrat</td>
                <td>${closePrice}</td>
                <td>{netChange}%</td>
                <td className="buy-sell-container">
                    {/* Default appearance */
                        (!this.state.buying && !this.state.selling) &&
                        <div>
                            <button className="btn btn-primary buy-sell" onClick={this.startBuy}>Buy</button>
                            <button className="btn btn-default buy-sell" disabled={this.state.count < 1} onClick={this.startSell}>Sell ({this.state.count})</button>
                        </div>
                    }

                    {/*When "buy" is selected */
                        (this.state.buying && !this.state.selling) &&
                        <div>
                            <h4>How many would you like to buy?</h4>
                            <div>
                                <div>
                                    <label>Enter amount</label>
                                    <input className="form-control" type="number" min="1" value={this.state.quantity} onChange={(e) => this.onChange(e)}></input>
                                </div>
                                <div className="cancel-container">
                                    <button className="btn-primary" onClick={this.buy}>Buy</button>
                                    <button onClick={this.cancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }

                    {/*when "sell" is selected */
                        (!this.state.buying && this.state.selling) &&
                        <div>
                            <h4>How many would you like to sell?</h4>
                            <p>You currently have {this.state.count} of this stock.</p>
                            <div>
                                <div>
                                    <label>Enter amount</label>
                                    <input className="form-control" type="number" min="1" value={this.state.quantity} onChange={(e) => this.onChange(e)}></input>
                                </div>
                                <div className="cancel-container">
                                    <button className="btn-primary" onClick={this.sell}>Sell</button>
                                    <button onClick={this.cancel}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    }
                </td>
            </tr>
        )
    }
}


export default StockTableRow;
export { StockTableRow };