import React from 'react';
import StockChart from './StockChart';


export default class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = {stock:{}, company:""};
        this.getData = this.getData.bind(this);
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
                    currentStock.setState({stock: data.dataset.data, company: data.dataset.name});
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }
    render() {
        
        console.log(Object.keys(this.state.stock).length);
        if (Object.keys(this.state.stock).length < 1) {
            return(<p>Loading...</p>)
        }

        return (
            <div>
                <StockChart name={this.state.company} stock={this.state.stock}/>
                <ul className="timeline" id="timelineGraph">
                    <li><a href="#1day">1d</a></li>
                    <li><a href="#1month">1m</a></li>
                    <li><a href="#3month">3m</a></li>
                    <li><a href="#1year">1y</a></li>
                    <li><a href="#5year">5y</a></li>
                    <li><a href="#max">Max</a></li>
                </ul>
            </div>
        );
    }
}