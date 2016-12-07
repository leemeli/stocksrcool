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


    render() {
        return (
            <section role="region" id="politicalBar">
                <form className="navbar-form navbar-right" role="search">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Search" name="currentStock" onChange={this.props.change} />
                    </div>
                </form>
            </section>
        );
    }
}