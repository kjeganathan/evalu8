import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
 
class createAccount extends Component {
    render() {
      return (
        
        <div className="Login">
            <h1 className="Login-header">Create Account</h1>
            <div id="loginForm" className="col-sm border-right">
                    <form>
                        <div className="form-group">
                          <input type="text" className="form-control" id="inputBox2" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" id="inputBox2" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control" id="inputBox2" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="inputBox2" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="inputBox2" placeholder="Verify Password"/>
                        </div>
                        <div className="loginButton">
                          <button id="loginButton" type="submit" className="btn btn-dark">Create Account</button>
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
 
