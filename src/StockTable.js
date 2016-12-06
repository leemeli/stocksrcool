import React from 'react';
import StockTableRow from './StockTableRow';

export default class StockTable extends React.Component {
    render() { 
        return(
            <div className="container">
            <table className="table table-bordered table-hover" aria-live="polite">
                <tbody>
                <tr>
                    <th>Company</th>
                    <th>Close Price</th> 
                    <th>Net Change</th>
                    <th>Affiliation</th>
                </tr>
                    {/* Populate table with stock information from API here*/}
                    
                    <StockTableRow name={this.props.name} stock={this.props.stock} stockCode={this.props.stockCode}/>

                </tbody>
             </table>
             </div>
        );
    }
}