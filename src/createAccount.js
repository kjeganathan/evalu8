import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './createAccount.css';
 
class createAccount extends Component {
    render() {
      return (
        
        <div className="createAccount">
            <h1 className="createAccount-header">Create Account</h1>
            <div id="loginForm" className="col-sm border-right">
                    <form>
                        <div className="form-group">
                          <input type="text" className="form-control" id="createFirstName" placeholder="First Name"/>
                        </div>
                        <div className="form-group">
                          <input type="text" className="form-control" id="createLastName" placeholder="Last Name"/>
                        </div>
                        <div className="form-group">
                          <input type="email" className="form-control" id="createEmail" aria-describedby="emailHelp" placeholder="Email"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="createPassword" placeholder="Password"/>
                        </div>
                        <div className="form-group">
                            <input type="password" className="form-control" id="createVerifyPassword" placeholder="Verify Password"/>
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
 
