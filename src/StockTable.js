import React from 'react';
import StockTableRow from './StockTableRow';
import AdditionalStocks from './AdditionalStocks';

export default class StockTable extends React.Component {

    render() { 
        return(
            <section role="region" id="stock-table-region">
                <table className="table table-bordered table-hover stock-table" aria-live="polite">
                    <tbody>
                    <tr id="firstRow">
                        <th>Code</th>
                        <th>Company</th>
                        <th>Affiliation</th>
                        <th>Close Price</th> 
                        <th>Net Change</th>
                        <th>Buy and Sell</th>
                    </tr>
                        {/* Populate table with stock information from API here*/}
                        
                        <StockTableRow name={this.props.name} stock={this.props.stock} stockCode={this.props.stockCode} faction={this.props.faction}/>
                        

                    </tbody>
                    {this.props.additionalStocks === "true" &&
                        <AdditionalStocks faction={this.props.faction}/>
                    }
                </table>
            </section>
        );
    }
}