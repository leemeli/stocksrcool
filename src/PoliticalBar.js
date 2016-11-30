import React from 'react';

export default class PoliticalBar extends React.Component {
    render(){
        return(
            <div>
            <ul class="topNav" id="topNavbar">
                <li><a href="#viewAll">View All</a></li>
                <li><a href="#trumpPage">Trump Affiliated</a></li>
                <li><a href="#clintonPage">Clinton Affiliated</a></li>
            </ul>
            <input type="text" name="search" placeholder="Search here">
            </div>

        );
    }
}