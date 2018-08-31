import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Route,
    Link
} from 'react-router-dom';


export class InvoiceInbox extends Component{
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
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2></div></div>;
        return(
            <main className="col-xs row app-format">
                <div className="page-settings col-xs-12">
                    <ul>
                        <li><a className="current">Invoices</a></li>
                        {this.state.settings.map((el,i)=>
                            <li><a href={el.url}>{el.name}</a></li>
                        )}
                    </ul>
                </div>
                
                <div className="app-wrapper row">
                    <div className="invoice-feed action-feed col-xs">
                        {this.props.items.map( (f,i) =>{
                            let date = new Date(f.date).toLocaleDateString();
                            let created = new Date(f.created).toLocaleDateString();
                            return(<FeedElement 
                                        usefulData={"£"+f.price.toFixed(2)} 
                                        subtitle={f.creator.name+" on "+created} 
                                        title={f.id} 
                                        ikey={i} 
                                        data={f} 
                                        key={i} 
                                        onRemove={this.handleRemoveProperty} 
                                        onAdd={this.handleNewProperty}
                                        onMoreUrl={"/invoices/"+f.id}
                                    />)
                        }) }

                    </div>
                {!this.props.isMobile ? 
                        
                    <div className="invoice-inspection col-xs-8">
                        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.3.0/paper.css"/>
                        <Route path="/invoices/:id" render={routeProps => <ViewJob 
                                                            {...routeProps} config={this.props.config} data={this.state.items} getItemByProp={this.props.getItemByProp} isMobile={this.props.isMobile}/>} />
                    </div>
                    :
                    null}
                </div>
            {/* <Route path='/' render={routeProps => <ActionBox isMobile={this.props.isMobile}/>} />
            <Feed isMobile={this.props.isMobile}/> */}
            </main>
        )
    }
}
export default InvoiceInbox;