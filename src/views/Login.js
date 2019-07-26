import React, { Component } from 'react';
import { AuthContext } from '../contexts/authContext';
import Axios from 'axios';
import logIn from '../logic/logIn';

export class Login extends Component{
       constructor(props) {
        super(props);
        this.state = {

        }
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    componentDidMount() {
        
    }
    fetchToken(){

    }
    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    onSubmit(e){
        console.log(e);
        console.log(this.context);
        e.preventDefault();
        let data = {};
        data.domain = this.state.domain;
        data.username = this.state.username;
        data.password = this.state.password;
        data.profile = this.state.profile;

        let _this = this;
        let domain = data.domain.endsWith("/") ? data.domain : data.domain + '/'
        Axios.post(domain+data.profile+'/api-token-auth/', data)
            .then(function(response){
                if(response.data.token){
                    _this.setState({token: response.data.token});
                    logIn(response.data.token, domain, data.username, data.profile);
                    _this.props.onSubmit(
                        {
                            token: response.data.token,
                            username: data.username,
                            domain: domain + data.profile + '/',
                            profile: data.profile,
                        }
                    )

                    console.log(response.data);
                    // _this.props.onSuccess();
                }
            })

    }
    render(){
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
                                <form class="login-form" onSubmit={this.onSubmit}>
                                    <div class="input-group">
                                        <div class="input-label">profile</div>
                                        <input onChange={this.handleChange} name="profile" type="text" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-label">Domain</div>
                                        <input onChange={this.handleChange} name="domain" type="text" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-label">Username</div>
                                        <input onChange={this.handleChange} name="username"  type="text" />
                                    </div>
                                    <div class="input-group">
                                        <div class="input-label">Pass</div>
                                        <input  name="password" onChange={this.handleChange} type="password" />
                                    </div>

                                    <div class="">
                                        <button type="submit" class="sign-in-button">Sign in</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>

        )
    }
}

Login.contextType = AuthContext;

// export default Invoices;
