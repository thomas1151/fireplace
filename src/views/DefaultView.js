import React, { Component } from 'react';
import logo from '../logo.svg';
import '../App.css';
import {SearchBar} from '../components/SearchBar.js';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { Invoices } from './Invoices';
import { Organisations } from './Organisations';
import { Home } from './Home';
import { Login } from './Login';
import { Contacts } from './Contacts.jsx';
import { People } from './People.jsx';
import { ActionIndex } from './actions/Index.jsx';
import { Documents } from './Documents.jsx';

import { AuthContext } from "../contexts/authContext";
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

const InvoicesWithAuthContext = (props) =>{
    return(
        <AuthContext.Consumer>
            {src =>
            <Invoices src={src} {...props}/>}
        </AuthContext.Consumer>
    )
}
const HomeWithAuthContext = (props) =>{
      return(
        <AuthContext.Consumer>
            {src =>
            <Home src={src} {...props}/>}
        </AuthContext.Consumer>
    )
}
const OrgsWithAuthContext = (props) => {
    return (
        <AuthContext.Consumer>
            {src =>
                <Organisations src={src} {...props} />}
        </AuthContext.Consumer>
    )
}
const PeopleWithAuthContext = (props) => {
    return (
        <AuthContext.Consumer>
            {src =>
                    <Contacts src={src} {...props} />
                }
        </AuthContext.Consumer>
    )
}

const ActionsWithAuthContext = (props) => {
    return (
        <AuthContext.Consumer>
            {src =>
                 <ActionIndex src={src} {...props} />
            }
        </AuthContext.Consumer>
    )
} 

const SearchBarWithAuthContext = (props) => {
    return (
        <AuthContext.Consumer>
            {src =>
                <SearchBar src={src} {...props} />
            }
        </AuthContext.Consumer>
    )
} 

const DocumentsWithAuthContext = (props) => {
    return (
        <AuthContext.Consumer>
            {src =>
                <Documents src={src} {...props} />
            }
        </AuthContext.Consumer>
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
                <div className="app-content-wrapper">
                    <ShortcutsBar location={this.props.location} isMobile={this.props.isMobile} config={this.props.config} />
                    <div className="app-content row">
                        <SearchBarWithAuthContext isMobile={this.props.isMobile} onLogOut={this.props.onLogOut} logo={this.props.config['application-name']} backgroundColor={this.props.config['application-style']['main']}/>
                        <main className="col-xs">
                            <Route path='/jobs' render={routeProps => <InvoicesWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile} />} />
                            <Route path='/documents' render={routeProps => <DocumentsWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile}/>} />
                            <Route path='/organisations' render={routeProps => <OrgsWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile} />} />
                            <Route path='/people' render={routeProps => <PeopleWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile} />} />
                            <Route path='/actions' render={routeProps => <ActionsWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile} />} />
                            <Route exact path='/' render={routeProps => <HomeWithAuthContext {...routeProps} config={this.props.config} isMobile={this.props.isMobile}/>} />
                            {this.props.children}
                        </main>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}