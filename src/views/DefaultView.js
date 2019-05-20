import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {SearchBar} from '../components/SearchBar.js';
import CONFIG from '../AppConfig.json';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { Invoices } from './Invoices';
import { Organisations } from './Organisations';
import { Home } from './Home';
import { Login } from './Login';

import { SrcContext } from "../contexts/api-context";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

const InvoicesWithSrcContext = (props) =>{
    return(
        <SrcContext.Consumer>
            {src =>
            <Invoices src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}
const HomeWithSrcContext = (props) =>{
      return(
        <SrcContext.Consumer>
            {src =>
            <Home src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}


export class DefaultView extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {

    }

    render() {
        return(
            <React.Fragment>
                <SearchBar isMobile={this.props.isMobile} logo={CONFIG['application-name']} backgroundColor={CONFIG['application-style']['main']}/>
                <div className="app-content-wrapper">
                    <div className="app-content row">
                        <ShortcutsBar isMobile={this.props.isMobile}/>
                        <main class="col-xs">
                            <Route path='/invoices' render={routeProps => <InvoicesWithSrcContext {...routeProps} config={CONFIG} isMobile={this.props.isMobile}/>} />
                            <Route exact path='/' render={routeProps => <HomeWithSrcContext {...routeProps} config={CONFIG} isMobile={this.props.isMobile}/>} />
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}