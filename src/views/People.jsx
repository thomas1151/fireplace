import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import { SearchBar } from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { RequestACourse } from './RequestACourse';
import { ShortcutsBar } from '../components/ShortcutsBar';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import { SrcContext } from "../contexts/api-context";
import { DefaultView } from "./DefaultView";
import { LoginWrapper } from '../components/LoginWrapper.jsx';
import { Index } from './people/Index.jsx';


export class People extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bg = this.props.backgroundColor;
        return (
            
                 
                <Switch>
                    <Route path='/people/:id' render={routeProps => <RequestACourse config={CONFIG} src={this.props.src} isMobile={this.props.isMobile} />} />
                    <Route render={routeProps => <Index  config={CONFIG} src={this.props.src} isMobile={this.props.isMobile} /> } />
                </Switch>
         )
    }
}
// export default People;