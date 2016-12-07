import React from "react";
import firebase from 'firebase';

class StockTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buying: false,
            selling: false,
            quantity: 1,
            count: 0,
            affiliation: '',
            errorMessage: false,
            successMessage: false,
        };
        this.startBuy = this.startBuy.bind(this);
        this.buy = this.buy.bind(this);

        this.startSell = this.startSell.bind(this);
        this.sell = this.sell.bind(this);

        this.cancel = this.cancel.bind(this);
    }

    // When component is about to be mounted, check the user's stock count for this row
    componentDidMount() {
        var that = this;

        var user = firebase.auth().currentUser;
        var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + this.props.stockCode);
        userStockRef.once('value')
            .then(function (snapshot) {
                var stockCount = snapshot.val();
                if (!stockCount) {
                    stockCount = 0;
                }
                that.setState(
                    {
                        count: stockCount
                    }
                );
            }
        );

        // Now check the company's political affiliation!
        var politicalRef = firebase.database().ref('companies/' + (this.props.stockCode).toLowerCase());
        politicalRef.once('value')
            .then(function (snapshot) {
                var affiliationVal = snapshot.val();
                if (!affiliationVal) {
                    affiliationVal = 'Unknown';
                }
                that.setState(
                    {
                        affiliation: affiliationVal
                    }
                );
            });
    }

    // Start sale prompt
    startSell() {
        console.log('Starting sell');
        this.setState({
            buying: false,
            selling: true,
            quantity: 1,
            errorMessage: false,
            successMessage: false,
        });
        console.log(this.state);
    }

    // Start buy prompt
    startBuy() {
        console.log('Starting buy');
        this.setState({
            buying: true,
            selling: false,
            quantity: 1,
            errorMessage: false,
            successMessage: false,
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

                                var message = 'Successfully sold ' + quantity + ' ' + stockCode + ' stock for $' + totalCost.toFixed(2) + '!';

                                that.setState(
                                    {
                                        count: newStockCount,
                                        buying: false,
                                        selling: false,
                                        quantity: 1,
                                        errorMessage: false,
                                        successMessage: message
                                    }
                                );
                                console.log('New stock count: ' + newStockCount);
                                console.log('New cash: ' + newMoneyValue);

                                return Promise.all([stockPromise, cashPromise]); //do both at once!
                            });
                    } else {
                        console.log("You don't have that many stocks to sell!");
                        that.setState(
                            {
                                errorMessage: "You don't have that many stocks!"
                            }
                        );
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

                                var message = 'Successfully purchased ' + quantity + ' ' + stockCode + ' stock for $' + totalCost.toFixed(2) + '!';;

                                that.setState(
                                    {
                                        count: newStockCount,
                                        buying: false,
                                        selling: false,
                                        quantity: 1,
                                        errorMessage: false,
                                        successMessage: message
                                    }
                                );
                                console.log('New stock count: ' + newStockCount);
                                console.log('New cash: ' + newMoneyValue);

                                // Set the last purchased price for the stock:
                                var userStockPriceRef = firebase.database().ref('users/' + user.uid + '/stockPrices/' + stockCode);
                                var pricePromise = userStockPriceRef.set(stockPrice);



                                return Promise.all([stockPromise, cashPromise, pricePromise]); //do both at once!
                            });
                    } else {
                        console.log('Inefficient funds! You have $' + cash + ', but the stocks you want to purchase cost $' + totalCost + '.');
                        that.setState(
                            {
                                errorMessage: 'Not enough money!'
                            }
                        );
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
            quantity: 1,
            errorMessage: false,
            successMessage: false
        });
        console.log(this.state);
    }

    onChange(e) {
        e.preventDefault();
        this.setState(
            {
                // 10 is radix value, good to specify for parseInt
                // parseInt is to standardize values with leading zeroes
                quantity: parseInt(e.target.value, 10)
            }
        );
    }

    render() {
        var name = this.props.name;

        var shortName = name.substr(0, name.indexOf('('));

        var closePrice = this.props.stock.slice(0, 1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0, 1)[0][4] - this.props.stock.slice(0, 1)[0][1]) * 100) / 100;

        // Style for positive or negative net change (red or green)
        var netChangeStyle = '';

        if (netChange < 0) {
            netChangeStyle = 'text-danger';
        } else if (netChange > 0) {
            netChangeStyle = 'text-success';
        }

        // Political affiliation colors
        var affiliation = this.state.affiliation;
        var affiliationStyle = '';
        switch(affiliation) {
            case 'd':
                affiliation = 'Democrat';
                affiliationStyle = 'democrat';
                break;
            case 'r':
                affiliation = 'Republican';
                affiliationStyle = 'republican';
                break;
        }

        // Total cost of buying/selling stocks
        var totalCost = (closePrice * this.state.quantity).toFixed(2);
        var stockCode = this.props.stockCode;

        return (
            <tr>
                <td>{shortName}</td>
                <td>{stockCode}</td>
                <td className={affiliationStyle}>{affiliation}</td>
                <td>${closePrice}</td>
                <td className={netChangeStyle}>{netChange}%</td>
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
                            <p>You currently have {this.state.count} {/* space */}of this stock.</p>
                            {totalCost > 0.00 &&
                                <p className="purchase-info">Buying {this.state.quantity} of this stock will cost you about ${totalCost}!</p>
                            }
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
                            <p>You currently have {this.state.count} {/* space */}of this stock.</p>
                            <p className="purchase-info">You can sell {this.state.quantity} of this stock for ${totalCost}!</p>
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
                    {/* Error message display */
                        this.state.errorMessage !== false &&
                        <div className="text-danger">
                            {this.state.errorMessage}
                        </div>
                    }
                    {/* Success message display */
                        this.state.successMessage !== false &&
                        <div className="text-success">
                            {this.state.successMessage}
                        </div>
                    }
                </td>
            </tr>
        )
    }
}


export default StockTableRow;
export { StockTableRow };