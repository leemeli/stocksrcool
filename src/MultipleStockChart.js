import React from 'react';
import { Line } from 'react-chartjs-2';

// A class for displaying a graph with multiple companies at once
export default class MultipleStockChart extends React.Component {

    render() {

        var colors = ['red', 'orange', 'green', 'blue', 'purple'];

        var allStocks = this.props.stocks;
        var stockCodes = this.props.stockCodes;

        var stockDatasets = [];

        var dates = false;

        allStocks.forEach(
            function (stock, i) {

                var currentStock = stock.slice(0, 7);
                currentStock = currentStock.reverse();

                if (!dates) {
                    dates = currentStock.map(function (x) {
                        return x[0];
                    });
                }
                var closePrice = currentStock.map(function (x) {
                    return x[4];
                });

                var color = colors[i % 5];

                stockDatasets.push({
                    label: stockCodes[i],
                    data: closePrice,
                    borderColor: colors[i % colors.length],
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                });
            }
        );

        var data = {
            labels: dates,
            datasets: stockDatasets
        };

        return (
            <div className="container stock-chart">
                <h2 className="stock-chart-title">{this.props.name}</h2>
                <Line data={data} width={70} height={50} options={{ maintainAspectRatio: true }} />
            </div>
        )
    }
}