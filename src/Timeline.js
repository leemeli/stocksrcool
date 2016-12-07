import React from 'react';
import StockChart from './StockChart';
import {Button} from 'react-bootstrap';
import StockTable from './StockTable';

export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stock:{}, company:"", stockCode: "", span: 7};
        this.spanDay = this.spanDay.bind(this);
        this.spanWeek = this.spanWeek.bind(this);
        this.spanMonth = this.spanMonth.bind(this);
        this.spanThreeMonths = this.spanThreeMonths.bind(this);
        this.spanYear = this.spanYear.bind(this);
        this.spanFiveYears = this.spanFiveYears.bind(this);
        this.spanMonth = this.spanMonth.bind(this);
        console.log(this.props.stock);
        this.componentWillReceiveProps();
    }

    

    componentWillReceiveProps() {
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

    spanDay() {
        this.setState({span: 2});
    }
    spanWeek() {
        this.setState({span: 7});
    }
    spanMonth() {
        this.setState({span: 30});
    }
    spanThreeMonths() {
        this.setState({span: 90});
    }
    spanYear() {
        this.setState({span: 365});
    }
    spanFiveYears() {
        this.setState({span: 1825});
    }

    render() {
        
        
        if (Object.keys(this.state.stock).length < 1) {
            return(<p>Loading...</p>)
        }

        return (
            <div>
                <StockChart name={this.state.company} span={this.state.span} stock={this.state.stock}/>
                <ul className="timeline" id="timelineGraph">
                    <li><Button onClick={this.spanDay}>1d</Button></li>
                    <li><Button onClick={this.spanWeek}>1w</Button></li>
                    <li><Button onClick={this.spanMonth}>1m</Button></li>
                    <li><Button onClick={this.spanThreeMonths}>3m</Button></li>
                    <li><Button onClick={this.spanYear}>1y</Button></li>
                    <li><Button onClick={this.spanFiveYears}>5y</Button></li>
                </ul>
                <StockTable name={this.state.company} stock={this.state.stock} stockCode={this.state.stockCode}/>
            </div>
        );
    }
}

