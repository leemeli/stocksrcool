import React from 'react';
import { Line } from 'react-chartjs-2';

// A class for displaying a graph with multiple companies at once
export default class MultipleStockChart extends React.Component {

    render() {

        var allStocks = this.props.stocks;

        var stockDatasets = [];

        var dates = false;

        for (var stock in allStocks) {

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

            stockDatasets.push({
                label: Object.keys(stock),
                data: closePrice,
                borderColor: "rgba(58,178,76,0.4)",
                backgroundColor: "rgba(58,178,76,0.0)"
            });
        }

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