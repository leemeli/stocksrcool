import React from 'react';
import ReactDOM from 'react-dom';
import PoliticalBar from './PoliticalBar';
import Timeline from './Timeline';

export default class StockDisplay extends React.Component {
    render() {
        return(
            <div>
            <PoliticalBar />
            <Timeline stock="AFG" />
             </div>
        );
    }
}