import React from "react"



export default class StockTableRow extends React.Component {
    render() {
        var name = this.props.name;
        var close = this.props.stock.slice(0,1)[0][4];
        var netChange = Math.round((this.props.stock.slice(0,1)[0][4] - this.props.stock.slice(0,1)[0][1])*100) / 100;
        return (
            <tr>
                <td>{name}</td>
                <td>{close}</td>
                <td>{netChange}</td>
            </tr>
        )
    }
}


