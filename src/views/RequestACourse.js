import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';
import {LoginWrapper} from '../components/LoginWrapper';

export class RequestACourse extends Component{
       constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
                properties: {}
            }
    }
    render(){
        let bg =this.props.backgroundColor;
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
