import React from "react";
import firebase from 'firebase';

class PortfolioTableRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPrice: 0,
            purchasePrice: 0,
            netChange: 0,
            percentChange: 0,
        };
        this.componentDidMount = this.componentDidMount.bind(this);
        this.componentWillMount = this.componentWillMount.bind(this);
    }

    // When component is about to be mounted, check the user's stock count for this row
    componentDidMount() {
        var that = this;

        var user = firebase.auth().currentUser;
        var userStockRef = firebase.database().ref('users/' + user.uid + '/stocks/' + this.props.stockCode);
        //console.log(this.props.stockCode);
        userStockRef.once('value')
            .then(function (snapshot) {
                var stockCount = snapshot.val();
                //console.log(stockCount);
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
    }

componentWillMount() {
        var that = this;
        firebase.auth().onAuthStateChanged(
            user => {
                if (user) {
                    if (user.email !== null) {
                        var userStockPriceRef = firebase.database().ref('users/' + user.uid + '/stockPrices/' + this.props.stockCode);
                            userStockPriceRef.once('value').then(function (snapshot) {
                                    var price = snapshot.val();
                                    //console.log('price: ', price);
                                    if (!price) {
                                        price = 0;
                                    }
                                    that.setState(
                                        {
                                            purchasePrice: price
                                        }
                                    );
                                }
                            );
                    }
                }
            }
        );
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
        var symbolCode = this.props.stockCode;
        //console.log('Hello', symbolCode);

        var closePrice = (this.props.stock.slice(0, 1)[0][4]).toFixed(2);
        var totalValue = (closePrice * this.props.quantity).toFixed(2);
        var netChange = (closePrice - this.state.purchasePrice).toFixed(2);
        var totalNetChange = (netChange * this.props.quantity).toFixed(2);
        var percentChange = ((netChange/this.state.purchasePrice) * 100).toFixed(2);
        // Style for positive or negative net change (red or green)
        var netChangeStyle = '';

        if (netChange < 0) {
            netChangeStyle = 'redBox';
        } else if (netChange > 0) {
            netChangeStyle = 'greenBox';
        }
        return (
            <tr>
                <td>{shortName}</td>
                <td>{this.props.stockCode}</td>
                <td>{this.props.quantity}</td>
                <td>${this.state.purchasePrice}</td>
                <td>${closePrice}</td>
                <td>${totalValue}</td>
                <td className={netChangeStyle}>${netChange}</td>
                <td className={netChangeStyle}>${totalNetChange}</td>
                <td>{percentChange}%</td>
            </tr>
        )
    }
}


export default PortfolioTableRow;
export { PortfolioTableRow };