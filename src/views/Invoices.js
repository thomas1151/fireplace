import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { InvoiceInbox } from './InvoiceInbox';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


export class Invoices extends Component{
    constructor(props) {
            super(props);
            this.state ={
                settings:[
                    {
                        name: "Home",
                        url: '/'
                    },
                    {
                        name: "Outstanding",
                        url: 'outstanding'
                    },
                    {
                        name: "Stats",
                        url: 'stats'
                    },
                    {
                        name: "Export",
                        url: 'export'
                    }
                ],
            }
    }
    render(){
        let bg =this.props.backgroundColor;
        const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        
        return(
            <React.Fragment>
            { this.props.isMobile ?  <ShortcutsBar isMobile={this.props.isMobile}/>:null}

            {this.props.isMobile ?
                <Route path="/invoices/:id" render={routeProps => <ViewJob {...routeProps} header={jobHeader} isMobile={this.props.isMobile}/>}/>
                : null
            }
            <Route exact to="/" render={routeProps => <InvoiceInbox {...routeProps} config={this.props.config} isMobile={this.props.isMobile}/>}/>            

            </React.Fragment>
        )
    }
}
export default Invoices;