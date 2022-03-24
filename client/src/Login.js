import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './Login.css';
import logo from './logo.png';

class Login extends Component {

  constructor() {
    super();

    this.state = {
      github_username:'',
      course:'',
      token:'',
      admin:''
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
      localStorage.setItem("github_username", JSON.stringify(this.state.github_username));
      localStorage.setItem("course", JSON.stringify(this.state.course));
      // localStorage.setItem("github_token", JSON.stringify(this.state.token));
      let jsoncourse = JSON.parse(localStorage.getItem("course"));
      let username = JSON.parse(localStorage.getItem("github_username"));
      console.log(username);
      let data = {manager_name:username, classroom:jsoncourse}
      fetch("/api/getTokenAndAdminByManager",{ 
        method:'POST', 
        body: JSON.stringify(data), // data can be `string` or {object}!
        headers:{ 'Content-Type': 'application/json' } 
      })
        .then( async responsenext => {
            //data2 is an array of objects
            const data = await responsenext.json();
            console.log('response data?', data[0]['github_token'] + " " + data[0]['admin']);
            this.setState({
              token : data[0]['github_token'],
              admin : data[0]['admin']
            });

            
           // window.location.href='/teamMembers';
        }).then(e => {
          localStorage.setItem("github_token", JSON.stringify(this.state.token));
          localStorage.setItem("admin", JSON.stringify(this.state.admin));
        }).then(s => {
          window.location.href='/teamMembers';
        });
      
       
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
                  
                        <div id="githubusernameForm" className="form-group">
                          <label for="loginGithubUsername">Github Username</label>
                          <input onChange={this.handleChange} name="github_username" type="text" className="form-control" id="loginGithubUsername" aria-describedby="emailHelp"/>
                        </div>
                        <div id="courseForm" className="form-group">
                            <label for="loginCourse">Course (ex. COMPSCI 326)</label>
                            <input onChange={this.handleChange} name="course" type="text" className="form-control" id="loginCourse"/>
                        </div>
                        <div id="passwordForm" className="form-group">
                            <label for="loginPassword">Password</label>
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="loginPassword"/>
                        </div>
                        <div className="loginButton">
                          <button id="loginButton" type="submit" className="btn btn-dark">Login
                          </button>
                        </div>
                          <div id="option-id" className="option">Don't have an account? &nbsp;
                          <a href="http://localhost:3000/createAccount" id="create-account-link-id" className="createAccountLink">sign up</a>
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