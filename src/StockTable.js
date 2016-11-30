import React from 'react';

export default class StockTable extends React.Component {
    render(){
        return(
            <table styleName="width:100%">
            <tr>
                <th>Company</th>
                <th>Close Price</th> 
                <th>Net Change</th>
            </tr>
                {/* Populate table with stock information from API here*/}
             </table>
        );
    }
}