import React from 'react';
import StockTableRow from './StockTableRow';

export default class StockTable extends React.Component {
    render() { 
        return(
            <table>
                <tbody>
                <tr>
                    <th>Company</th>
                    <th>Close Price</th> 
                    <th>Net Change</th>
                </tr>
                    {/* Populate table with stock information from API here*/}
                    
                    <StockTableRow name={this.props.name} stock={this.props.stock} />

                </tbody>
             </table>
        );
    }
}