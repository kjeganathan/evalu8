import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Login.css';
import logo from './logo.png';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      email:'',
      password:''
      };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

    handleSubmit(event) {
      event.preventDefault();
      localStorage.setItem("email", JSON.stringify(this.state.email));
      //relocate to the team members page
    }
    

    render() {
      return (
        <div>
          <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Login">

            {/* Login Form */}
            <div id="loginForm" className="col-sm border-right">
                <div id="login-form-modal">
                    <form onSubmit={this.handleSubmit}>
                    <h1 className="Login-header">Welcome Back</h1>
                    <h4 className="Login-subheader">Login to continue</h4>
                        <div id="emailForm" className="form-group">
                          <label for="loginEmail">Email</label>
                          <input onChange={this.handleChange} name="email" type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp"/>
                        </div>
                        <div id="passwordForm" className="form-group">
                            <label for="loginPassword">Password</label>
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="loginPassword"/>
                        </div>
                        <div className="loginButton">
                          <button id="loginButton" type="submit" className="btn btn-dark">Login</button>
                        </div>
                          <div className="option">Don't have an account? &nbsp;
                          <a href="http://localhost:3000/createAccount" className="createAccountLink">sign up</a>
                          </div>
                         
                 
                    </form>
                    </div>
                </div>
        </div>
        </div>
      );
    }
  }
  
  export default Login;