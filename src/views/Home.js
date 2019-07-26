import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';
import titleGenerator from '../logic/titleGenerator';

const homeActions = (a,b) => {
    console.log(a);
    return !Boolean(a['job']);
    // console.log(!a.hasOwnProperty('job'))
    // return !a.data.hasOwnProperty('job');
}

export class Home extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        titleGenerator("Home", this.props.config);

        let bg =this.props.backgroundColor;
        return(
            <React.Fragment>
                {this.props.children}
                <Route src={this.props.src} path='/' render={routeProps => <ActionBox src={this.props.src} config={this.props.config} isMobile={this.props.isMobile}/>} />
                <Feed src={this.props.src} dataSrc={'actions/?document__isnull=True'} filterFeed={homeActions} config={this.props.config}  isMobile={this.props.isMobile}/>
            </React.Fragment>
        )
    }
}
export default Home;