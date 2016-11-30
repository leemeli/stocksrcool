import React from 'react';

export default class Nav extends React.Component {
    render(){
        return(
         <header role="banner">

        {/*Sidebar*/}
        <ul className="sidebar" id="leftSidebar">
                <h3>Stocks R Us</h3>
                {/*Insert user-specific information here
                Welcome back, [Insert current users name]!
                Cash: [Insert cash amount] */}
                <li><a href="#home">Home</a></li>
                <li><a href="#portfolio">My Portfolio</a></li>
                <li><a href="#timeline">My Timeline</a></li>
                <li><a href="#settings">Settings</a></li>
        </ul>
        <button type="button">Logout</button>
    </header>
        );
    }
}