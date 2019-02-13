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
import { Loading } from '../components/Loading';

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
                            let date = new Date(Date.parse(f.date)).toLocaleDateString();
                            let created = new Date(Date.parse(f.date)).toLocaleDateString();
                            {/* let totalPrice = f.actions.map(item => item.total).reduce((prev, next) => prev + next);  */}

                            let totalPrice = f.actions.reduce((a, b) => +a + +(b.price*b.quantity), 0);

                            return(<FeedElement 
                                        usefulData={"£"+totalPrice.toFixed(2)} 
                                        subtitle={ (f.creator ? f.creator.fname+' '+f.creator.lname : 'Unknown')+" on "+created} 
                                        title={f.idRef} 
                                        ikey={f.idRef} 
                                        data={f} 
                                        key={f.idRef} 
                                        badge={"#"+f.id}
                                        onRemove={this.handleRemoveProperty} 
                                        onAdd={this.handleNewProperty}
                                        onMoreUrl={"/invoices/"+f.idRef}
                                        people={f.people && f.people}
                                        displayPeopleAs={ ['name']}
                                    />)
                        }) }

                    </div>
                    {this.props.children}

                </div>
            {/* <Route path='/' render={routeProps => <ActionBox isMobile={this.props.isMobile}/>} />
            <Feed isMobile={this.props.isMobile}/> */}
            </main>
        )
    }
}
export default InvoiceInbox;