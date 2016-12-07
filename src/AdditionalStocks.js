import React from 'react';
import StockTableRow from './StockTableRow';
import firebase from 'firebase';

export default class StockTable extends React.Component {

    constructor(state) {
        super(state);
        this.state = { rows: [] };

    }

    componentDidMount() {
        var that = this;

        var companiesRef = firebase.database().ref('companies/');
        companiesRef.once('value')
            .then(function (snapshot) {
                var companyArray = [];
                snapshot.forEach(function (stock) {
                    var company = stock.key;

                    if (companyArray.length < 20) {
                        companyArray.push(company);

                        fetch('https://www.quandl.com/api/v3/datasets/WIKI/' + company + '.json?api_key=_-huFRLBpt58XiqjyQyU')
                            .then(
                            function (response) {
                                console.log('Response from ' + company);
                                if (response.status !== 200) {
                                    console.log('Looks like there was a problem. Status Code: ' +
                                        response.status);
                                    return;
                                }
                                // Examine the text in the response  
                                response.json().then(function (data) {
                                    // console.log(data);
                                    that.setState({ stock: data.dataset.data, company: data.dataset.name, stockCode: data.dataset.dataset_code });
                                    that.state.rows.push(
                                        <StockTableRow name={data.dataset.name} stock={data.dataset.data} stockCode={data.dataset.dataset_code} key={company}/>
                                    );
                                });
                            }).catch(function (err) {
                                console.log('Fetch Error :-S', err);
                            });
                    }
                })
            });
    }


    // Attaches this tbody to the other tbody since it needs to be in something!
    render() {
        return (
            <tbody>
                {this.state.rows}
            </tbody>
        )
    }
}