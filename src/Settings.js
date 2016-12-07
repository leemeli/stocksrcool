import React from 'react';
import Nav from './Nav';

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            warning: false
        };
    }

    // File for bankruptcy!
    bankruptcy() {
        
    }

    // Warns the user that they are about to file for bankruptcy
    bankruptcyWarning() {
        this.setState(
            {
                warning: 'bankruptcy'
            }
        );
    }

    render(){
        return(
            <div>
                    <div id="settings">
                        <h3 className="text-center">Settings</h3>
                        <ul className="well list-unstyled center-block">
                            <li><span className="bold">Name</span>: your name <span className="settings-option">(change name)</span></li>
                            <li id="deactivateBtn"><button type="button" className="btn btn-xs btn-danger" onClick={this.bankruptcyWarning}>File for bankruptcy</button></li>
                        </ul>
                    </div>
            </div>
        );
    }
}
// <li>Email: youremail@uw.edu <a href="#" className="pull-right">change email</a></li>

export default Settings;