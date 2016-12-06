import React from "react";
import Bootstrap from "react-bootstrap";
import firebase from 'firebase';


export default class StockTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
        this.buy = this.buy.bind(this);
    }

    // Buy stocks
    buy() {

        var stockPrice = this.props.stock.slice(0,1)[0][4];

        console.log('_____________________');
        console.log(this.props.name);
        console.log('Stock Price: ' + stockPrice);
        console.log('Code: ' + this.props.stockCode);

        var user = firebase.auth().currentUser;

        //_____________________
        // First, check if the user has enough money to purchase the stock! if not, say insufficient funds
        var userCashRef =
            firebase.database().ref('users/' + user.uid + '/cash');

        var cash = null;

        userCashRef.on('value',
            (snapshot) => {
                cash = snapshot.val();
            }
        );
        console.log('Cash: ' + cash);

        // Check the total price of stocks (stock price * quantity)
        var quantity = 5;
        var totalCost = quantity * stockPrice;

        console.log('Total cost: ' + totalCost);

        if (cash >= totalCost) {
            //_____________________
            // Get reference to the user for the current stock
            var stockCode = this.props.stockCode;
            var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + stockCode);

            // If they have previously purchased stocks
            var previousStocks = null;

            userStockRef.on('value',
                (snapshot) => {
                    previousStocks = snapshot.val();
                }
            );

            // Add the new number of stocks
            var newStockCount = null;

            newStockCount = previousStocks + quantity;

            // Set the new cash value
            var newMoneyValue = cash - totalCost;


            // Calculate new net worth
            console.log('calculating new net worth');

            // Promise change
            var stockPromise = userStockRef.set(newStockCount); //update entry in JOITC, return promise for chaining
            var cashPromise = userCashRef.set(newMoneyValue);

            return Promise.all([stockPromise, cashPromise]); //do both at once!
        } else {
            console.log('Inefficient funds! You have $' + cash + ', but the stocks you want to purchase cost $' + totalCost + '.');
        }
    }

    render() {
        var name = this.props.name;

        var shortName = name.substr(0, name.indexOf('('));

        var close = this.props.stock.slice(0,1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0,1)[0][4] - this.props.stock.slice(0,1)[0][1])*100) / 100;
        return (
            <tr>
                <td>{shortName}</td>
                <td>${close}</td>
                <td>{netChange}%</td>
                <td>Democrat</td>
                <td className="btn btn-primary" onClick={this.buy}>Buy</td>
            </tr>
        )
    }
}


