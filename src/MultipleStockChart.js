import React from 'react';
import { Line } from 'react-chartjs-2';

// A class for displaying a graph with multiple companies at once using Chart.js
export default class MultipleStockChart extends React.Component {

    render() {

        // The rotation of colors for each company (rewinds to red on i > 5)
        var colors = ['red', 'orange', 'green', 'blue', 'purple'];

        // All stocks and their codes
        var allStocks = this.props.stocks;
        var stockCodes = this.props.stockCodes;

        // All stocks' datasets
        var stockDatasets = [];

        // Whether we have found the date yet (because there will be only one date)
        var dates = false;

        var that = this;

        allStocks.forEach(
            function (stock, i) {

                var currentStock = stock.slice(0, that.props.span);

                // Set the date if it hasn't been set
                if (!dates) {
                    dates = currentStock.map(function (x) {
                        return x[0];
                    });
                }

                // Close price
                var closePrice = currentStock.map(function (x) {
                    return x[4];
                });

                // Reverse the arrays since the way it's returned is backwards
                currentStock = currentStock.reverse();
                dates = dates.reverse();

                // Create a new entry for the dataset corresponding to a company's stock!
                stockDatasets.push({
                    label: stockCodes[i],
                    data: closePrice,
                    borderColor: colors[i % colors.length],
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                });
            }
        );

        // How Chart.js eats data to turn into graphs
        var data = {
            labels: dates,
            datasets: stockDatasets
        };

        return (
            <section className="container stock-chart" role="region">
                <h2 className="stock-chart-title gentle-title">{this.props.name}</h2>
                <Line data={data} width={70} height={50} options={{ maintainAspectRatio: true }} />
            </section>
        )
    }
}