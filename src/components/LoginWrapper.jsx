import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import CONFIGLABELS from '../ConfigLabels.json';
import {SearchBar} from '../components/SearchBar.js';
import { Feed } from '../components/Feed';
import { ActionBox } from '../components/ActionBox';
import { ShortcutsBar } from '../components/ShortcutsBar';
import { FeedElement } from '../components/FeedElement';
import { ActionSelection } from '../components/ActionSelection';
import { Checkbox } from '../components/Checkbox';
import { ViewJob } from '../components/ViewJob';
import { Redirect } from 'react-router-dom';
import jsPDF from 'jspdf';
import { Loading } from '../components/Loading';


export class LoginWrapper extends Component{
       constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
                properties: {}
            }
            // this.loadInputs();
    }
    componentDidMount() {
        
    }

    render(){
        let bg =this.props.backgroundColor;
        // const jobHeader = <div class="header-content-wrapper"><div className="logo-wrapper"><img src={"/"+this.props.config.organisation.logo}/></div><div className="address-wrapper"><h2>{this.props.config.organisation.name}</h2><h3> {this.props.config.organisation.address.map( (el,i) => <div className="location_line">{Object.values(el)} </div> )}</h3></div></div>;
        return (<div class={"login-wrapper login-wrapper-full-width row center-xs middle-xs "+(this.props.standalone && "isStandalone")}>
            <div class="login-outer col-xs-10 col-md-8">
                <div class="box">
                    <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-5 intro-section formal">
                            <div class="titles-wrap">
                                
                                { (this.props.siteImg || this.props.siteName) && 
                                    <div class="site-img">
                                        {this.props.siteImg && <img src={this.props.siteImg} />}
                                        {this.props.siteName && <div class="site-name" style={ {"font-family":CONFIG['application-font']['family'], "font-weight":CONFIG['application-font']['weight']}}>{this.props.siteName}</div> }
                                    </div>
                                }
                                <div class="site-title">{this.props.pageTitle}</div>
                                <div class="site-subtitle">{this.props.pageSubtitle}</div>
                            </div>
                        </div>

                        <div class="col-xs-12 col-sm-6 col-md-7 login-section">
                            <div class="titles-wrap">
                                <h1>{this.props.pageHead}</h1>
                                {this.props.children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>  
        </div>
        );
    }
}
// export default Invoices;
