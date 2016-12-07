import React from 'react';
import StockTableRow from './StockTableRow';

export default class StockTable extends React.Component {
    render() { 
        return(
            <table className="table table-bordered table-hover stock-table" aria-live="polite">
                <tbody>
                <tr id="firstRow">
                    <th>Company</th>
                    <th>Affiliation</th>
                    <th>Close Price</th> 
                    <th>Net Change</th>
                    <th>Buy and sell</th>
                </tr>
                    {/* Populate table with stock information from API here*/}
                    
                    <StockTableRow name={this.props.name} stock={this.props.stock} stockCode={this.props.stockCode}/>

                </tbody>
             </table>
        );
    }
}