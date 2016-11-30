import React from 'react';

class Settings extends React.Component {
    render(){
        return(
            <div className="container">
                <h3 className="text-center">Settings</h3>
                <ul className="well list-unstyled half-width margin-auto">
                    <li><span className="bold">Name</span>: your name <a href="#" className="pull-right">change name</a></li>
                    <li>Email: youremail@uw.edu <a href="#" className="pull-right">change email</a></li>
                </ul>
                <div>
                    <li className="btn btn-danger btn-xs pull-right">Deactivate account</li>
                </div>
            </div>
        );
    }
}

export default Settings;