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
                <ShortcutsBar isMobile={this.props.isMobile}/>
                <main className="col-xs">
                    <Route path='/' render={routeProps => <ActionBox isMobile={this.props.isMobile}/>} />
                    <Feed src={this.props.src} isMobile={this.props.isMobile}/>
                </main>
            </React.Fragment>
        )
    }
}
export default Home;