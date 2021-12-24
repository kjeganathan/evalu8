import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './homePage.css';
import logo from './logo.png';


class homePage extends Component {

    routeChangeToCreateAccount=()=> {
        this.props.history.push("/createAccount");
    }

    routeChangeToLogin=()=> {
        this.props.history.push("/login");
    }

  render() {
    return (
    <div>
        <div className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button id="homePage-header-button-id" onClick={this.routeChangeToLogin} type="submit" className="btn btn-dark">Log In</button>
        </div>
        <div className="homePage">
            <h1 className="homePage-header">Performance evaluation made easy</h1>
            <h2 className="homePage-body">
                Evalu8 is a performance evaluation tool for students <br/> in a classroom setting
            </h2>
        <div className="homePage-button">
            <button id="homePage-button-id" onClick={this.routeChangeToCreateAccount} type="submit" className="btn btn-dark">Sign Up</button>
        </div>
    </div>
    </div>
    );
  }
}

export default homePage;
