import React from "react"



export default class StockTableRow extends React.Component {
    render() {
        var name = this.props.name;
        var shortName = name.substr(0, name.indexOf('('));
        var close = this.props.stock.slice(0,1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0,1)[0][4] - this.props.stock.slice(0,1)[0][1])*100) / 100;
        return (
            <tr>
                <td>{shortName}</td>
                <td>{close}</td>
                <td>{netChange}</td>
                <th><button type="button" class="btn btn-default">Buy</button></th>
            </tr>
        )
    }
}


