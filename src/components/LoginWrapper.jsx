import React, { Component } from 'react';
import CONFIG from '../AppConfig.json';



export class LoginWrapper extends Component{
       constructor(props) {
            super(props);
            this.state = {
                isLoaded: false,
                properties: {}
            }
    }
    componentDidMount() {
        
    }

    render(){
        let bg =this.props.backgroundColor;
        return (<div class={"login-wrapper login-wrapper-full-width row center-xs middle-xs "+(this.props.standalone ? "isStandalone" : "")}>
            <div class="login-outer col-xs-10 col-md-8">
                <div class={"box "+(this.props.boxClass ? this.props.boxClass: "")}>
                    <div class={"row "+(this.props.rowClass ? this.props.rowClass : "")}>
                        <div class={"col-xs-12 col-sm-6 col-md-5 intro-section formal " + (this.props.leftPanelClass ? this.props.leftPanelClass : "")}>
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

                        <div class={"col-xs-12 col-sm-6 col-md-7 login-section " + (this.props.rightPanelClass ? this.props.rightPanelClass: "")}>
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
