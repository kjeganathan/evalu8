import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
import logo from './logo.png';
 
class createAccount extends Component {

  constructor() {
    super();

    this.state = {
      name: '',
      github_username:'',
      github_reponame:'',
      github_token:'',
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
    const data = { name:this.state.name, github_username:this.state.github_username, github_reponame: this.state.github_reponame, github_token:this.state.github_token, password:this.state.password }
    
    //Fetch request to create an account for a new manager
    fetch('/api/createAccount',{ 
      method:'POST', 
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers:{ 'Content-Type': 'application/json' } 
    }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));  
   }

    render() {
      return (
        <div>
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="createAccount">
            <div id="loginForm" className="col-sm border-right">
              <div id="createAccount-form-modal">
                    <form onSubmit={this.handleSubmit}>
                    <h1 className="createAccount-header">Create Your Account</h1>
                    <h4 className="createAccount-subheader">Create an account to use Evalu8</h4>
                        <div id="first-name-form" className="form-group">
                          <label for="createFirstName">Name</label>
                          <input onChange={this.handleChange} name="name" type="text" className="form-control" id="createFirstName"/> 
                        </div>
                        <div id="last-name-form" className="form-group">
                        <label for="createLastName">Github Username</label>
                          <input onChange={this.handleChange} name="github_username" type="text" className="form-control" id="createLastName"/>
                        </div>
                        <div id="last-name-form" className="form-group">
                        <label for="reponame">Github Repo Name</label>
                          <input onChange={this.handleChange} name="github_reponame" type="text" className="form-control" id="reponame"/>
                        </div>
                        <div id="email-form" className="form-group">
                        <label for="createEmail">Github Token</label>
                          <input onChange={this.handleChange} name="github_token" type="text" className="form-control" id="createEmail" aria-describedby="emailHelp"/>
                        </div>
                        <div id="password-form" className="form-group">
                        <label for="createPassword">Password</label>
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="createPassword"/>
                        </div>
                        <div id="verify-password-form" className="form-group">
                        <label for="createVerifyPassword">Verify Password</label>
                            <input onChange={this.handleChange} name="verifypassword" type="password" className="form-control" id="createVerifyPassword"/>
                        </div>
                        <div className="createAccountButton">
                          <button id="createAccountButton" type="submit" className="btn btn-dark">Create Account</button>
                        </div>
                          <div id="createAccount-option-id" className="option">Already have an account? &nbsp;
                          <a href="http://localhost:3000/login" id="loginLink-id" className="loginLink">log in</a>
                          </div>

                    </form>
                    </div>
                </div>
        </div>
        </div>
      );
    }
  }
  
  export default createAccount;
 
