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



const OrgsHome = (props) => {
    return (
        <SrcContext.Consumer>
            {src =>
                <DefaultView>
                    <div>
                        <h1>Hello.</h1>
                        <LoginWrapper
                            siteImg={"/" + CONFIG.organisation.logo}
                            siteName={CONFIG.organisation.name}
                            pageTitle={"Course Submission Form"}
                            pageSubtitle={<div>for <span>North Eastern Tree Company</span></div>}
                            pageHead={<div>Fill out the form below and we'll be in touch regarding your request.</div>}
                        ></LoginWrapper>
                    </div>
                </DefaultView>   
            }
        </SrcContext.Consumer>
    )
}



export class Organisations extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let bg = this.props.backgroundColor;
        return (
            
                 
                <Switch>
                    <Route path='/organisations/request-a-course' render={routeProps => <RequestACourse config={CONFIG} src={this.props.src} isMobile={this.props.isMobile} />} />
                    <Route component={OrgsHome} />
                </Switch>
         )
    }
}
export default Organisations;