import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import CONFIGLABELS from '../ConfigLabels.json';
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
import {LoginWrapper} from '../components/LoginWrapper';

export class RequestACourse extends Component{
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
        return (
            <LoginWrapper
            siteImg={"/"+CONFIG.organisation.logo}
            siteName={CONFIG.organisation.name}
            pageTitle={"Course Submission Form"}
            pageSubtitle={<div>for <span>North Eastern Tree Company</span></div>}
            pageHead={<div>Fill out the form below and we'll be in touch regarding your request.</div>}
            standalone={true}>

                <div class="login-form">
                    <div class ="input-group" >
                        <div class="input-label">Your Name</div>
                        <input type="text" />

                    </div>

                    <div class="input-group">
                        <div class="input-label">Name</div>
                        <input type="text"  />
                    </div>

                    <div class="">
                        <button type="submit"  class="complete-button">Submit</button>
                    </div>
                </div>


            </LoginWrapper>
        )
    }
}
// export default Invoices;
