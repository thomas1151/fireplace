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


export class Home extends Component{
    constructor(props) {
            super(props);
    }
    render(){
        let bg =this.props.backgroundColor;
        return(
            <React.Fragment>
                <Route src={this.props.src} path='/' render={routeProps => <ActionBox src={this.props.src} isMobile={this.props.isMobile}/>} />
                <Feed src={this.props.src} isMobile={this.props.isMobile}/>
                {this.props.children}
            </React.Fragment>
        )
    }
}
export default Home;