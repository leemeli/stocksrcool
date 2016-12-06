import React from 'react';
import Nav from './Nav';

class Settings extends React.Component {
    render(){
        return(
            <div>
                <Nav updateParent={this.updateState} />
                    <div id="settings">
                        <h3 className="text-center">Settings</h3>
                        <ul className="well list-unstyled center-block">
                            <li><span className="bold">Name</span>: your name <a href="#" className="pull-right">change name</a></li>
                            <li>Email: youremail@uw.edu <a href="#" className="pull-right">change email</a></li>
                            <li id="deactivateBtn"><button type="button" className="btn btn-danger">Reset Account</button></li>
                        </ul>
                    </div>
            </div>
        );
    }
}

export default Settings;