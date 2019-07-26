import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from './components/SearchBar.js';
// import CONFIG from './AppConfig.json';

import { Home } from './views/Home';
import { DefaultView } from './views/DefaultView';

import { Login } from './views/Login';

import { ModifyFireplace } from './views/ModifyFireplace';
import axios from "axios";


import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import { SrcContext } from "./contexts/api-context";
import { AuthContext } from "./contexts/authContext";
import Loading from './components/Loading';
import logOut from './logic/logOut';


const LoginWithSrcContext = (props) =>{
      return(
        <SrcContext.Consumer>
            {src =>
            <Login src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}
const DefaultWithSrcContext = (props) =>{
      return(
        <SrcContext.Consumer>
            {src =>
            <DefaultView src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}
const ModifyFireplaceWithSrcContext = (props) =>{
      return(
        <SrcContext.Consumer>
            {src =>
            <ModifyFireplace src={src} {...props}/>}
        </SrcContext.Consumer>
    )
}



class App extends Component {
  constructor() {
    super();
    // console.log(localStorage.getItem('config'));
    let config = localStorage.getItem('config')
    config = config ? config : null;
    this.state = Object.assign({
      width: window.innerWidth,
      loaded: false,
      loginRequired: false,

    }, this.getConfigDataFromStorage());
    this.updateAuth = this.updateAuth.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.handleLogOut = this.handleLogOut.bind(this);
  }

  componentWillMount() {
    if(this.state.token){

    }
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  createLoginData(){
    return(
      {
        loaded: true,
        rest: axios.create(
          {
            baseURL: this.state.domain,
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Token ' + this.state.token
            }
          }
        ),


      })
  }

  getConfigDataFromStorage(){
    // console.log(localStorage.getItem('config'));
    let config = localStorage.getItem('config');
      return({
        token: localStorage.getItem('token'),
        username: localStorage.getItem('username'),
        config: config ? JSON.parse(config) : null,
        domain: localStorage.getItem('domain'),
      })
  }
  componentDidMount() {
    if(this.state.token && this.state.username && this.state.config){

      this.setState(this.createLoginData(), this.loadProfile);

    }else{
      this.setState({loginRequired: true})
    }


  }
  loadProfile(){
    let _this = this;
    this.state.rest.get("/users/?username=" + this.state.username)
      .then(function (response) {
        _this.setState({ user: response.data.results[0], loaded: true })
      })

  }
  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  updateAuth = (d) => {
    console.log(d);
    let _this = this;
    d.rest = axios.create(
      {
        baseURL: d.domain,
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Token '+d.token
        }
      }
    );
    d.loginRequired = false;
    d.rest.get(d.domain+"config/")
      .then(response => {

        d.config = response.data;
        d.loaded = true;
        console.log(response.data)
        localStorage.setItem('config', JSON.stringify(response.data))
        _this.setState({config: response.data, loaded: true})
    }).catch(error =>{
        console.log(error.response);
        _this.setState({error:error.response})
      })
    this.setState(d);
  }

  onSuccess(d){
    this.updateAuth(d);
    // this.setState(Object.assign(this.createLoginData(), this.getConfigDataFromStorage(), { loginRequired: false }), this.loadProfile);
  }
  handleLogOut() {
    console.log("log out called");
    logOut();
    this.setState({ loginRequired: true, loaded: false })
  }
  render() {
      
      const { width } = this.state;
      const isMobile = width <= 768;

    return (
      <AuthContext.Provider value={this.state}>



        {!this.state.loginRequired ? (this.state.loaded ?
          
          
        <Router>

        <div className="App">
          <style dangerouslySetInnerHTML={{ __html: `

            .shortcutList li.selected{
              background: ${this.state.config['application-style']['main']}
            }
            .shortcutList li:hover{
              background: ${this.state.config['application-style']['main']}
            }
            .shortcutList li i, 
            .feed-element .price, 
            .icon-holder.for-input .icon,
            .searchBar .icon-holder.for-input i,
            .menu-settings li i,
            .main-shortcuts i{
              color: ${this.state.config['application-style']['theme']}
            }
            .main-shortcuts .mobile-shortcut.selected{
              background: ${this.state.config['application-style']['theme']}
            }
            .page-settings ul li a:hover,
            .feed-element .actions .action:hover ,
            .feed-element .actions .action:hover p{

              color: ${this.state.config['application-style']['theme']}
            }

            .page-settings ul li a.current{
              border-bottom: 0.25em solid ${this.state.config['application-style']['theme']}
            }
            .cssload-lt:before, .cssload-rt:before, .cssload-lb:before, .cssload-rb:before {
              border-top: 6px solid ${this.state.config['application-style']['theme']};
            }
         `}} />
          <Switch>
            <Route exact path='/login' render={routeProps => <LoginWithSrcContext {...routeProps}  config={this.state.config} isMobile={isMobile}/>} />
            <Route exact path='/modify-fireplace' render={routeProps => <ModifyFireplaceWithSrcContext {...routeProps} config={this.state.config} isMobile={isMobile}/>} />          
            <Route render={routeProps => <DefaultWithSrcContext {...routeProps} config={this.state.config} onLogOut={this.handleLogOut} isMobile={isMobile}/>}/>
          </Switch>
        </div>
        </Router>

        :
        <div className="App">
          <Loading/>
        </div>
        )

        :
            <Login onSubmit={this.onSuccess} />
        }
    
    </AuthContext.Provider>

    );
  }

}

const AppWithSrcContext = (props) => {
  return (
      <SrcContext.Consumer >
        {src =>
          <App src={src} {...props} />
        }
      </SrcContext.Consumer>
  )
}
export default AppWithSrcContext;
