import React from 'react';

export default class PoliticalBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            np: 'selected',
            d: 'not-selected',
            r: 'not-selected'
        };
        this.focusD = this.focusD.bind(this);
        this.focusR = this.focusR.bind(this);
        this.focusNP = this.focusNP.bind(this);
    }


    // Focusing democrat styles
    focusD() {
        this.setState({ np: 'not-selected', d: 'selected', r: 'not-selected' });
    }

    // Focusing republican styles
    focusR() {
        this.setState({ np: 'not-selected', d: 'not-selected', r: 'selected' });
    }

    // Focusing no preference styles
    focusNP() {
        this.setState({ np: 'selected', d: 'not-selected', r: 'not-selected' });
    }

    noUpdate(event){
        event.preventDefault();
    }

    render() {
        return (
            <section role="region" id="politicalBar">
                <form className="navbar-form navbar-right" role="search" onSubmit={(e) => this.noUpdate(e)}>
                    <div className="form-group">
                        <input id="searchBar" type="text" className="form-control" placeholder="Search by symbol (ex. AAPL)" name="currentStock" />
                        <button type="submit" className="btn" onClick={this.props.change}>Search</button>
                    </div>
                </form>
            </section>
        );
    }
}