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
    }
    

    render() {
      return (
        <div>
          <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="Login">
            <h1 className="Login-header">Login</h1>
            {/* Login Form */}
            <div id="loginForm" className="col-sm border-right">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input onChange={this.handleChange} name="email" type="email" className="form-control" id="loginEmail" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="loginPassword" placeholder="Password"/>
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
      );
    }
  }
  
  export default Login;