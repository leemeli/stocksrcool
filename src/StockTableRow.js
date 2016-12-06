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
    buy(e) {
        e.preventDefault();

        var stockPrice = this.props.stock.slice(0, 1)[0][4];
        var stockCode = this.props.stockCode;

        console.log('_____________________');
        console.log(this.props.name);
        console.log('Stock Price: ' + stockPrice);
        console.log('Code: ' + stockCode);

        var user = firebase.auth().currentUser;

        //_____________________
        // First, check if the user has enough money to purchase the stock! if not, say insufficient funds



        // Check the total price of stocks (stock price * quantity)
        var quantity = 5;
        var totalCost = quantity * stockPrice;
        console.log('Total cost: ' + totalCost);

        var newStockCount = null;
        var newMoneyValue = null;

        var userCashRef = firebase.database().ref('users/' + user.uid + '/cash');
        userCashRef.once('value')
            .then(function (snapshot) {
                var cash = snapshot.val();
                console.log('Cash: ' + cash);

                if (cash >= totalCost) {
                    console.log('Sufficient funds!');
                    // Get reference to the user for the current stock
                    var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + stockCode);
                    userStockRef.once('value')
                        .then(function (snapshot) {
                            var previousStocks = snapshot.val();
                            newStockCount = previousStocks + quantity;
                            newMoneyValue = cash - totalCost;
                        })
                        .then(function () {
                            var stockPromise = userStockRef.set(newStockCount);
                            var cashPromise = userCashRef.set(newMoneyValue);
                            return Promise.all([stockPromise, cashPromise]); //do both at once!
                        });
                    } else {
                        console.log('Inefficient funds! You have $' + cash + ', but the stocks you want to purchase cost $' + totalCost + '.');
                    }
            }
            );

        // if (newStockCount !== null && newMoneyValue !== null) {
        //     var stockPromise = userStockRef.set(newStockCount); //update entry in JOITC, return promise for chaining
        //     var cashPromise = userCashRef.set(newMoneyValue);
        //     return Promise.all([stockPromise, cashPromise]); //do both at once!
        // }
        // Promise change

    }










    render() {
        var name = this.props.name;

        var shortName = name.substr(0, name.indexOf('('));

        var close = this.props.stock.slice(0, 1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0, 1)[0][4] - this.props.stock.slice(0, 1)[0][1]) * 100) / 100;
        return (
            <tr>
                <td>{shortName}</td>
                <td>${close}</td>
                <td>{netChange}%</td>
                <td>Democrat</td>
                <td className="btn btn-primary" onClick={(e) => this.buy(e)}>Buy</td>
            </tr>
        )
    }
}


