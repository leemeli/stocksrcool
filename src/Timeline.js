import React from 'react';
import StockChart from './StockChart';
import {Button} from 'react-bootstrap';
import StockTable from './StockTable';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stock:{}, company:"", stockCode: "", span: 7};
        this.getData = this.getData.bind(this);
        this.changeTimeSpan = this.changeTimeSpan.bind(this);
        this.getData();
    }


    getData() {
        var currentStock = this;
        fetch('https://www.quandl.com/api/v3/datasets/WIKI/'+this.props.stock+'.json?api_key=_-huFRLBpt58XiqjyQyU')
            .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                        response.status);
                    return;
                }

                // Examine the text in the response  
                response.json().then(function (data) {
                    console.log(data);
                    currentStock.setState({stock: data.dataset.data, company: data.dataset.name, stockCode: data.dataset.dataset_code});
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    changeTimeSpan(x) {
        this.setState({span: x});
    }

    render() {
        
        console.log(Object.keys(this.state.stock).length);
        if (Object.keys(this.state.stock).length < 1) {
            return(<p>Loading...</p>)
        }

        return (
            <div>
                <StockChart name={this.state.company} stock={this.state.stock}/>
                <ul className="timeline well" id="timelineGraph">
                    <li><strong>View:</strong></li>
                    <li><Button onClick={this.changeTimeSpan}>1d</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>1w</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>1m</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>3m</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>1y</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>5y</Button></li>
                    <li><Button onClick={this.changeTimeSpan}>Max</Button></li>
                </ul>
                <StockTable name={this.state.company} stock={this.state.stock} stockCode={this.state.stockCode}/>
            </div>
        );
    }
}