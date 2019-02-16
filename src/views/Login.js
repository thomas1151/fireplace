import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { InvoiceInbox } from './InvoiceInbox';
import { Checkbox } from '../components/Checkbox';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Loading } from '../components/Loading';

export class Login extends Component{
       constructor(props) {
            super(props);
    }
    componentDidMount() {
        
    }

    render(){
        let bg =this.props.backgroundColor;
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        return (

        <div class="login-wrapper row center-xs middle-xs isStandalone">
            <div class="login-outer col-xs-9 col-md-6">
                <div class="box">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 intro-section">
                            <div class="titles-wrap">
                                <div class="site-title">Finger Friendly Finances</div>
                                {/* <div class="site-subtitle">Finger Friendly Finances</div> */}
                                <div class="site-subtitle">Fireplace is an advanced <span>business management system</span> designed to help you focus on what you do best.</div>
                                {/* <div class="site-logo">Fireplace 2019</div> */}
                            </div>
                            {/* <div class="description">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    
                            </div> */}

                        </div>

                        <div class="col-xs-12 col-sm-6 login-section">
                            <div class="titles-wrap">

                                <div class="login-title">
                                    Hello! 
                                </div>
                                <div class="login-description">
                                    Enter your login details below.
                                </div>
                                <div class="login-form">
                                    <div class="input-group">
                                        <div class="input-label">Email Address</div>
                                        <input type="text" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-label">Password</div>
                                        <input type="password" />
                                    </div>


                                    <div class="">
                                        <button type="submit" class="sign-in-button">Sign in</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        )
    }
}
// export default Invoices;
