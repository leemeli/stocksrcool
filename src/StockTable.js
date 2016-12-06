import React from 'react';
import StockTableRow from './StockTableRow';

export default class StockTable extends React.Component {
    render() { 
        return(
            <table id="stockTable" className="table">
                <tbody>
                <tr id="firstRow">
                    <th>Company</th>
                    <th>Close Price</th> 
                    <th>Net Change</th>
                    <th></th>
                </tr>
                    {/* Populate table with stock information from API here*/}
                    
                    <StockTableRow name={this.props.name} stock={this.props.stock} />

                </tbody>
             </table>
        );
    }
}