import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
 
class createAccount extends Component {

  constructor() {
    super();

    this.state = {
      firstname: '',
      lastname:'',
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
    const data = { firstname:this.state.firstname, lastname:this.state.lastname , email:this.state.email, password:this.state.password }
    
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
        
        <div className="createAccount">
            <h1 className="createAccount-header">Create Account</h1>
            <div id="loginForm" className="col-sm border-right">
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                          <input onChange={this.handleChange} name="firstname" type="text" className="form-control" id="createFirstName" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                          <input onChange={this.handleChange} name="lastname" type="text" className="form-control" id="createLastName" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                          <input onChange={this.handleChange} name="email" type="email" className="form-control" id="createEmail" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} name="password" type="password" className="form-control" id="createPassword" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input onChange={this.handleChange} name="verifypassword" type="password" className="form-control" id="createVerifyPassword" placeholder="Verify Password"/>
                        </div>
                        <div className="createAccountButton">
                          <button id="createAccountButton" type="submit" className="btn btn-dark">Create Account</button>
                        </div>
                          <div className="option">Already have an account? &nbsp;
                          <a href="http://localhost:3000/login" className="createAccountLink">log in</a>
                          </div>

                    </form>
                </div>
        </div>
        
      );
    }
  }
  
  export default createAccount;
 
