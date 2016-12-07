import React from 'react';
import StockTableRow from './StockTableRow';

export default class StockTable extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        var names = this.props.names;
        var stocks = this.props.stocks;
        var stockCodes = this.props.stockCodes;

        var rowArray = [];

        stocks.forEach(
            function(stock, i) {
                rowArray.push(<StockTableRow name={names[i]} stock={stocks[i]} stockCode={stockCodes[i]} key={i} />);
            }
        );
        return (
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
                            <th>Owned</th>
                        </tr>
                        {/* Populate table with stock information from API here*/}

                        {rowArray}

                    </tbody>
                </table>
            </section>
        );
    }
}