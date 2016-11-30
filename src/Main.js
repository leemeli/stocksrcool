import React from 'react';
import Nav from './Nav';
import PoliticalBar from './PoliticalBar';
import Timeline from './Timeline';

export default class MainPage extends React.Component {
    render(){
        return(
             <Nav/>

    <main role="main">
        <PoliticalBar />
        <Timeline />
        <StockTable />
    </main>
        );
    }
}