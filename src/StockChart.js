import React from 'react';
import { Line } from 'react-chartjs-2';


export default class StockChart extends React.Component {

    render() {
        var currentStocks = this.props.stock.slice(0, this.props.span);

        var dates = currentStocks.map(function (x) {
            return x[0];
        });
        var highPrice = currentStocks.map(function (x) {
            return x[2];
        });
        var lowPrice = currentStocks.map(function (x) {
            return x[3];
        });
        dates = dates.reverse();
        highPrice = highPrice.reverse();
        lowPrice = lowPrice.reverse();

        var name = this.props.name;

        var data = {
            labels: dates,
            datasets: [{
                label: 'high',
                data: highPrice,
                borderColor: "rgba(58,178,76,0.4)",
                backgroundColor: "rgba(58,178,76,0.0)"
            }, {
                label: 'low',
                data: lowPrice,
                borderColor: "rgba(214,64,58,0.4)",
                backgroundColor: "rgba(214,64,58,0.0)"
            }]
        }

        var shortName = this.props.name.substr(0, this.props.name.indexOf('P'));

        return (
            <section className="container stock-chart" role="region" id="stock-chart-region">
                <h2 className="stock-chart-title gentle-title">{name}</h2>
                <Line data={data} width={70} height={50} options={{ maintainAspectRatio: true }} />
            </section>
                )
    }
}