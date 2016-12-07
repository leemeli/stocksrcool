import React from 'react';
import StockTableRow from './StockTableRow';
import firebase from 'firebase';

export default class StockTable extends React.Component {
    
    constructor(state) {
        super(state);
        this.state = {rows:[]}
        this.getData = this.getData.bind(this);
        this.getData("AAPL");
        this.getData("AFG");
        this.getData("BLMN");
        this.getData("BUD");
        this.getData("COST");

    }
    

    getData(company) {
        var currentStock = this;
        fetch('https://www.quandl.com/api/v3/datasets/WIKI/'+ company +'.json?api_key=_-huFRLBpt58XiqjyQyU')
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
                    this.state.rows.push(
                        <StockTableRow name={data.dataset.name} stock={data.dataset.data} stockCode={data.dataset.dataset_code} />
                    );
                });
            }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }


    render() { 
        console.log(this.state.rows);
       
        return(
            <table className="table table-bordered table-hover stock-table" aria-live="polite">
                <tbody>
                    {/* Populate table with stock information from API here*/}
                    
                   {this.state.rows}
                </tbody>
             </table>
        )
    }
}