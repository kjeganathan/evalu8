import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Login from './Login.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './createAccount.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-intro">
        <BrowserRouter>
        <div>
          
            <Switch>
             <Route path="/login" component={Login}/>
             <Route path="/createAccount" component={CreateAccount}/>
           </Switch>
        </div> 
      </BrowserRouter>
          {/* To get started, edit <code>src/App.js</code> and save to reload. */}
        </div>
      </div>
    );
  }
}

export default App;
