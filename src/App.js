import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from './components/SearchBar.js';
import CONFIG from './AppConfig.json';
import { ActionBox } from './components/ActionBox';
import { ShortcutsBar } from './components/ShortcutsBar';
import { Invoices } from './views/Invoices';
import { Home } from './views/Home';
import { DefaultView } from './views/DefaultView';
import { Login } from './views/Login';
import { ModifyFireplace } from './views/ModifyFireplace';

import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch
} from 'react-router-dom';

import { SrcContext } from "./contexts/api-context";


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
    this.state = {
      width: window.innerWidth,
    };
  }

  componentWillMount() {
    window.addEventListener('resize', this.handleWindowSizeChange);
  }

  // make sure to remove the listener
  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth
    });
  };

  render() {
      const { width } = this.state;
      const isMobile = width <= 768;

    return (
      <Router>

      <div className="App">
        <Switch>
          <Route exact path='/login' render={routeProps => <LoginWithSrcContext {...routeProps} config={CONFIG} isMobile={isMobile}/>} />
          <Route exact path='/modify-fireplace' render={routeProps => <ModifyFireplaceWithSrcContext {...routeProps} config={CONFIG} isMobile={isMobile}/>} />
          <Route component={DefaultWithSrcContext}/>
        </Switch>
      </div>
      </Router>
    );
  }

}

export default App;
