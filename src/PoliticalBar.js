import React from 'react';

export default class PoliticalBar extends React.Component {

    constructor(props) {
        super(props);

        this.democrat = this.democrat.bind(this);
        this.republican = this.republican.bind(this);
        this.viewAll = this.viewAll.bind(this);
    }

    // Show the first 5 democrat companies!
    democrat() {
        console.log('Democrat!');
    }
    // Show the first 5 republican companies!
    republican() {
        console.log('Republican!');
    }
    // Show all companies!
    viewAll() {
        console.log('No preference!');
    }

    render(){
        return(
            <section role="region" id="politicalBar">
                <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a onClick={this.viewAll}>View All</a></li>
                <li role="presentation"><button className="democrat btn btn-lg" onClick={this.democrat}>Democrat</button></li>
                <li role="presentation"><button className="republican btn btn-lg" onClick={this.republican}>Republican</button></li>
                </ul>
                <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" name="currentStock" onChange={this.props.change}/>
                </div>
                </form>
            </section>
        );
    }
}