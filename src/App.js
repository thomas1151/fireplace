import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {SearchBar} from './components/SearchBar.js';
import CONFIG from './AppConfig.json';
import { ShortcutsBar } from './components/ShortcutsBar';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'


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
      const isMobile = width <= 576;

    return (
      <Router>
      <Route path='/' render={() => (
        <div className="App">
          <SearchBar isMobile={isMobile} logo={CONFIG['application-name']} backgroundColor={CONFIG['application-style']['main']}/>
          <div className="app-content row">

            <ShortcutsBar isMobile={isMobile}/>
          </div>
        </div>
      )}/>
      </Router>
    );
  }

}

export default App;
