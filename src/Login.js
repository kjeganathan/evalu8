import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Login.css';

class Login extends Component {
    render() {
      return (
        
        <div className="Login">
            <h1 className="Login-header">Login</h1>
            {/* Login Form */}
            <div id="loginForm" className="col-sm border-right">
                    <form>
                        <div className="form-group">
                     
                          <input type="email" className="form-control" id="inputBox1" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="inputBox2" placeholder="Password"/>
                        </div>
                        <div className="loginButtons">
                          <button id="loginButton" type="submit" className="btn btn-dark">Login</button>
                        </div>
                          <div className="option">Don't have an account? &nbsp;
                          <a href="http://localhost:3000/createAccount" className="createAccountLink">sign up</a>
                          </div>
                         
                 
                    </form>
                </div>
        </div>
        
      );
    }
  }
  
  export default Login;