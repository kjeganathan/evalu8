import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Login from './Login.js'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CreateAccount from './createAccount.js';
import UploadFile from './uploadFile.js';
import HomePage from './homePage.js';
import teamMembers from './teamMembers';
import engagementPage from './engagement';
import contributionPage from './contribution';


class App extends Component {

  render() {
    return (
      <div className="App">
        {/* <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div> */}
        <div className="App-intro">
        <BrowserRouter>
        <div>
            <Switch>
            <Route exact path="/" component={HomePage}/>
             <Route path="/login" component={Login}/>
             <Route path="/createAccount" component={CreateAccount}/>
             <Route path="/upload" component={UploadFile}/>
             <Route path="/teamMembers" component={teamMembers}/>
             <Route path="/engagement" component={engagementPage}/>
             <Route path="/contribution" component={contributionPage}/>
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
