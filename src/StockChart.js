import React from 'react';
import { Line } from 'react-chartjs-2';


export default class StockChart extends React.Component {
    
    render() {    
        var currentStocks = this.props.stock.slice(0, 7);
        var dates = currentStocks.map(function(x) {
            return x[0];
        });
        var highPrice = currentStocks.map(function (x) {
            return x[2];
        });
        var lowPrice = currentStocks.map(function (x) {
            return x[3];
        });
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

        return(
            <div>
                <h2>{this.props.name}</h2>
                <Line data={data} width={70} height={50} options={{maintainAspectRatio: false}}/>
            </div>
        )
    }
}