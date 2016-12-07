import React from 'react';

export default class PoliticalBar extends React.Component {
    render(){
        return(
            <div>
                <ul className="nav nav-tabs">
                <li role="presentation" className="active"><a href="#">View All</a></li>
                <li role="presentation"><a href="#">Democrat</a></li>
                <li role="presentation"><a href="#">Republican</a></li>
                </ul>
                <form className="navbar-form navbar-right" role="search">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Search" name="currentStock" onChange={this.props.change}/>
                </div>
                </form>
            </div>
        );
    }
}