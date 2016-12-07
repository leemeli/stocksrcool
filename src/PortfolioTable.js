import React from 'react';
import PortfolioTableRow from './PortfolioTableRow';

export default class PortfolioTable extends React.Component {
    render() { 
        return(
            <div className="container">
            <table className="table table-bordered table-hover" aria-live="polite">
                <tbody>
                <tr id="firstRow">
                    <th>Company</th>
                    <th>Symbol</th>
                    <th>Purchase Price</th> 
                    <th>Current Price</th>
                    <th>Net Change</th>
                    <th>% Change</th>
                </tr>
                    {/* Populate table with stock information from API here*/}
                    
                    <PortfolioTableRow name={this.props.name} stock={this.props.stock} stockCode={this.props.stockCode}/>

                </tbody>
             </table>
             </div>
        );
    }
}