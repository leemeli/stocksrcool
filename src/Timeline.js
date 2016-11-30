import React from 'react';

export default class Timeline extends React.Component {
    render(){
        return(
            <div>
            <ul className="timeline" id="timelineGraph">
                <li><a href="#1day">1d</a></li>
                <li><a href="#1month">1m</a></li>
                <li><a href="#3month">3m</a></li>
                <li><a href="#1year">1y</a></li>
                <li><a href="#5year">5y</a></li>
                <li><a href="#max">Max</a></li>
             </ul>
             {/* Insert Stock Timeline Graph from API here */}
             </div>
        );
    }
}